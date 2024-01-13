/**
 * Définition des opérations CRUD pour les classes
*/

const db = require("../models/db.js");
const Game = db.game;
const Course = db.course;
const GameCode = db.gameCode;
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

// Fonction vérifiant si une classe, à partir de son id, appartiant au professeur
async function isGameBelongsProfessor(idGame, req) {
	try {

		// Récupère toutes les classes du professeur courant
		const data = await Game.findOne({ where: { id: idGame} });
		if(data){
			// Récupère les id correspondant aux classes du professeur courant
			const idGame = data.id;

			// Vérifie que la classe appartient bien au professeur
			return await isClassBelongsProfessor(idGame, req);
		} else {
			throw new Error("L'élève n'existe pas.");
		}

	} catch (err) {
		// Gère les erreurs
		throw new Error(err.message || "Une erreur s'est produite lors de la récupération des classes.");
	}
}

/////////////////////////////////////////////////////////////////////////////////
// 									 CREATE                                    //
/////////////////////////////////////////////////////////////////////////////////


// Créer et enregistrer une nouvelle classe au professeurs
exports.create = async (req, res) => {

	// Valider la requête
	if (!req.body.idCourse) {
		return res.status(400).json({
			message: "Il manque des informations pour créer la classe."
		});
	}

	// Enregistrer la classe dans la base de données
	await Game.create({idCourse: req.body.idCourse})

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


/////////////////////////////////////////////////////////////////////////////////
// 									 READ                                      //
/////////////////////////////////////////////////////////////////////////////////

// methode pour récuperer une clase du professeur par son id
exports.findById = async (req, res) => {
	
	try{
		// Vérifie que l'élève appartient bien au professeur
		const isBelongsToProfessor = await isGameBelongsProfessor(req.params.id, req);
		if (!isBelongsToProfessor) {
			return res.status(403).json({
				message: "Vous n'avez pas accès à cette classe."
			});
		}

		await Game.findOne({ where: { id: req.params.id} })
			.then(data => {
				return res.status(200).json(data);
			})
			.catch(err => {
				return res.status(500).json({
					message: err.message || "Une erreur s'est produite lors de la récupération de la partie."
				});
			});	
	} catch (err) {
		return res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de la récupération des étudiants."
		});
	}
}


/////////////////////////////////////////////////////////////////////////////////
// 									 OTHER                                     //
/////////////////////////////////////////////////////////////////////////////////

// todo : vérifier si la game appartient au professeur
// Créer et enregistrer une nouvelle classe au professeurs
exports.open = async (req, res) => {

	GameidCourse = null
	await Game.findOne({ where: { id: req.params.id} })
	.then(data => {
		GameidCourse = data.idCourse;
	})
	.catch(err => {
		return res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de la récupération de la partie."
		});
	});	

	// Créer une classe
	const gameCode = {
		code: makeid(10),
		idGame: req.params.id,
		idCourse: GameidCourse,
	};

	// Enregistrer la classe dans la base de données
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


exports.close = async (req, res) => {


	// Enregistrer la classe dans la base de données
	await GameCode.destroy({ where: { idGame: req.params.id}})

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

// VOBMs6EUub

// methode pour récuperer une clase du professeur par son id
exports.course = async (req, res) => {
	console.log(req.params.code)
	await GameCode.findOne({ where: { code: req.params.code} })
		.then(data => {
			return res.status(200).json(data);
		})
		.catch(err => {
			return res.status(500).json({
				message: err.message || "Une erreur s'est produite lors de la récupération de la partie."
			});
		});	
}