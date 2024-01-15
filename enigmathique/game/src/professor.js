const clc = require('cli-color');
const { ClientToServer, ServerToClient } = require('./socketMessages');

class SocketProfessor {
	constructor(socket, session) {
		this.socket = socket;
		this.session = session;

		this.socket.on(ClientToServer.Disconnection, this.onDisconnect);
	}

	onDisconnect = () => {
		console.log(clc.redBright('[Professor] Déconnexion'));
		this.socket.removeAllListeners();
	}

	sendTeamProgress = (teamId, progress) => {
		console.log(clc.yellowBright('[Professor] Envoi de la progression de l\'équipe ' + teamId));

		this.socket.emit(ServerToClient.TeamProgress, {
			teamId,
			progress
		});
	}

	// TODO: Envoyer un seul message avec toutes les équipes
	sendAllTeamsProgress = (teamsProgress) => {
		console.log(clc.yellowBright('[Professor] Envoi de la progression des équipes'));

		this.socket.emit(ServerToClient.AllTeamsProgress, {
			teamsProgress
		});
	}

}

module.exports = SocketProfessor;