/**
 * Définition des opérations CRUD pour les élèves
*/

// to do : creation score a la fermeture de la partie

const db = require("../models/db.js");
const Joi = require('joi');
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
		validationError.statusCode = 500;  
		throw validationError;
	}
}


/////////////////////////////////////////////////////////////////////////////////
// 									 READ                                      //
/////////////////////////////////////////////////////////////////////////////////

// Récupère les équipes d'une partie
exports.findAll = async (req, res, next) => {
	try{
	
		// Vérifie que l'équipe appartienne bien au professeur
		await isTeamBelongsProfessor(req.params.id, req)

		// Récupère toutes les équipe d'une partie
		const teams = await Team.findAll({ where: { idGame: req.params.id } })

		// Renvoie les données récupéréesf
		return res.status(200).json(teams);

	// Gère les erreurs
	} catch(err) {
		next(err)
	}	
		  
	

}
// Retourne les élèves d'une team
exports.findOne = async(req, res, next) => {
	
	try {

		// Vérifie que l'équipe appartienne bien au professeur
		await isTeamBelongsProfessor(req.params.id, req)

		const students = await PlayIn.findAll({ where: { idTeam: req.params.id } })

		var studentArray= []
		for(i=0;i<students.length; i++){
			studentArray.push(await Student.findAll({ where: { id: students[i].idStudent } }))
		}

		return res.status(200).json(studentArray);
	
	}catch(err) {
		next(err)
	}	
}

