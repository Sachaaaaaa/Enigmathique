/**
 * Définition des opérations CRUD pour les classes
*/

const db = require("../models/db.js");
const Course = db.course;
const Op = db.Sequelize.Op;

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
  
// Créer et enregistrer une nouvelle classe au professeurs
exports.create = async (req, res) => {

	// Valider la requête
	if (!req.body.name) {
		res.status(402).send({
			message: "Il manque des informations pour créer la classe."
		});
		return;
	}

	// Créer une classe
	const course = {
		name: req.body.name,
		idProfessor: req.tokenId,
	};

	// Enregistrer la classe dans la base de données
	Course.create(course)
		// Renvoie les données créées
		.then(data => {
			res.status(201).send(data);
		})
		// Gère les erreurs
		.catch(err => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la création de la classe."
			});
		});
}



// methode pour récuperer les classes du professeur
exports.findAll = (req, res) => {
	Course.findAll({ where: { idProfessor: req.tokenId } })
		.then(data => {
			res.status(201).send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la récupération des classes."
			});
		});	
}



// methode pour récuperer une clase du professeur par son id
exports.findById = async (req, res) => {

	// Vérifie que la classe appartient bien au professeur
	if(! await isClassBelongsProfessor(req.params.id, req)){
		res.status(403).send({
			message: "Vous n'avez pas accès à cette classe."
		})
		return;
	}

	Course.findAll({ where: { id: req.params.id, idProfessor: req.tokenId } })
		.then(data => {
			res.status(200).send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la récupération des classes."
			});
		});	
}



// To do : probleme de dependence avec student
// methode pour supprimer une classe en fonction de son id
exports.delete = async (req, res) => {

	// Vérifie que la classe appartient bien au professeur
	if(! await isClassBelongsProfessor(req.params.id, req)){
		res.status(403).send({
			message: "Vous n'avez pas accès à cette classe."
		})
		return;
	}

	// Effectue la requête de delete
	Course.destroy({ where: { id: req.params.id, idProfessor: req.tokenId} })
	.then(num => {

		// Vérifie si la classe a bien été supprimé
		if (num == 1) {
		  res.status(200).send({
			message: "La classe a été supprimée avec succès"
		  });

		// Si aucunes colonnes traités on relève une erreur
		} else {
		  res.status(401).send({
			message: "Impossible de supprimer la classe"
		  });
		}
	  	})
		// Gère les erreurs
		.catch(err => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la récupération des classes."
			});
		});	
}




// methode pour mettre à jour une classe en fonction de son id
exports.update = async (req, res) => {

	// Vérifie que la classe appartient bien au professeur	
	if(! await isClassBelongsProfessor(req.params.id, req)){
		res.status(403).send({
			message: "Vous n'avez pas accès à cette classe."
		})
		return;
	}
  
	// Effectue la requête de mise à jour
	Course.update(req.body, {

	  where: { id: req.params.id, idProfessor: req.tokenId} })

		// Vérifie que la colonne à effectivement été mise à jour
	  .then(num => {
		if (num == 1) {
		  res.status(200).send({
			message: "La classe à été mise a jour avec succès"
		  });
		// Si aucunes colonnes traités on relève une erreur
		} else {
		  res.status(401).send({
			message: "Impossible de mettre à jour la classe"
		  });
		}
	  })
	  // Gère les erreurs
	  .catch(err => {
		res.status(500).send({
			message: err.message || "Une erreur s'est produite lors de la récupération des classes."
		});
	  });
  };