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
		const data = await Game.findOne({ where: { id: idGame} });
		if(data){
			// Récupère les id des classes des parties
			const idGame = data.idCourse;

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

	// Enregistrer la partie dans la base de données
	await Game.create(game)

		// Renvoie les données créées
		.then(data => {
			return res.status(201).json(data);
		})

		// Gère les erreurs
		.catch(err => {
			return res.status(500).json({
				message: err.message || "Une erreur s'est produite lors de la création de la partie."
			});
		});
}


/////////////////////////////////////////////////////////////////////////////////
// 									 READ                                      //
/////////////////////////////////////////////////////////////////////////////////

// Récupère toutes les parties du professeur connecté
exports.findAll = async (req, res) => {

	let coursesId = [];

	// Récupère toutes les classes du professeur connecté
	await Course.findAll({ where: { idProfessor: req.tokenId } })
	.then(data => {
		// Récupère les id correspondant aux classes du professeur connécté
		coursesId = data.map(course => course.dataValues.id);
	})

	// Gère les erreurs
	.catch(err => {
		return res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de la récupération des classes."
		});
	});	

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

		// Récupère la partie souhaité
		await Game.findOne({ where: { id: req.params.id} })
			.then(data => {
				return res.status(200).json(data);
			})

			// Gère les erreurs
			.catch(err => {
				return res.status(500).json({
					message: err.message || "Une erreur s'est produite lors de la récupération de la partie."
				});
			});	
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

exports.getScore = (req, res) => {

	Score.findAll({ where: { idGame: req.params.id } })
		.then(data => {
			res.status(200).json(data);
		})
		.catch(err => {
			res.status(500).json({
				message: err.message || "Une erreur s'est produite lors de la récupération des scores."
			});
		});	
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

	// Récupère l'id de la classe de la partie
	await Game.findOne({ where: { id: req.params.id} })
	.then(data => {
		GameidCourse = data.idCourse;
	})

	// Gère les erreurs
	.catch(err => {
		return res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de la récupération de la partie."
		});
	});	

	// Créer un code de la partie correspondant aux élèves de la classe concerné par la partie
	const gameCode = {
		code: makeid(10),
		idGame: req.params.id,
		idCourse: GameidCourse,
	};

	// Enregistrer le code dans la base de données
	await GameCode.create(gameCode)

		// Renvoie les données créées
		.then(data => {
			return res.status(201).json(data);
		})

		// Gère les erreurs
		.catch(err => {
			return res.status(500).json({
				message: err.message || "Une erreur s'est produite lors de la création de la classe."
			});
		});
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

	// Enregistrer la classe dans la base de données
	await GameCode.destroy({ where: { idGame: req.params.id}})

		// Renvoie les données supprimées
		.then(data => {
			Game.update({state: 1},{where: { id: req.params.id }});
			return res.status(200).json(data);
		})

		// Gère les erreurs
		.catch(err => {
			return res.status(500).json({
				message: err.message || "Une erreur s'est produite lors de la création de la classe."
			});
		});
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

	// Enregistrer la classe dans la base de données
	await Game.update({state: 2},{where: { id: req.params.id }})
	// Renvoie les données supprimées
	.then(data => {
		return res.status(201).json(data);
	})

	// Gère les erreurs
	.catch(err => {
		return res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de la création de la classe."
		});
	});
}


// methode pour récuperer une classe à partir du code de la partie
exports.course = async (req, res) => {

	// Récupère la classe courrespondant au code
	await GameCode.findOne({ where: { code: req.params.code} })
		.then(data => {
			return res.status(200).json(data);
		})

		// Gère les erreurs
		.catch(err => {
			return res.status(500).json({
				message: err.message || "Une erreur s'est produite lors de la récupération de la partie."
			});
		});	
}

// Ajoute des salles à une partie
exports.addRooms = async(req, res) => {
	
	
	// Valide la requête
	if (!req.body.idGame || !req.body.roomName) {
		res.status(400).json({
			message: "Il manque des informations pour ajouter des salles."
		});
		return;
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
	const roomsToAdd = roomNames.map(currentRoomName => ({ idGame: req.body.idGame, name: currentRoomName }));


	// Enregistrer les rooms dans la table GameRooms
	GameRooms.bulkCreate(roomsToAdd)
	.then(data => {
		res.status(201).json(data);
	})

	// Gère les erreurs
	.catch(err => {
		res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de l'ajout de(s) élève(s)."
		});
	});
	
	
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



	const game = await Game.findOne({ where: { id: req.body.idGame} })
	// Gère les erreurs
	.catch(err => {
		return res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de la récupération de la partie."
		});
	});	

	const team = await Team.findAll({ where: { id: req.params.id} })
	// Gère les erreurs
	.catch(err => {
		return res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de la récupération de la partie."
		});
	});	

	// Vérifie que la taille des équipes est respéctée
	if(game.teamSize<team.length){
		return res.status(400).json({
			message: "La taille de l'équipe est trop grande."
		});
	}

	// Récupère toutes les rooms dans gamerooms
	GameRooms.findAll({ where: { idGame: req.body.idGame } })
		.then(data => { 
			const scoreToAdd = data.map(gameroom => ({idTeam: req.params.id,idGame: req.body.idGame, idRoom: gameroom.idRoom, time: 0, nbGoodAnswers: 0, nbBadAnswers: 0, nbHints: 0})); 
			Score.bulkCreate(scoreToAdd)
			.then(data => {
				res.status(201).json(data);
			})
			.catch(err => {
				res.status(500).json({
					message: err.message || "Une erreur s'est produite lors de l'ajout de(s) élève(s)."
				});
			});
		})
	
}