exports.getScore = async(req, res, next) => {
	try{
		
		// Vérifie que l'équipe appartienne bien au professeur
		await isTeamBelongsProfessor(req.params.id, req)

		const scores = await Score.findAll({ where: { idTeam: req.params.id } })
		return res.status(200).json(scores);

	}catch(err) {
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


// TODO : inverser param et body ?
// Supprime un élève d'une équipe
exports.removeStudent = async (req, res, next) => {

try{
	// Vérification des informations fournis
	const teamSchema = Joi.object({
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



/////////////////////////////////////////////////////////////////////////////////
// 									 OTHER                                    //
/////////////////////////////////////////////////////////////////////////////////

// [{"roomName":"test","time":10,"nbGoodAnswers":1,"nbBadAnswers":0"}]
// Ajoute les scores d'une équipe pour différentes salles
exports.addScores = async(req, res, next) => {
	
	// Array contenant tout les n-uplets ajoutés
	let result = []

	try{

		// Vérification des informations fournis
		const scoreSchema = Joi.object({
			rooms: Joi.array().items(
				Joi.object({
					roomName: Joi.string().required(),
					time: Joi.number().integer().required(),
					nbGoodAnswers: Joi.number().integer().required(),
					nbBadAnswers: Joi.number().integer().required(),
					nbHints: Joi.number().integer().required(),
					isSolved: Joi.boolean().required()
				})).required(),
			idTeam: Joi.number().integer().required(),
			idGame: Joi.number().integer().required(),
		});

		// Vérifie si le schéma correspond bien aux données fournis, renvoie une erreur sinon
		isRequestCorrect(scoreSchema, req)

		// Les salles dont on veut ajouter les scores
		const rooms = req.body.rooms


		// Pour chaque salle, on ajoute le score
		for (let i = 0; i < rooms.length; i++) {

			const scoreData = {
				idTeam: req.body.idTeam,
				roomName: rooms[i].roomName,
				idGame: req.body.idGame,
				time: rooms[i].time,
				nbGoodAnswers: rooms[i].nbGoodAnswers,
				nbBadAnswers: rooms[i].nbBadAnswers,
				nbHints: rooms[i].nbHints
			}
			result.push(await Score.create(scoreData))
		}

		res.status(201).json(result);

	} catch(err) {
		next(err)
	}
		
}




// Ajouter des élèves à une équipe
// Ex contenu de req.body : 
/*
{
  teams: [ { name: 'Ekip de beauvais', idStudents: [Array] } ],
  gameId: 1
}
*/
exports.addStudents = async (req, res, next) => {	


	try{

		// Vérification des informations fournis
		const teamSchema = Joi.object({
			teams: Joi.array().items(
				Joi.object({
				  name: Joi.string().required(),
				  idStudents: Joi.array().items(Joi.number().integer()).required() // Remplacez Joi.any() par le type réel attendu pour les ID d'étudiants
				})).required(),
			idGame: Joi.number().integer().required(),
		});

		// Vérifie si le schéma correspond bien aux données fournis, renvoie une erreur sinon
		isRequestCorrect(teamSchema, req)

		// Récupère les équipes dans un format adapté
		const teams = req.body.teams;
		const idGame = req.body.idGame

		// Les équipes à ajouter
		const addedTeams = [];

		// Itère sur chaque équipe
		for (let i = 0; i < teams.length; i++) {
			
			// Ajoute toutes les équipes du tableau teamsName
			const createdTeam = await Team.create({ name: teams[i].name, idGame: idGame });
			
			const studentsData = teams[i].idStudents.map(studentId => ({ idTeam: createdTeam.id, idStudent: studentId }));
			
			// Ajoute les élèves à la table PlayIn
			await PlayIn.bulkCreate(studentsData);
			
			// Ajoute à createdTeam l'attribut idSocket qui est l'id de la socket de l'équipe (pour pouvoir l'identifier dans game)
			const teamData = createdTeam.dataValues;
			teamData.idSocket = teams[i].idSocket;
			// Ajoute l'équipe à la liste des équipes ajoutées
			addedTeams.push(teamData);	
		}

		return res.status(201).json(addedTeams);
		
	} catch(err){
		next(err)
	}

}

/////////////////////////////////////////////////////////////////////////////////
// 									 READ                                      //
/////////////////////////////////////////////////////////////////////////////////

// Récupère les équipes d'une partie
exports.findAll = async (req, res, next) => {
	try{
	
		// Récupère toutes les équipe d'une partie
		const teams = await Team.findAll({ where: { idGame: req.params.id } })

		// Renvoie les données récupéréesf
		return res.status(200).json(teams);

	// Gère les erreurs
	} catch(err) {
		next(err)
	}	
		  
	

}


exports.findOne = async(req, res) => {

	
	// Vérifie que la partie appartient bien au professeur
	const isBelongsToProfessor = await isTeamBelongsProfessor(req.params.id, req);
	if (!isBelongsToProfessor) {
		return res.status(403).json({
			message: "Vous n'avez pas accès à cette partie."
		});
	}

	try {
		const students = await PlayIn.findAll({ where: { idTeam: req.params.id } })
		var studentArray= []
		for(i=0;i<students.length; i++){
			studentArray.push(await Student.findAll({ where: { id: students[i].idStudent } }))
		}
		res.status(200).json(studentArray);
	
	}catch(err) {
		res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de la récupération des classes."
		});
	}	
}

exports.getScore = async(req, res) => {

	
	try{
			
		const scores = await Score.findAll({ where: { idTeam: req.params.id } })
		res.status(200).json(scores);
		
	}catch(err) {
		res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de la récupération des classes."
		});
	}
}


/////////////////////////////////////////////////////////////////////////////////
// 									 UPDATE                                    //
/////////////////////////////////////////////////////////////////////////////////

// todo : vérifications i.e verif score pas négatif etc.. + si la team appartient bien a la game + si il y a bien des paramètres dans le body
// methode pour mettre à jour un professeur en fonction de son id
exports.updateScore = async(req, res) => {

	
	// Stock les changements apportés à l'élève
    const updateData = {};

	// Si le professeur souhaite changer le prénom de l'élève
    if (req.body.nbGoodAnswers) {
    	updateData.firstname = req.body.nbGoodAnswers;
    }

	// Si le professeur souhaite changer le nom de l'élève
    if (req.body.nbBadAnswers) {
    	updateData.nbBadAnswers = req.body.nbBadAnswers;
    }

    if (req.body.nbHints) {
    	updateData.nbHints = req.body.nbHints;
    }

	if (req.body.time) {
    	updateData.time = req.body.time;
    }

	try{
		
		// Effectue la requête de mise à jour
		const updatedRows = await Score.update(updateData, {where: { idTeam: req.params.id} })
		
		// Vérifie que la colonne à effectivement été mise à jour
		if (updatedRows == 1) {
			return res.status(201).json({
				message: "La classe à été mise a jour avec succès"
				});

			// Si aucunes colonnes traités on relève une erreur
		} else {
			return res.status(404).json({
				message: "Impossible de mettre à jour la classe"
			});
		}

	  // Gère les erreurs
	}catch(err) {
		return res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de la récupération des classes."
		});
	}
  };


