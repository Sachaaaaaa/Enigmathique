const socketio = require('socket.io');
const clc = require('cli-color');
const { ServerToClient, ClientToServer } = require('./socketMessages');
const SocketTeam = require('./team');
const SocketProfessor = require('./professor');

const TIME_PER_ROUND = 60 * 10; // 10 minutes

class Session {
	/**
	 * @param {Game} game
	 * @param {int} sessionId
	 * @param {int[]} expectedTeams
	 * @param {Room[]} rooms
	 */
	constructor(game, sessionId, expectedTeams, rooms) {
		this.game = game;
		this.sessionId = sessionId;
		
		// Connexions
		this.teams = [];
		this.professors = [];
		
		// Rooms de la session
		this.rooms = rooms;

		// Equipes attendues
		this.expectedTeams = expectedTeams;
		
		// Informations de la session
		this.sessionStartTime = 0;
		this.roundStartTime = 0;
		this.numRounds = rooms.length;
		this.round = -1;
		
		// Calcul le nombre total d'énigmes dans la session
		this.totalEnigmas = 0;
		this.rooms.forEach(room => {
			this.totalEnigmas += room.enigmas.length;
		});

		// Etat de la session
		this.isSessionRunning = false;
		this.isPlaying = false;
	}

	getTotalTeamCount = () => {
		return this.teams.length;
	}

	getActiveTeamCount = () => {
		return this.teams.filter(team => !team.leaved).length;
	}

	getTeamsProgress = () => {
		const teamsProgress = {};

		this.teams.forEach(team => {
			teamsProgress[team.teamId] = team.getRoomsData();
		});

		return teamsProgress;		
	}

	/**
	 * 
	 * @returns {Object} Informations de la session
	 */
	getMetadata = () => {
		return {
			sessionStartTime: this.sessionStartTime,
			roundStartTime: this.roundStartTime,
			currentRound: this.round,
			totalEnigma: this.totalEnigmas,
		};
	}
	
	areAllTeamsReady = () => {
		return this.getTotalTeamCount() > 0 && this.teams.every(team => team.isReady);
	}

	addTeam = (team) => {
		// Vérifier que la session n'est pas déjà lancée
		if (this.isSessionRunning) {
			console.log(clc.redBright('[Session] Equipe refusée, la session est déjà lancée'));
			return;
		}

		// Vérifier que l'équipe est valide
		if (team.teamId == null || team.teamId == undefined) {
			console.log(clc.redBright('[Session] L\'équipe n\'a pas d\'id'));
			return;
		}

		// Vérifier que l'équipe n'est pas déjà dans la session
		if (this.teams.some(t => t.teamId == team.teamId)) {
			console.log(clc.redBright(`[Session] L\'équipe ${team.teamId} est déjà dans la session`));
			return;
		}

		// Vérifier que l'équipe est attendue (/!\  type string et number)
		if (!this.expectedTeams.some((t) => t == team.teamId)) {
			console.log(clc.redBright(`[Session] L\'équipe ${team.teamId} n'est pas attendue`));
			return;
		}
		
		this.teams.push(team);

		if (this.expectedTeams.length == this.teams.length) {
			console.log(clc.greenBright('[Session] Toutes les équipes sont présentes'));
			this.startSession();
		}
	}

	/**
	 * Supprime une équipe de la session
	 * @param {SocketTeam} team
	 */
	removeTeam = (team) => {
		const index = this.teams.indexOf(team);
		if (index >= 0) {
			this.teams.splice(index, 1);
		}
	}

	/**
	 * Lorqu'une équipe se déconnecte
	 * Ferme la session si il n'y a plus d'équipes
	 * @param {SocketTeam} team 
	 */
	onTeamLeave = (team) => {
		this.removeTeam(team);

		if (this.getActiveTeamCount() == 0) {
			console.log(clc.yellow('[Session] Il n\'y a plus d\'équipes'));
			this.stopSession();
		}
	}

	/**
	 * Ajoute un professeur à la session
	 * @param {SocketProfessor} professor 
	 */
	addProfessor = (professor) => {
		this.professors.push(professor);
	}

	/**
	 * Supprime un professeur de la session
	 * @param {SocketProfessor} professor 
	 */
	removeProfessor = (professor) => {
		const index = this.professors.indexOf(professor);
		if (index >= 0) {
			this.professors.splice(index, 1);
		}
	}

