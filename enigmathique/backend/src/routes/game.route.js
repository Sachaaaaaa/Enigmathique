/**
 * Définition des routes pour les professeurs (api/professor)
*/

module.exports = app => {
	const game = require("../controllers/game.controller.js");
	const middleware = require("./middleware.js");

	var router = require("express").Router();

	// Quatre statues d'une partie : créée, ouverte, en cours, terminée

	// Créer une partie
	router.post("/", middleware.verifyToken, game.create);
	
	// Récupérer toutes les parties du professeur connecté
	router.get("/", middleware.verifyToken, game.findAll);

	// Récupérer une partie à partir de son id
	router.get("/:id", middleware.verifyToken, game.findById);
	

	//post
	// Ouvre une partie (aux élèves)
	router.post("/open/:id", middleware.verifyToken, game.open);

	// post
	// Ferme une partie (aux élèves)
	router.post("/close/:id", middleware.verifyToken, game.close)

	// Récupérer les élèves en fonction du code de la partie (il faut ouvrir la game avant)
	router.get("/course/:code", middleware.verifyToken, game.course)

	app.use("/api/game", router);
}
