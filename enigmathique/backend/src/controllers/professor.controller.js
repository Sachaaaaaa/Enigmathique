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

// Récupérer tous les professeurs de la base de données
exports.findAll = (req, res) => {
	Professor.findAll()
		.then(data => {
			res.status(200).send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la récupération des professeurs."
			});
		});
}