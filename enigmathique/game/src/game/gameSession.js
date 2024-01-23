const socketio = require("socket.io");
const clc = require("cli-color");
const { ServerToClient, ClientToServer } = require("../socketMessages");
const SocketTeam = require("./connections/socketTeam");
const SocketProfessor = require("./connections/socketProfessor");
const RoomPlayable = require("./rooms/roomPlayable");
const ApiService = require("../api/api");

const TIME_PER_ROUND = 60 * 10; // 10 minutes
//const TIME_PER_ROUND = 5; // 5 secondes

class GameSession {
  /**
   * @param {Game} game
   * @param {int} sessionId
   * @param {int[]} expectedTeams
   * @param {RoomPlayable[]} rooms
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
    this.rooms.forEach((room) => {
      this.totalEnigmas += room.enigmas.length;
    });

    // Etat de la session
    this.isSessionRunning = false;
    this.isPlaying = false;
  }

  getTotalTeamCount = () => {
    return this.teams.length;
  };

  getActiveTeamCount = () => {
    return this.teams.filter((team) => !team.leaved).length;
  };

  getTeamsProgress = () => {
    const teamsProgress = {};

    this.teams.forEach((team) => {
      teamsProgress[team.teamId] = team.getProgressionData();
    });

    return teamsProgress;
  };

  // Car il faut un truc spécial pour l'api spéciale de Sasha :)
  getSessionDataForSasha = () => {
    const sessionData = { idGame: this.sessionId, scores: [] };

    this.teams.forEach((team) => {
      const teamData = {
        idTeam: team.teamId,
        rooms: team.getProgressionData(),
      };

      sessionData.scores.push(teamData);
    });

    return sessionData;
  };
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
      rooms: this.rooms.map((room) => room.name),
			// Teams sous la forme : {idTeam: {name}}
			teams: this.teams.reduce((acc, team) => {
				acc[team.teamId] = { name: team.teamId };
				return acc;
			}, {}),
    };
  };

  areAllTeamsReady = () => {
    return this.getTotalTeamCount() > 0 && this.teams.every((team) => team.isReady);
  };

  addTeam = (socket) => {
    // Vérifier que la session n'est pas déjà lancée
    if (this.isSessionRunning) {
      console.log(clc.redBright("[Session] Equipe refusée, la session est déjà lancée"));
      return;
    }

    const teamId = socket.handshake.query.teamId;
    if (!teamId) {
      console.log(clc.redBright("[Session] Equipe refusée, pas d'id d'équipe"));
      return;
    }

    // Vérifier que l'équipe n'est pas déjà dans la session
    if (this.teams.some((t) => t.teamId == teamId)) {
      console.log(clc.redBright(`[Session] L\'équipe ${team.teamId} est déjà dans la session`));
      return;
    }

    console.log(this.expectedTeams);
    console.log(teamId);
    // [ { name: 'erzoijyb', id: 1, idGame: 8 } ]
    // Vérifier que l'équipe est attendue (/!\ type string et number)
    if (!this.expectedTeams.some((t) => t.id == teamId)) {
      console.log(clc.redBright(`[Session] L\'équipe ${teamId} n'est pas attendue`));
      return;
    }

    const team = new SocketTeam(socket, this);
    this.teams.push(team);

    // Vérifier si toutes les équipes sont présentes
    if (this.expectedTeams.length == this.teams.length) {
      console.log(clc.greenBright("[Session] Toutes les équipes sont présentes"));
      this.startSession();
    }
  };

  /**
   * Supprime une équipe de la session
   * @param {SocketTeam} team
   */
  removeTeam = (team) => {
    const index = this.teams.indexOf(team);
    if (index >= 0) {
      this.teams.splice(index, 1);
    }
  };

  /**
   * Lorsqu'une équipe se déconnecte
   * Ferme la session si il n'y a plus d'équipes
   * @param {SocketTeam} team
   */
  onTeamLeave = (team) => {
    this.removeTeam(team);

    if (this.getActiveTeamCount() == 0) {
      console.log(clc.yellow("[Session] Il n'y a plus d'équipes"));
      this.stopSession();
    }
  };

  /**
   * Ajoute un professeur à la session
   * @param {SocketProfessor} professor
   */
  addProfessor = (professor) => {
    this.professors.push(professor);

    // Envoie les informations de la session au professeur
    professor.sendAllTeamsProgress(this.getSessionResult());
  };

  /**
   * Supprime un professeur de la session
   * @param {SocketProfessor} professor
   */
  removeProfessor = (professor) => {
    const index = this.professors.indexOf(professor);
    if (index >= 0) {
      this.professors.splice(index, 1);
    }
  };

  /**
   * Démarre la session
   */
  startSession = () => {
    console.log(clc.greenBright("[Session] Démarrage de la session"));
    this.isSessionRunning = true;

    this.rotateRooms();
  };

