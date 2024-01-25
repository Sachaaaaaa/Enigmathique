/**
 * Définition des opérations CRUD pour les professeurs
*/

const db = require("../models/db.js");
const Professor = db.professor;
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

// On ne peut pas créer un professeur ici, c'est dans le controller de l'authentification

/////////////////////////////////////////////////////////////////////////////////
// 									 READ                                      //
/////////////////////////////////////////////////////////////////////////////////

exports.findOne = async (req, res, next) => {
	try {
		// Récupère le professeur connecté
		const professor = await Professor.findOne({ where: { id: req.tokenId }, attributes: { exclude: ['password', 'mail'] } })
		return res.status(200).json(professor);
	
	// Gère les erreurs
	}catch(err) {
		next(err)
	}
}

/////////////////////////////////////////////////////////////////////////////////
// 									 UPDATE                                    //
/////////////////////////////////////////////////////////////////////////////////

// to do : hash le password
// methode pour mettre à jour le professeur connecté
exports.update = async(req, res, next) => {
	
	try{

		// Vérification des informations fournis
		const studentSchema = baseSchema.keys({
			lastname: Joi.string(),
			firstname: Joi.string(),
			mail: Joi.string().email(),
		});

		// Vérifie si le schéma correspond bien aux données fournis, renvoie une erreur sinon
		isRequestCorrect(studentSchema, req)

		// Stock les changements apportés au professeur	
		const updateData = {};

		// Si le professeur souhaite changer le prénom de l'élève
		if (req.body.firstname) {
			updateData.firstname = req.body.firstname;
		}

		// Si le professeur souhaite changer le nom de l'élève
		if (req.body.lastname) {
			updateData.lastname = req.body.lastname;
		}

		// todo : pas deux fois le même mail dans la BD ?
		// Si le professeur souhaite changer le nom de l'élève
		if (req.body.mail) {
			updateData.lastname = req.body.mail;
		}

		// Effectue la requête de mise à jour
		const updatedRows = await Professor.update(updateData, {where: { id: req.tokenId} })

		// Vérifie que la colonne à effectivement été mise à jour
		if (updatedRows == 0) {
			const error = new Error("Impossible de mettre à jour le professeur");
			error.statusCode = 404;  
			throw error;
		} 
	
		return res.status(201).json({message: "Le professeur à été mise a jour avec succès"});
	
	// Gère les erreurs
	} catch(err) {
		console.log(err)
		next(err)
	}
  };

  
/////////////////////////////////////////////////////////////////////////////////
// 									 DELETE                                    //
/////////////////////////////////////////////////////////////////////////////////


// methode pour supprimer un professeur en fonction de son id
exports.delete = async (req, res, next) => {

	try {
		// Effectue la requête de suppression du professeur connecté
		const deletedRows = await Professor.destroy({ where: { id: req.tokenId} })
		
		// Vérifie si le professeur a bien été supprimé
		if (deletedRows == 0) {
			const error = new Error("Impossible de mettre à jour le professeur");
			error.statusCode = 404;  
			throw error;
		} 
			
		return res.status(200).json({message: "La classe a été supprimée avec succès"})

	// Gère les erreurs
	} catch(err) {
		console.log(err);
		next(err)
	}
}


