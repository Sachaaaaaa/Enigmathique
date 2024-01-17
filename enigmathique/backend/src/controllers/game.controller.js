/**
 * Définition des opérations CRUD pour les classes
*/

const db = require("../models/db.js");
const Game = db.game;
const Course = db.course;
const Team = db.team;
const Score = db.score;
const GameCode = db.gameCode;
const GameRooms = db.gameRooms;
const Op = db.Sequelize.Op;


/////////////////////////////////////////////////////////////////////////////////
// 									 FONCTIONS                                 //
/////////////////////////////////////////////////////////////////////////////////

// Provient de https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

// Fonction vérifiant si une classe, à partir de son id, appartiant au professeur
async function isStudentBelongsProfessor (idStudent, req) {
	try {

		// Récupère toutes les classes du professeur courant
		const student = await Student.findOne({ where: { id: idStudent} });
		if(student){
			// Récupère les id correspondant aux classes du professeur courant
			const idCourse = student.idCourse;

			// Vérifie que la classe appartient bien au professeur
			return await isClassBelongsProfessor(idCourse, req);
		} else {
			throw new Error("L'élève n'existe pas.");
		}

	} catch (err) {
		// Gère les erreurs
		throw new Error(err.message || "Une erreur s'est produite lors de la récupération des classes.");
	}
}

// Fonction vérifiant si une équipe, à partir de son id, appartiant au professeur
async function isTeamBelongsProfessor(idTeam, req) {
	try {

		// Récupère toutes les classes du professeur courant
		const data = await Team.findAll({ where: { id: idTeam} });

		// Récupère les id correspondant aux classes du professeur courant
		const ids = data.map(item => item.idStudent);

		// Vérifie que la team existe bie,
		if(ids.length == 0){
			return false
		}

		// Pour chaque élève, vérifie qu'il appartient bien au professeur
		for (const id of ids) {
			try {
				if (!await isStudentBelongsProfessor(id, req)) {
					return false
				}
			} catch (err){
				throw new Error("L'élève n'existe pas.");
			}
		}

		// Vérifie que la classe appartient bien au professeur
		return true

	} catch (err) {
		// Gère les erreurs
		throw new Error(err.message || "Une erreur s'est produite lors de la récupération des classes.");
	}
}

// to do : on peut simplfier ?
// Fonction vérifiant si une classe, à partir de son id, appartiant au professeur
async function isClassBelongsProfessor(idCourse, req) {
	try {

		// Récupère toutes les classes du professeur courant
		const data = await Course.findAll({ where: { idProfessor: req.tokenId } });

		// Récupère les id correspondant aux classes du professeur courant
		const ids = data.map(item => item.id);
		idCourse = parseInt(idCourse)

		// Vérifie que la classe appartient bien au professeur
		return ids.includes(idCourse);

	} catch (err) {
		// Gère les erreurs
		throw new Error(err.message || "Une erreur s'est produite lors de la récupération des classes.");
	}
}

// Fonction vérifiant si une partie, à partir de son id, appartiant au professeur
async function isGameBelongsProfessor(idGame, req) {
	try {

		// Récupère la partie souhaité
		const game = await Game.findOne({ where: { id: idGame} });
		if(game){
			// Récupère l'id des classes de la partie
			const idGame = game.idCourse;

			// Vérifie que la classe appartiennent bien au professeur
			return await isClassBelongsProfessor(idGame, req);
		} else {
			throw new Error("La parrtie n'existe pas.");
		}

	} catch (err) {
		// Gère les erreurs
		throw new Error(err.message || "Une erreur s'est produite lors de la récupération des classes.");
	}
}

/////////////////////////////////////////////////////////////////////////////////
// 									 CREATE                                    //
/////////////////////////////////////////////////////////////////////////////////


// Créer et enregistrer une nouvelle partie
exports.create = async (req, res) => {

	// Valider la requête
	if (!req.body.idCourse || !req.body.teamSize || !req.body.name ) {
		return res.status(400).json({
			message: "Il manque des informations pour créer la partie."
		});
	}

	// Vérifie que la classe appartient bien au professeur
	if(! await isClassBelongsProfessor(req.body.idCourse, req)){
		return res.status(403).json({
			message: "Vous n'avez pas accès à cette classe."
		})
	}

	const game = {
		name: req.body.name,
		idCourse: req.body.idCourse,
		teamSize: req.body.teamSize,
	};

	try{
		// Enregistrer la partie dans la base de données
		const createdGame = await Game.create(game)

		// Renvoie les données créées
		return res.status(201).json(createdGame);
	

		// Gère les erreurs
	}catch(err) {
		return res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de la création de la partie."
		});
	}
}


