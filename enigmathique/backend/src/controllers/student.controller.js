/**
 * Définition des opérations CRUD pour les élèves
*/

// todo : factoriser en fonctions

const db = require("../models/db.js");
const Student = db.student;
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
  

// Créer et enregistrer un nouvel élève
exports.create = (req, res) => {
	// Valider la requête
	if (!req.body.lastname || !req.body.firstname || !req.body.idCourse) {
		res.status(502).send({
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
exports.findById = async (req, res) => {
	try {
	  // Vérifie que la classe appartient bien au professeur
	  const isBelongsToProfessor = await isStudentBelongsProfessor(req.params.id, req);
  
	  if (!isBelongsToProfessor) {
		res.status(403).send({
		  message: "Vous n'avez pas accès à cette classe."
		});
		return;
	  }
  
	  // Continuez avec la récupération des étudiants
	  const dataStudent = await Student.findAll({ where: { id: req.params.id } });
	  res.status(200).send(dataStudent);
	} catch (err) {
	  res.status(500).send({
		message: err.message || "Une erreur s'est produite lors de la récupération des étudiants."
	  });
	}
  };
  

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
		res.status(502).send({
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
				res.status(503).send({
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
				  res.status(501).send({
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