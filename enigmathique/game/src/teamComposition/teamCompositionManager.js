const clc = require('cli-color');
const SocketProfessor = require('./connections/socketProfessor');
const SocketTeam = require('./connections/socketTeam');
const CompositionSession = require('./compositionSession');
const ApiService = require('../api/api');

class TeamCompositionManager {
	constructor() {
		this.sessions = {};
	}

	handleConnection = async(socket, sessionId) => {
		console.log(clc.green('[Composition] Nouvelle connexion ' + socket.id));

		// Crée une nouvelle session si elle n'existe pas
		if (!this.sessions[sessionId]) {
			const maxTeamSize = await ApiService.getMaxTeamSizeFromId(sessionId);
			this.sessions[sessionId] = new CompositionSession(this, sessionId, maxTeamSize);
			console.log(clc.yellow('[Composition] Nouvelle session ' + sessionId + ' créée'));
		}

		// Vérifier si la connexion a un token
		// S'il y a un token, c'est un professeur qui a déjà été vérifié
		const token = socket.handshake.query.token;

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