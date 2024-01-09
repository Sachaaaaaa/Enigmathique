/**
 * Définition des routes pour les professeurs (api/student)
*/

module.exports = app => {
	const student = require("../controllers/student.controller.js");
	const middleware = require("./middleware.js");

	var router = require("express").Router();

	// Créer un nouvel élève
	router.post("/", middleware.verifyToken, student.create);

	// Récupérer tous les élèves
	router.get("/", middleware.verifyToken, student.findAll);

	app.use("/api/student", router);
}
