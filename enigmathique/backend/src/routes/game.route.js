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


	// Accepte une équipe au sein de la partie
	router.post("/team/accept/:id", middleware.verifyToken, game.accept);

	// Ajouter les salles
	router.post("/rooms/", middleware.verifyToken, game.addRooms);

	// Récupérer toutes les parties du professeur connecté
	router.get("/", middleware.verifyToken, game.findAll);

	// Vérifie si une partie, à partir de son id, appartient au prof
	router.get("/gameBelongsToProf/{id}", middleware.verifyGameToken, game.gameBelongsToProf);

	// Récupérer une partie à partir de son id
	router.get("/:id", middleware.verifyToken, game.findById);
	

	//post
	// Ouvre une partie (aux élèves)
	router.post("/open/:id", middleware.verifyToken, game.open);

	// post
	// Ferme une partie (aux élèves)
	router.post("/close/:id", middleware.verifyToken, game.close)

	// Termine une partie 
	router.post("/end/:id", middleware.verifyGameToken, game.end)

	// Récupère les score d'une partie 
	router.post("/score/:id", middleware.verifyGameToken, game.getScore)

	// Récupérer les élèves en fonction du code de la partie (il faut ouvrir la game avant)
	router.get("/course/:code", middleware.verifyGameToken, game.course)

	app.use("/api/game", router);
}
