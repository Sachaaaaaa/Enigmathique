/**
 * Modèle de données pour les professeurs
*/

module.exports = (sequelize, Sequelize) => {
	// Définition du modèle
	const Professor = sequelize.define("professor", {
		// Définition des attributs

		// Nom du professeur
		lastname: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		// Prénom du professeur
		firstname: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		// Email du professeur
		mail: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},

		// Mot de passe du professeur
		password: {
			type: Sequelize.STRING,
			allowNull:false,
		},

		// Date de création de l'objet
		createdAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},

		// Date de mise à jour de l'objet
		updatedAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},
	}, { // Options
		freezeTableName: true, // Ne pas mettre de 's' à la fin du nom de la table
	});

	return Professor;
}