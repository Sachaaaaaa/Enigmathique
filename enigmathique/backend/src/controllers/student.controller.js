/**
 * Définition des opérations CRUD pour les élèves
*/


const db = require("../models/db.js");
const Student = db.student;
const Course = db.course;
const Op = db.Sequelize.Op;
const Joi = require('joi');

/////////////////////////////////////////////////////////////////////////////////
// 									 FONCTIONS                                 //
/////////////////////////////////////////////////////////////////////////////////

// Fonction vérifiant si une classe, à partir de son id, appartiant au professeur
async function isClassBelongsProfessor(idCourse, req) {

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

// Fonction vérifiant si une classe, à partir de son id, appartiant au professeur
async function isStudentBelongsProfessor (idStudent, req) {

	// Récupère toutes les classes du professeur courant
	const student = await Student.findOne({ where: { id: idStudent} });

	// Vérifie que l'élève existe bien
	if(!student){
		const error = new Error("L'élève n'existe pas.");
		error.statusCode = 404;  
		throw error;
	}

	try{
		// Vérifie que la classe appartient bien au professeur
		await isClassBelongsProfessor(student.idCourse, req);
	} catch(err) {
		const error = new Error("L'élève n'appartient pas au professeur.");
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

// Créer et enregistrer un nouvel élève
exports.create = async(req, res, next) => {


	try{

		// Vérification des informations fournis
		const studentSchema = Joi.object({
			lastname: Joi.string().required(),
			firstname: Joi.string().required(),
			idCourse: Joi.number().integer().required(),
		});

		// Vérifie si le schéma correspond bien aux données fournis, renvoie une erreur sinon
		isRequestCorrect(studentSchema, req)

		// Vérifie que la classe appartient bien au professeur
		await isClassBelongsProfessor(req.body.idCourse, req)

		// Créer un élève
		const student = {
			lastname: req.body.lastname,
			firstname: req.body.firstname,
			idCourse: req.body.idCourse,
		};


		// Enregistrer l'élève dans la base de données
		const createdStudent = await Student.create(student)

		return res.status(201).json(createdStudent);

	// Gère les erreurs
	}catch(err ) {
		next(err)
	}
}

/////////////////////////////////////////////////////////////////////////////////
// 									 READ                                      //
/////////////////////////////////////////////////////////////////////////////////

// Récupérer un élève par son id
exports.findById = async (req, res, next) => {
	try {

		// Vérifie que l'élève appartient bien au professeur et qu'il existe bien
		await isStudentBelongsProfessor(req.params.id, req);
	
		// Continuer avec la récupération des étudiants
		const dataStudent = await Student.findOne({ where: { id: req.params.id } });

		// Envoyer les données de l'élèves
		return res.status(200).json(dataStudent);
		
	// Gérer les erreurs
	} catch (err) {
		next(err)
	}
  };
  

/////////////////////////////////////////////////////////////////////////////////
// 									 UPDATE                                    //
/////////////////////////////////////////////////////////////////////////////////

// methode pour mettre à jour un professeur en fonction de son id
exports.update = async(req, res, next) => {
	
	try{

		// Vérifie que l'élève appartient bien au professeur
		await isStudentBelongsProfessor(req.params.id, req);

		// Vérification des informations fournis
		const studentSchema = Joi.object({
			lastname: Joi.string(),
			firstname: Joi.string(),
			idCourse: Joi.number(),
		});

		// Vérifie si le schéma correspond bien aux données fournis, renvoie une erreur sinon
		isRequestCorrect(studentSchema, req)

		// Stock les changements apportés à l'élève
		const updateData = {};

		// Si le professeur souhaite changer le prénom de l'élève
		if (req.body.firstname) {
			updateData.firstname = req.body.firstname;
		}

		// Si le professeur souhaite changer le nom de l'élève
		if (req.body.lastname) {
			updateData.lastname = req.body.lastname;
		}

		// Si le professeur souhaite changer la classe de l'élève
		if (req.body.idCourse) {

			// Vérifie que la classe appartient bien au professeur
			await isClassBelongsProfessor(req.body.idCourse, req)

			updateData.idCourse = req.body.idCourse;
		}

		// Effectue la requête de mise à jour
		const updatedRows = await Student.update(updateData, {where: { id: req.params.id} })

		// Vérifie que la colonne à effectivement été mise à jour
		if (updatedRows == 0) {
			const error = new Error("Impossible de mettre à jour la l'élève");
			error.statusCode = 404;  
			throw error;
		}

		return res.status(201).json({
			message: "L'élève à été mise a jour avec succès"
		});


	  // Gère les erreurs
	} catch(err) {
		next(err)
	}
  };
  
/////////////////////////////////////////////////////////////////////////////////
// 									 DELETE                                    //
/////////////////////////////////////////////////////////////////////////////////

// Supprimer un étudiant à partir de son id
exports.delete = async (req, res, next) => {

	try{

		// Vérifie que l'élève appartient bien au professeur
		await isStudentBelongsProfessor(req.params.id, req);

		// Si l'élève appartient bien a une classe du professeur, on le supprime
		const deletedRows = await Student.destroy({ where: { id: req.params.id} })

		// Vérifie si le professeur a bien été supprimé
		if (deletedRows == 0) {
			const error = new Error("Impossible de supprimer l'élève");
			error.statusCode = 404;  
			throw error;
		} 
		
		return res.status(201).json({
			message: "L'élève a été supprimée avec succès"
		});


	// Gérer les erreurs
	} catch (err) {
		next(err)
	}
}
