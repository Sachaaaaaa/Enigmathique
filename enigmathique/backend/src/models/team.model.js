/**
 * Modèle de données pour les équipes
 */
module.exports = (sequelize, Sequelize) => {
    // Définition du modèle
    const Team = sequelize.define("team", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false, 
        },
        // Lien vers le l'étudiant contenu dans l'équipe
        idStudent: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false, 
            references: {
                model: 'student', 
                key: 'id', 
            },
            onUpdate: 'CASCADE', // si mise à jour de la clé primaire référencée on fait en cascade
            onDelete: 'SET NULL', // si suppression de la clé primaire référencée on mets à NULL
        },

    }, { // Options
        freezeTableName: true, // Ne pas mettre de 's' à la fin du nom de la table
        timestamps: false, // Désactive les colonnes createdAt et updatedAt
    });

    return Team;
}
