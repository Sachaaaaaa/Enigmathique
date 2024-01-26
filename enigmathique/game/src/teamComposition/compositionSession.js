const ApiService = require('../api/api');
const SocketTeam = require('./connections/socketTeam');
const clc = require('cli-color');

const infoColor = clc.blue;
const errorColor = clc.red;
const sendColor = clc.green;
const receiveColor = clc.yellow;

/* TODO: Les messages envoyés aux clients ne sont tout le temps utiles
** (ex: quand un professeur se connecte, il n'y a pas besoin de tout resync)
*/ 

/**
 * Gère la composition des équipes
 */
class CompositionSession {
	constructor(manager, sessionId, maxTeamSize = 4) {
		this.manager = manager;
		this.sessionId = sessionId;
		this.maxTeamSize = maxTeamSize;

		// Elèves
		this.students = [];
		// Elèves disponibles
		this.availableStudents = [];

		// Professeurs connectés
		this.professorSockets = [];
		// Elèves connectés (équipes en cours de formation / formées)
		this.teamSockets = [];

		this.fetchStudents();
	}

	log = (message, color = infoColor) => {
		console.log(color(`[CompositionSession ${this.sessionId}] ` + message));
	};

	/**
	 * Récupére les élèves depuis l'API
	 */
	fetchStudents = async() => {
		this.students = await ApiService.getStudentsFromGameId(this.sessionId);
		// Resync tout si quelqu'un se connecte avant que les élèves soient récupérés
		this.resyncAll();
	};

// #region Professeur
	
/**
	 * Ajoute un professeur à la session
	 * @param {SocketProfessor} professor
	 */
	addProfessor = (professor) => {
		this.professorSockets.push(professor);

		this.resyncAll();
	};

	/**
	 * Supprime un professeur de la session
	 * @param {SocketProfessor} Professor
	 */
	removeProfessor = (professor) => {
		const index = this.professorSockets.indexOf(professor);
		if (index >= 0) {
			this.professorSockets.splice(index, 1);
		}
	};

	// #endregion

// #region Equipe
	addTeam = (team) => {
		this.teamSockets.push(team);

		// Pas besoin de le mettre dans resync car ne peut pas changer
		team.sendGameInfo(this.maxTeamSize);

		this.resyncAll();
	};

	onTeamLeave = (team) => {
		const index = this.teamSockets.indexOf(team);
		if (index >= 0) {
			this.teamSockets.splice(index, 1);
		}
	};

	// #endregion

	/**
	 * Vérifie si toutes les équipes sont formées et légales
	 * @returns {boolean} true si toutes les équipes sont formées et légales
	 */
	areTeamsLegal = () => {
		const studentsId = [];
		for (const team of this.teamSockets) {
			// Vérifie la taille de l'équipe
			if (team.composition.length > this.maxTeamSize) {
				return false;
			}

			// Vérifie qu'il n'y a pas de doublons
			for (const student of team.composition) {
				if (studentsId.some((id) => id === student.id)) {
					return false;
				}
				studentsId.push(student.id);
			}
		}

		return true;
	};

	/**
	 * Rafraichit la liste des élèves disponibles
	 */
	refreshAvailableStudents = () => {
		// Parmis les élèves, on retire ceux qui sont dans une équipe (formés ou en cours de formation)
		this.availableStudents = this.students.filter(
			(s) => !this.teamSockets.some((t) => t.hasStudent(s.id))
		);
	};

	/**
	 * Retourne les équipes vérrouillées
	 * @returns {SocketTeam[]} Les équipes vérrouillées
	 */
	getLockedTeams = () => {
		return this.teamSockets.filter((t) => t.locked && !t.confirmed);
	};

	/**
	 * Retourne les équipes confirmées
	 * @returns {SocketTeam[]} Les équipes confirmées
	 */
	getConfirmedTeams = () => {
		return this.teamSockets.filter((t) => t.confirmed);
	};

	/**
	 * Retourne l'élève avec l'id donné
	 * @param {int} id
	 * @returns {Student | undefined} L'élève avec l'id donné
	 */
	getStudentWithId = (id) => {
		return this.students.find((s) => s.id === id);
	};

	/**
	 * Retourne si l'élève avec l'id donné est disponible
	 * @param {int} id
	 * @returns {Student | undefined} L'élève disponible avec l'id donné
	 */
	isStudentAvailable = (id) => {
		return this.teamSockets.every((t) => !t.hasStudent(id));
	}

	/**
	 * Confirme la composition de l'équipe avec l'id donné
	 * @param {int} teamId
	 */
	confirmTeamComposition(teamId) {
		const team = this.teamSockets.find((t) => t.socket.id === teamId);
		if (team) {
			team.confirmed = true;
			this.resyncAll();
		}
	}

	/**
	 * Refuse la composition de l'équipe avec l'id donné
	 * @param {int} teamId 
	 */
	refuseTeamComposition(teamId) {
		const team = this.teamSockets.find((t) => t.socket.id === teamId);
		if (team) {
			team.wipeComposition();
			this.resyncAll();
		}	
	}

	/**
	 * 
	 * @param {SocketTeam} team 
	 */
	onTeamCompositionChange = (team) => {
		// Met à jour la liste des élèves disponibles
		this.resyncAll();
	};

	/**
	 * Synchronise les données de la session avec tous les clients
	 * (Elèves et professeur)
	 */
	resyncAll = () => {
		this.refreshAvailableStudents();
		this.sendCompositionToProfessor();
		this.sendAvailableToTeams();
		this.sendSelfCompositionToTeam();
	};

	/**
	 * Envoie la liste des élèves disponibles aux équipes
	 */
	sendAvailableToTeams = () => {
		this.teamSockets.forEach((t) =>
			t.sendAvailableStudents(this.availableStudents)
		);
	};

	/**
	 * Envoie la composition de l'équipe à tous les clients (leur propre composition)
	 */
	sendSelfCompositionToTeam = () => {
		this.teamSockets.forEach((t) => t.sendTeamComposition());
	};

	/**
	 * Envoie la composition de toutes les équipes aux professeurs
	 */
	sendCompositionToProfessor = () => {
		const lockedTeams = this.getLockedTeams().map((t) => t.toData());
		const confirmedTeams = this.getConfirmedTeams().map((t) => t.toData());

		this.professorSockets.forEach((p) =>
			p.sendComposition(this.availableStudents, lockedTeams, confirmedTeams)
		);
	};

	
	/**
	 * Envoie la composition à l'API et lance la session
	 * (Redirige vers la page de jeu)
	 * @returns {boolean} true si la session a été lancée
	 */
	finishComposition = async() => {
		// TODO: Faire la vérification et prendre en charge les erreurs
		if (!this.areTeamsLegal()) {
			return false;
		}

		// Récupére les données des équipes dans le format attendu par l'API
		const teams = this.teamSockets.map((t) => t.toPostData());

		// Envoie la composition à l'API
		const response = await ApiService.postTeamsComposition(this.sessionId, teams);
		// Modifie l'état de la partie
		await ApiService.putGameState(this.sessionId, 1);

		// Envoie le message de lancement de la session aux équipes
		// Itère les équipes dans la réponse
		for (const team of response) {
			const teamSocket = this.teamSockets.find((t) => t.socket.id === team.idSocket);
			if (teamSocket) {
				teamSocket.sendSessionStart(team.id);
			}
		}
		// Envoie le message de lancement de la session aux professeurs
		this.professorSockets.forEach((p) => p.sendSessionStart());
	}
}

module.exports = CompositionSession;
