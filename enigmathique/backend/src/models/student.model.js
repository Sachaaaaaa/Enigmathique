/**
 * Modèle de données pour les élèves
*/

module.exports = (sequelize, Sequelize) => {
	// Définition du modèle
	const Student = sequelize.define("student", {
		// Définition des attributs
        idCourse: {
			type: Sequelize.INTEGER,
			allowNull: false, 
			references: {
				model: 'course', 
				key: 'id', 
			},
			onUpdate: 'CASCADE', // si mise à jour de la clé primaire référencée on fait en cascade
			onDelete: 'SET NULL', // si suppression de la clé primaire référencée on mets à NULL
		},
		lastname: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		firstname: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	}, { // Options
		freezeTableName: true, // Ne pas mettre de 's' à la fin du nom de la table
        timestamps: false, // Désactive les colonnes createdAt et updatedAt
	});

	return Student;
}

