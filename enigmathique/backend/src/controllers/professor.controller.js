const bcrypt = require('bcrypt');
/**
 * Définition des opérations CRUD pour les professeurs
*/

const db = require("../models/db.js");
const Professor = db.professor;
const Op = db.Sequelize.Op;

// Créer et enregistrer un nouveau professeur
exports.create = (req, res) => {


	//sconst existingProfessor = await Professor.findOne({mail: req.body.mail });
	



	// Valider la requête
	// TODO: Vérifier que le mail est bien un mail
	// TODO: Vérifier que le mot de passe est assez fort
	if (!req.body.lastname || !req.body.firstname || !req.body.mail || !req.body.password) {
		res.status(400).send({
			message: "Il manque des informations pour créer le professeur."
		});
		return;
	}

	// Créer un professeur
	const professor = {
		lastname: req.body.lastname,
		firstname: req.body.firstname,
		mail: req.body.mail,
		password: bcrypt.hashSync(req.body.password, 10),
	};


	// Enregistrer le professeur dans la base de données
	Professor.create(professor)
		.then(data => {
			res.status(201).send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la création du professeur."
			});
		});
}

// Gère la connexion d'un professeur
exports.login = async (req, res) => {

	// Verifie que le mail et le password ont été indiqués
	if(!req.body.mail || !req.body.password){
		res.status(400).send({
			message: "Il manque des informations pour créer se connecter."
		});
		return;
	}

	// Essaye de récuperer le professeur dans la DB à partir du mail
	const existingProfessor = await Professor.findOne({ where: { mail: req.body.mail } });

	// Si ce prof existe
	if(existingProfessor){

		// On récupère le mdp du prof
		const password = existingProfessor['dataValues']['password']

		// On vérifie qu'il s'agissent du bon mdp
		if(bcrypt.compareSync(req.body.password, password)){
			res.status(200).send({
				message: "Bon MDP"
			});
			return;
		}
		res.status(400).send({
			message: "Mauvais mdp"
		});
		return;
	}
	// Si le prof n'existe pas on renvoie une erreur
	res.status(400).send({
		message: "Aucun compte ne correspond au mail indiqué."
	});
	return;
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