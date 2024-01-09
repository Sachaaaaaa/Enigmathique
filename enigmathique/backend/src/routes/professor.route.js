/**
 * Définition des routes pour les professeurs (api/professor)
*/

module.exports = app => {
	const professors = require("../controllers/professor.controller.js");
	const middleware = require("./middleware.js");

	var router = require("express").Router();

	// Récupérer tous les professeurs
	router.get("/", middleware.verifyToken, professors.findAll);

	// Récupérer un professeur par son id
	router.get("/:id", middleware.verifyToken,professors.findOne);

	// Mettre à jour un professeur par son id
	//router.put("/:id", professors.update);

	// Supprimer un professeur par son id
	//router.delete("/:id", professors.delete);

	app.use("/api/professor", router);
}
