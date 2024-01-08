/**
 * Modèle de données pour les classes
*/

module.exports = (sequelize, Sequelize) => {
	// Définition du modèle
	const Class = sequelize.define("course", {
		// Définition des attributs

		// Nom du cours
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		// Lien vers le professeur qui donne le cours
		idProfessor: {
			type: Sequelize.INTEGER,
			allowNull: false, 
			references: {
				model: 'professor', 
				key: 'id', 
			},
			onUpdate: 'CASCADE', // si mise à jour de la clé primaire référencée on fait en cascade
			onDelete: 'SET NULL', // si suppression de la clé primaire référencée on mets à NULL
		},

		

		
	}, { // Options
		freezeTableName: true, // Ne pas mettre de 's' à la fin du nom de la table
		timestamps: false, // Désactive les colonnes createdAt et updatedAt
	});

	return Class;
}
