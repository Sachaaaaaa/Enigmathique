/**
 * Définition des opérations CRUD pour les professeurs
*/


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsYXN0bmFtZSI6ImxvdWlzIiwiZmlyc3RuYW1lIjoiamVhbiIsIm1haWwiOiJqZWFhYWFuYUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRLbHZ1V0xWRWR0b01zbGJwdW1MTzQub1ZnTkh6cFlKWEV3aGhKbUNSMFJOeGdDYlpmUzVILiIsImlhdCI6MTcwNDc4NjAxOSwiZXhwIjoxNzA0Nzg5NjE5fQ.08vZdB0yKxcHwZMrPa7hJmZl80q0mQ_76W-9NP0zYRs
const db = require("../models/db.js");
const Professor = db.professor;
const Op = db.Sequelize.Op;


exports.findOne = (req, res) => {


	Professor.findOne({ where: { id: req.tokenId } })
		.then(data => {
			res.status(200).send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la récupération des professeurs."
			});
		});
}


// methode pour supprimer un professeur en fonction de son id
exports.delete = (req, res) => {

	Professor.destroy({ where: { id: req.tokenId} })
	.then(num => {

		// Vérifie si le professeur a bien été supprimé
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



// to do : hash le password
// methode pour mettre à jour un professeur en fonction de son id
exports.update = (req, res) => {
	console.log(req.body)
	
	// Effectue la requête de mise à jour
	Professor.update(req.body, {where: { id: req.tokenId} })
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