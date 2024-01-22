/**
 * Définition des routes pour les professeurs (api/professor)
*/

module.exports = app => {
	const authentification = require("../controllers/authentification.controller.js");

	const middleware = require("./middleware.js");
	const bodyParser = require('body-parser');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	var router = require("express").Router();


	// Gère la connexion
	router.post("/login", authentification.login, middleware.verifyErrors);

	// Gère l'enregistrement
	router.post("/register", authentification.register, middleware.verifyErrors);
	
	// Gère la deconnexion
	router.post("/logout", authentification.logout, middleware.verifyErrors);

	app.use("/api/auth", router);
}
