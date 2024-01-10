/**
 * Définition des routes pour les professeurs (api/student)
*/

module.exports = app => {
	const team = require("../controllers/team.controller.js");
	const middleware = require("./middleware.js");

	var router = require("express").Router();

	// Ajoute un élève à une équipe
	router.post("/", middleware.verifyToken, team.addStudent);

	// Retourne les élèves d'une team
	router.post("/:id", middleware.verifyToken, team.findAll);



	

	app.use("/api/team", router);
}
