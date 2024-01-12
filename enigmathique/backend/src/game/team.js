const clc = require('cli-color');
const { ServerToClient, ClientToServer } = require('./socketMessages');

class SocketTeam {
	constructor(socket, manager) {
		this.socket = socket;
		this.manager = manager;

		this.socket.on(ClientToServer.Message, this.onMessage); 
		this.socket.on(ClientToServer.Ready, this.onReady);

		this.isReady = false;
	}

	getSocket() {
		return this.socket;
	}

	onMessage(data) {
		console.log(clc.yellowBright('[Socket] Message reçu: '), clc.yellow(data));
	}

	onReady() {
		console.log(clc.greenBright('[Socket] Ready'));
		this.isReady = true;
	}

	sendMessage(message) {
		console.log(clc.greenBright('[Socket] Envoi message: '), clc.yellow(message));
		this.socket.emit(ServerToClient.Message, message);
	}

	sendScene(roomName, roomData) {
		console.log(clc.greenBright('[Socket] Envoi salle: '), clc.yellow(roomName));

		this.socket.emit(ServerToClient.SwitchRoom, { sceneName: roomName, sceneData: roomData });
		// Attends que le client charge la scène
		this.ready = false;
	}

	clear() {
	}
}

module.exports = SocketTeam;