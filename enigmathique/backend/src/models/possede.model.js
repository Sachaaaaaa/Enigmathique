/**
 * Modèle de données pour les professeurs
*/

module.exports = (sequelize, Sequelize) => {
	// Définition du modèle
	const Possede = sequelize.define("possede", {
		// Définition des attributs

        // Lien vers l'id de la session de jeu
        idCourse:{
            type: Sequelize.INTEGER,
			allowNull: false, 
			primaryKey: true,
			references: {
				model: 'professor', 
				key: 'id', 
			},
			onUpdate: 'CASCADE', // si mise à jour de la clé primaire référencée on fait en cascade
			onDelete: 'SET NULL', // si suppression de la clé primaire référencée on mets à NULL
        },

		// Lien vers l'id de la session de jeu
		idProfessor:{
			type: Sequelize.INTEGER,
			allowNull: false, 
			primaryKey: true,
			references: {
				model: 'course', 
				key: 'id', 
			},
			onUpdate: 'CASCADE', // si mise à jour de la clé primaire référencée on fait en cascade
			onDelete: 'SET NULL', // si suppression de la clé primaire référencée on mets à NULL
		},

	}, { // Options
		freezeTableName: true, // Ne pas mettre de 's' à la fin du nom de la table
		timestamps: false, // Désactive les colonnes createdAt et updatedAt
	});

	return Possede;
}