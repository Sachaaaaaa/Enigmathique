/**
 * Modèle de données pour les professeurs
*/

module.exports = (sequelize, Sequelize) => {
	// Définition du modèle
	const Game = sequelize.define("game", {
		// Définition des attributs

		idCourse:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'course',
                key: 'id',
            },
            onUpdate: 'CASCADE', // si mise à jour de la clé primaire référencée on fait en cascade
			onDelete: 'SET NULL', // si suppression de la clé primaire référencée on mets à NULL   
        },
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		state: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		teamSize: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		// Date de création de l'objet
		createdAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},

	}, { // Options
		freezeTableName: true, // Ne pas mettre de 's' à la fin du nom de la table
		timestamps: false, // Désactive les colonnes createdAt et updatedAt
	});

	return Game;
}