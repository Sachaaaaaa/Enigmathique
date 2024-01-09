/**
 * Définition des opérations CRUD pour les élèves
*/

const db = require("../models/db.js");
const Student = db.student;
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


// Récupérer tous les élèves de la base de données
exports.findAll = (req, res) => {
	Student.findAll()
		.then(data => {
			res.status(200).send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la récupération des élèves."
			});
		});
}