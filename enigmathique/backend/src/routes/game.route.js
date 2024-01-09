/**
 * Définition des routes pour les professeurs (api/professor)
*/

module.exports = app => {
	const game = require("../controllers/game.controller.js");
	const middleware = require("./middleware.js");

	var router = require("express").Router();

	// Créer une nouvelle partie
	router.post("/", middleware.verifyToken, game.create);

	// Récupérer toutes les partie
	router.get("/", middleware.verifyToken, game.findAll);


	app.use("/api/game", router);
}
