const clc = require('cli-color');
const { ServerToClient, ClientToServer } = require('./socketMessages');

class SocketTeam {
	constructor(socket, session) {
		console.log(clc.greenBright('[Team] Nouvelle équipe'));
		this.socket = socket;
		this.gameSession = session;

		this.socket.on(ClientToServer.Message, this.onMessage); 
		this.socket.on(ClientToServer.Ready, this.onReady);
		this.socket.on(ClientToServer.Disconnection, this.onDisconnect);

		this.sendMessage('Bienvenue dans Enigmathique !');
		this.sendRoom('Laboratory', {});

		this.isReady = false;
	}

	getSocket = () => {
		return this.socket;
	}

	onDisconnect = () => {
		console.log(clc.redBright('[Team] Déconnexion'));
		this.socket.removeAllListeners();
		this.gameSession.removeTeam(this);
	}

	onMessage = (data) => {
		console.log(clc.yellowBright('[Team] Message reçu: '), clc.yellow(data));
	}

	onReady = () => {
		console.log(clc.greenBright('[Team] Ready'));
		this.isReady = true;
		this.gameSession.onTeamReady(this);
	}

	sendMessage = (message) => {
		console.log(clc.greenBright('[Team] Envoi message: '), clc.yellow(message));
		this.socket.emit(ServerToClient.Message, message);
	}

	sendRoom = (roomName, roomData) => {
		console.log(clc.greenBright('[Team] Envoi salle: '), clc.yellow(roomName));

		this.socket.emit(ServerToClient.SwitchRoom, { roomName, roomData });
		// Attends que le client charge la scène
		this.ready = false;
	}

	clear = () => {
	}
}

module.exports = SocketTeam;