const clc = require('cli-color');
const { Socket } = require('socket.io');

const GameManager = require('./game/gameManager');
const TeamCompositionManager = require('./teamComposition/teamCompositionManager');
const { ClientToServer, ConnectionType, ServerToClient } = require('./socketMessages');
const ApiService = require('./api/api');

const infoColor = clc.blue;
const errorColor = clc.red;
const sendColor = clc.green;
const receiveColor = clc.yellow;

/**
 * Gère les connexions des clients
 * Redirige vers les bons gestionnaires
 */
class SocketManager {
	constructor(io) {
		// io => instance de Socket.io
		this.io = io;

		// Gestionnaires
		this.gameManager = new GameManager();
		this.teamCompositionManager = new TeamCompositionManager();

		// Lorsque le serveur reçoit une nouvelle connexion
		this.io.on(ClientToServer.Connection, this.handleConnection);

		console.log(clc.green('[Socket] SocketManager prêt'));
	}

	log(message, color = infoColor) {
		console.log(color('[Socket] ' + message));
	}

	/**
	 * Prend en charge une nouvelle connexion
	 * Redirige vers GameManager ou TeamCompositionManager en fonction du type de connexion
	 * @param {Socket} socket 
	 */
	handleConnection = async(socket) => {
		this.log('Nouvelle connexion ' + socket.id, receiveColor);

		// Vérifier si il y a un id de session (évite reverifier dans chaque gestionnaire)
		const sessionCode = socket.handshake.query.sessionId;
		if (!sessionCode) {
			this.log('Aucun id de session, déconnexion', errorColor)
			socket.emit(ServerToClient.Error, {message: 'Aucun id de session', isFatal: true});
			socket.disconnect();
			return;
		}

		// Vérifier si la session est valide
		const sessionId = await ApiService.getGameIdFromCode(sessionCode);
		if (sessionId == null) {
			this.log('Session invalide, déconnexion', errorColor)
			socket.emit(ServerToClient.Error, {message: 'L\'id de session n\'est pas valide', isFatal: true});
			socket.disconnect();
			return;
		}
		
		// Vérifier l'état de la session
		const sessionState = await ApiService.getGameStateById(sessionId);
		// Si la session est terminée, déconnecte
		if (sessionState == null || sessionState >= 2) {
			this.log('Session terminée, déconnexion', errorColor)
			socket.emit(ServerToClient.Error, {message: 'La session est terminée', isFatal: true});
			socket.disconnect();
			return;
		}

		// Vérifier si la connexion a un token (professeur)
		const token = socket.handshake.query.token;
		if (token) {
			// Vérifier le token du professeur (si valide et si la partie lui appartient)
			const isTokenValid = await ApiService.isTokenValid(token, sessionId);

			// Si token invalide, déconnecte
			if (!isTokenValid) {
				this.log('Token invalide, déconnexion', errorColor)
				socket.emit(ServerToClient.Error, {message: 'Vous n\'êtes pas connecté', isFatal: true});
				socket.disconnect();
				return;
			}			
		}

		// Récupère le type de connexion
		const connectionType = socket.handshake.query.connectionType;

		// Redirige vers le bon gestionnaire
		if (connectionType == ConnectionType.Game && sessionState == 1) {
			this.gameManager.handleConnection(socket, sessionId);
		} else if (connectionType == ConnectionType.TeamComposition && sessionState == 0) {
			this.teamCompositionManager.handleConnection(socket, sessionId);
		} else {
			this.log('Type de connexion inconnu ou la partie n\'est pas dans le même état que la connexion: ' + connectionType + ', déconnexion', errorColor);
			socket.emit(ServerToClient.Error, {message: 'Type de connexion inconnu ou la partie n\'est pas dans le même état que la connexion', isFatal: true});
			socket.disconnect();
		}
	}

}

module.exports = SocketManager;