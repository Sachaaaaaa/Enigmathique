"use strict";

/**
 * Définition des opérations CRUD pour les classes
*/

const db = require("../models/db.js");
const Joi = require('joi');
const { baseSchema } = require('./validationSchemas');
const Game = db.game;
const Course = db.course;
const Team = db.team;
const Score = db.score;
const GameCode = db.gameCode;
const Student = db.student;
const GameRooms = db.gameRooms;
const Op = db.Sequelize.Op;


/////////////////////////////////////////////////////////////////////////////////
// 									 FONCTIONS                                 //
/////////////////////////////////////////////////////////////////////////////////

// Génère un string aléatoire de longueur length
function makeid(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
  
    return randomString;
  }

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



// Fonction vérifiant si une partie, à partir de son id, appartiant au professeur
async function isGameBelongsProfessor (idGame, req) {

	// Récupère toutes les parties du professeur courant
	const game = await Game.findOne({ where: { id: idGame} });

	// Vérifie que la partie existe bien
	if(!game){
		const error = new Error("La partie n'existe pas.");
		error.statusCode = 404;
		throw error;
	}

	try{
		// Vérifie que la classe de la partie appartient bien au professeur
		await isClassBelongsProfessor(game.idCourse, req);

		// Gère les erreurs
	} catch(err) {
		const error = new Error("L'élève n'appartient pas au professeur.");
		error.statusCode = 403;
		throw error;
	}

}



// Fonction vérifiant si la requête est conforme aux attentes
function isRequestCorrect(schema, req) {

	// Valide le schema avec le contenu de la requête
	const { error } = schema.validate(req.body);

	// Si le schema n'est pas validé, on lève une erreur
	if (error) {
		const validationError = new Error(error.details[0].message);
		validationError.statusCode = 400;  
		throw validationError;
	}
}

/////////////////////////////////////////////////////////////////////////////////
// 									 CREATE                                    //
/////////////////////////////////////////////////////////////////////////////////


// Créer une nouvelle partie
exports.create = async (req, res, next) => {

	try{
		// Vérification des informations fournis
		const gameSchema = baseSchema.keys({
			idCourse: Joi.number().integer().required(),
			teamSize: Joi.number().integer().required(),
			name: Joi.string().max(150).required(),
		});

		// Vérifie si le schéma correspond bien aux données fournis, renvoie une erreur sinon
		isRequestCorrect(gameSchema, req)

		// Vérifie que la classe appartient bien au professeur
		await isClassBelongsProfessor(req.body.idCourse, req)

		// Créer une partie à partir des infos fournis
		const game = {
			name: req.body.name,
			idCourse: req.body.idCourse,
			teamSize: req.body.teamSize,
			gameCode: null,
		};

	
		// Enregistrer la partie dans la base de données
		const createdGame = await Game.create(game)

		// Renvoie les données créées
		return res.status(201).json(createdGame);
	

	// Gère les erreurs
	}catch(err) {
		next(err)
	}
}

//
// Ajoute des salles à une partie
exports.addRooms = async(req, res, next) => {

	try{

		// Vérification des informations fournis
		const gameSchema = baseSchema.keys({
			idGame: Joi.number().integer().max(150).required(),
			roomName: Joi.array().max(150).items(
				Joi.string().max(150).required()).required()
		});

		// Vérifie si le schéma correspond bien aux données fournis, renvoie une erreur sinon
		isRequestCorrect(gameSchema, req)

		// Vérifie que la partie appartient bien au professeur
		await isGameBelongsProfessor(req.body.idGame, req);

		// Récupère les noms des salles à ajouter
		const roomNames = req.body.roomName;

		// Map les noms de salles avec l'id de la game
		const roomsToAdd = roomNames.map(currentRoomName => ({ idGame: req.body.idGame, roomName: currentRoomName }));

		// Enregistrer les rooms dans la table GameRooms
		const games = GameRooms.bulkCreate(roomsToAdd)

		res.status(201).json(games);

	// Gère les erreurs
	}catch(err) {
		next(err)
	}


}


/////////////////////////////////////////////////////////////////////////////////
// 									 READ                                      //
/////////////////////////////////////////////////////////////////////////////////

// methode pour récuperer une classe à partir du code de la partie
exports.getIdFromCode = async (req, res, next) => {

	try{

		// Récupère la classe courrespondant au code
		const game = await Game.findOne({where: { gameCode: req.params.code }});

		return res.status(200).json(game.id);

	// Gère les erreurs
	}catch(err) {
		next(err)
	}
}

