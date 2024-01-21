
require('dotenv').config();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const db = require("../models/db.js");
const Professor = db.professor;
const Joi = require('joi');
const Op = db.Sequelize.Op;


// Créer et enregistrer un nouveau professeur
exports.register = async (req, res, next) => {

	try{
		// Vérification des informations fournis
		const professorSchema = Joi.object({
			lastname: Joi.string().required(),
			firstname: Joi.string().required(),
			mail: Joi.string().email().required(),
			password: Joi.string().min(8).required(), 
		});
		
		const { error } = professorSchema.validate(req.body);

		if (error) {
			const validationError = new Error(error.details[0].message);
			validationError.statusCode = 500;  
			throw validationError;
		}

		// Créer un professeur
		const professor = {
			lastname: req.body.lastname,
			firstname: req.body.firstname,
			mail: req.body.mail,
			password: await argon2.hash(req.body.password + process.env.PEPPER_KEY),
		};

		// Enregistrer le professeur dans la base de données
		const createdProfessor  = await Professor.create(professor)
		
		// Génère le token de connexion
		const token = jwt.sign( {id: createdProfessor['dataValues']['id']}, process.env.SECRET_KEY, { expiresIn: '1h' });
		return res.status(201).json({
			token: token,
		});
	} catch(err) {
		next(err)
	}
}

// Gère la connexion d'un professeur
exports.login = async (req, res, next) => {

	try{
		// Vérification des informations fournis
		const loginSchema = Joi.object({
			mail: Joi.string().email().required(),
			password: Joi.string().required(),
		});	
		
		const {error} = loginSchema.validate(req.body);
		
		if (error) {
			const validationError = new Error(error.details[0].message);
			validationError.statusCode = 400;  
			throw validationError;
		}

		// Essaye de récuperer le professeur dans la DB à partir du mail
		const existingProfessor = await Professor.findOne({ where: { mail: req.body.mail } });

		// Si ce prof existe
		if(existingProfessor){

			// On récupère le mdp et le sel du prof
			const password = existingProfessor['dataValues']['password']


			// On vérifie qu'il s'agissent du bon mdp
			if(await argon2.verify(password, req.body.password + process.env.PEPPER_KEY)) {
				// On récupère l'id du prof pour le token
				const token = jwt.sign({ id: existingProfessor['dataValues']['id'] }, process.env.SECRET_KEY, { expiresIn: '1h' });
				return res.status(201).json({
					token: token,
				});
			}
			const error = new Error("Mauvais mdp.");
			error.statusCode = 400;  
			throw error;
		} else {
			// Si le prof n'existe pas on renvoie une erreur
			const error = new Error("Aucun compte ne correspond au mail indiqué.");
			error.statusCode = 400;  
			throw error;
		}


	} catch(err) {
		next(err)
	}
}

