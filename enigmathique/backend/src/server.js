/**
 * Point d'entrée du serveur.
 */

// Importe les modules nécessaires
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { initSocketio } = require("./sockets/sockets.js");
const socketio = require("socket.io");
const http = require("http");


// Initialise l'application
const app = express();

// Utilise le middleware bodyParser pour parser les requêtes de type application/json et application/x-www-form-urlencoded (POST)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Utilise le middleware cors pour autoriser les requêtes cross-origin
app.use(cors(origin = "*"));

// Initialise le socket manager
const server = http.createServer(app);
const io = socketio(server, {
	cors: {
		origin: "*"
	}
});
initSocketio(io);


// Initialise la base de données
const db = require("./models/db.js");
db.sequelize.sync();


// Importe les routes
require("./routes/professor.route.js")(app);
require("./routes/course.route.js")(app);
require("./routes/student.route.js")(app);
require("./routes/authentification.route.js")(app);
require("./routes/game.route.js")(app);


// Route par défaut
app.get("/", (req, res) => {
	return res.status(200).json({message: "Hello, World!"});
});

// Lance le serveur
const PORT = 5000;
server.listen(PORT, () => {
	console.log(`Server is running: http://localhost:${PORT}`);
});