/////////////////////////////////////////////////////////////////////////////////
// 									 READ                                      //
/////////////////////////////////////////////////////////////////////////////////

// Récupère toutes les parties du professeur connecté
exports.findAll = async (req, res) => {

	let coursesId = [];

	try{

		// Récupère toutes les classes du professeur connecté
		const courses = await Course.findAll({ where: { idProfessor: req.tokenId } })

		// Récupère les id correspondant aux classes du professeur connécté
		coursesId = courses.map(course => course.dataValues.id);
	

	// Gère les erreurs
	}catch(err) {
		return res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de la récupération des classes."
		});
	}

	try {
		// Récupère toutes les parties correspondantes aux classes du professeur connecté
		const gamesData = await Game.findAll({ where: { idCourse: { [Op.in]: coursesId } } });
		return res.status(200).json(gamesData);
	
		// Gère les erreurs
	} catch (err) {
		return res.status(500).json({
		message: err.message || "Une erreur s'est produite lors de la récupération des parties."
		});
	}
		  
	

}


// methode pour récuperer une partie en fonction de son id
exports.findById = async (req, res) => {
	
	try{
		// Vérifie que la partie appartient bien au professeur
		const isBelongsToProfessor = await isGameBelongsProfessor(req.params.id, req);
		if (!isBelongsToProfessor) {
			return res.status(403).json({
				message: "Vous n'avez pas accès à cette partie."
			});
		}

		try{
			// Récupère la partie souhaité
			const game = await Game.findOne({ where: { id: req.params.id} })
			return res.status(200).json(game);

		// Gère les erreurs
		}catch(err) {
			return res.status(500).json({
				message: err.message || "Une erreur s'est produite lors de la récupération de la partie."
			});
		}
	// Gère les erreurs
	} catch (err) {
		return res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de la récupération de la partie."
		});
	}
}

/////////////////////////////////////////////////////////////////////////////////
// 									 OTHER                                     //
/////////////////////////////////////////////////////////////////////////////////

exports.getScore = async (req, res) => {

	try{

		// Récupère les scores de la partie souhaité
		const scores = await Score.findAll({ where: { idGame: req.params.id } })
		res.status(200).json(scores);
		
	}catch(err) {
		res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de la récupération des scores."
		});
	}
}

// methode pour vérifier si une partie, à partir de son id, appartient au prof
exports.gameBelongsToProf = async (req, res) => {
	
	try{

		// Vérifie que la partie appartient bien au professeur
		const isBelongsToProfessor = await isGameBelongsProfessor(req.params.id, req);

		if (!isBelongsToProfessor) {
			return res.status(200).json({
				isBelongsTo: false 
			});
		} else {
			return res.status(200).json({
				isBelongsTo: true 
			});
		}

	// Gère les erreurs
	} catch (err) {
		return res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de la récupération de la partie."
		});
	}
}


// Ouvre la partie aux élèves
exports.open = async (req, res) => {

	// Vérifie que la partie appartient bien au professeur
	const isBelongsToProfessor = await isGameBelongsProfessor(req.params.id, req);
	if (!isBelongsToProfessor) {
		return res.status(403).json({
			message: "Vous n'avez pas accès à cette partie."
	});
	}

	GameidCourse = null

	try {

		// Récupère l'id de la classe de la partie
		const game =  Game.findOne({ where: { id: req.params.id} })
		GameidCourse = game.idCourse;

	// Gère les erreurs
	}catch(err) {
		return res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de la récupération de la partie."
		});
	}

	// Créer un code de la partie correspondant aux élèves de la classe concerné par la partie
	const gameCode = {
		code: makeid(10),
		idGame: req.params.id,
		idCourse: GameidCourse,
	};

	try {
		// Enregistrer le code dans la base de données
		const createdGameCode = await GameCode.create(gameCode)

		// Renvoie les données créées
		return res.status(201).json(createdGameCode);

		// Gère les erreurs
	}catch(err) {
		return res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de la création de la classe."
		});
	}
}

