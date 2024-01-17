const clc = require('cli-color');
const { ClientToServer, ServerToClient } = require('../../socketMessages');

class SocketProfessor {
	constructor(socket, session) {
		console.log(clc.greenBright('[Professor] Nouvelle connexion'));

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

	
	sendAllTeamsProgress = (data) => {
		console.log(clc.yellowBright('[Professor] Envoi de la progression des équipes'));

		this.socket.emit(ServerToClient.AllTeamsProgress, {
			data
		});
	}

}

module.exports = SocketProfessor;