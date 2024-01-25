/**
 * Définition des opérations CRUD pour les classes
*/

const db = require("../models/db.js");
const roomRoute = require("../routes/room.route.js");
const Room= db.room;
const Op = db.Sequelize.Op;
const Joi = require('joi');
const { baseSchema } = require('./validationSchemas');

/////////////////////////////////////////////////////////////////////////////////
// 									 FONCTIONS                                 //
/////////////////////////////////////////////////////////////////////////////////

// Fonction vérifiant si la requête est conforme aux attentes
function isRequestCorrect(schema, req) {
	const { error } = schema.validate(req.body);
	if (error) {
		const validationError = new Error(error.details[0].message);
		validationError.statusCode = 500;  
		throw validationError;
	}
}

/////////////////////////////////////////////////////////////////////////////////
// 									 CREATE                                    //
/////////////////////////////////////////////////////////////////////////////////

// Créer et enregistrer une nouvelle salle dans la base de données
exports.create = async (req, res, next) => {

	try{
		
		// Vérification des informations fournis
		const roomSchema = baseSchema.keys({
			name: Joi.string().max(150).required(),
			chapter: Joi.string().max(150).required(),
			difficulty: Joi.string().max(150).required(),
		});

		// Vérifie si le schéma correspond bien aux données fournis, renvoie une erreur sinon
		isRequestCorrect(roomSchema, req)

		// Créer une salle
		const room = {
			name: req.body.name,
			chapter: req.body.chapter,
			difficulty: req.body.difficulty,
		};


		// Enregistrer la salle dans la base de données
		const createdRoom = await Room.create(room)

		// Renvoie les données créées
		return res.status(201).json(createdRoom);

	// Gère les erreurs
	}catch(err) {
		next(err)
	}
}


/////////////////////////////////////////////////////////////////////////////////
// 									 READ                                      //
/////////////////////////////////////////////////////////////////////////////////

// methode pour récuperer les salles de la base de données
exports.findAll = async (req, res, next) => {

	try{

		// Récupère toutes les salles
		const rooms = await Room.findAll()
		return res.status(200).json(rooms);

	}catch(err) {
		next(err)
	}	
}