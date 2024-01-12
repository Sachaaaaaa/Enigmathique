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
		this.started = false;
		this.expectedTeamCount = expectedTeamCount;
		this.rooms = rooms;

		this.roundStart = 0;
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
	}

	removeTeam = (team) => {
		const index = this.teams.indexOf(team);
		if (index >= 0) {
			this.teams.splice(index, 1);
		}
	}

	rotateRooms = () => {
		// { ... }
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
		} else {
			console.log(clc.greenBright(`[Session] Tick: En attente de joueurs...`));
		}
	}

	onTeamReady = (team) => {
		// Vérifie si le nombre d'équipes est suffisant
		if (this.getTotalTeamCount() == this.expectedTeamCount && this.areAllTeamsReady()) {
			this.broadcastStartRound();
		}
	}
}

module.exports = Session;