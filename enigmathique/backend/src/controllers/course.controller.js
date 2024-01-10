/**
 * Définition des opérations CRUD pour les classes
*/

const db = require("../models/db.js");
const Course = db.course;
const Op = db.Sequelize.Op;

// Créer et enregistrer une nouvelle classe au professeurs
exports.create = (req, res) => {

	// Valider la requête
	if (!req.body.name) {
		res.status(400).send({
			message: "Il manque des informations pour créer la classe."
		});
		return;
	}

	// Créer une classe
	const course = {
		name: req.body.name,
		idProfessor: req.tokenId,
	};

	// Enregistrer la classe dans la base de données
	Course.create(course)
		// Renvoie les données créées
		.then(data => {
			res.status(201).send(data);
		})
		// Gère les erreurs
		.catch(err => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la création de la classe."
			});
		});
}




// methode pour récuperer les classes du professeur
exports.findAll = (req, res) => {


	Course.findAll({ where: { idProfessor: req.tokenId } })
		.then(data => {
			res.status(200).send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la récupération des classes."
			});
		});	
}




// To do : probleme de dependence avec student
// methode pour supprimer une classe en fonction de son id
exports.delete = (req, res) => {

	// Valider la requête
	if (!req.body.id) {
		res.status(400).send({
			message: "Il manque des informations pour supprimer la classe."
		});
		return;
	}

	Course.destroy({ where: { id: req.body.id, idProfessor: req.tokenId} })
	.then(num => {

		// Vérifie si la classe a bien été supprimé
		if (num == 1) {
		  res.status(200).send({
			message: "La classe a été supprimée avec succès"
		  });

		// Si aucunes colonnes traités on relève une erreur
		} else {
		  res.status(500).send({
			message: "Impossible de supprimer la classe"
		  });
		}
	  	})
		// Gère les erreurs
		.catch(err => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la récupération des classes."
			});
		});	
}




// methode pour mettre à jour une classe en fonction de son id
exports.update = (req, res) => {

	
	// Valider la requête
	if (!req.body.id) {
		res.status(400).send({
			message: "Il manque des informations pour mettre à jour une classe."
		});
		return;
	}
  
	// Effectue la requête de mise à jour
	Course.update(req.body, {

	  where: { id: req.body.id, idProfessor: req.tokenId} })

		// Vérifie que la colonne à effectivement été mise à jour
	  .then(num => {
		if (num == 1) {
		  res.status(200).send({
			message: "La classe à été mise a jour avec succès"
		  });
		// Si aucunes colonnes traités on relève une erreur
		} else {
		  res.status(500).send({
			message: "Impossible de mettre à jour la classe"
		  });
		}
	  })
	  // Gère les erreurs
	  .catch(err => {
		res.status(500).send({
			message: err.message || "Une erreur s'est produite lors de la récupération des classes."
		});
	  });
  };