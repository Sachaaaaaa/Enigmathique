// Gère les connecions et déconnexions des utilisateurs
// Stocke les sockets des utilisateurs connectés
// Gère les événements liés aux sockets
// Avec une game loop, pour gérer les temps des enigmes

const socketio = require('socket.io');
const db = require('../models/db.js');
const clc = require('cli-color');

// Server socket, permet de broadcast des événements à tous les utilisateurs connectés
let io;
// Sockets des utilisateurs connectés
const sockets = {};


const handleConnection = (socket) => {
	console.log(clc.greenBright('Un utilisateur s\'est connecté'));

	// Enregistre le socket de l'utilisateur
	sockets[socket.id] = socket;

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

	// Lorsqu'un utilisateur envoie un message
	socket.on('message', (data) => {
		handleMessage(socket, data);
	});

	// Envoie un message à l'utilisateur
	socket.emit('message', 'Hello, World!');
	// Demande à l'utilisateur de charger une scène
	socket.emit('scene', 'LaboratoryVariant');

	// Attends 5 secondes et demande de charger la scène suivante
	setTimeout(() => {
		socket.emit('scene', 'Laboratory');
	}, 5000);
}

const handleDisconnection = (socket) => {
	console.log(clc.yellow('Un utilisateur s\'est déconnecté'));
	
	// Supprime le socket de l'utilisateur
	delete sockets[socket.id];
}

const handleSubmit = (socket, data) => {
	console.log('Un utilisateur a soumis une réponse');
}

const handleHint = (socket, data) => {
	console.log('Un utilisateur a demandé un indice');
}

const handleMessage = (socket, data) => {
	console.log(clc.yellowBright('Un utilisateur a envoyé un message : ' + data));
}

// Initialise le socket.io
const init = (server) => {
	io = socketio(server, {
		cors: {
			origin: '*',
		}
	});

	io.on('connection', (socket) => {
		handleConnection(socket);
	});

	
	// Game loop
	setInterval(() => {
		console.log(clc.blueBright('Loop : ' + Object.keys(sockets).length + ' sockets'));
	}, 1000);
	

	console.log(clc.green('Socket.io initialisé'));
	
	return io;
}

// Exporte les fonctions
module.exports = {
	initSocketio: init
};