/**
 * Définition des routes pour les professeurs (api/professor)
*/

module.exports = app => {
	const course = require("../controllers/room.controller.js");
	const middleware = require("./middleware.js");
	const bodyParser = require('body-parser');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	var router = require("express").Router();

	// Récupère toutes les salles de la DB
	router.get("/", middleware.verifyToken, course.findAll, middleware.verifyErrors);

	// Ajouter une salle à la DB
	router.post("/", middleware.verifyToken, course.create, middleware.verifyErrors);

	app.use("/api/room", router);
}
