/**
 * Définition des opérations CRUD pour les professeurs
*/

const db = require("../models/db.js");
const Professor = db.professor;
const Op = db.Sequelize.Op;

/////////////////////////////////////////////////////////////////////////////////
// 									 CREATE                                    //
/////////////////////////////////////////////////////////////////////////////////

// On ne peut pas créer un professeur ici, c'est dans le controller de l'authentification

/////////////////////////////////////////////////////////////////////////////////
// 									 READ                                      //
/////////////////////////////////////////////////////////////////////////////////

exports.findOne = (req, res) => {

	// Récupère le professeur connecté
	Professor.findOne({ where: { id: req.tokenId } })
		.then(data => {
			return res.status(200).json(data);
		})
		.catch(err => {
			return res.status(404).json({
				message: err.message || "Une erreur s'est produite lors de la récupération des professeurs."
			});
		});
}

/////////////////////////////////////////////////////////////////////////////////
// 									 UPDATE                                    //
/////////////////////////////////////////////////////////////////////////////////

// to do : hash le password
// methode pour mettre à jour le professeur connecté
exports.update = async(req, res) => {
	
	// Stock les changements apportés au professeur	
    const updateData = {};

	// Si le professeur souhaite changer le prénom de l'élève
    if (req.body.firstname) {
    	updateData.firstname = req.body.firstname;
    }

	// Si le professeur souhaite changer le nom de l'élève
    if (req.body.lastname) {
    	updateData.lastname = req.body.lastname;
    }

	// todo : pas deux fois le même mail dans la BD ?
	// Si le professeur souhaite changer le nom de l'élève
	if (req.body.mail) {
		updateData.lastname = req.body.mail;
	}
	

	// Effectue la requête de mise à jour
	await Professor.update(updateData, {where: { id: req.tokenId} })

		// Vérifie que la colonne à effectivement été mise à jour
	  .then(num => {
		if (num == 1) {
			return res.status(201).send({
				message: "Le professeur à été mise a jour avec succès"
			});

		// Si aucunes colonnes traités on relève une erreur
		} else {
			return res.status(404).send({
				message: "Impossible de mettre à jour le professeur"
			});
		}
	  })

	  // Gère les erreurs
	  .catch(err => {
		return res.status(500).send({
			message: err.message || "Une erreur s'est produite lors de la récupération du professeur."
		});
	  });
  };

  
/////////////////////////////////////////////////////////////////////////////////
// 									 DELETE                                    //
/////////////////////////////////////////////////////////////////////////////////


// methode pour supprimer un professeur en fonction de son id
exports.delete = (req, res) => {

	// Effectue la requête de suppression du professeur connecté
	Professor.destroy({ where: { id: req.tokenId} })
	.then(num => {

		// Vérifie si le professeur a bien été supprimé
		if (num == 1) {
		  	return res.status(200).json({
				message: "La classe a été supprimée avec succès"
		});

		// Si aucunes colonnes traités on relève une erreur
		} else {
			return res.status(404).json({
				message: "Impossible de supprimer la classe"
		  });
		}
	  	})

		// Gère les erreurs
		.catch(err => {
			return res.status(500).json({
				message: err.message || "Une erreur s'est produite lors de la récupération des classes."
			});
		});	
}


