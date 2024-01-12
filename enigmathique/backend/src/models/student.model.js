/**
 * Modèle de données pour les élèves
*/

module.exports = (sequelize, Sequelize) => {
	// Définition du modèle
	const Student = sequelize.define("student", {
		// Définition des attributs

		// Lien vers le cours que suit l'étudiant (sa classe)
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

		// Nom de l'étudiant
		lastname: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		// Prénom de l'étudiant
		firstname: {
			type: Sequelize.STRING,
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
        timestamps: false, // Active les colonnes createdAt et updatedAt
	});

	return Student;
}

