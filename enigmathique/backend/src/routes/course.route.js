/**
 * Définition des routes pour les professeurs (api/professor)
*/

module.exports = app => {
	const course = require("../controllers/course.controller.js");
	const middleware = require("./middleware.js");

	var router = require("express").Router();

	// Créer une nouvelle classe
	router.post("/", middleware.verifyToken, course.create);

	// Récupérer toutes les classes
	router.get("/", middleware.verifyToken, course.findAll);


	app.use("/api/course", router);
}
