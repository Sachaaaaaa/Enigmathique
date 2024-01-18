"use strict";

/**
 * Définition des opérations CRUD pour les classes
*/

const db = require("../models/db.js");
const Course = db.course;
const Student = db.student;
const Op = db.Sequelize.Op;

/////////////////////////////////////////////////////////////////////////////////
// 									 FONCTIONS                                 //
/////////////////////////////////////////////////////////////////////////////////

// Fonction vérifiant si une classe, à partir de son id, appartiant au professeur
async function isClassBelongsProfessor(idCourse, req) {
	try {

		// Récupère toutes les classes du professeur courant
		const courses = await Course.findAll({ where: { idProfessor: req.tokenId } });

		// Récupère les id correspondant aux classes du professeur courant
		const ids = courses.map(item => item.id);
		idCourse = parseInt(idCourse)

		// Vérifie que la classe appartient bien au professeur
		return ids.includes(idCourse);

	} catch (err) {
		// Gère les erreurs
		throw new Error(err.message || "Une erreur s'est produite lors de la récupération des classes.");
	}
}
  
/////////////////////////////////////////////////////////////////////////////////
// 									 CREATE                                    //
/////////////////////////////////////////////////////////////////////////////////

// Créer et enregistrer une nouvelle classe au professeurs
exports.create = async (req, res, next) => {

	try{

		// Valider la requête
		if (!req.body.name) {
			const error = new Error("Il manque des informations pour créer une classe.");
			error.statusCode = 400;  
			throw error;
		}

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

// methode pour récuperer les classes du professeur
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


exports.findOne = async (req, res, next) => {

	try {

		// Vérifie que la classe appartient bien au professeur
		if(! await isClassBelongsProfessor(req.params.id, req)){
			const error = new Error("La classe n'appartient pas au professeur.");
			error.statusCode = 403;  
			throw error;
		}


		// Récupèrer la classe
		const course = await Course.findOne({ where: { id: req.params.id, idProfessor: req.tokenId } })
		
		// Renvoie les données récupérées
		return res.status(200).json(course);

	} catch(err) {
		next(err);
	}	
}


// methode pour récuperer les élèves d'une classe du professeur par son id
exports.findStudents = async (req, res, next) => {

	try{

		// Vérifie que la classe appartient bien au professeur
		if(! await isClassBelongsProfessor(req.params.id, req)){
			const error = new Error("La classe n'appartient pas au professeur.");
			error.statusCode = 403;  
			throw error;
		}

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

// todo: verif qu'il y a au moins un truc à modifier 
// methode pour mettre à jour une classe du professeur
exports.update = async(req, res, next) => {
	
	try{

		// Valider la requête
		if (!req.body.name) {
			const error = new Error("Il manque des informations pour mettre à jour la classe.");
			error.statusCode = 400;  
			throw error;
		}

		// Vérifie que la classe appartient bien au professeur
		if(! await isClassBelongsProfessor(req.params.id, req)){
			const error = new Error("La classe n'appartient pas au professeur.");
			error.statusCode = 403;  
			throw error;
		}

		// Effectue la requête de mise à jour
		const updatedRows = await Course.update({name: req.body.name}, {where: { id: req.params.id} })

			// Vérifie que la colonne à effectivement été mise à jour
		if (updatedRows == 1) {
			return res.status(201).json({
				message: "La classe à été mise a jour avec succès"
			});

		// Si aucunes colonnes traités on relève une erreur
		} else {
			const error = new Error("Impossible de mettre à jour la classe.");
			error.statusCode = 404;  
			throw error;
		}

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
		if(! await isClassBelongsProfessor(req.params.id, req)){
			const error = new Error("La classe n'appartient pas au professeur.");
			error.statusCode = 403;  
			throw error;
		}

		// Effectue la requête de delete
		const destroyedRows = await Course.destroy({ where: { id: req.params.id, idProfessor: req.tokenId} })
			
		// Vérifie si la classe a bien été supprimé
		if (destroyedRows == 1) {
			return res.status(201).json({
				message: "La classe a été supprimée avec succès"
			});

		// Si aucunes colonnes traités on relève une erreur
		} else {
			const error = new Error("Impossible de mettre à jour la classe.");
			error.statusCode = 404;  
			throw error;
		}

	// Gère les erreurs
	}catch(err) {
		next(err)
	}
}




