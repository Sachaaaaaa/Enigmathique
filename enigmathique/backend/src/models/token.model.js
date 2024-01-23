/**
 * Modèle de données pour les classes
*/

module.exports = (sequelize, Sequelize) => {
	// Définition du modèle
	const Class = sequelize.define("token", {
		// Définition des attributs

		// Le hash du token
		token: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		// Date d'expiration du token
		createdAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW,
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
		timestamps: true, // Active les colonnes createdAt et updatedAt
	});

	return Class;
}
