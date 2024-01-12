const socketio = require('socket.io');
const clc = require('cli-color');
const { ServerToClient, ClientToServer } = require('./socketMessages');
const SocketTeam = require('./team');

const TICKS_PER_SECOND = 0.1;

class Game {
	/**
	 * Initialise le jeu.
	 * @param {http.Server} server 
	 */
	constructor(server) {
		this.initSocketio(server);
		this.loadRoomsData();
		this.run(TICKS_PER_SECOND);
	}

	/**
	 * Initialise le socket manager.
	 * @param {http.Server} server - Le serveur HTTP.
	 * @returns {socketio.Server} Le socket manager.
	 */
	initSocketio(server) {
		this.io = socketio(server, {
			cors: {
				origin: '*',
			},
		});
		this.io.on(ClientToServer.Connection, this.handleConnection);
		return this.io;
	}

	/**
	 * Charge les données des salles.
	 */
	loadRoomsData() {
		console.log(clc.yellow('[Game] Chargement des salles...'));
		// { ... }
		console.log(clc.green('[Game] Données des salles chargées'));
	}

	handleDisconnection(socket) {
		// Supprime les événements
		socket.removeAllListeners();
	}

	handleConnection(socket) {
		console.log(clc.green('[Game] Nouvelle connexion'));
		// Permet de gérér la déconnexion
		socket.on(ClientToServer.Disconnection, (socket) => this.handleDisconnection(socket));

		// Sleep 5s
		setTimeout(() => {
			// Crée une nouvelle équipe
			const team = new SocketTeam(socket, this);
			team.sendMessage('Bienvenue !');
			team.sendScene('Laboratory', {});
		}, 5000);


	}

	run(ticksPerSecond) {
		setInterval(() => {
			console.log(clc.cyan('[Game] Boucle...'));
		}, 1000 / ticksPerSecond);
	}

}

module.exports = Game;