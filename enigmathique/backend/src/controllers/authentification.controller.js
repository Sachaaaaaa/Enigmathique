/**
 * Définition des opérations CRUD pour les professeurs
*/

require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../models/db.js");
const Professor = db.professor;
const Op = db.Sequelize.Op;
//const secretKey = 'bloubiboulba';

// Génère une chaîne aléatoire de longueur length
// Provient de https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript


// Créer et enregistrer un nouveau professeur
exports.register = async (req, res) => {

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
		salt: bcrypt.genSaltSync(10),
		password: bcrypt.hashSync(req.body.password + process.env.PEPPER_KEY, bcrypt.genSaltSync(10)),
	};



	// Enregistrer le professeur dans la base de données
	Professor.create(professor)
		.then(data => {
      // Génère le token de connexion
      const token = jwt.sign( {id: data['dataValues']['id']}, process.env.SECRET_KEY, { expiresIn: '1h' });
			res.status(201).send({
				token: token,
			});
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

		// On récupère le mdp et le sel du prof
		const password = existingProfessor['dataValues']['password']
		const salt = existingProfessor['dataValues']['salt']

		// On vérifie qu'il s'agissent du bon mdp
		if(bcrypt.compareSync(req.body.password+process.env.PEPPER_KEY, password, salt)) {
      // On récupère l'id du prof pour le token
      const token = jwt.sign({ id: existingProfessor['dataValues']['id'] }, process.env.SECRET_KEY, { expiresIn: '1h' });
			res.status(201).send({
				token: token,
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

