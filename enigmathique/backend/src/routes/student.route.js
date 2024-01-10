/**
 * Définition des routes pour les professeurs (api/student)
*/

module.exports = app => {
	const student = require("../controllers/student.controller.js");
	const middleware = require("./middleware.js");

	var router = require("express").Router();

	// Créer un nouvel élève
	router.post("/", middleware.verifyToken, student.create);

	// Récupérer tous les élèves d'un classe
	router.post("/:id", middleware.verifyToken, student.findById);

	// Récupérer tous les élèves d'un professeur
	router.get("/", middleware.verifyToken, student.findAll);

	// Supprime un élève d'un professeur
	router.delete("/", middleware.verifyToken, student.delete);

	

	app.use("/api/student", router);
}
