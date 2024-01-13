const socketio = require('socket.io');
const clc = require('cli-color');
const { ServerToClient, ClientToServer } = require('./socketMessages');
const SocketTeam = require('./team');
const Session = require('./session');

const TICKS_PER_SECOND = 1;

class Game {
	constructor(io) {
		this.io = io;
		this.sessions = {};
		this.roomsData = {};

		this.io.on(ClientToServer.Connection, this.handleConnection);
		this.loadRoomsData();
		this.run(TICKS_PER_SECOND);
	}

	/**
	 * Charge les données des salles.
	 */
	loadRoomsData = () => {
		console.log(clc.yellow('[Game] Chargement des salles...'));
		// Charger depuis JSON
		// { ... }
		// Pour l'instant
		this.roomsData = roomsData;
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
			console.log(
				clc.yellow('[Game] Nouvelle session ' + sessionId + ' créée')
			);
			this.sessions[sessionId] = new Session(this, sessionId, 1, roomsData);
		}

		// Crée une nouvelle équipe et l'ajoute à la session, le reste sera géré dedans
		const team = new SocketTeam(socket, this.sessions[sessionId]);
		this.sessions[sessionId].addTeam(team);
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

// Pour l'instant dans le code, les salles sont codées en dur
const roomsData = [
	{
		name: 'Laboratory',
		data: {
			enigmas: [ // TODO: Définir intervalles et générer aléatoirement lors de l'assignement à une team
				{
					x: 2,
					y: 42,
				},
				{
					x:2
				}
			],
		},
	},
];

module.exports = Game;
