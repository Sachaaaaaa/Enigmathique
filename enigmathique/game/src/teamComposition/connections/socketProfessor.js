const clc = require('cli-color');
const { Socket } = require('socket.io');
const TeamCompositionManager = require('../teamCompositionManager');
const { ClientToServer, ServerToClient } = require('../../socketMessages');

const infoColor = clc.cyan;
const errorColor = clc.redBright;
const sendColor = clc.green;
const receiveColor = clc.yellow;

class SocketProfessor {
	/**
	 * 
	 * @param {Socket} socket 
	 * @param {TeamCompositionManager} session 
	 */
	constructor(socket, session) {	
		this.socket = socket;
		this.manager = session;
		
		this.log('Nouvelle connexion');

		// Enregistre les événements
		this.socket.on(ClientToServer.ValidateTeam, this.onConfirmTeamComposition);
		this.socket.on(ClientToServer.RefuseTeam, this.onRefuseTeamComposition);
		this.socket.on(ClientToServer.Disconnection, this.onDisconnect);
		this.socket.on(ClientToServer.FinishComposition, this.onFinishComposition);
	}

	log = (message, color = infoColor) => {
		console.log(color(`[Professor ${this.socket.id}] ` + message));
	};

	
	/**
	 * Event appelé lors de la déconnexion du professeur
	 */
	onDisconnect = () => {
		this.log('Déconnexion', errorColor);
		this.socket.removeAllListeners();
	}

	/**
	 * Event appelé lors de la validation de la composition d'une équipe
	 * @param {*} data 
	 */
	onConfirmTeamComposition = (data) => {
		this.log('Confirmation de la composition de l\'équipe ' + data.id, receiveColor);
		this.manager.confirmTeamComposition(data.id);
	}

	/**
	 * Event appelé lors du refus de la composition d'une équipe
	 */
	onRefuseTeamComposition = (data) => {
		this.log('Annulation de la composition de l\'équipe ' + data.id, receiveColor);
		this.manager.refuseTeamComposition(data.id);
	}

	/**
	 * Event appelé lors de la fin de la composition (professeur valide)
	 */
	onFinishComposition = () => {
		this.log('Fin de la composition', receiveColor);
		this.manager.finishComposition();
	}

	/**
	 * Envoie la composition des équipes
	 * @param {Array} availableStudents 
	 * @param {Array} lockedTeams 
	 * @param {Array} confirmedTeams 
	 */
	sendComposition = (availableStudents, lockedTeams, confirmedTeams) => {
		this.log('Envoi de la composition', sendColor);
		
		this.socket.emit(ServerToClient.SyncTeams, {
			availableStudents,
			lockedTeams,
			confirmedTeams
		});
	}

	/**
	 * Envoie la liste des élèves disponibles
	 */
	sendSessionStart = () => {
		this.log('Envoi du début de la session', sendColor);
		this.socket.emit(ServerToClient.CompositionFinished);
	}
}

module.exports = SocketProfessor;