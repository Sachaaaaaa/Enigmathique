/**
 * Modèle de données pour le score
 */
module.exports = (sequelize, Sequelize) => {
    // Définition du modèle
    const Score = sequelize.define("score", {

        // Temps 
        time: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        
        // Nombre de bonnes réponses
        nbGoodAnswers: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        // Nombre de mauvaises réponses
        nbBadAnswers: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        // Nombre d'indices utilisés
        nbHints: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        // Lien vers l'id de la session de jeu
        idGameSession:{
            type: Sequelize.INTEGER,
			allowNull: false, 
			references: {
				model: 'gameSession', 
				key: 'id', 
			},
			onUpdate: 'CASCADE', // si mise à jour de la clé primaire référencée on fait en cascade
			onDelete: 'SET NULL', // si suppression de la clé primaire référencée on mets à NULL
        },

        // Lien vers l'id de l'équipe
        idTeam:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'team',
                key: 'id',
            },
        },

        // Lien vers l'id de l'énigme (room)
        idRoom:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'room',
                key: 'id',
            },
        },

    }, { // Options
        freezeTableName: true, // Ne pas mettre de 's' à la fin du nom de la table
        timestamps: false, // Désactive les colonnes createdAt et updatedAt
    });

    return Score;
}
