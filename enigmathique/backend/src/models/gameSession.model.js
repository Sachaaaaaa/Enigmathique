/**
 * Modèle de données pour les sessions de jeu
 */
module.exports = (sequelize, Sequelize) => {
    // Définition du modèle
    const GameSession = sequelize.define("gameSession", {

        // 
        
    }, { // Options
        freezeTableName: true, // Ne pas mettre de 's' à la fin du nom de la table
        timestamps: false, // Désactive les colonnes createdAt et updatedAt
    });

    return GameSession;
}
