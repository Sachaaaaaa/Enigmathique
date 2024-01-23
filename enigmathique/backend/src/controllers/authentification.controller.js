
require('dotenv').config();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const sha256 = require('js-sha256');
const db = require("../models/db.js");
const TokenDB = db.token;
const Professor = db.professor;
const Joi = require('joi');
const { baseSchema } = require('./validationSchemas');
const Op = db.Sequelize.Op;


// Fonction générant un token JWT
async function generateToken(idProf, res) {
    try {

		// Générer un token contenant l'id du prof
        const token = jwt.sign({ id: idProf }, process.env.SECRET_KEY, { expiresIn: '1h' });
		
		// Génère le hash du token
		const tokenHash = sha256(token);
		
        // Enregistre dans la DB le hash du token
        await TokenDB.create( { token:tokenHash});

        // Renvoyer la réponse JSON une fois que tout est fait
        return res.status(201).json({ token: token });

		// gère les erreurs
    } catch (error) {
        next(err)
    }
}


// Créer et enregistrer un nouveau professeur
exports.register = async (req, res, next) => {

	try{
		// Vérification des informations fournis
		const registerSchema = baseSchema.keys({
			lastname: Joi.string().required(),
			firstname: Joi.string().required(),
			mail: Joi.string().email().required(),
			password: Joi.string().min(8).required(), 
		  });
		
		const { error } = registerSchema.validate(req.body);

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
			// Utilise argon2 pour hasher le mot de passe
			password: await argon2.hash(req.body.password + process.env.PEPPER_KEY),
		};

		// Enregistrer le professeur dans la base de données
		const createdProfessor  = await Professor.create(professor)
		
		// Génère le token de connexion contenant l'id du professeur
		await generateToken(createdProfessor['dataValues']['id'], res)

		// gère les erreurs
	} catch(err) {
		next(err)
	}
}


// Gère la déconnexion d'un professeur
exports.logout = async (req, res, next) => {

	try{
		// Récupère le token dans le headers
		const token = req.headers['authorization']

		// Récupère le hash du token
		const tokenHash = sha256(token);

		// Supprime le token de la DB, ce qui a pour effet de le révoquer
		await TokenDB.destroy({ where: { token: tokenHash} })

		return res.status(201).json("Deconnexion avec succès");

		// Gère les erreurs
	} catch(err) {
		next(err)
	}
}

// Gère la connexion d'un professeur
exports.login = async (req, res, next) => {

	try{
		// Vérification des informations fournis
		const loginSchema  = baseSchema.keys({
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
				
				// Génère le token de connexion
				await generateToken(existingProfessor['dataValues']['id'], res)

			} else {
				// On indique qu'il s'agit du mauvais mdp
				const error = new Error("Mauvais mdp.");
				error.statusCode = 400;  
				throw error;
			}
		} else {
			// Si le prof n'existe pas on renvoie une erreur
			const error = new Error("Aucun compte ne correspond au mail indiqué.");
			error.statusCode = 400;  
			throw error;
		}


	} catch(err) {
		console.log(err)
		next(err)
	}
}