/////////////////////////////////////////////////////////////////////////////////
// 									 DELETE                                    //
/////////////////////////////////////////////////////////////////////////////////


// To do : verif si la classe appartient bien au prof
// supprime une team en fonction de son id
exports.delete = async (req, res) => {


	try{
	
		// Effectue la requête de delete
		const destoyedRows = await Team.destroy({ where: { id: req.params.id} })

			// Vérifie si la classe a bien été supprimé
			if (destoyedRows == 1) {
				return res.status(201).json({
					message: "L'équipe a été supprimée avec succès"
			});

			// Si aucunes colonnes traités on relève une erreur
			} else {
				return res.status(404).json({
					message: "Aucune équipe n'a été supprimée"
			});
			}

			// Gère les erreurs
			}catch(err) {
				return res.status(500).json({
					message: err.message || "Une erreur est intervenue durant la suppression de l'équipe."
				});
			}
}

// Supprime un élève d'une équipe
exports.removeStudent = async (req, res) => {

	if (!req.body.idTeam) {
		res.status(400).json({
			message: "Il manque des informations pour supprimer un élève d'une équipe."
		});
		return;
	}

	try{
	// Effectue la requête de delete
	const destroyedRows = await PlayIn.destroy({ where: { idStudent: req.params.id, idTeam:req.body.idTeam } })

	// Vérifie si l'élève a bien été supprimé
	if (destroyedRows == 1) {
		return res.status(201).json({
			message: "L'élève a été supprimée avec succès"
		});

	// Si aucunes colonnes traités on relève une erreur
	} else {
		return res.status(404).json({
			message: "Aucuns élève n'a été supprimée"
		});
	}

		// Gère les erreurs
	}catch(err) {
		return res.status(500).json({
			message: err.message || "Une erreur est intervenue durant la suppression de l'élève."
		});
	}
}



/////////////////////////////////////////////////////////////////////////////////
// 									 OTHER                                    //
/////////////////////////////////////////////////////////////////////////////////



//const t = {"idTeam": 1,"rooms": [{"roomName": "Laboratory", "idGame": 1,"nbSolved": 2,"nbBadAnswers": 667, "nbGoodAnswers": 1,"nbHints": 1,"isSolved": true,"time": 125}]}


// [[{"idTeam": 2}, {"roomName": "test"}, {"idGame": 1}, {"time": 1}, {"nbGoodAnswers": 1}, {"nbBadAnswers": 2}, {"nbHints": 3}], [{"idTeam": 2}, {"roomName": "test"}, {"idGame": 1}, {"time": 1}, {"nbGoodAnswers": 1}, {"nbBadAnswers": 2}, {"nbHints": 3}]]
// Accepte une équipe à une partie
exports.addScores = async(req, res, next) => {
	
	let result = []

	try{

		if (!req.body.scores) {
			const error = new Error("Il manque des informations pour ajouter des scores.");
			error.statusCode = 400;  
			throw error;
		}

		// exemple de valeur pour req.body.scores [{"idTeam": 2, "roomName": "test", "idGame": 1, "time": 1, "nbGoodAnswers": 1, "nbBadAnswers": 2, "nbHints": 3}, {"idTeam": 3, "roomName": "test", "idGame": 1, "time": 1, "nbGoodAnswers": 1, "nbBadAnswers": 2, "nbHints": 3}]
		const scores = JSON.parse(req.body.scores)


		for (let i = 0; i < scores.rooms.length; i++) {
			if (!scores.rooms[i].roomName || !scores.rooms[i].time ||!scores.rooms[i].nbGoodAnswers ||!scores.rooms[i].nbBadAnswers  ||!scores.rooms[i].nbHints ) {
				const error = new Error("Il manque des informations pour ajouter des scores.");
				error.statusCode = 400;  
				throw error;
			}



			

			const scoresData = {
				idTeam: scores.idTeam,
				roomName: scores.rooms[i].roomName,
				idGame: scores.idGame,
				time: scores.rooms[i].time,
				nbGoodAnswers: scores.rooms[i].nbGoodAnswers,
				nbBadAnswers: scores.rooms[i].nbBadAnswers,
				nbHints: scores.rooms[i].nbHints
			}

			console.log(scoresData)

			result.push(await Score.create(scoresData))

		}

		res.status(201).json(result);

	} catch(err) {
		next(err)
	}
	


	
}