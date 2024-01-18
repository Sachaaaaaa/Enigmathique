/**
 * Définition des opérations CRUD pour les élèves
*/

// to do : creation score a la fermeture de la partie

const db = require("../models/db.js");
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
	try {

		// Récupère toutes les classes du professeur courant
		const data = await Course.findAll({ where: { idProfessor: req.tokenId } });

		// Récupère les id correspondant aux classes du professeur courant
		const ids = data.map(item => item.id)

		idCourse = parseInt(idCourse)
		// Vérifie que la classe appartient bien au professeur
		return ids.includes(idCourse);

	} catch (err) {
		// Gère les erreurs
		throw new Error(err.message || "Une erreur s'est produite lors de la récupération des classes.");
	}
}

// Fonction vérifiant si une équipe, à partir de son id, appartiant au professeur
async function isTeamBelongsProfessor(idWantedTeam, req) {
	try {

		// Récupère toutes les classes du professeur courant
		const data = await PlayIn.findAll({ where: { idTeam: idWantedTeam} });

		// Récupère les id correspondant aux classes du professeur courant
		const ids = data.map(item => item.idStudent);

		// Vérifie que la team existe bie,
		if(ids.length == 0){
			return true
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

// Fonction vérifiant si une classe, à partir de son id, appartiant au professeur
async function isStudentBelongsProfessor(idStudent, req) {
	try {

		// Récupère toutes les classes du professeur courant
		const data = await Student.findOne({ where: { id: idStudent} });

		if(data){

			// Récupère les id correspondant aux classes du professeur courant
			const idCourse = data.idCourse;

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
		// Valider la requête
		if (!req.body.teams) {
			const error = new Error("Il manque des informations pour ajouter des élèves.");
			error.statusCode = 400;  
			throw error;
		}

		// Récupère les équipes dans un format adapté
		const teams = req.body.teams;		

		// Les équipes à ajouter
		const addedTeams = [];

		// Itère sur chaque équipe
		for (let i = 0; i < teams.length; i++) {
			if (!teams[i].name || !teams[i].idStudents) {
				const error = new Error("Il manque des informations pour ajouter des élèves.");
				error.statusCode = 400;  
				throw error;
			}
			
			// Ajoute toutes les équipes du tableau teamsName
			const createdTeam = await Team.create({ name: teams[i].name });	

			const studentsData = teams[i].idStudents.map(studentId => ({ idTeam: createdTeam.id, idStudent: studentId }));

			// Ajoute les élèves à la table PlayIn
			await PlayIn.bulkCreate(studentsData);

			// Ajoute l'équipe à la liste des équipes ajoutées
			addedTeams.push(createdTeam);	
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
exports.findAll = async (req, res) => {

	// Vérifie que la partie appartient bien au professeur
	const isBelongsToProfessor = await isGameBelongsProfessor(req.params.id, req);
	if (!isBelongsToProfessor) {
		return res.status(403).json({
			message: "Vous n'avez pas accès à cette partie."
		});
	}
		
	let coursesId = [];

	try{

		// Récupérer toutes les équipe de la partie grâce à la table score
		const scores = await Score.findAll({ where: { idGame: req.params.id } })
		gamesId = scores.map(game => game.dataValues.idTeam);
			

	// Gère les erreurs
	}catch(err) {
		return res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de la récupération des classes."
		});
	}	

	try {
		// Pour chaque id de team, la récupérer dans la table team
		const teamsData = await Team.findAll({ where: { id: { [Op.in]: gamesId } } });

		return res.status(200).json(teamsData);

	// Gère les erreurs
	} catch (err) {
		return res.status(500).json({
		message: err.message || "Une erreur s'est produite lors de la récupération des jeux."
		});
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
		res.status(200).json(students);
	
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



//{{teamId: 1,rooms: [{name: 'Laboratory',numSolved: 2,numBadAnswers: 667,numHints: 1,isSolved: true,time: 125}]}}


// [[{"idTeam": 2}, {"roomName": "test"}, {"idGame": 1}, {"time": 1}, {"nbGoodAnswers": 1}, {"nbBadAnswers": 2}, {"nbHints": 3}], [{"idTeam": 2}, {"roomName": "test"}, {"idGame": 1}, {"time": 1}, {"nbGoodAnswers": 1}, {"nbBadAnswers": 2}, {"nbHints": 3}]]
// Accepte une équipe à une partie
exports.addScores = async(req, res, next) => {
	

	try{

		if (!req.body.scores) {
			const error = new Error("Il manque des informations pour ajouter des scores.");
			error.statusCode = 400;  
			throw error;
		}

		// exemple de valeur pour req.body.scores [{"idTeam": 2, "roomName": "test", "idGame": 1, "time": 1, "nbGoodAnswers": 1, "nbBadAnswers": 2, "nbHints": 3}, {"idTeam": 3, "roomName": "test", "idGame": 1, "time": 1, "nbGoodAnswers": 1, "nbBadAnswers": 2, "nbHints": 3}]
		const scores = JSON.parse(req.body.scores)
		

		for (let i = 0; i < scores.length; i++) {
			if (!scores[i].idTeam || !scores[i].roomName || !scores[i].idGame||!scores[i].time ||!scores[i].nbGoodAnswers ||!scores[i].nbBadAnswers  ||!scores[i].nbHints ) {
				const error = new Error("Il manque des informations pour ajouter des scores.");
				error.statusCode = 400;  
				throw error;
			}




			const scoresData = {
				idTeam: scores[i].idTeam,
				roomName: scores[i].roomName,
				idGame: scores[i].idGame,
				time: scores[i].time,
				nbGoodAnswers: scores[i].nbGoodAnswers,
				nbBadAnswers: scores[i].nbBadAnswers,
				nbHints: scores[i].nbHints
			}

			const scoreCreated = await Score.create(scoresData)
		}

		res.status(201).json("les scores ont été ajoutés avec succès");

	} catch(err) {
		next(err)
	}
	


	
}