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
		validationError.statusCode = 400;  
		throw validationError;
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