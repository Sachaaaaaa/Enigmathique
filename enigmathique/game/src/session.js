const socketio = require('socket.io');
const clc = require('cli-color');
const { ServerToClient, ClientToServer } = require('./socketMessages');
const SocketTeam = require('./team');

const TIME_PER_ROUND = 60 * 10; // 10 minutes

class Session {
	constructor(game, sessionId, expectedTeamCount, rooms) {
		this.game = game;
		this.sessionId = sessionId;
		this.teams = [];
		this.rooms = rooms;

		this.roundStart = 0;
		this.isSessionRunning = false;
		this.isPlaying = false;
	}

	getTotalTeamCount = () => {
		return this.teams.length;
	}

	areAllTeamsReady = () => {
		return this.getTotalTeamCount() > 0 && this.teams.every(team => team.isReady);
	}

	addTeam = (team) => {
		this.teams.push(team);

		this.startSession();
	}

	removeTeam = (team) => {
		const index = this.teams.indexOf(team);
		if (index >= 0) {
			this.teams.splice(index, 1);
		}
	}

	startSession = () => {
		console.log(clc.greenBright('[Session] Démarrage de la session'));
		this.isSessionRunning = true;

		this.rotateRooms();
	}

	rotateRooms = () => {
		console.log(clc.greenBright('[Session] Rotation des salles'));
		// TODO: Rotation des salles

		// Envoi la nouvelle salle à chaque équipe
		this.teams.forEach(team => {
			team.sendRoom(this.rooms[0].toRoom());
		});
	}	

	broadcastStartRound = () => {
		console.log(clc.greenBright('[Session] Début du round'));
		this.teams.forEach(team => {
			team.sendStartRound();
		});
		console.log(clc.greenBright(`[Session] Lancement du timer (${TIME_PER_ROUND} secondes)`));
		this.roundStart = Date.now();
		this.isPlaying = true;
	}



	tick = () => {
		// Decrémente le timer si le round est en cours
		if (this.isPlaying) {
			const now = Date.now();
			const elapsed = now - this.roundStart;
			const timeLeft = TIME_PER_ROUND - elapsed / 1000;
			console.log(clc.greenBright(`[Session] Tick: ${timeLeft} secondes restantes`));
		} else if (this.isSessionRunning) {
			console.log(clc.greenBright(`[Session] Tick: En attente de chargements des joueurs...`));
		} else {
			console.log(clc.greenBright(`[Session] Tick: En attente de joueurs...`));
		}
	}

	onTeamLoadedRoom = (team) => {
		this.broadcastStartRound();
	}
}

module.exports = Session;