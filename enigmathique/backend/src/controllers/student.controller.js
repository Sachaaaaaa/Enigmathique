/**
 * Définition des opérations CRUD pour les élèves
*/

// todo : factoriser en fonctions

const db = require("../models/db.js");
const Student = db.student;
const Course = db.course;
const Op = db.Sequelize.Op;

// Créer et enregistrer un nouvel élève
exports.create = (req, res) => {
	// Valider la requête
	if (!req.body.lastname || !req.body.firstname || !req.body.idCourse) {
		res.status(400).send({
			message: "Il manque des informations pour créer l'élève."
		});
		return;
	}

	//todo : faire en sorte que l'id soit associé au prof
	// Créer un élève
	const student = {
		lastname: req.body.lastname,
		firstname: req.body.firstname,
		idCourse: req.body.idCourse,
	};

	// Enregistrer l'élève dans la base de données
	Student.create(student)
		.then(data => {
			res.status(201).send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la création de l'élève."
			});
		});
}


// Récupérer tous les élèves d'une classe du professeur
exports.findById = (req, res) => {

	if (!req.body.idCourse) {
		res.status(400).send({
			message: "Il manque des informations pour récupèrer les élèves d'une classe."
		});
		return;
	}

	Course.findAll({ where: { idProfessor: req.tokenId } })
	.then(data => {
		// Récupère les id correspondant aux classe du professeur courant
		let ids = data.map(item => item.id);

		// Vérifie que la classe appartienne bien au professeur
		if(!ids.includes(req.body.idCourse)){
			res.status(500).send({
				message: "La classe spécifiée ne vous appartient pas."
			});
			return;
		}
		
		// Pour chaque id de classe, recupère les étudiants de cette dernière
		Student.findAll({ where: { idCourse: { [Op.in]: ids } } })
		.then(dataStudent => {res.status(200).send(dataStudent);})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la récupération des étudiants."
			});
		});	
	})
	.catch(err => {
		res.status(500).send({
			message: err.message || "Une erreur s'est produite lors de la récupération des classes."
		});
	});	


}

// todo : moyen de faire un truc plus propre ?
// Récupérer tous les élèves des classes du professeur
exports.findAll = (req, res) => {

	Course.findAll({ where: { idProfessor: req.tokenId } })
	.then(data => {
		// Récupère les id correspondant aux classe du professeur courant
		let ids = data.map(item => item.id);

		// Pour chaque id de classe, recupère les étudiants de cette dernière
		Student.findAll({ where: { idCourse: { [Op.in]: ids } } })
		.then(dataStudent => {res.status(200).send(dataStudent);})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la récupération des étudiants."
			});
		});	
	})
	.catch(err => {
		res.status(500).send({
			message: err.message || "Une erreur s'est produite lors de la récupération des classes."
		});
	});	


}




exports.delete = (req, res) => {
	console.log("shesh");
	// Valider la requête
	if (!req.body.id) {
		res.status(400).send({
			message: "Il manque des informations pour supprimer l'élève."
		});
		return;
	}

	Course.findAll({ where: { idProfessor: req.tokenId } })
	.then(data => {
		// Récupère les id correspondant aux classe du professeur courant
		let idCourseOfProfessor = data.map(item => item.id);

		// Pour chaque id de classe, recupère les étudiants de cette dernière
		Student.findAll({ where: { idCourse: { [Op.in]: idCourseOfProfessor } } })
		.then(dataStudent => {
			let idStudentofProfessor = data.map(item => item.id);

			// Vérifie que l'élève appartienne bien à une classe du professeur
			if(!idStudentofProfessor.includes(req.body.id)){
				res.status(500).send({
					message: "L'élève spécifié ne vous appartient pas."
				});
				return;
			}

			// Si l'élève appartient bien a une classe du professeur, on le supprime
			Student.destroy({ where: { id: req.body.id} })
			.then(num => {
		
				// Vérifie si le professeur a bien été supprimé
				if (num == 1) {
				  res.status(200).send({
					message: "L'élève a été supprimée avec succès"
				  });
		
				// Si aucunes colonnes traités on relève une erreur
				} else {
				  res.status(500).send({
					message: "Impossible de supprimer l'élève"
				  });
				}
				  })
				// Gère les erreurs
			.catch(err => {
				res.status(500).send({
					message: err.message || "Une erreur s'est produite lors de la suppression des élèves."
				});
			});	


			
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la récupération des étudiants."
			});
		});	
	})
	.catch(err => {
		res.status(500).send({
			message: err.message || "Une erreur s'est produite lors de la récupération des classes."
		});
	});	


}