// Génère des données de test pour la base de données
const faker = require('faker');
const db = require('../../models/db.js');



const Professor = db.professor;

const generateProfessor = () => {
	const professor = {
		lastname: faker.name.lastName(),
		firstname: faker.name.firstName(),
		mail: faker.internet.email(),
		password: faker.internet.password()
	};
	
	Professor.create(professor)
		.then(data => {
			console.log(data);
		})
		.catch(err => {
			console.log(err.message || "Une erreur s'est produite lors de la création du professeur.");
		});	
};

const generateProfessors = (n) => {
	for (let i = 0; i < n; i++) {
		generateProfessor();
	}
}

// Can't use await outside of an async function
//await db.sequelize.sync({force: true});
// Fix
db.sequelize.sync({force: true}).then(() => {
	generateProfessors(10);
});
