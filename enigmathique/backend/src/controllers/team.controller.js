/**
 * Définition des opérations CRUD pour les élèves
*/

// to do : creation score a la fermeture de la partie

const db = require("../models/db.js");
const Team = db.team;
const Course = db.course;
const Game = db.game;
const Score = db.score;
const Student = db.student;
const Op = db.Sequelize.Op;

/////////////////////////////////////////////////////////////////////////////////
// 									 FONCTIONS                                 //
/////////////////////////////////////////////////////////////////////////////////

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
exports.addStudents = async (req, res) => {

	// Valider la requête
	if (!req.body.idStudents || !req.body.idTeam) {
		res.status(400).json({
			message: "Il manque des informations pour ajouter des élèves."
		});
		return;
	}

	// Récupère les id des élèves
	const idStudents = JSON.parse(req.body.idStudents);

	// Pour chaque élève, vérifier que l'élève appartient bien au professeur
	for (const element of idStudents) {
		try {
			if (!await isStudentBelongsProfessor(element, req)) {
				return res.status(403).json({
					message: "Vous n'avez pas accès à cet élève."
				});
			}
		} catch (err){
			return res.status(500).json({
				message: err.message || "Une erreur s'est produite lors de l'ajout de(s) élève(s)."
			});
		}
    }

	// Créer le tableau des élèves à ajouter
	const studentsToAdd = idStudents.map(idCurrentStudent => ({ id: req.body.idTeam, idStudent: idCurrentStudent }));


	// Enregistrer l'élève dans la table team
	Team.bulkCreate(studentsToAdd)
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

	// Récupérer toutes les équipe de la partie
	await Score.findAll({ where: { idGame: req.params.id } })
		.then(data => {
			gamesId = data.map(game => game.dataValues.idTeam);
		})

		// Gère les erreurs
		.catch(err => {
			return res.status(500).json({
				message: err.message || "Une erreur s'est produite lors de la récupération des classes."
			});
		});	

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

	Team.findAll({ where: { id: req.params.id } })
		.then(data => {
			res.status(200).json(data);
		})
		.catch(err => {
			res.status(500).json({
				message: err.message || "Une erreur s'est produite lors de la récupération des classes."
			});
		});	
}

exports.getScore = (req, res) => {

	

	Score.findAll({ where: { idTeam: req.params.id } })
		.then(data => {
			res.status(200).json(data);
		})
		.catch(err => {
			res.status(500).json({
				message: err.message || "Une erreur s'est produite lors de la récupération des classes."
			});
		});	
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

	// Effectue la requête de mise à jour
	await Score.update(updateData, {where: { idTeam: req.params.id} })
		// Vérifie que la colonne à effectivement été mise à jour
	  .then(num => {
		if (num == 1) {
			return res.status(201).json({
				message: "La classe à été mise a jour avec succès"
			});

		// Si aucunes colonnes traités on relève une erreur
		} else {
			return res.status(404).json({
				message: "Impossible de mettre à jour la classe"
			});
		}
	  })

	  // Gère les erreurs
	  .catch(err => {
		return res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de la récupération des classes."
		});
	  });
  };


/////////////////////////////////////////////////////////////////////////////////
// 									 DELETE                                    //
/////////////////////////////////////////////////////////////////////////////////


// To do : verif si la classe appartient bien au prof
// supprime une team en fonction de son id
exports.delete = async (req, res) => {


	// Effectue la requête de delete
	await Team.destroy({ where: { id: req.params.id} })
	.then(num => {

		// Vérifie si la classe a bien été supprimé
		if (num == 1) {
			return res.status(201).json({
				message: "L'équipe a été supprimée avec succès"
		  });

		// Si aucunes colonnes traités on relève une erreur
		} else {
			return res.status(404).json({
				message: "Aucune équipe n'a été supprimée"
		  });
		}
	  	})
		// Gère les erreurs
		.catch(err => {
			return res.status(500).json({
				message: err.message || "Une erreur est intervenue durant la suppression de l'équipe."
			});
		});	
}

// Supprime un élève d'une équipe
exports.removeStudent = async (req, res) => {

	if (!req.body.idTeam) {
		res.status(400).json({
			message: "Il manque des informations pour supprimer un élève d'une équipe."
		});
		return;
	}

	// Effectue la requête de delete
	await Team.destroy({ where: { idStudent: req.params.id, id:req.body.idTeam } })
	.then(num => {

		// Vérifie si l'élève a bien été supprimé
		if (num == 1) {
			return res.status(201).json({
				message: "L'élève a été supprimée avec succès"
		  });

		// Si aucunes colonnes traités on relève une erreur
		} else {
			return res.status(404).json({
				message: "Aucuns élève n'a été supprimée"
		  });
		}
	  	})
		// Gère les erreurs
		.catch(err => {
			return res.status(500).json({
				message: err.message || "Une erreur est intervenue durant la suppression de l'élève."
			});
		});	
}
