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
	if (!req.body.idCourse) {
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

	// Enregistrer la partie dans la base de données
	await Game.create({idCourse: req.body.idCourse})

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

// todo : vérifier si la game appartient au professeur
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