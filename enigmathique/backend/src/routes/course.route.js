/**
 * Définition des routes pour les professeurs (api/professor)
*/

module.exports = app => {
	const course = require("../controllers/course.controller.js");
	const middleware = require("./middleware.js");

	var router = require("express").Router();

	// Créer une nouvelle classe pour le professeur
	router.post("/", middleware.verifyToken, course.create);

	// Récupérer toutes les classes du professeur
	router.get("/", middleware.verifyToken, course.findAll);

	// Récupérer toutes les classes du professeur
	router.get("/:id", middleware.verifyToken, course.findById);

	// Supprimer une classe du professeur
	router.delete("/:id", middleware.verifyToken, course.delete);

	// Mettre à jour une classe du professeur
	router.put("/:id", middleware.verifyToken, course.update);

	app.use("/api/course", router);
}
