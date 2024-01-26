/**
 * Définition des routes pour les salles (api/room)
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

	app.use("/api/room", router);
}
