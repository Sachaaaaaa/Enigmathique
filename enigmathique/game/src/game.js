const socketio = require('socket.io');
const clc = require('cli-color');
const { ServerToClient, ClientToServer } = require('./socketMessages');
const SocketTeam = require('./team');
const Session = require('./session');
const RoomDefinition = require('./rooms/roomDefinition');

const TICKS_PER_SECOND = 1;

class Game {
	constructor(io) {
		this.io = io;
		this.sessions = {};
		this.roomsData = {};

		this.loadRoomsData();
		this.io.on(ClientToServer.Connection, this.handleConnection);
		this.run(TICKS_PER_SECOND);
	}

	/**
	 * Charge les données des salles.
	 */
	loadRoomsData = () => {
		console.log(clc.yellow('[Game] Chargement des salles...'));
		// Charger depuis JSON
		this.roomsData = [
			new RoomDefinition(require('../data/rooms/Laboratory.json'))
		]

		console.log(clc.green('[Game] Données des salles chargées'));
	};

	handleDisconnection = (socket) => {
		// Supprime les événements
		socket.removeAllListeners();
	};

	handleConnection = (socket) => {
		console.log(clc.green('[Game] Nouvelle connexion ' + socket.id));

		// Recupère l'id de session
		const sessionId = socket.handshake.query.sessionId;

		// TODO: Vérifier si la session est valide
		// { ... }

		// Crée une nouvelle session si elle n'existe pas
		if (!this.sessions[sessionId]) {
			this.sessions[sessionId] = new Session(this, sessionId, [1], this.roomsData);
			console.log(clc.yellow('[Game] Nouvelle session ' + sessionId + ' créée'));
		}

		// Crée une nouvelle équipe et l'ajoute à la session, le reste sera géré dedans
		const team = new SocketTeam(socket, this.sessions[sessionId]);
		this.sessions[sessionId].addTeam(team);
	};

	onSessionEnd = (sessionId) => {
		console.log(clc.yellow('[Game] Fin de la session ' + sessionId));
		delete this.sessions[sessionId];
	};

	run = (ticksPerSecond) => {
		setInterval(() => {
			//console.log(clc.cyan('[Game] Boucle...'));
			for (const sessionId in this.sessions) {
				const session = this.sessions[sessionId];
				session.tick();
			}
		}, 1000 / ticksPerSecond);
	};
}

module.exports = Game;