  /**
   * Fin de la session
   * Vérifie si la session se termine normalement ou si elle est arrêtée
   */
  stopSession = async () => {
    console.log(clc.yellow("[Session] Fin de la session"));
    this.isSessionRunning = false;

    const endedNormally = this.round >= this.numRounds;

    if (!endedNormally) {
      console.log(clc.redBright("[Session] Fin de la session anormale"));
      // Ne pas envoyer les résultats à l'API
      // A la place, demande à l'API de supprimer la session

			// TODO: Changer ca, pas besoin d'appeller les deux
      const response = await ApiService.postSessionEnd(this.sessionId, endedNormally);
			await ApiService.deleteGame(this.sessionId);
      console.log(response);
      return;
    }

    console.log(clc.greenBright("[Session] Fin de la session normale"));

    // Recupère les informations de progression de chaque équipe
    const teamsProgress = this.getSessionDataForSasha();

    console.log(teamsProgress);

    // Envoie à l'API
    const response = await ApiService.postTeamsScore(teamsProgress);
    console.log(response);
		// Fin de partie
		await ApiService.putGameState(this.sessionId, 2);

    this.game.onSessionEnd(this.sessionId);
  };

  /**
   * Rotation des salles
   * Envoie la nouvelle salle à chaque équipe
   */
  rotateRooms = () => {
    console.log(clc.greenBright("[Session] Rotation des salles"));

    this.isPlaying = false;
    this.round += 1;

    // Vérifier si la session est terminée
    if (this.round >= this.numRounds) {
      this.stopSession();
      return;
    }

    // Envoi la nouvelle salle à chaque équipe
    let i = this.round;
    this.teams.forEach((team) => {
      const roomIndex = i++ % this.rooms.length;

      team.sendRoom(this.rooms[roomIndex].toRoom(this.round));
    });

    // Envoie les informations de la session au(x) professeur(s)
    this.sendDataToProfessors();
  };

  /**
   * Démarre le round
   */
  broadcastStartRound = () => {
    console.log(clc.greenBright("[Session] Début du round", this.round));
    this.teams.forEach((team) => {
      team.sendStartRound();
    });
    console.log(clc.greenBright(`[Session] Lancement du timer (${TIME_PER_ROUND} secondes)`));
    this.roundStartTime = Date.now();
    this.isPlaying = true;

    // Envoie les informations de la session au(x) professeur(s)
    this.sendDataToProfessors();
  };

  /**
   * Permet de récupérer les informations de progression de chaque équipe pour être envoyé aux professeurs
   * @returns {Object} Informations de progression de chaque équipe
   * cf: ./example/sessionData.json
   */
  getSessionResult = () => {
    const teamsResult = {};
    this.teams.forEach((team) => {
      teamsResult[team.teamId] = team.getProgressionData();
    });

    return {
      metadata: this.getMetadata(),
      teams: teamsResult,
    };
  };

  /**
   * Tick à interval régulier
   */
  tick = () => {
    if (this.isPlaying) {
      const now = Date.now();
      const elapsed = now - this.roundStartTime;
      const timeLeft = TIME_PER_ROUND - elapsed / 1000;
      console.log(clc.greenBright(`[Session] Tick: ${timeLeft} secondes restantes`));

      // Vérifier si le temps est écoulé
      if (timeLeft <= 0) {
        this.rotateRooms();
      }
    } else if (this.isSessionRunning) {
      console.log(clc.greenBright(`[Session] Tick: En attente de chargements des joueurs ...`));
    } else {
      console.log(clc.greenBright(`[Session] Tick: En attente de joueurs (${this.getTotalTeamCount()} / ${this.expectedTeams.length})...`));
    }
  };

  /**
   * Lorqu'une équipe a chargé sa salle
   * @param {SocketTeam} team
   */
  onTeamLoadedRoom = (team) => {
    console.log(clc.cyanBright("[Session] Une équipe a chargé sa salle"));

    // Vérifier si toutes les équipes ont chargé leur salle
    const isAllRoomsLoaded = this.teams.every((team) => team.leaved || team.haveLoadedRoom);

    if (isAllRoomsLoaded) {
      console.log(clc.green("[Session] Toutes les équipes ont chargé leur salle"));
      this.broadcastStartRound();
    }
  };

  onTeamAnswerWrong = (team, enigmaId) => {
    console.log(clc.cyanBright("[Session] Une équipe a répondu faux"));

    // Pour l'instant, envoie toutes les informations de progression aux professeurs
    this.sendDataToProfessors();
  };

  onTeamAskHint = (team, enigmaId) => {
    console.log(clc.cyanBright("[Session] Une équipe a demandé un indice"));
    // Pour l'instant, envoie toutes les informations de progression aux professeurs
    this.sendDataToProfessors();
  };

  /**
   * Lorqu'une équipe a résolu une énigme
   * @param {SocketTeam} team
   * @param {int} enigmaId
   */
  onTeamSolvedEnigma = (team, enigmaId) => {
    console.log(clc.cyanBright("[Session] Une équipe a résolu une énigme"));

    // Pour l'instant, envoie toutes les informations de progression aux professeurs
    this.sendDataToProfessors();
  };

  /**
   * Lorqu'une équipe a résolu sa salle
   * @param {SocketTeam} team
   */
  onTeamSolvedRoom = (team) => {
    console.log(clc.cyan("[Session] Une équipe a résolu sa salle"));

    const doesEveryoneSolved = this.teams.every((team) => team.leaved || team.currentRoom.enigmasSolved.length == team.currentRoom.enigmas.length);

    if (doesEveryoneSolved) {
      console.log(clc.green("[Session] Toutes les équipes ont résolu leur salle"));
      this.rotateRooms();
    }

    // Envoie les informations de la session au(x) professeur(s)
    this.sendDataToProfessors();
  };

  sendDataToProfessors = () => {
    this.professors.forEach((professor) => {
      professor.sendAllTeamsProgress(this.getSessionResult());
    });
  };
}

module.exports = GameSession;
