/**
 * Définition des routes pour les professeurs (api/professor)
*/

module.exports = app => {
	const professors = require("../controllers/professor.controller.js");
	const middleware = require("./middleware.js");
	const bodyParser = require('body-parser');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	var router = require("express").Router();

	// Récupérer un professeur par son id
	router.get("/", middleware.verifyToken,professors.findOne, middleware.verifyErrors);

	// Supprimer le professeur
	router.delete("/", middleware.verifyToken, professors.delete, middleware.verifyErrors);

	// Mettre à jour une le professeur
	router.put("/", middleware.verifyToken, professors.update, middleware.verifyErrors);

	app.use("/api/professor", router);
}
