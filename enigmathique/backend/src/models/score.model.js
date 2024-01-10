/**
 * Modèle de données pour le score
 */
module.exports = (sequelize, Sequelize) => {
    // Définition du modèle
    const Score = sequelize.define("score", {

        idTeam:{
            type: Sequelize.INTEGER,
			allowNull: false, 
			primaryKey: true,
			references: {
				model: 'team', 
				key: 'id', 
			},
			onUpdate: 'CASCADE', // si mise à jour de la clé primaire référencée on fait en cascade
			onDelete: 'SET NULL', // si suppression de la clé primaire référencée on mets à NULL
        },
        idRoom:{
            type: Sequelize.INTEGER,
			allowNull: false, 
			primaryKey: true,
			references: {
				model: 'room', 
				key: 'id', 
			},
			onUpdate: 'CASCADE', // si mise à jour de la clé primaire référencée on fait en cascade
			onDelete: 'SET NULL', // si suppression de la clé primaire référencée on mets à NULL
        },
        idGame:{
            type: Sequelize.INTEGER,
			allowNull: false, 
			primaryKey: true,
			references: {
				model: 'game', 
				key: 'id', 
			},
			onUpdate: 'CASCADE', // si mise à jour de la clé primaire référencée on fait en cascade
			onDelete: 'SET NULL', // si suppression de la clé primaire référencée on mets à NULL
        },
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

    return Score;
}
