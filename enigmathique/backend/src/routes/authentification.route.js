/**
 * Définition des routes pour les professeurs (api/professor)
*/

module.exports = app => {
	const authentification = require("../controllers/authentification.controller.js");

	var router = require("express").Router();


	// Gère la connexion
	router.post("/login", authentification.login);

	// Gère l'enregistrement
	router.post("/register", authentification.register);

	app.use("/api/auth", router);
}
