/**
 * Définition des routes pour les professeurs (api/student)
*/

module.exports = app => {
	const course = require("../controllers/student.controller.js");

	var router = require("express").Router();

	// Créer un nouvel élève
	router.post("/", course.create);

	app.use("/api/student", router);
}
