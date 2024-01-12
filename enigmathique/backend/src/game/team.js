const clc = require('cli-color');
const { ServerToClient, ClientToServer } = require('./socketMessages');

class SocketTeam {
	constructor(socket, manager) {
		this.socket = socket;
		this.manager = manager;

		this.socket.on(ClientToServer.Message, this.onMessage); 
	}

	getSocket() {
		return this.socket;
	}

	onMessage(data) {
		console.log(clc.yellowBright('[Socket] Message received: '), clc.yellow(data));
	}

	sendMessage(message) {
		this.socket.emit(ServerToClient.Message, message);
	}

	sendScene(sceneName, sceneData) {
		
	}

	clear() {
	}
}

module.exports = SocketTeam;