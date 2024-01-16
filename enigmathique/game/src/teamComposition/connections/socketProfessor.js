const clc = require('cli-color');
const { Socket } = require('socket.io');
const TeamCompositionManager = require('../teamCompositionManager');
const { ClientToServer, ServerToClient } = require('../../socketMessages');

class SocketProfessor {
	/**
	 * 
	 * @param {Socket} socket 
	 * @param {TeamCompositionManager} session 
	 */
	constructor(socket, session) {
		console.log(clc.greenBright('[Professor] Nouvelle connexion'));

		this.socket = socket;
		this.manager = session;

		this.socket.on(ClientToServer.Disconnection, this.onDisconnect);
	}

	onDisconnect = () => {
		console.log(clc.redBright('[Professor] Déconnexion'));
		this.socket.removeAllListeners();
	}

	onConfirmTeamComposition = (teamId) => {
		console.log(clc.yellowBright('[Professor] Confirmation de la composition de l\'équipe ' + teamId));

		this.manager.confirmTeamComposition(teamId);
	}

	onCancelTeamComposition = (teamId) => {
		console.log(clc.yellowBright('[Professor] Annulation de la composition de l\'équipe ' + teamId));

		this.manager.cancelTeamComposition(teamId);
	}

	sendComposition = (availableStudents, lockedTeams, confirmedTeams) => {
		console.log(clc.yellowBright('[Professor] Envoi de la composition'));

		// this.socket.emit(ServerToClient.SyncTeams, {
		// 	availableStudents,
		// 	lockedTeams,
		// 	confirmedTeams
		// })
		
		this.socket.emit(ServerToClient.SyncTeams, {
			availableStudents,
			lockedTeams: {
				
			},
			confirmedTeams
		})
	}
}

module.exports = SocketProfessor;