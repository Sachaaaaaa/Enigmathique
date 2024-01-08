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

		// Lien vers l'équipe qui suit le cours
		teamId: {
			type: Sequelize.INTEGER,
			allowNull: true, // permettre null si l'étudiant n'est pas dans une équipe
			references: {
				model: 'team', // référence le modèle 'team'
				key: 'id', // référence la clé primaire 'id' du modèle 'team'
			},
			onUpdate: 'CASCADE', // si une équipe est mise à jour, 'teamId' est mis à jour
			onDelete: 'SET NULL', // si une équipe est supprimée, 'teamId' est mis à null
		},

	}, { // Options
		freezeTableName: true, // Ne pas mettre de 's' à la fin du nom de la table
        timestamps: false, // Désactive les colonnes createdAt et updatedAt
	});

	return Student;
}

