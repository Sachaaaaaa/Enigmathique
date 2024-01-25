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
		console.log(data);
		// Itère toutes les teams dans data
		// data : {metadata: {}, teams: []}
		if (data.teams) {
			console.log(data.teams);
		}

		this.socket.emit(ServerToClient.AllTeamsProgress, {
			data
		});
	}

	sendGameEnded = () => {
		console.log(clc.yellowBright('[Team] Envoi de la fin de la partie'));
		this.socket.emit(ServerToClient.GameEnded);
	}
}

module.exports = SocketProfessor;