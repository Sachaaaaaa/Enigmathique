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
		this.expectedTeamCount = expectedTeamCount;

		this.results = {};
		this.roundStartTime = 0;

		this.isSessionRunning = false;
		this.isPlaying = false;
	}

	getTotalTeamCount = () => {
		return this.teams.length;
	}

	getActiveTeamCount = () => {
		return this.teams.filter(team => !team.leaved).length;
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


	onTeamLeave = (team) => {
		this.removeTeam(team);

		if (this.getActiveTeamCount() == 0) {
			console.log(clc.yellow('[Session] Il n\'y a plus d\'équipes'));
			this.stopSession();
		}
	}

	startSession = () => {
		console.log(clc.greenBright('[Session] Démarrage de la session'));
		this.isSessionRunning = true;

		this.rotateRooms();
	}

	stopSession = () => {
		console.log(clc.yellow('[Session] Fin de la session'));
		this.isSessionRunning = false;

		this.game.onSessionEnd(this.sessionId);
	}

	rotateRooms = () => {
		console.log(clc.greenBright('[Session] Rotation des salles'));
		// TODO: Rotation des salles
		this.isPlaying = false;

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
		this.roundStartTime = Date.now();
		this.isPlaying = true;
	}



	tick = () => {
		if (this.isPlaying) {
			const now = Date.now();
			const elapsed = now - this.roundStartTime;
			const timeLeft = TIME_PER_ROUND - elapsed / 1000;
			console.log(clc.greenBright(`[Session] Tick: ${timeLeft} secondes restantes`));

			// Affiche les énigmes résolues
			this.teams.forEach(team => {
				console.log(clc.greenBright(`[Session] ${team.teamId}: ${team.currentRoom.enigmasSolved.length}/${team.currentRoom.enigmas.length}`));
			});
		} else if (this.isSessionRunning) {
			console.log(clc.greenBright(`[Session] Tick: En attente de chargements des joueurs...`));
		} else {
			console.log(clc.greenBright(`[Session] Tick: En attente de joueurs...`));
		}
	}

	onTeamLoadedRoom = (team) => {
		this.broadcastStartRound();
	}

	onTeamSolvedEnigma = (team, enigmaId) => {
		console.log(clc.cyanBright('[Session] Une équipe a résolu une énigme'));
	}

	onTeamSolvedRoom = (team) => {
		console.log(clc.cyan('[Session] Une équipe a résolu sa salle'));

		// Vérifier si toutes les équipes ont résolu leur salle
		const isAllRoomsSolved = this.teams.every(team => team.leaved || team.currentRoom.enigmasSolved.length == team.currentRoom.enigmas.length);
	
		if (isAllRoomsSolved) {
			console.log(clc.green('[Session] Toutes les équipes ont résolu leur salle'));
			this.rotateRooms();
		}
	}
}

module.exports = Session;