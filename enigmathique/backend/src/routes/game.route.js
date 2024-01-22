/**
 * Définition des routes pour les professeurs (api/professor)
*/

module.exports = app => {
	const game = require("../controllers/game.controller.js");
	const middleware = require("./middleware.js");
	var router = require("express").Router();
	const bodyParser = require('body-parser');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	// Quatre statues d'une partie : créée, ouverte, en cours, terminée

	// Créer une partie
	router.post("/", middleware.verifyToken, game.create, middleware.verifyErrors);


	// Ajouter les salles
	router.post("/rooms/", middleware.verifyToken, game.addRooms, middleware.verifyErrors);

	// Récupérer toutes les parties du professeur connecté
	router.get("/", middleware.verifyToken, game.findAll, middleware.verifyErrors);

	// Récupérer une partie à partir de son id
	router.get("/:id", middleware.verifyToken, game.findOne, middleware.verifyErrors);

	// Récupère tout les scores d'une partie
	router.get("/score/:id", middleware.verifyToken, game.getScore, middleware.verifyErrors);

	// Ouvre une partie (aux élèves)
	router.post("/open/:id", middleware.verifyToken, game.open, middleware.verifyErrors);

	// Ferme une partie (aux élèves)
	router.post("/close/:id", middleware.verifyToken, game.close, middleware.verifyErrors)

	// Supprime une partie
	router.delete("/delete/:id", middleware.verifyToken, game.delete, middleware.verifyErrors)

	// Méthode interne :

	// Y'a moyen de rassembler plusieurs méthodes en une seule
	// teams + rooms | 
	
	// Accepte une équipe au sein de la partie
	//router.post("/team/accept/:id", middleware.verifyToken, game.accept);

	// Termine une partie 
	router.post("/end/:id", middleware.verifyGameToken, game.end, middleware.verifyErrors)

	// Récupère les score d'une partie 
	router.post("/score/:id", middleware.verifyGameToken, game.getScore, middleware.verifyErrors)

	// Récupérer les élèves en fonction du code de la partie (il faut ouvrir la game avant)
	router.get("/course/:id", middleware.verifyGameToken, game.course, middleware.verifyErrors)

	// Récupérer l'état d'une à partir de son id
	router.get("/gameState/:id", middleware.verifyGameToken, game.getState, middleware.verifyErrors);

	// Récupérer la taille max des équipes d'une partie à partir de son id
	router.get("/maxTeamSize/:id", middleware.verifyGameToken, game.getMaxTeamSize, middleware.verifyErrors);

	// Récupérer les rooms d'une à partir de son id
	router.get("/rooms/:id", middleware.verifyGameToken, game.getRooms, middleware.verifyErrors);

	// Récupérer les équipes d'une partie à partir de son id
	router.get("/teams/:id", middleware.verifyGameToken, game.getTeams, middleware.verifyErrors)

	// Vérifie si une partie, à partir de son id, appartient au prof
	router.post("/gameBelongsToProf/:id", middleware.verifyGameToken, game.gameBelongsToProf, middleware.verifyErrors)
	
	// Récupérer l'id de la game à partir du code
	router.get("/getIdFromCode/:code", middleware.verifyGameToken, game.getIdFromCode, middleware.verifyErrors);
	


	app.use("/api/game", router);
}
