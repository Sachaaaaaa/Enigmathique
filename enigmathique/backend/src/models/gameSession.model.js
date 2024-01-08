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

    }, { // Options
        freezeTableName: true, // Ne pas mettre de 's' à la fin du nom de la table
        timestamps: false, // Désactive les colonnes createdAt et updatedAt
    });

    return GameSession;
}