// Récupère toutes les parties du professeur connecté
exports.findAll = async (req, res, next) => {


	try{

		// Stock les IDs des classes du professeur
		let coursesId = [];

		// Récupère toutes les classes du professeur connecté
		const courses = await Course.findAll({ where: { idProfessor: req.tokenId } })

		// Récupère les id correspondant aux classes du professeur connécté
		coursesId = courses.map(course => course.dataValues.id);

		// Récupère toutes les parties correspondantes aux classes du professeur connecté
		const gamesData = await Game.findAll({ where: { idCourse: { [Op.in]: coursesId } } });

		return res.status(200).json(gamesData);
	
		// Gère les erreurs
	} catch (err) {
		next(err)
	}
}



// methode pour récuperer une partie en fonction de son id
exports.findOne = async (req, res, next) => {
	
	try{
		// Vérifie que la partie appartient bien au professeur
		await isGameBelongsProfessor(req.params.id, req);

		// Récupère la partie souhaité
		const game = await Game.findOne({ where: { id: req.params.id} })

		return res.status(200).json(game);

	// Gère les erreurs
	} catch (err) {
		next(err)
	}
}

// Méthode pour récupérer le score d'une partie
exports.getScore = async (req, res, next) => {

	try{
		// Vérifie que la partie appartient bien au professeur
		await isGameBelongsProfessor(req.params.id, req);

		// Récupère les scores de la partie souhaité
		const scores = await Score.findAll({ where: { idGame: req.params.id } })

		res.status(200).json(scores);

	}catch(err) {
		next(err)
	}
}

// methode pour vérifier si une partie, à partir de son id, appartient au prof
exports.gameBelongsToProf = async (req, res, next) => {
	
	try{

		// Vérifie que la partie appartient bien au professeur
		await isGameBelongsProfessor(req.params.id, req);

		// Si on arrive la, c'est qu'il n'y a pas eu d'erreur et donc que la partie appartient au professeur
		return res.status(200).json({
			isBelongsTo: true
		});

	// Gère les erreurs
	} catch (err) {

		// Si le code d'erreur est 403 cela signifie que la partie n'appartient pas au professeur
		if(err.statusCode == 403){
			return res.status(200).json({
				isBelongsTo: false
			});
		}


		next(err)
	}
}

// methode pour récuperer l'état d'une partie à partir de son id
exports.getState = async (req, res, next) => {

	try{
		// Récupère la partie souhaité
		const game = await Game.findOne({ where: { id: req.params.id} })

		return res.status(200).json(game.state);

	// Gère les erreurs
	} catch (err) {
		next(err)
	}
}

// Méthode pour récupérer la taille des équipes à partir de l'id
exports.getMaxTeamSize = async(req, res, next) => {

	try{
		// Récupère la partie souhaité
		const game = await Game.findOne({ where: { id: req.params.id} })
		return res.status(200).json(game.teamSize);

	// Gère les erreurs
	} catch (err) {
		next(err)
	}
}

// Méthode pour récupérer les rooms d'une partie
exports.getRooms = async (req, res, next) => {

	try{

		// Récupère la partie souhaité
		const gameRooms = await GameRooms.findAll({ where: { idGame: req.params.id} })

		// stock les salles de la partie dans rooms
		const rooms = gameRooms.map(room => room.roomName);

		return res.status(200).json(rooms);

	// Gère les erreurs
	} catch (err) {
		next(err)
	}
}

// Méthode pour récupèrer les teams d'une partie
exports.getTeams = async (req, res, next) => {
	try{
		// Récupère la partie souhaité
		const teams = await Team.findAll({ where: { idGame: req.params.id} })

		return res.status(200).json(teams);

		// Gère les erreurs
	} catch (err) {
		next(err)
	}
}

/////////////////////////////////////////////////////////////////////////////////
// 									 UPDATE                                    //
/////////////////////////////////////////////////////////////////////////////////

// methode pour mettre à jour le l'état de la partie. 0 : en cours de création, 1 : en cours, 1 : terminé
exports.setState = async(req, res, next) => {

	try{

		// Vérification des informations fournis
		const GameSchema = baseSchema.keys({
			state: Joi.number().integer().min(0).max(2).required(),
		});

		// Vérifie si le schéma correspond bien aux données fournis, renvoie une erreur sinon
		isRequestCorrect(GameSchema, req)

		// Effectue la requête de mise à jour
		const updatedRows = await Game.update({state: req.body.state}, {where: { id: req.params.id} })

		// Vérifie que la colonne à effectivement été mise à jour
		if (updatedRows == 0) {
			const error = new Error("Impossible de mettre à jour la partie");
			error.statusCode = 404;
			throw error;
		}

		return res.status(201).json({message: "La partie à été mise a jour avec succès"});

	// Gère les erreurs
	} catch(err) {
		console.log(err)
		next(err)
	}
  };

