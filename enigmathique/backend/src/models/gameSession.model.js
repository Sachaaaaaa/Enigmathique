/**
 * Modèle de données pour les sessions de jeu
 */
module.exports = (sequelize, Sequelize) => {
    // Définition du modèle
    const GameSession = sequelize.define("gameSession", {

        // date de début de la session
        dateStart: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        // Lien vers l'id de la classe
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

    return GameSession;
}
