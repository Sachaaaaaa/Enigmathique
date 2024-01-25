const clc = require('cli-color');
const { ServerToClient, ClientToServer } = require('../../socketMessages');
const RoomPlayable = require('../rooms/roomPlayable');

class SocketTeam {
	constructor(socket, session) {
		console.log(clc.greenBright('[Team] Nouvelle équipe'));

		this.socket = socket;
		this.gameSession = session;
		this.teamId = socket.handshake.query.teamId;
		
		// Rooms que l'équipe a traversé / est en train de traverser
		this.rooms = [];
		this.currentRoom = null;

		// Enregistre les callbacks
		this.socket.on(ClientToServer.Message, this.onMessage); 
		this.socket.on(ClientToServer.RoomLoaded, this.onRoomLoaded);
		this.socket.on(ClientToServer.Disconnection, this.onDisconnect);
		this.socket.on(ClientToServer.Submit, this.onSubmit);
		this.socket.on(ClientToServer.AskHint, this.onAskHint);

		// Permet d'attendre que tout le monde ait chargé sa room
		this.haveLoadedRoom = false;
	}

	/**
	 * 
	 * @returns {Object} La progression de l'équipe
	 */
	getProgressionData = () => {
		const roomsData = [];

		this.rooms.forEach(room => {
			const roomData = room.getData();
			roomsData.push(roomData);
		});

		return roomsData;
	}

	getDataPlusPlus = () => {
		const data = this.getProgressionData();
		// Ajoute le nom de l'équipe
		data.teamName = this.teamId;
	}

	onDisconnect = () => {
		console.log(clc.redBright('[Team] Déconnexion'));
		this.leaved = true;
		this.socket.removeAllListeners();
		this.gameSession.onTeamLeave(this);
	}

	// Debug
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
	
		// Vérifie si la réponse a déjà été donnée
		if (this.currentRoom.enigmasSolved.includes(enigmaId)) {
			console.log(clc.redBright('[Team] Réponse déjà donnée'));
			return;
		}

		const isSolved = this.currentRoom.checkAnswer(enigmaId, answer);
		const endMessage = isSolved ? this.currentRoom.getEndMessage(enigmaId): null;
		console.log(isSolved ? clc.green('[Team] Réponse correcte') : clc.redBright('[Team] Réponse incorrecte'));

		this.sendAnswerFeedback(enigmaId, isSolved, endMessage);

		if (isSolved) {
			this.currentRoom.onRoomClosed();

			this.gameSession.onTeamSolvedEnigma(this, enigmaId);
			if (this.currentRoom.enigmasSolved.length == this.currentRoom.enigmas.length) {
				this.sendRoomSolved();
				this.gameSession.onTeamSolvedRoom(this);
			}
		} else {
			this.gameSession.onTeamAnswerWrong(this, enigmaId);
		}
	}

	onAskHint = ({enigmaId}) => {
		console.log(clc.yellowBright(`[Team] Demande d'indice: (${enigmaId})`));

		const hint = this.currentRoom.getHint(enigmaId);

		if (hint) {
			this.sendHint(enigmaId, hint);
		} else {
			console.log(clc.redBright('[Team] Indice non disponible'));
		}

		this.gameSession.onTeamAskHint(this, enigmaId);
	}

	sendMessage = (message) => {
		console.log(clc.yellowBright('[Team] Envoi message: ' + message));
		this.socket.emit(ServerToClient.Message, message);
	}

	/**
	 * Envoie la salle au client, doit la charger pour pouvoir jouer
	 * @param {RoomPlayable} room 
	 */
	sendRoom = (room) => {
		// Si la salle précédente n'était pas finie, appeller onRoomClosed
		if (this.currentRoom && !this.currentRoom.isRoomSolved()) {
			this.currentRoom.onRoomClosed();
		}

		this.rooms.push(room);
		this.currentRoom = room;

		// Extrait les variables pour les mettre dans le message
		const roomName = room.name;
		const roomVariables = room.getEnigmasVariables();

		console.log(clc.yellowBright('[Team] Envoi salle: ' + roomName));

		this.socket.emit(ServerToClient.SwitchRoom, { roomName, roomVariables });

		// Permet d'attendre que le client charge la room
		this.haveLoadedRoom = false;
	}

	sendStartRound = () => {
		console.log(clc.yellowBright('[Team] Envoi début du round'));
		this.socket.emit(ServerToClient.StartRound, {});

		this.currentRoom.onRoomStart();
	}

	sendAnswerFeedback = (enigmaId, isSolved, endMessage) => {
		console.log(clc.yellowBright('[Team] Envoi feedback réponse'));
		this.socket.emit(ServerToClient.Feedback, { enigmaId, isSolved, endMessage });
	}

	sendHint = (enigmaId, hint) => {
		console.log(clc.yellowBright('[Team] Envoi indice'));
		this.socket.emit(ServerToClient.Hint, { enigmaId, hint });
	}

	sendRoomSolved = () => {
		console.log(clc.yellowBright('[Team] Envoi de la résolution de la salle'));
		this.socket.emit(ServerToClient.RoomSolved);
	}

	sendGameEnded = () => {
		console.log(clc.yellowBright('[Team] Envoi de la fin de la partie'));
		this.socket.emit(ServerToClient.GameEnded);
	}
}

module.exports = SocketTeam;