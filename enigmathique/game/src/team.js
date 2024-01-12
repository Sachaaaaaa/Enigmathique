const clc = require('cli-color');
const { ServerToClient, ClientToServer } = require('./socketMessages');

class SocketTeam {
	constructor(socket, session) {
		console.log(clc.greenBright('[Team] Nouvelle équipe'));
		console.log(socket.handshake.query);
		this.socket = socket;
		this.gameSession = session;
		this.teamId = socket.handshake.query.teamId;

		this.socket.on(ClientToServer.Message, this.onMessage); 
		this.socket.on(ClientToServer.RoomLoaded, this.onRoomLoaded);
		this.socket.on(ClientToServer.Disconnection, this.onDisconnect);

		this.haveLoadedRoom = false;
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

	onRoomLoaded = () => {
		console.log(clc.yellowBright('[Team] Salle chargée'));
		this.haveLoadedRoom = true;

		this.gameSession.onTeamLoadedRoom(this);
	}

	sendMessage = (message) => {
		console.log(clc.yellowBright('[Team] Envoi message: '), clc.yellow(message));
		this.socket.emit(ServerToClient.Message, message);
	}

	sendRoom = (roomName, roomData) => {
		console.log(clc.yellowBright('[Team] Envoi salle: '), clc.yellow(roomName));

		this.socket.emit(ServerToClient.SwitchRoom, { roomName, roomData });
		// Attends que le client charge la room
		this.haveLoadedRoom = false;
	}

	sendStartRound = () => {
		console.log(clc.yellowBright('[Team] Envoi début du round'));
		this.socket.emit(ServerToClient.StartRound, {});
	}

	clear = () => {
	}
}

module.exports = SocketTeam;