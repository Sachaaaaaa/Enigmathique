/**
 * Définition des opérations CRUD pour les élèves
*/

// to do : creation score a la fermeture de la partie

const db = require("../models/db.js");
const Joi = require('joi');
const { baseSchema } = require('./validationSchemas');
const Team = db.team;
const PlayIn = db.playIn;
const Course = db.course;
const Game = db.game;
const Score = db.score;
const Student = db.student;
const Op = db.Sequelize.Op;
const GameRooms = db.gameRooms;

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

// Fonction vérifiant si une partie, à partir de son id, appartiant au professeur
async function isGameBelongsProfessor (idGame, req) {

	// Récupère toutes les classes du professeur courant
	const game = await Game.findOne({ where: { id: idGame} });

	// Vérifie que l'élève existe bien
	if(!game){
		const error = new Error("La partie n'existe pas.");
		error.statusCode = 404;  
		throw error;
	}

	try{
		// Vérifie que la classe appartient bien au professeur
		await isClassBelongsProfessor(game.idCourse, req);
	} catch(err) {
		const error = new Error("L'élève n'appartient pas au professeur.");
		error.statusCode = 403;  
		throw error;
	}

}

// Fonction vérifiant si une team, à partir de son id, appartiant au professeur
async function isTeamBelongsProfessor (idTeam, req) {

	// Récupère toutes les teams du professeur courant
	const team = await Team.findOne({ where: { id: idTeam} });

	// Vérifie que l'élève existe bien
	if(!team){
		const error = new Error("L'équipe n'existe pas.");
		error.statusCode = 404;  
		throw error;
	}

	try{
		// Vérifie que la classe appartient bien au professeur
		await isGameBelongsProfessor(team.idGame, req);
	} catch(err) {
		const error = new Error("L'équipe n'appartient pas au professeur.");
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
// 									CREATE                                     //
/////////////////////////////////////////////////////////////////////////////////


// Ajoute les scores d'une équipe pour différentes salles
exports.addScores = async(req, res, next) => {
	try {
		// Array contenant tout les n-uplets ajoutés
		const result = []

		// Vérification des informations fournis
		const scoreSchema = baseSchema.keys({
			idGame: Joi.number().integer().required(),
			scores: Joi.array()
				.items(
					Joi.object({
					idTeam: Joi.number().integer().required(),
						rooms: Joi.array()
							.items(
								Joi.object({
									roomName: Joi.string().max(150).required(),
									nbGoodAnswers: Joi.number().integer().max(150).required(),
									nbBadAnswers: Joi.number().integer().max(150).required(),
									nbHints: Joi.number().integer().max(150).required(),
									isSolved: Joi.boolean().required(),
									time: Joi.number().max(999999).required(),
									startTime: Joi.number().max(999999).integer(),
									endTime: Joi.number().max(999999).integer(),
								})
							)
							.required(),
					})
				)
				.required(),
		});

		// Vérifie si le schéma correspond bien aux données fournis, renvoie une erreur sinon
		isRequestCorrect(scoreSchema, req);

		const scores = req.body.scores
		const idGame = req.body.idGame

		// Itère sur chaque équipe
		for (let i = 0; i < scores.length; i++) {
			const teamData = scores[i];

			// Récupère les infos de l'équipe
			const idTeam = teamData.idTeam;
			const teamRooms = teamData.rooms;

			// Itère sur chaque salle de l'équipe
			for (let j = 0; j < teamRooms.length; j++) {
				const roomData = teamRooms[j];
				// Récupère les infos de la salle
				const roomName = roomData.roomName;
				const time = parseInt(roomData.time);
				const nbGoodAnswers = roomData.nbGoodAnswers;
				const nbBadAnswers = roomData.nbBadAnswers;
				const nbHints = roomData.nbHints;
				const isSolved = roomData.isSolved;

				const scoresData = {
					idTeam: idTeam,
					roomName: roomName,
					idGame: idGame,
					time: time,
					nbGoodAnswers: nbGoodAnswers,
					nbBadAnswers: nbBadAnswers,
					nbHints: nbHints,
					isSolved: isSolved 
				}

				// Ajoute le n-uplet à la base de données
				result.push(await Score.create(scoresData))
			}
		}
		res.status(201).json(result);
	} catch(err) {
		console.log(err)
		next(err)
	}

}




/////////////////////////////////////////////////////////////////////////////////
// 									 READ                                      //
/////////////////////////////////////////////////////////////////////////////////

// Récupère une équipe à partir de son id
exports.findOne = async (req, res, next) => {
	try{
	
		// Vérifie que l'équipe appartienne bien au professeur
		await isTeamBelongsProfessor(req.params.id, req)

		// Récupère l'équipe
		const team = await Team.findOne({ where: { id: req.params.id } })

		// Renvoie les données récupérées
		return res.status(200).json(team);

	// Gère les erreurs
	} catch(err) {
		next(err)
	}	
}

// Récupérer toutes les équipes d'une partie
exports.findByGame = async (req, res, next) => {
	try{
	
		// Vérifie que la partie appartienne bien au professeur
		await isGameBelongsProfessor(req.params.id, req)

		// Récupère toutes les équipe de la partie
		const team = await Team.findAll({ where: { idGame: req.params.id } })

		// Renvoie les données récupérées
		return res.status(200).json(team);

	// Gère les erreurs
	} catch(err) {
		next(err)
	}	
}

// Retourne les élèves d'une team
exports.findStudents = async(req, res, next) => {
	
	try {

		// Vérifie que l'équipe appartienne bien au professeur
		await isTeamBelongsProfessor(req.params.id, req)

		// Récupère l'id des élèves
		const students = await PlayIn.findAll({ where: { idTeam: req.params.id } })

		// Pour chaque id d'élève, récupère les infos associées
		var findedStudents = []
		for (let i = 0; i < students.length; i++) {
			findedStudents.push(await Student.findOne({ where: { id: students[i].idStudent } }))
		}

		return res.status(200).json(findedStudents);
	
		// Gère les erreurs
	}catch(err) {
		next(err)
	}	
}

// Récupère le score d'une équipe
exports.getScore = async(req, res, next) => {
	try{
		
		// Vérifie que l'équipe appartienne bien au professeur
		await isTeamBelongsProfessor(req.params.id, req)

		// Récupère le score de l'équipe
		const scores = await Score.findAll({ where: { idTeam: req.params.id } })
		
		return res.status(200).json(scores);

		// Gère les erreurs
	}catch(err) {
		next(err)
	}
}


/////////////////////////////////////////////////////////////////////////////////
// 									 UPDATE                                    //
/////////////////////////////////////////////////////////////////////////////////

// Ajouter des élèves à une équipe
exports.addStudents = async (req, res, next) => {


	try{

		// Vérification des informations fournis
		const teamSchema = baseSchema.keys({
			teams: Joi.array().items(
				Joi.object({
				  name: Joi.string().max(150).required(),
				  idStudents: Joi.array().items(Joi.number().integer()).required(),
					idSocket: Joi.string().required()
				})).required(),
			idGame: Joi.number().integer().required(),
		});

		// Vérifie si le schéma correspond bien aux données fournis, renvoie une erreur sinon
		isRequestCorrect(teamSchema, req)

		// Stock les données utiles
		const teams = req.body.teams;
		const idGame = req.body.idGame

		// Les équipes ajoutées
		const addedTeams = [];

		// Itère sur chaque équipe
		for (let i = 0; i < teams.length; i++) {

			// Ajoute la team dans la DB
			const createdTeam = await Team.create({ name: teams[i].name, idGame: idGame });

			// Map les élèves de la team correspondante avec l'id de la team créer precedement
			const studentsData = teams[i].idStudents.map(studentId => ({ idTeam: createdTeam.id, idStudent: studentId }));

			// Ajoute les élèves dans la DB
			await PlayIn.bulkCreate(studentsData);

			// Ajoute à createdTeam l'attribut idSocket qui est l'id de la socket de l'équipe (pour pouvoir l'identifier dans game)
			const teamData = createdTeam.dataValues;
			teamData.idSocket = teams[i].idSocket;

			// Ajoute l'équipe à la liste des équipes ajoutées
			addedTeams.push(teamData);
		}

		// Retourne les teams ajoutées
		return res.status(201).json(addedTeams);

		// Gère les erreurs
	} catch(err){
		next(err)
	}

}

/////////////////////////////////////////////////////////////////////////////////
// 									 DELETE                                    //
/////////////////////////////////////////////////////////////////////////////////


// supprime une team en fonction de son id
exports.delete = async (req, res, next) => {
	try{
		// Vérifie que l'équipe appartienne bien au professeur
		await isTeamBelongsProfessor(req.params.id, req)
	
		// Effectue la requête de delete
		const deletedRows = await Team.destroy({ where: { id: req.params.id} })

		// Vérifie si la classe a bien été supprimé
		if (deletedRows == 0) {
			const error = new Error("Impossible de supprimer l'équipe");
			error.statusCode = 404;  
			throw error;
		} 

		return res.status(201).json({
			message: "L'équipe a été supprimée avec succès"
		})

		// Gère les erreurs
		}catch(err) {
			next(err)
		}
}


// Supprime un élève d'une équipe
exports.removeStudent = async (req, res, next) => {

try{
	// Vérification des informations fournis
	const teamSchema = baseSchema.keys({
		idTeam: Joi.number().integer().required(),
	});

	// Vérifie si le schéma correspond bien aux données fournis, renvoie une erreur sinon
	isRequestCorrect(teamSchema, req)

	// Vérifie que l'équipe appartienne bien au professeur
	await isTeamBelongsProfessor(req.body.idTeam, req)

	// Vérifie que l'élève appartienne bien au professeur
	await isStudentBelongsProfessor(req.params.id, req)

	// Effectue la requête de delete
	const deletedRows = await PlayIn.destroy({ where: { idStudent: req.params.id, idTeam:req.body.idTeam } })

	// Vérifie si la classe a bien été supprimé
	if (deletedRows == 0) {
		const error = new Error("Impossible de supprimer l'élève");
		error.statusCode = 404;  
		throw error;
	} 

	return res.status(201).json({
		message: "L'élève a été supprimée avec succès"
	});

	// Gère les erreurs
	}catch(err) {
		next(err)
	}
}