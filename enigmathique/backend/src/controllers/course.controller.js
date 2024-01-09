/**
 * Définition des opérations CRUD pour les classes
*/

const db = require("../models/db.js");
const Course = db.course;
const Op = db.Sequelize.Op;

// Créer et enregistrer une nouvelle classe
exports.create = (req, res) => {
	// Valider la requête
	if (!req.body.name) {
		res.status(400).send({
			message: "Il manque des informations pour créer la classe."
		});
		return;
	}

	// Créer une classe
	const course = {
		name: req.body.name,
		idProfessor: req.body.idProfessor,
	};

	// Enregistrer la classe dans la base de données
	Course.create(course)
		.then(data => {
			res.status(201).send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la création de la classe."
			});
		});
}

// Récupérer toutes les classes de la base de données
exports.findAll = (req, res) => {
	Course.findAll()
		.then(data => {
			res.status(200).send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la récupération des classes."
			});
		});
}