// todo : le dete renvoie des données ?
// Ferme la partie aux élèves
exports.close = async (req, res) => {

	// Vérifie que la partie appartient bien au professeur
	const isBelongsToProfessor = await isGameBelongsProfessor(req.params.id, req);
	if (!isBelongsToProfessor) {
		return res.status(403).json({
			message: "Vous n'avez pas accès à cette partie."
	});
	}

	try{
		// Enregistrer la classe dans la base de données
		const destroyedGameCode = await GameCode.destroy({ where: { idGame: req.params.id}})

		// Renvoie les données supprimées
		const updatedRows = await Game.update({state: 1},{where: { id: req.params.id }});
		return res.status(200).json(updatedRows);
		

		// Gère les erreurs
	}catch(err) {
		return res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de la création de la classe."
		});
	}
}

// Termine la partie
exports.end = async (req, res) => {

	// Vérifie que la partie appartient bien au professeur
	const isBelongsToProfessor = await isGameBelongsProfessor(req.params.id, req);
	if (!isBelongsToProfessor) {
		return res.status(403).json({
			message: "Vous n'avez pas accès à cette partie."
	});
	}

	try{

		// Enregistrer la classe dans la base de données
		const updatedRows = await Game.update({state: 2},{where: { id: req.params.id }})
		
		// Renvoie les données mise a jours
		return res.status(201).json(updatedRows);

	// Gère les erreurs
	}catch(err) {
		return res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de la création de la classe."
		});
	}
}


// methode pour récuperer une classe à partir du code de la partie
exports.course = async (req, res) => {

	try{
		// Récupère la classe courrespondant au code
		const gameCode = await GameCode.findOne({ where: { code: req.params.code} })
		return res.status(200).json(gameCode);

	// Gère les erreurs
	}catch(err) {
		return res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de la récupération de la partie."
		});
	}	
}

// Ajoute des salles à une partie
exports.addRooms = async(req, res) => {
	
	
	// Valide la requête
	if (!req.body.idGame || !req.body.roomName) {
		return res.status(400).json({
			message: "Il manque des informations pour ajouter des salles."
		});
	}

	// Vérifie que la partie appartient bien au professeur
	const isBelongsToProfessor = await isGameBelongsProfessor(req.body.idGame, req);
	if (!isBelongsToProfessor) {
		return res.status(403).json({
			message: "Vous n'avez pas accès à cette partie."
	});
	}

	// Récupère les id des salles à ajouter
	const roomNames = req.body.roomName;
	const roomsToAdd = roomNames.map(currentRoomName => ({ idGame: req.body.idGame, roomName: currentRoomName }));


	try{

		// Enregistrer les rooms dans la table GameRooms
		const games = GameRooms.bulkCreate(roomsToAdd)
		res.status(201).json(games);

	// Gère les erreurs
	}catch(err) {
		res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de l'ajout de(s) élève(s)."
		});
	}
	
	
}


// Accepte une équipe à une partie
exports.accept = async(req, res) => {
	
	if (!req.body.idGame) {
		return res.status(400).json({
			message: "Il manque des informations pour ajouter des salles."
		});
	}

	try {
		// Vérifie que la partie appartient bien au professeur
		const isGameBelongsToProfessor = await isGameBelongsProfessor(req.body.idGame, req);
		if (!isGameBelongsToProfessor) {
			return res.status(403).json({
				message: "Vous n'avez pas accès à cette partie."
		});
		}

		// Vérifie que l'équipe appartient bien au professeur
		const isTeamBelongsToProfessor = await isGameBelongsProfessor(req.params.id, req);
		if (!isTeamBelongsToProfessor) {
			return res.status(403).json({
				message: "Vous n'avez pas accès à cette partie."
		});
		}
	} catch (err){
		return res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de la récupération de la partie."
		});
	}


	try{
		const game = await Game.findOne({ where: { id: req.body.idGame} })
		const team = await Team.findAll({ where: { id: req.params.id} })

		// Vérifie que la taille des équipes est respéctée
		if(game.teamSize<team.length){
			return res.status(400).json({
				message: "La taille de l'équipe est trop grande."
			});
		}

		// Récupère toutes les rooms dans gamerooms
		const rooms = await GameRooms.findAll({ where: { idGame: req.body.idGame } })

		// Ajouter une ligne score pour chaque team, pour chaque score
		const scoreToAdd = rooms.map(gameroom => ({idTeam: req.params.id,idGame: req.body.idGame, roomName: gameroom.roomName, time: 0, nbGoodAnswers: 0, nbBadAnswers: 0, nbHints: 0})); 
		const scores = await Score.bulkCreate(scoreToAdd)
		res.status(201).json(scores);

	// Gère les erreurs
	}catch(err) {
		return res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de la récupération de la partie."
		});
	}
	
}