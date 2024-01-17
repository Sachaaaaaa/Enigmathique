const clc = require('cli-color');
const { Socket } = require('socket.io');

const GameManager = require('./game/gameManager');
const TeamCompositionManager = require('./teamComposition/teamCompositionManager');
const { ClientToServer, ConnectionType } = require('./socketMessages');
const CompositionSession = require('./teamComposition/compositionSession');
const ApiService = require('./api/api');

class SocketManager {
	constructor(io) {
		this.io = io;

		this.gameManager = new GameManager();
		this.teamCompositionManager = new TeamCompositionManager();

		this.io.on(ClientToServer.Connection, this.handleConnection);

		console.log(clc.green('[Socket] SocketManager prêt'));
	}

	/**
	 * Prend en charge une nouvelle connexion
	 * Redirige vers GameManager ou TeamCompositionManager en fonction du type de connexion
	 * @param {Socket} socket 
	 */
	handleConnection = async(socket) => {
		console.log(clc.green('[Socket] Nouvelle connexion ' + socket.id));

		// Vérifier si il y a un id de session (évite reverifier dans chaque gestionnaire)
		const sessionCode = socket.handshake.query.sessionId;
		if (!sessionCode) {
			console.log(clc.red('[Socket] Aucun id de session, déconnexion'));
			socket.disconnect();
			return;
		}

		// Vérifier si la session est valide
		const sessionId = await ApiService.getGameIdFromCode(sessionCode);
		const sessionState = await ApiService.getGameStateById(sessionId);
		if (sessionState == null || sessionState >= 2) {
			console.log(clc.red('[Socket] Session invalide ou terminée, déconnexion'));
			socket.disconnect();
			return;
		}

		// Vérifier si la connexion a un token (professeur)
		const token = socket.handshake.query.token;
		if (token) {
			// Vérifier le token du professeur (si valide et si la partie lui appartient)
			const isTokenValid = await ApiService.isTokenValid(token, sessionCode);

			// Si token invalide, déconnecte
			if (!isTokenValid) {
				console.log(clc.red('[Socket] Token invalide, déconnexion'));
				socket.disconnect();
				return;
			}			
		}

		// Récupère le type de connexion
		const connectionType = socket.handshake.query.connectionType;

		// Redirige vers le bon gestionnaire
		if (connectionType == ConnectionType.Game) {
			this.gameManager.handleConnection(socket);
		} else if (connectionType == ConnectionType.TeamComposition) {
			this.teamCompositionManager.handleConnection(socket, sessionId);
		} else {
			console.log(clc.red('[Socket] Type de connexion inconnu: ' + connectionType));
		}
	}

}

module.exports = SocketManager;