// Méthode pour "ouvrir" la partie aux élèves, cela génère un Code qui permet aux élèves de rejoindre la partie
exports.open = async (req, res, next) => {

	try{

		// Vérifie que la partie appartient bien au professeur
		await isGameBelongsProfessor(req.params.id, req)

		// Récupère la partie
		const game =  await Game.findOne({ where: { id: req.params.id} })

		// Vérifie que la partie ne soit pas déjà ouverte où terminé
		if(game.gameCode || game.state == 2){
			const validationError = new Error("La partie est déjà ouverte ou terminé.");
			validationError.statusCode = 500;
			throw validationError;
		}

		// Génère un code de 10 caractère
		const code = makeid(10);

		// Attribut le gameCode à la partie
		const updatedRows = await Game.update({gameCode: code},{where: { id: req.params.id }});

		// Vérifie que la colonne à effectivement été mise à jour
		if (updatedRows == 0) {
			const error = new Error("Impossible de mettre à jour la classe.");
			error.statusCode = 404;
			throw error;
		}

		// Retourne le code
		return res.status(201).json({gameCode: code});

		// Gère les erreurs
	}catch(err) {
		next(err)
	}
}

//
// Ajoute des salles à une partie
exports.addRooms = async(req, res, next) => {
	
	try{

		// Vérification des informations fournis
		const gameSchema = baseSchema.keys({
			idGame: Joi.number().integer().required(),
			roomName: Joi.array().items(
				Joi.string().required()).max(150).required()
		});

		// Vérifie si le schéma correspond bien aux données fournis, renvoie une erreur sinon
		isRequestCorrect(gameSchema, req)

		// Vérifie que la partie appartient bien au professeur
		await isGameBelongsProfessor(req.body.idGame, req);

		// Récupère les noms des salles à ajouter
		const roomNames = req.body.roomName;

		// Map les noms de salles avec l'id de la game
		const roomsToAdd = roomNames.map(currentRoomName => ({ idGame: req.body.idGame, roomName: currentRoomName }));

		// Enregistrer les rooms dans la table GameRooms
		const games = GameRooms.bulkCreate(roomsToAdd)

		res.status(201).json(games);

	// Gère les erreurs
	}catch(err) {
		next(err)
	}
	
	
}

/////////////////////////////////////////////////////////////////////////////////
// 									 DELETE                                    //
/////////////////////////////////////////////////////////////////////////////////

// Supprime une partie
exports.delete = async (req, res, next) => {

	try{
		// Vérifie que la partie appartient bien au professeur
		await isGameBelongsProfessor(req.params.id, req);

		// Supprime la partie correspondante à l'ID
		const deletedRows = await Game.destroy({ where: { id: req.params.id}})

		// Vérifie que la colonne à effectivement été supprimé
		if (deletedRows == 0) {
			const error = new Error("Impossible de supprimer la partie.");
			error.statusCode = 404;
			throw error;
		}

		return res.status(201).json("Partie supprimé avec succès");

	// Gère les erreurs
	}catch(err) {
		next(err)
	}
}

// Supprime la partie
exports.backendDelete = async (req, res, next) => {

	try{

		// Ici pas besoins de vérifier l'appartenance de la partie, car il s'agit d'une méthode réservé pour la backend

		// Enregistrer la classe dans la base de données
		const destroyedRows = await Game.destroy({ where: { id: req.params.id}})

		// Vérifie que la colonne à effectivement été supprimé
		if (deletedRows == 0) {
			const error = new Error("Impossible de supprimer la partie.");
			error.statusCode = 404;
			throw error;
		}

		return res.status(201).json("Partie supprimé avec succès");


	// Gère les erreurs
	}catch(err) {
		next(err)
	}
}












// methode pour récuperer une classe à partir du code de la partie
exports.course = async (req, res, next) => {

	try{
		// Récupère la classe correspondant au code
		const gameCode = await Game.findOne({ where: { id: req.params.id} })
		// Récupèrer les élèves de la classe
		const students = await Student.findAll({ where: { idCourse: gameCode.idCourse} })

		// Renvoie les données récupérées
		return res.status(200).json(students);

	// Gère les erreurs
	}catch(err) {
		console.log(err)
		next(err)
	}
}


