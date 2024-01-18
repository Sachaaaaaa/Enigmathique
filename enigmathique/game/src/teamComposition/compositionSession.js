const ApiService = require('../api/api');
const SocketTeam = require('./connections/socketTeam');

class CompositionSession {
	constructor(manager, sessionId) {
		this.manager = manager;
		this.sessionId = sessionId;
		this.maxTeamSize = 4;

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

	fetchStudents = async() => {
		// Récupére les élèves disponibles depuis l'API
		this.students = await ApiService.getStudentsFromGameId(this.sessionId);
		// Resync tout si quelqu'un se connecte avant que les élèves soient récupérés
		this.resyncAll();
	};


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

	addTeam = (team) => {
		this.teamSockets.push(team);

		this.resyncAll();
	};

	onTeamLeave = (team) => {
		const index = this.teamSockets.indexOf(team);
		if (index >= 0) {
			this.teamSockets.splice(index, 1);
		}
	};

	/**
	 * Vérifie si toutes les équipes sont formées et légales
	 * @returns {boolean} true si toutes les équipes sont formées et légales
	 */
	// TODO: Modifier critères pour vérifier la légalité des équipes
	areTeamsLegals = () => {
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
			}
		}

		return true;
	};

	refreshAvailableStudents = () => {
		// Parmis les élèves, on retire ceux qui sont dans une équipe (formés ou en cours de formation)
		this.availableStudents = this.students.filter(
			(s) => !this.teamSockets.some((t) => t.hasStudent(s.id))
		);
	};

	getLockedTeams = () => {
		return this.teamSockets.filter((t) => t.locked && !t.confirmed);
	};

	getConfirmedTeams = () => {
		return this.teamSockets.filter((t) => t.confirmed);
	};

	getStudentWithId = (id) => {
		return this.students.find((s) => s.id === id);
	};

	isStudentAvailable = (id) => {
		return this.teamSockets.every((t) => !t.hasStudent(id));
	}

	confirmTeamComposition(teamId) {
		const team = this.teamSockets.find((t) => t.socket.id === teamId);
		if (team) {
			team.confirmed = true;
			this.sendCompositionToProfessor();
		}
	}

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
		// TODO: Envoyer uniquement ce qui est nécessaire
		this.resyncAll();
	};

	/**
	 * Synchronise les données de la session avec tous les clients
	 */
	resyncAll = () => {
		this.refreshAvailableStudents();
		this.sendCompositionToProfessor();
		this.sendAvailableToTeams();
		this.sendSelfCompositionToTeam();
	};

	sendAvailableToTeams = () => {
		this.teamSockets.forEach((t) =>
			t.sendAvailableStudents(this.availableStudents)
		);
	};

	sendSelfCompositionToTeam = () => {
		this.teamSockets.forEach((t) => t.sendTeamComposition());
	};

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
		// TODO: Faire la vérification
		// if (!this.areTeamsLegals()) {
		// 	return false;
		// }

		// Récupére les données des équipes
		const teams = this.teamSockets.map((t) => t.toPostData());
		
		console.log(teams);

		// Envoie la composition à l'API
		const response = ApiService.postTeamsComposition(this.sessionId, teams);
		console.log(response);
		// { .. }

		// TODO: Faire autre chose si la requête a échouée
		
		// Pour l'instant on considère que ça a marché
		// Informe les clients que la session a été lancée
		this.teamSockets.forEach((t) => t.sendSessionStart());
		this.professorSockets.forEach((p) => p.sendSessionStart());
	}
}

module.exports = CompositionSession;
