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
            onUpdate: 'CASCADE', // si mise à jour de la clé primaire référencée on fait en cascade
			onDelete: 'SET NULL', // si suppression de la clé primaire référencée on mets à NULL   
        },
 
        // Lien vers son équipe
        idTeam:{
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'team',
                key: 'id',
            },
            onUpdate: 'CASCADE', // si mise à jour de la clé primaire référencée on fait en cascade
			onDelete: 'SET NULL', // si suppression de la clé primaire référencée on mets à NULL   
        },
        
    }, { // Options
        freezeTableName: true, // Ne pas mettre de 's' à la fin du nom de la table
        timestamps: false, // Désactive les colonnes createdAt et updatedAt
    });

    return Play;
}