	/**
	 * Démarre la session
	 */
	startSession = () => {
		console.log(clc.greenBright('[Session] Démarrage de la session'));
		this.isSessionRunning = true;

		this.rotateRooms();
	}

	/**
	 * Fin de la session
	 * Vérifie si la session se termine normalement ou si elle est arrêtée
	 */
	stopSession = () => {
		console.log(clc.yellow('[Session] Fin de la session'));
		this.isSessionRunning = false;

		// Vérifier si la session se termine normalement ou si elle est arrêtée
		// { ... }

		this.game.onSessionEnd(this.sessionId);
	}

	/**
	 * Rotation des salles
	 * Envoie la nouvelle salle à chaque équipe
	*/
	rotateRooms = () => {
		console.log(clc.greenBright('[Session] Rotation des salles'));

		this.isPlaying = false;
		this.round += 1;

		// Envoi la nouvelle salle à chaque équipe
		let i = this.round;
		this.teams.forEach(team => {
			const roomIndex = (i++) % this.rooms.length;

			team.sendRoom(this.rooms[roomIndex].toRoom(this.round));
		});
	}	

	/**
	 * Démarre le round
	 */
	broadcastStartRound = () => {
		console.log(clc.greenBright('[Session] Début du round', this.round));
		this.teams.forEach(team => {
			team.sendStartRound();
		});
		console.log(clc.greenBright(`[Session] Lancement du timer (${TIME_PER_ROUND} secondes)`));
		this.roundStartTime = Date.now();
		this.isPlaying = true;
	}

	/**
	 * Permet de récupérer les informations de progression de chaque équipe pour être envoyé aux professeurs
	 * @returns {Object} Informations de progression de chaque équipe
	 * cf: ./example/sessionData.json
	*/
	getSessionResult = () => {
		const teamsResult = {};
		this.teams.forEach(team => {
			teamsResult[team.teamId] = team.getRoomsData();
		});

		return {
			metadata: this.getMetadata(),
			teams: teamsResult,
		};
	}

	/**
	 * Tick à interval régulier
	 */
	tick = () => {
		if (this.isPlaying) {
			const now = Date.now();
			const elapsed = now - this.roundStartTime;
			const timeLeft = TIME_PER_ROUND - elapsed / 1000;
			console.log(clc.greenBright(`[Session] Tick: ${timeLeft} secondes restantes`));

			// Test, envoie la progression de chaque équipe
			const teamsProgress = this.getSessionResult();
			this.professors.forEach(professor => {
				professor.sendAllTeamsProgress(teamsProgress);
			});
			
		} else if (this.isSessionRunning) {
			console.log(clc.greenBright(`[Session] Tick: En attente de chargements des joueurs ...`));
		} else {
			console.log(clc.greenBright(`[Session] Tick: En attente de joueurs (${this.getTotalTeamCount()} / ${this.expectedTeams.length})...`));
		}
	}

	/**
	 * Lorqu'une équipe a chargé sa salle
	 * @param {SocketTeam} team 
	 */
	onTeamLoadedRoom = (team) => {
		console.log(clc.cyanBright('[Session] Une équipe a chargé sa salle'));

		// Vérifier si toutes les équipes ont chargé leur salle
		const isAllRoomsLoaded = this.teams.every(team => team.leaved || team.haveLoadedRoom);
	
		if (isAllRoomsLoaded) {
			console.log(clc.green('[Session] Toutes les équipes ont chargé leur salle'));
			this.broadcastStartRound();
		}
	}

	/**
	 * Lorqu'une équipe a résolu une énigme
	 * @param {SocketTeam} team 
	 * @param {int} enigmaId 
	 */
	onTeamSolvedEnigma = (team, enigmaId) => {
		console.log(clc.cyanBright('[Session] Une équipe a résolu une énigme'));

		// Pour l'instant, envoie toutes les informations de progression aux professeurs
		this.professors.forEach(professor => {
			professor.sendAllTeamsProgress(this.getSessionResult());
		});
	}

	/**
	 * Lorqu'une équipe a résolu sa salle
	 * @param {SocketTeam} team 
	 */
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