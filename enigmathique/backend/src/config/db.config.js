/**
 * Configuration de la base de données
 */

// TODO: Mettre les informations sensibles dans un fichier .env

module.exports = {
	HOST: "localhost",
	USER: "dev",
	PASSWORD: "dev",
	DB: "enigmathique",
	dialect: "postgres",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
}