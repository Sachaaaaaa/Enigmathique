/**
 * Définition des routes pour les professeurs (api/professor)
*/

module.exports = app => {
	const professors = require("../controllers/professor.controller.js");
	const middleware = require("./middleware.js");

	var router = require("express").Router();

	// Récupérer un professeur par son id
	router.get("/", middleware.verifyToken,professors.findOne);

	// Supprimer une classe du professeur
	router.delete("/", middleware.verifyToken, professors.delete);

	// Mettre à jour une classe du professeur
	router.put("/", middleware.verifyToken, professors.update);

	app.use("/api/professor", router);
}
