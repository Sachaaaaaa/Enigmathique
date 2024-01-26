/**
 * Définition des routes pour l'authentification d'un professeur (api/auth)
*/

module.exports = app => {
	const authentification = require("../controllers/authentification.controller.js");
	const middleware = require("./middleware.js");
	const bodyParser = require('body-parser');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	var router = require("express").Router();


	// Gère la connexion du professeur
	router.post("/login", authentification.login, middleware.verifyErrors);

	// Gère l'enregistrement du professeur
	router.post("/register", authentification.register, middleware.verifyErrors);
	
	// Gère la deconnexion du professeur
	router.post("/logout", authentification.logout, middleware.verifyErrors);

	app.use("/api/auth", router);
}
