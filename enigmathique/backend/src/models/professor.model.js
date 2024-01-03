/**
 * Modèle de données pour les professeurs
*/

module.exports = (sequelize, Sequelize) => {
	// Définition du modèle
	const Professor = sequelize.define("professor", {
		// Définition des attributs
		lastname: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		firstname: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		mail: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: Sequelize.STRING,
			allowNull:false,
		},
		createdAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},
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