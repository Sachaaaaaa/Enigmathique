/**
 * Définition des routes pour les professeurs (api/student)
*/

module.exports = app => {
	const team = require("../controllers/team.controller.js");
	const middleware = require("./middleware.js");

	var router = require("express").Router();

	// todo : remove un student from a team
	// todo : tout mettre en cascade 

	// Ajoute un élève à une équipe
	router.post("/student/", middleware.verifyToken, team.addStudents);

	// Ajouter les scores d'une équipe
	router.post("/score/:id", middleware.verifyToken, team.addScores);

	// Supprime un élève de l'équipe
	router.post("/student/:id", middleware.verifyToken, team.removeStudent);

	// Récupère toutes les teams d'une partie
	router.get("/:id", middleware.verifyToken, team.findAll);

	// Supprime une équipe
	router.delete("/:id", middleware.verifyToken, team.delete);

	// Récupère le score de l'équipe
	router.get("/score/:id", middleware.verifyToken, team.getScore);

	// Modifie le score de l'équipe
	router.put("/score/:id", middleware.verifyToken, team.updateScore);

	// Retourne les élèves d'une team
	router.get("/students/:id", middleware.verifyToken, team.findOne);


	

	app.use("/api/team", router);
}
