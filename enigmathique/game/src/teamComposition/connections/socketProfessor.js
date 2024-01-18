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

		this.socket.on(ClientToServer.ValidateTeam, this.onConfirmTeamComposition);
		this.socket.on(ClientToServer.RefuseTeam, this.onRefuseTeamComposition);
		this.socket.on(ClientToServer.Disconnection, this.onDisconnect);
		this.socket.on(ClientToServer.FinishComposition, this.onFinishComposition);
	}

	onDisconnect = () => {
		console.log(clc.redBright('[Professor] Déconnexion'));
		this.socket.removeAllListeners();
	}

	onConfirmTeamComposition = (data) => {
		console.log(data);
		console.log(clc.yellowBright('[Professor] Confirmation de la composition de l\'équipe ' + data.id));

		this.manager.confirmTeamComposition(data.id);
	}

	onRefuseTeamComposition = (data) => {
		console.log(clc.yellowBright('[Professor] Annulation de la composition de l\'équipe ' + data.id));

		this.manager.refuseTeamComposition(data.id);
	}

	onFinishComposition = () => {
		console.log(clc.yellowBright('[Professor] Fin de la composition'));

		this.manager.finishComposition();
	}

	sendComposition = (availableStudents, lockedTeams, confirmedTeams) => {
		console.log(clc.yellowBright('[Professor] Envoi de la composition'));
		
		this.socket.emit(ServerToClient.SyncTeams, {
			availableStudents,
			lockedTeams,
			confirmedTeams
		});
	}

	sendSessionStart = () => {
		console.log(clc.yellowBright('[Professor] Envoi du début de la session'));

		this.socket.emit(ServerToClient.CompositionFinished);
	}
}

module.exports = SocketProfessor;