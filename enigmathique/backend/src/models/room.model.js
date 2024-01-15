/**
 * Modèle de données pour l'énigme (la salle)
 */
module.exports = (sequelize, Sequelize) => {
    // Définition du modèle
    const GameSession = sequelize.define("room", {

        // Nom de la salle
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
        },

        // Difficulté de la salle
        difficulty: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        // Nom du chapitre auquel appartient la salle
        chapter: {
            type: Sequelize.STRING,
            allowNull: false,
        },


    }, { // Options
        freezeTableName: true, // Ne pas mettre de 's' à la fin du nom de la table
        timestamps: false, // Désactive les colonnes createdAt et updatedAt
    });

    return GameSession;
}
