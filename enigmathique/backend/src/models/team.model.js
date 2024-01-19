/**
 * Modèle de données pour les équipes
 */
module.exports = (sequelize, Sequelize) => {
    // Définition du modèle
    const Team = sequelize.define("team", {
    
        // Lien vers le l'étudiant contenu dans l'équipe
        name: {
            type: Sequelize.STRING,
            allowNull: false, 
        },
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            onUpdate: 'CASCADE', // si mise à jour de la clé primaire référencée on fait en cascade
			onDelete: 'CASCADE', // si suppression de la clé primaire référencée on mets à NULL
          },
				idGame: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: 'game',
						key: 'id'
					}
				},
				

    }, { // Options
        freezeTableName: true, // Ne pas mettre de 's' à la fin du nom de la table
        timestamps: false, // Désactive les colonnes createdAt et updatedAt
    });

    return Team;
}
