const clc = require('cli-color');
const { ServerToClient, ClientToServer } = require('./socketMessages');
const RoomPlayable = require('./rooms/roomPlayable');

class SocketTeam {
	constructor(socket, session) {
		console.log(clc.greenBright('[Team] Nouvelle équipe'));
		console.log(socket.handshake.query);

		this.socket = socket;
		this.gameSession = session;
		this.teamId = socket.handshake.query.teamId;
		this.room = null;

		this.socket.on(ClientToServer.Message, this.onMessage); 
		this.socket.on(ClientToServer.RoomLoaded, this.onRoomLoaded);
		this.socket.on(ClientToServer.Disconnection, this.onDisconnect);
		this.socket.on(ClientToServer.Submit, this.onSubmit);

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

	onSubmit = ({enigmaId, answer}) => {
		console.log(clc.yellowBright(`[Team] Réponse reçu: (${enigmaId}, ${answer})`));
	
		const isSolved = this.room.checkAnswer(enigmaId, answer);
		const endMessage = isSolved ? this.room.getEndMessage(enigmaId): null;
		console.log(isSolved ? clc.green('[Team] Réponse correcte') : clc.redBright('[Team] Réponse incorrecte'));

		this.socket.emit(ServerToClient.Feedback, { isSolved, endMessage});
	}

	sendMessage = (message) => {
		console.log(clc.yellowBright('[Team] Envoi message: ' + message));
		this.socket.emit(ServerToClient.Message, message);
	}

	/**
	 * 
	 * @param {RoomPlayable} room 
	 */
	sendRoom = (room) => {
		this.room = room;

		const roomName = room.name;
		const roomVariables = room.getEnigmasVariables();

		console.log(clc.yellowBright('[Team] Envoi salle: ' + roomName));
		console.log(room.enigmas);

		this.socket.emit(ServerToClient.SwitchRoom, { roomName, roomVariables });
		// Attends que le client charge la room
		this.haveLoadedRoom = false;
	}

	sendStartRound = () => {
		console.log(clc.yellowBright('[Team] Envoi début du round'));
		this.socket.emit(ServerToClient.StartRound, {});
	}

	sendAnswerFeedback = (enigmaId, isTrue) => {
		console.log(clc.yellowBright('[Team] Envoi feedback réponse'));
		this.socket.emit(ServerToClient.AnswerFeedback, { enigmaId, isTrue });
	}

	clear = () => {
	}
}

module.exports = SocketTeam;