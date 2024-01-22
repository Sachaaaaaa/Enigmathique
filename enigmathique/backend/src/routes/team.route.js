/**
 * Définition des routes pour les professeurs (api/student)
*/

module.exports = app => {
	const team = require("../controllers/team.controller.js");
	const middleware = require("./middleware.js");

	var router = require("express").Router();

	const bodyParser = require('body-parser');
	app.use(bodyParser.json());

	// todo : remove un student from a team
	// todo : tout mettre en cascade 


	// Supprime un élève de l'équipe
	router.post("/student/:id", middleware.verifyToken, team.removeStudent, middleware.verifyErrors);

	// Récupère toutes les teams d'une partie
	router.get("/:id", middleware.verifyToken, team.findAll, middleware.verifyErrors);

	// Supprime une équipe
	router.delete("/:id", middleware.verifyToken, team.delete, middleware.verifyErrors);

	// Récupère le score de l'équipe
	router.get("/score/:id", middleware.verifyToken, team.getScore, middleware.verifyErrors);

	// Retourne les élèves d'une team
	router.get("/students/:id", middleware.verifyToken, team.findOne, middleware.verifyErrors);


	
	// interne : 
	
	// Ajoute un élève à une équipe
	router.post("/student/", middleware.verifyGameToken, team.addStudents, middleware.verifyErrors);

	// Ajouter les scores d'une équipe
	router.post("/score/", middleware.verifyGameToken, team.addScores, middleware.verifyErrors);

	app.use("/api/team", router);
}
