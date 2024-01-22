/**
 * Définition des routes pour les professeurs (api/student)
*/

module.exports = app => {
	const student = require("../controllers/student.controller.js");
	const middleware = require("./middleware.js");
	const bodyParser = require('body-parser');
	var router = require("express").Router();

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	// Créer un nouvel élève
	router.post("/", middleware.verifyToken, student.create, middleware.verifyErrors);

	// Récupérer un élève à partir de son id
	router.get("/:id", middleware.verifyToken, student.findById, middleware.verifyErrors);

	// Mettre a jour un élève
	router.put("/:id", middleware.verifyToken, student.update, middleware.verifyErrors);

	// Supprime un élève d'un professeur
	router.delete("/:id", middleware.verifyToken, student.delete, middleware.verifyErrors);

	

	app.use("/api/student", router);
}
