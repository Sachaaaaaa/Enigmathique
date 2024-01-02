/**
 * Définition des routes pour les professeurs (api/professor)
*/

module.exports = app => {
	const professors = require("../controllers/professor.controller.js");

	var router = require("express").Router();

	// Créer un nouveau professeur
	router.post("/", professors.create);

	// Récupérer tous les professeurs
	router.get("/", professors.findAll);

	// Récupérer un professeur par son id
	//router.get("/:id", professors.findOne);

	// Mettre à jour un professeur par son id
	//router.put("/:id", professors.update);

	// Supprimer un professeur par son id
	//router.delete("/:id", professors.delete);

	app.use("/api/professor", router);
}
