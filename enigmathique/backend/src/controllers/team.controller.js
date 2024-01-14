/**
 * Définition des opérations CRUD pour les élèves
*/

// to do : creation score a la fermeture de la partie

const db = require("../models/db.js");
const Team = db.team;
const Score = db.score;
const Op = db.Sequelize.Op;

/////////////////////////////////////////////////////////////////////////////////
// 									 READ                                      //
/////////////////////////////////////////////////////////////////////////////////

exports.findAll = async (req, res) => {

	let coursesId = [];

	await Score.findAll({ where: { idGame: req.params.id } })
		.then(data => {
			gamesId = data.map(game => game.dataValues.idGame	);
			console.log(gamesId);
		})
		.catch(err => {
			return res.status(500).json({
				message: err.message || "Une erreur s'est produite lors de la récupération des classes."
			});
		});	

	try {
		const teamsData = await Team.findAll({ where: { id: { [Op.in]: gamesId } } });
		console.log(teamsData);
		return res.status(200).json(teamsData);
	} catch (err) {
		return res.status(500).json({
		message: err.message || "Une erreur s'est produite lors de la récupération des jeux."
		});
	}
		  
	

}


exports.findOne = (req, res) => {
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
// 									 CREATE                                    //
/////////////////////////////////////////////////////////////////////////////////

// todo : vérifier que l'élève appartient bien ua prof
// Ajouter des élèves à une équipe
exports.addStudent = (req, res) => {
	console.log(req.body);
	if (!req.body.idStudents || !req.body.idTeam) {
		res.status(400).json({
			message: "Il manque des informations pour ajouter des élèves."
		});
		return;
	}

	const idStudents = JSON.parse(req.body.idStudents);

	const studentsToAdd = idStudents.map(idCurrentStudent => ({ id: req.body.idTeam, idStudent: idCurrentStudent }));

	console.log(studentsToAdd);

	// Enregistrer l'élève dans la table team
	Team.bulkCreate(studentsToAdd)
	.then(data => {
		res.status(201).json(data);
	})
	.catch(err => {
		res.status(500).json({
			message: err.message || "Une erreur s'est produite lors de l'ajout de(s) élève(s)."
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