const socketio = require('socket.io');
const clc = require('cli-color');
const { ServerToClient, ClientToServer } = require('../socketMessages');
const SocketTeam = require('./connections/socketTeam');
const SocketProfessor = require('./connections/socketProfessor');
const Session = require('./gameSession');
const RoomDefinition = require('./rooms/roomDefinition');
const ApiService = require('../api/api');

const TICKS_PER_SECOND = 1;

class GameManager {
	constructor() {
		this.sessions = {};
		this.roomsData = {};

		this.loadRoomsData();
		this.run(TICKS_PER_SECOND);
	}

	/**
	 * Charge les données des salles.
	 */
	loadRoomsData = () => {
		console.log(clc.yellow('[Game] Chargement des salles...'));
		// Charger depuis JSON
		this.roomsData = [
			new RoomDefinition(require('../../data/rooms/Laboratory.json')),
			new RoomDefinition(require('../../data/rooms/SwitchRoom.json')),
			new RoomDefinition(require('../../data/rooms/DemoRoom.json')),
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

		// Vérifier si la connexion a un token, déjà vérifié dans SocketManager
		const token = socket.handshake.query.token;
		if (token) {

			const professor = new SocketProfessor(socket, this.sessions[sessionId]);
			this.sessions[sessionId].addProfessor(professor);
		} else {
			// Crée une nouvelle équipe et l'ajoute à la session, le reste sera géré dedans
			const team = new SocketTeam(socket, this.sessions[sessionId]);
			this.sessions[sessionId].addTeam(team);
		}
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

module.exports = GameManager;
