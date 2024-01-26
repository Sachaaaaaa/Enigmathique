"use strict";

const db = require("../models/db.js");
const Course = db.course;
const Student = db.student;
const Op = db.Sequelize.Op;
const Joi = require('joi');
const { baseSchema } = require('./validationSchemas');

/////////////////////////////////////////////////////////////////////////////////
// 									 FONCTIONS                                 //
/////////////////////////////////////////////////////////////////////////////////

// Fonction vérifiant si une classe, à partir de son id, appartiant au professeur
async function isClassBelongsProfessor(idCourse, req) {

	// Récupère la classe en question
	const course = await Course.findOne({ where: { id: idCourse} });

	// Vérifie que l'élève existe bien
	if(!course){
		const error = new Error("La classe n'existe pas.");
		error.statusCode = 404;  
		throw error;
	}
		
	// Récupère toutes les classes du professeur courant
	const courses = await Course.findAll({ where: { idProfessor: req.tokenId } });

	// Récupère les id correspondant aux classes du professeur courant
	const ids = courses.map(item => item.id);

	// Vérifie que la classe appartient bien au professeur
	if(!ids.includes(parseInt(idCourse))){
		const error = new Error("La classe n'appartient pas au professeur.");
		error.statusCode = 403;  
		throw error;
	}

}

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
// 									 CREATE                                    //
/////////////////////////////////////////////////////////////////////////////////

// Créer et enregistrer une nouvelle classe au professeurs
exports.create = async (req, res, next) => {

	try{
			// Vérification des informations fournis
			const courseSchema = baseSchema.keys({
				name: Joi.string().max(150).required(),
			});
			
			// Vérifie si le schéma correspond bien aux données fournis, renvoie une erreur sinon
			isRequestCorrect(courseSchema, req)

			// Créer une classe
			const course = {
				name: req.body.name,
				idProfessor: req.tokenId,
			};

			// Enregistrer la classe dans la base de données
			const response = await Course.create(course)

			// Renvoie les données créées
			return res.status(201).json(response);
		
	// Gère les erreurs
	} catch(err) {
		next(err)
	}
}


/////////////////////////////////////////////////////////////////////////////////
// 									 READ                                      //
/////////////////////////////////////////////////////////////////////////////////

// Récupère les classes d'un professeur
exports.findAll = async (req, res, next) => {
	try{
		// Récupère toutes les classes du professeur connecté
		const courses = await Course.findAll({ where: { idProfessor: req.tokenId } })

		// Renvoie les données récupérées
		return res.status(200).json(courses);

	// Gère les erreurs
	} catch(err) {
		next(err)
	}	
}

// Récupère une classe à partir de son id
exports.findOne = async (req, res, next) => {

	try {

		// Vérifie que la classe appartient bien au professeur
		await isClassBelongsProfessor(req.params.id, req)

		// Récupèrer la classe
		const course = await Course.findOne({ where: { id: req.params.id, idProfessor: req.tokenId } })
		
		// Renvoie les données récupérées
		return res.status(200).json(course);

	} catch(err) {
		next(err);
	}	
}


// Récupère les élèves d'une classe
exports.findStudents = async (req, res, next) => {

	try{

		// Vérifie que la classe appartient bien au professeur
		await isClassBelongsProfessor(req.params.id, req)
		
		// Récupèrer les élèves de la classe
		const students = await Student.findAll({ where: { idCourse: req.params.id} })

		// Renvoie les données récupérées
		return res.status(200).json(students);
	
	// Gère les erreurs
	}catch(err) {
		next(err)
	};	
}

/////////////////////////////////////////////////////////////////////////////////
// 									 UPDATE                                    //
/////////////////////////////////////////////////////////////////////////////////

// methode pour mettre à jour une classe du professeur
exports.update = async(req, res, next) => {
	
	try{

		// Vérification des informations fournis
		const courseSchema = baseSchema.keys({
			name: Joi.string().max(150).required(),
		});
		
		// Vérifie si le schéma correspond bien aux données fournis, renvoie une erreur sinon
		isRequestCorrect(courseSchema, req)

		// Vérifie que la classe appartient bien au professeur
		await isClassBelongsProfessor(req.params.id, req)

		// Effectue la requête de mise à jour
		const updatedRows = await Course.update({name: req.body.name}, {where: { id: req.params.id} })

		// Vérifie que la colonne à effectivement été mise à jour
		if (updatedRows == 0) {
			const error = new Error("Impossible de mettre à jour la classe.");
			error.statusCode = 404;  
			throw error;
		}

		return res.status(201).json({
			message: "La classe à été mise a jour avec succès"
		});

	// Gère les erreurs
	}catch(err) {
		next(err)
	}
  }

  

	  
/////////////////////////////////////////////////////////////////////////////////
// 									 DELETE                                    //
/////////////////////////////////////////////////////////////////////////////////


// To do : probleme de dependence avec student
// methode pour supprimer une classe en fonction de son id
exports.delete = async (req, res, next) => {

	try{
		// Vérifie que la classe appartient bien au professeur
		await isClassBelongsProfessor(req.params.id, req)

		// Effectue la requête de delete
		const deletedRows = await Course.destroy({ where: { id: req.params.id, idProfessor: req.tokenId} })
			
		// Vérifie si la classe a bien été supprimé
		if (deletedRows == 0) {
			const error = new Error("Impossible de mettre à jour la classe.");
			error.statusCode = 404;  
			throw error;
		} 

		return res.status(201).json({
			message: "La classe a été supprimée avec succès"
		});

	// Gère les erreurs
	}catch(err) {
		console.log(err)
		next(err)
	}
}




