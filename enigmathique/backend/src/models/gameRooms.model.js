/**
 * Modèle de données pour les professeurs
*/

module.exports = (sequelize, Sequelize) => {
	// Définition du modèle
	const Game = sequelize.define("gameRooms", {
		// Définition des attributs

		roomName:{
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'room',
                key: 'name',
            },
            onUpdate: 'CASCADE', // si mise à jour de la clé primaire référencée on fait en cascade
			onDelete: 'CASCADE', // si suppression de la clé primaire référencée on mets à NULL   
        },
		// Date de création de l'objet
		idGame: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'game',
                key: 'id',
            },
            onUpdate: 'CASCADE', // si mise à jour de la clé primaire référencée on fait en cascade
			onDelete: 'CASCADE', // si suppression de la clé primaire référencée on mets à NULL   
		},

	}, { // Options
		freezeTableName: true, // Ne pas mettre de 's' à la fin du nom de la table
		timestamps: false, // Désactive les colonnes createdAt et updatedAt
	});

	return Game;
}