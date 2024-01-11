/**
 * Définition des routes pour les professeurs (api/student)
*/

module.exports = app => {
	const student = require("../controllers/student.controller.js");
	const middleware = require("./middleware.js");

	var router = require("express").Router();

	// Créer un nouvel élève
	router.post("/", middleware.verifyToken, student.create);

	// Récupérer un élève à partir de son id
	router.get("/:id", middleware.verifyToken, student.findById);

	// Mettre a jour un élève
	router.put("/:id", middleware.verifyToken, student.update);

	// Supprime un élève d'un professeur
	router.delete("/:id", middleware.verifyToken, student.delete);

	

	app.use("/api/student", router);
}
