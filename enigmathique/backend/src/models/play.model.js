/**
 * Modèle de données pour l'association joue
 */
module.exports = (sequelize, Sequelize) => {
    // Définition du modèle
    const Play = sequelize.define("play", {

        // Lien vers l'étudiant
        idStudent:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'student',
                key: 'id',
            },
        },
 
        // Lien vers son équipe
        idTeam:{
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'team',
                key: 'id',
            },
        },
        
    }, { // Options
        freezeTableName: true, // Ne pas mettre de 's' à la fin du nom de la table
        timestamps: false, // Désactive les colonnes createdAt et updatedAt
    });

    return Play;
}
