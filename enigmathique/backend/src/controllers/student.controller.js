/**
 * Définition des opérations CRUD pour les élèves
*/


const db = require("../models/db.js");
const Student = db.student;
const Course = db.course;
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

// Fonction vérifiant si une classe, à partir de son id, appartiant au professeur
async function isStudentBelongsProfessor(idStudent, req) {
	try {

		// Récupère toutes les classes du professeur courant
		const data = await Student.findOne({ where: { id: idStudent} });
		if(data){
			// Récupère les id correspondant aux classes du professeur courant
			const idCourse = data.idCourse;

			// Vérifie que la classe appartient bien au professeur
			return await isClassBelongsProfessor(idCourse, req);
		} else {
			throw new Error("L'élève n'existe pas.");
		}

	} catch (err) {
		// Gère les erreurs
		throw new Error(err.message || "Une erreur s'est produite lors de la récupération des classes.");
	}
}

/////////////////////////////////////////////////////////////////////////////////
// 									 CREATE                                    //
/////////////////////////////////////////////////////////////////////////////////

// Créer et enregistrer un nouvel élève
exports.create = async(req, res) => {

	// Valider la requête
	if (!req.body.lastname || !req.body.firstname || !req.body.idCourse) {
		return res.status(400).send({
			message: "Il manque des informations pour créer l'élève."
		});
	}

	// Vérifie que la classe appartient bien au professeur
	if(! await isClassBelongsProfessor(req.body.idCourse, req)){
		return res.status(403).send({
			message: "Vous n'avez pas accès à cette classe."
		})
	}


	// Créer un élève
	const student = {
		lastname: req.body.lastname,
		firstname: req.body.firstname,
		idCourse: req.body.idCourse,
	};

	// Enregistrer l'élève dans la base de données
	await Student.create(student)
		.then(data => {
			return res.status(201).json(data);
		})

		// Gère les erreurs
		.catch(err => {
			return res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la création de l'élève."
			});
		});
}

/////////////////////////////////////////////////////////////////////////////////
// 									 READ                                      //
/////////////////////////////////////////////////////////////////////////////////

// Récupérer un élève par son id
exports.findById = async (req, res) => {
	try {

	// Vérifie que l'élève appartient bien au professeur et qu'il existe bien
	const isBelongsToProfessor = await isStudentBelongsProfessor(req.params.id, req);
	if (!isBelongsToProfessor) {
		return res.status(403).send({
			message: "Vous n'avez pas accès à cet élève."
		});
	}
  
	// Continuez avec la récupération des étudiants
	const dataStudent = await Student.findOne({ where: { id: req.params.id } });

	// Envoyer les données de l'élèves
	return res.status(200).json(dataStudent);
	
	// Gérer les erreurs
	} catch (err) {
		return res.status(500).send({
			message: err.message || "Une erreur s'est produite lors de la récupération des étudiants."
		});
	}
  };
  

/////////////////////////////////////////////////////////////////////////////////
// 									 UPDATE                                    //
/////////////////////////////////////////////////////////////////////////////////

// methode pour mettre à jour un professeur en fonction de son id
exports.update = async(req, res) => {

	// Vérifie que l'élève appartient bien au professeur
	const isBelongsToProfessor = await isStudentBelongsProfessor(req.params.id, req);
	if (!isBelongsToProfessor) {
		return res.status(403).send({
			message: "Vous n'avez pas accès à cette classe."
		});
	}
	
	// Stock les changements apportés à l'élève
    const updateData = {};

	// Si le professeur souhaite changer le prénom de l'élève
    if (req.body.firstname) {
    	updateData.firstname = req.body.firstname;
    }

	// Si le professeur souhaite changer le nom de l'élève
    if (req.body.lastname) {
    	updateData.lastname = req.body.lastname;
    }

	// Si le professeur souhaite changer la classe de l'élève
	if (req.body.idCourse) {

		// Vérifie que la classe appartient bien au professeur
		if(! await isClassBelongsProfessor(req.body.idCourse, req)){
			return res.status(403).send({
				message: "Vous n'avez pas accès à cette classe."
			})	
		}
		updateData.idCourse = req.body.idCourse;
	}

	// Effectue la requête de mise à jour
	await Student.update(updateData, {where: { id: req.params.id} })
		// Vérifie que la colonne à effectivement été mise à jour
	  .then(num => {
		if (num == 1) {
			return res.status(201).send({
				message: "La classe à été mise a jour avec succès"
			});

		// Si aucunes colonnes traités on relève une erreur
		} else {
			return res.status(404).send({
				message: "Impossible de mettre à jour la classe"
			});
		}
	  })

	  // Gère les erreurs
	  .catch(err => {
		return res.status(500).send({
			message: err.message || "Une erreur s'est produite lors de la récupération des classes."
		});
	  });
  };
  
/////////////////////////////////////////////////////////////////////////////////
// 									 DELETE                                    //
/////////////////////////////////////////////////////////////////////////////////

// Supprimer un étudiant à partir de son id
exports.delete = async (req, res) => {

	try{

	// Vérifie que l'élève appartient bien au professeur
	const isBelongsToProfessor = await isStudentBelongsProfessor(req.params.id, req);
	if (!isBelongsToProfessor) {
		return res.status(403).send({
			message: "Vous n'avez pas accès à cette classe."
		});
	}
	
	// Si l'élève appartient bien a une classe du professeur, on le supprime
	Student.destroy({ where: { id: req.params.id} })
	.then(num => {

		// Vérifie si le professeur a bien été supprimé
		if (num == 1) {
			return res.status(201).send({
				message: "L'élève a été supprimée avec succès"
			});
 
		// Si aucunes colonnes traités on relève une erreur
		} else {
			return res.status(404).send({
				message: "Impossible de supprimer l'élève"
			});
		}
	})
	// Gérer les erreurs
	} catch (err) {
		return res.status(500).send({
			message: err.message || "Une erreur s'est produite lors de la récupération des étudiants."
		});
	}
};
