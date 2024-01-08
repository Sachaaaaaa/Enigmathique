// Gère les connecions et déconnexions des utilisateurs
// Stocke les sockets des utilisateurs connectés
// Gère les événements liés aux sockets
// Avec une game loop, pour gérer les temps des enigmes

const socketio = require('socket.io');
const db = require('../models/db.js');

// Server socket, permet de broadcast des événements à tous les utilisateurs connectés
let io;
// Sockets des utilisateurs connectés
const sockets = [];


const handleConnection = (socket) => {
	console.log('Un utilisateur s\'est connecté');

	// Enregistre le socket de l'utilisateur
	sockets.push(socket);

	// Lorsqu'un utilisateur se déconnecte
	socket.on('disconnect', () => {
		handleDisconnection(socket);
	});

	// Lorsqu'un utilisateur soumet une réponse
	socket.on('submit', (data) => {
		handleSubmit(socket, data);
	});

	// Lorsqu'un utilisateur demande un indice
	socket.on('hint', (data) => {
		handleHint(socket, data);
	});		
}

const handleDisconnection = (socket) => {
	console.log('Un utilisateur s\'est déconnecté');
}

const handleSubmit = (socket, data) => {
	console.log('Un utilisateur a soumis une réponse');
}

const handleHint = (socket, data) => {
	console.log('Un utilisateur a demandé un indice');
}

// Initialise le socket.io
const init = (server) => {
	io = socketio(server);

	io.on('connection', (socket) => {
		handleConnection(socket);
	});

	console.log('Socket.io initialisé');

	// Game loop
	setInterval(() => {
		console.log("Game loop");
	}, 1000);

	return io;
}

// Exporte les fonctions
module.exports = {
	initSocketio: init
};