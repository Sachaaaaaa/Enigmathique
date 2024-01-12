/**
 * Définition des opérations CRUD pour les élèves
*/


const db = require("../models/db.js");
const Team = db.team;
const Op = db.Sequelize.Op;


exports.findAll = (req, res) => {

	

	Team.findAll({ where: { id: req.body.idTeam } })
		.then(data => {
			res.status(200).send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la récupération des classes."
			});
		});	
}



// Ajouter des élèves à une équipe
exports.addStudent = (req, res) => {
	console.log(req.body);
	if (!req.body.idStudents || !req.body.idTeam) {
		res.status(400).send({
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
		res.send(data);
	})
	.catch(err => {
		res.status(500).send({
			message: err.message || "Une erreur s'est produite lors de l'ajout de(s) élève(s)."
		});
	});
	
	
}


