/**
 * Modèle de données pour les professeurs
*/

module.exports = (sequelize, Sequelize) => {
	// Définition du modèle
	const GameCode = sequelize.define('gamecode', {
		// Définition des attributs

		// Date de création de l'objet
		code: {
			type: Sequelize.STRING,
			primaryKey: true,
		},
		idGame:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'game',
                key: 'id',
            },
            onUpdate: 'CASCADE', // si mise à jour de la clé primaire référencée on fait en cascade
			onDelete: 'CASCADE', // si suppression de la clé primaire référencée on mets à NULL   
        },
		idCourse:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'course',
                key: 'id',
            },
            onUpdate: 'CASCADE', // si mise à jour de la clé primaire référencée on fait en cascade
			onDelete: 'CASCADE', // si suppression de la clé primaire référencée on mets à NULL   
        },
		createdAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},

	}, { // Options
		freezeTableName: true, // Ne pas mettre de 's' à la fin du nom de la table
		timestamps: false, // Désactive les colonnes createdAt et updatedAt
	});

	return GameCode;
}