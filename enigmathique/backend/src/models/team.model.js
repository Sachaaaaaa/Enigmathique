/**
 * Modèle de données pour les équipes
 */
module.exports = (sequelize, Sequelize) => {
    // Définition du modèle
    const Team = sequelize.define("team", {
        
    }, { // Options
        freezeTableName: true, // Ne pas mettre de 's' à la fin du nom de la table
        timestamps: false, // Désactive les colonnes createdAt et updatedAt
    });

    return Team;
}
