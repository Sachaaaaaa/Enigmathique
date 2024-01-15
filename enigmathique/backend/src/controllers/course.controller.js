/**
 * Définition des opérations CRUD pour les classes
*/

const db = require("../models/db.js");
const Course = db.course;
const Student = db.student;
const Op = db.Sequelize.Op;

/////////////////////////////////////////////////////////////////////////////////
// 									 FONCTIONS                                 //
/////////////////////////////////////////////////////////////////////////////////

// Fonction vérifiant si une classe, à partir de son id, appartiant au professeur
async function isClassBelongsProfessor(idCourse, req) {
	try {

		// Récupère toutes les classes du professeur courant
		const data = await Course.findAll({ where: { idProfessor: req.tokenId } });

		// Récupère les id correspondant aux classes du professeur courant
		const ids = data.map(item => item.id);
		idCourse = parseInt(idCourse)

		// Vérifie que la classe appartient bien au professeur
		return ids.includes(idCourse);

	} catch (err) {
		// Gère les erreurs
		throw new Error(err.message || "Une erreur s'est produite lors de la récupération des classes.");
	}
}
  
/////////////////////////////////////////////////////////////////////////////////
// 									 CREATE                                    //
/////////////////////////////////////////////////////////////////////////////////

// Créer et enregistrer une nouvelle classe au professeurs
exports.create = async (req, res) => {

	// Valider la requête
	if (!req.body.name) {
		return res.status(400).json({
			message: "Il manque des informations pour créer la classe."
		});
	}

	// Créer une classe
	const course = {
		name: req.body.name,
		idProfessor: req.tokenId,
	};

	// Enregistrer la classe dans la base de données
	await Course.create(course)

		// Renvoie les données créées
		.then(data => {
			return res.status(201).json(data);
		})

		// Gère les erreurs
		.catch(err => {
			return res.status(500).json({
				message: err.message || "Une erreur s'est produite lors de la création de la classe."
			});
		});
}

/////////////////////////////////////////////////////////////////////////////////
// 									 READ                                      //
/////////////////////////////////////////////////////////////////////////////////

// methode pour récuperer les classes du professeur
exports.findAll = async (req, res) => {
	await Course.findAll({ where: { idProfessor: req.tokenId } })
		.then(data => {
			return res.status(200).json(data);
		})
		.catch(err => {
			return res.status(500).json({
				message: err.message || "Une erreur s'est produite lors de la récupération des classes."
			});
		});	
}

// methode pour récuperer une classe du professeur
exports.findOne = async (req, res) => {

	// Vérifie que la classe appartient bien au professeur
	if(! await isClassBelongsProfessor(req.params.id, req)){
		return res.status(403).json({
			message: "Vous n'avez pas accès à cette classe."
		})	
	}

	// Récupèrer la classe
	await Course.findOne({ where: { id: req.params.id, idProfessor: req.tokenId } })
		.then(data => {
			return res.status(200).json(data);
		})
		.catch(err => {
			return res.status(500).json({
				message: err.message || "Une erreur s'est produite lors de la récupération des classes."
			});
		});	
}

// methode pour récuperer les élèves d'une classe du professeur par son id
exports.findStudents = async (req, res) => {

	// Vérifie que la classe appartient bien au professeur
	if(! await isClassBelongsProfessor(req.params.id, req)){
		return res.status(403).json({
			message: "Vous n'avez pas accès à cette classe."
		})
	}

	await Student.findAll({ where: { idCourse: req.params.id} })
		.then(data => {
			return res.status(200).json(data);
		})
		.catch(err => {
			return res.status(500).json({
				message: err.message || "Une erreur s'est produite lors de la récupération des classes."
			});
		});	
}

/////////////////////////////////////////////////////////////////////////////////
// 									 UPDATE                                    //
/////////////////////////////////////////////////////////////////////////////////

// todo: verif qu'il y a au moins un truc à modifier 
// methode pour mettre à jour le professeur connecté
exports.update = async(req, res) => {
	
	// Valider la requête
	if (!req.body.name) {
		return res.status(400).json({
			message: "Il manque des informations pour mettre à jour la classe."
		});
	}

	// Vérifie que la classe appartient bien au professeur
	if(! await isClassBelongsProfessor(req.params.id, req)){
		return res.status(403).json({
			message: "Vous n'avez pas accès à cette classe."
		})	
	}

	// Effectue la requête de mise à jour
	await Course.update({name: req.body.name}, {where: { id: req.params.id} })

		// Vérifie que la colonne à effectivement été mise à jour
	  .then(num => {
		if (num == 1) {
			return res.status(201).json({
				message: "La classe à été mise a jour avec succès"
			});

		// Si aucunes colonnes traités on relève une erreur
		} else {
			return res.status(404).json({
				message: "Impossible de mettre à jour la classe"
			});
		}
	  })

	  // Gère les erreurs
	  .catch(err => {
		return res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de la récupération de la classe."
		});
	  });
  };

  

	  
/////////////////////////////////////////////////////////////////////////////////
// 									 DELETE                                    //
/////////////////////////////////////////////////////////////////////////////////


// To do : probleme de dependence avec student
// methode pour supprimer une classe en fonction de son id
exports.delete = async (req, res) => {

	// Vérifie que la classe appartient bien au professeur
	if(! await isClassBelongsProfessor(req.params.id, req)){
		return res.status(403).json({
			message: "Vous n'avez pas accès à cette classe."
		})
	}

	// Effectue la requête de delete
	await Course.destroy({ where: { id: req.params.id, idProfessor: req.tokenId} })
	.then(num => {

		// Vérifie si la classe a bien été supprimé
		if (num == 1) {
			return res.status(201).json({
				message: "La classe a été supprimée avec succès"
		  });

		// Si aucunes colonnes traités on relève une erreur
		} else {
			return res.status(404).json({
				message: "Aucune classe n'a été supprimée"
		  });
		}
	  	})
		// Gère les erreurs
		.catch(err => {
			return res.status(500).json({
				message: err.message || "Une erreur est intervenue durant la suppression de la classe."
			});
		});	
}




