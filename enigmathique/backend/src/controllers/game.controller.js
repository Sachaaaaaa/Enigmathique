/**
 * Définition des opérations CRUD pour les classes
*/

const db = require("../models/db.js");
const Game = db.game;
const Op = db.Sequelize.Op;

// Créer et enregistrer une nouvelle classe
exports.create = (req, res) => {

	// Créer une classe
	const game = {
	};

	// Enregistrer la classe dans la base de données
	Game.create(game)
		.then(data => {
			res.status(201).send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la création de la partie."
			});
		});
}

// Récupérer toutes les classes de la base de données
exports.findAll = (req, res) => {
	Game.findAll()
		.then(data => {
			res.status(200).send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la récupération des parties."
			});
		});
}
