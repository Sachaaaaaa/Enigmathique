const clc = require('cli-color');
const SocketProfessor = require('./connections/socketProfessor');
const SocketTeam = require('./connections/socketTeam');
const CompositionSession = require('./compositionSession');

class TeamCompositionManager {
	constructor() {
		this.sessions = {};
	}

	handleConnection = (socket, sessionId) => {
		console.log(clc.green('[Composition] Nouvelle connexion ' + socket.id));

		
		// TODO: Vérifier si la session est valide
		// { ... }

		// Crée une nouvelle session si elle n'existe pas
		if (!this.sessions[sessionId]) {
			this.sessions[sessionId] = new CompositionSession(this, sessionId);
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