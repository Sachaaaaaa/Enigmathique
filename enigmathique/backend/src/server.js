/**
 * Point d'entrée du serveur.
 */

// Importe les modules nécessaires
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");

const { initSocketManager } = require("./sockets/socketManager.js");

// Initialise l'application
const app = express();
const server = http.createServer(app);

// Utilise le middleware bodyParser pour parser les requêtes de type application/json et application/x-www-form-urlencoded (POST)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Utilise le middleware cors pour autoriser les requêtes cross-origin
app.use(cors());


// Initialise la base de données
const db = require("./models/db.js");
db.sequelize.sync();


// Importe les routes
require("./routes/professor.route.js")(app);
// Route par défaut
app.get("/", (req, res) => {
	return res.status(200).json({message: "Hello, World!"});
});


// Initialise le socket manager
const io = socketio(server, {
	cors: {
		origin: "*"
	}
});
initSocketManager(io);


// Lance le serveur
const PORT = 5000;
server.listen(PORT, () => {
	console.log(`Server is running: http://localhost:${PORT}`);
});