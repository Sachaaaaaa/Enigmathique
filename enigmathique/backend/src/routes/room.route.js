/**
 * Définition des routes pour les professeurs (api/professor)
*/

module.exports = app => {
	const course = require("../controllers/room.controller.js");
	const middleware = require("./middleware.js");

	var router = require("express").Router();

	// Récupère toutes les salles de la DB
	router.get("/", middleware.verifyToken, course.findAll);

	// Ajouter une salle à la DB
	router.post("/", middleware.verifyToken, course.create);

	app.use("/api/room", router);
}
