/**
 * Définition des routes pour les équipes (api/teams)
*/

module.exports = app => {
	const team = require("../controllers/team.controller.js");
	const middleware = require("./middleware.js");
	var router = require("express").Router();
	const bodyParser = require('body-parser');
	app.use(bodyParser.json());


	// Supprime un élève de l'équipe
	router.post("/student/:id", middleware.verifyToken, team.removeStudent, middleware.verifyErrors);

	// Récupère les infos d'une équipe en fonction de son id
	router.get("/:id", middleware.verifyToken, team.findOne, middleware.verifyErrors);

	// Récupère toutes les équipes d'une partie
	router.get("/game/:id", middleware.verifyToken, team.findByGame, middleware.verifyErrors);

	// Supprime une équipe
	router.delete("/:id", middleware.verifyToken, team.delete, middleware.verifyErrors);

	// Récupère le score de l'équipe
	router.get("/score/:id", middleware.verifyToken, team.getScore, middleware.verifyErrors);

	// Retourne les élèves d'une team
	router.get("/students/:id", middleware.verifyToken, team.findStudents, middleware.verifyErrors);


	
	// interne : 
	
	// Ajoute les élève à une équipe
	router.post("/student/", middleware.verifyGameToken, team.addStudents, middleware.verifyErrors);

	// Ajouter les scores à une équipe
	router.post("/score/", middleware.verifyGameToken, team.addScores, middleware.verifyErrors);

	app.use("/api/team", router);
}
