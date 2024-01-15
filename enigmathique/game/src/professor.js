const clc = require('cli-color');

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
			sampleTeamsData
		});
	}

}

const sampleTeamsData = {
	meta: {
		sessionStartTime: 0,
		roundStartTime: 0,
		currentRound: 0,
		totalEnigma: 10,
	},
	teams: {
		1: [
			{
				room: "Laboratory",
				numSolved: 1,
				numHint: 0,
				isSolved: false,
			}
		],
		4: [
			{
				room: "Laboratory",
				numSolved: 2,
				numHint: 2,
				isSolved: true,
			}
		]
	}
}

module.exports = SocketProfessor;