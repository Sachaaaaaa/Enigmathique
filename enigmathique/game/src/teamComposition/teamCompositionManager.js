const clc = require('cli-color');
const SocketProfessor = require('./connections/socketProfessor');
const SocketTeam = require('./connections/socketTeam');
const CompositionSession = require('./compositionSession');
const ApiService = require('../api/api');
const { Socket } = require('socket.io');

const infoColor = clc.blue;
const errorColor = clc.red;
const sendColor = clc.green;
const receiveColor = clc.yellow;

/**
 * Gère la composition des équipes
 */
class TeamCompositionManager {
	constructor() {
		this.sessions = {};
	}

	log = (message, color = infoColor) => {
		console.log(color('[CompositionSession ' + message));
	};

	/**
	 * Prend en charge une nouvelle connexion
	 * @param {Socket} socket 
	 * @param {int} sessionId 
	 */
	handleConnection = async(socket, sessionId) => {
		this.log('Nouvelle connexion ' + socket.id, receiveColor);

		// Crée une nouvelle session si elle n'existe pas
		if (!this.sessions[sessionId]) {
			const maxTeamSize = await ApiService.getMaxTeamSizeFromId(sessionId);
			this.sessions[sessionId] = new CompositionSession(this, sessionId, maxTeamSize);
			this.log('Nouvelle session ' + sessionId + ' créée', infoColor);
		}

		// Vérifier si la connexion a un token
		// S'il y a un token, c'est un professeur qui a déjà été vérifié
		const token = socket.handshake.query.token;

		// Ajoute la socket à la session
		if (token) {
			const professor = new SocketProfessor(socket, this.sessions[sessionId]);
			this.sessions[sessionId].addProfessor(professor);
		} else {
			const team = new SocketTeam(socket, this.sessions[sessionId]);
			this.sessions[sessionId].addTeam(team);
		}
	}
}

module.exports = TeamCompositionManager;