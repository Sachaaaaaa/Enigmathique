/**
 * Ce fichier crée une instance de Sequelize et l'exporte
*/

const dbConfig = require("../config/db.config.js");

// Sequelize est un ORM (Object-Relational Mapping) pour Node.js
// Il permet de manipuler des bases de données relationnelles (SQL) avec des objets JavaScript
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	port:'5432',
	dialect: dbConfig.dialect,
	operatorsAliases: false,
	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	}
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Ajouter les modèles ici

db.professor = require("./professor.model.js")(sequelize, Sequelize);
db.student = require("./student.model.js")(sequelize, Sequelize);
db.course = require("./course.model.js")(sequelize, Sequelize);
db.team = require("./team.model.js")(sequelize, Sequelize);
db.game = require("./game.model.js")(sequelize, Sequelize);
db.room = require("./room.model.js")(sequelize, Sequelize);
db.score = require("./score.model.js")(sequelize, Sequelize);
//db.gameCode = require("./gameCode.model.js")(sequelize, Sequelize);
db.gameRooms = require("./gameRooms.model.js")(sequelize, Sequelize);
db.playIn = require("./playIn.model.js")(sequelize, Sequelize);
db.token = require("./token.model.js")(sequelize, Sequelize);
//
//db.gameSession = require("./gameSession.model.js")(sequelize, Sequelize);
//db.play = require("./play.model.js")(sequelize, Sequelize);
// TODO: ajouter le modele pour DateSupression

// ---------------------------------------------

module.exports = db;