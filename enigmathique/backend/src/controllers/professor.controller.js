/**
 * Définition des opérations CRUD pour les professeurs
*/

const db = require("../models/db.js");
const Professor = db.professor;
const Op = db.Sequelize.Op;

// Créer et enregistrer un nouveau professeur
exports.create = (req, res) => {
	// Valider la requête
	if (!req.body.lastname || !req.body.firstname || !req.body.mail || !req.body.password) {
		res.status(400).send({
			message: "Il manque des informations pour créer le professeur."
		});
		return;
	}

	// Créer un professeur
	const professor = {
		lastname: req.body.lastname,
		firstname: req.body.firstname,
		mail: req.body.mail,
		password: req.body.password,
	};

	// Enregistrer le professeur dans la base de données
	Professor.create(professor)
		.then(data => {
			res.status(201).send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la création du professeur."
			});
		});
}

// Récupérer tous les professeurs de la base de données
exports.findAll = (req, res) => {
	Professor.findAll()
		.then(data => {
			res.status(200).send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la récupération des professeurs."
			});
		});
}