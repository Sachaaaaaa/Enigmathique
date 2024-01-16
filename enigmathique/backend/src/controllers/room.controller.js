/**
 * Définition des opérations CRUD pour les classes
*/

const db = require("../models/db.js");
const roomRoute = require("../routes/room.route.js");
const Room= db.room;
const Op = db.Sequelize.Op;

/////////////////////////////////////////////////////////////////////////////////
// 									 CREATE                                    //
/////////////////////////////////////////////////////////////////////////////////

// Créer et enregistrer une nouvelle salle au professeurs
exports.create = async (req, res) => {

	// Valider la requête
	if (!req.body.name ||!req.body.chapter || !req.body.difficulty) {
		return res.status(400).json({
			message: "Il manque des informations pour ajouter une salle."
		});
	}

	// Créer une salle
	const room = {
		name: req.body.name,
		chapter: req.body.chapter,
		difficulty: req.body.difficulty,
	};

	// Enregistrer la salle dans la base de données
	await Room.create(room)

		// Renvoie les données créées
		.then(data => {
			return res.status(201).json(data);
		})

		// Gère les erreurs
		.catch(err => {
			return res.status(500).json({
				message: err.message || "Une erreur s'est produite lors de la création de la salle."
			});
		});
}


/////////////////////////////////////////////////////////////////////////////////
// 									 READ                                      //
/////////////////////////////////////////////////////////////////////////////////

// methode pour récuperer les salles de la DB
exports.findAll = async (req, res) => {
	await Room.findAll()
		.then(data => {
			return res.status(200).json(data);
		})
		.catch(err => {
			return res.status(500).json({
				message: err.message || "Une erreur s'est produite lors de la récupération des salles."
			});
		});	
}