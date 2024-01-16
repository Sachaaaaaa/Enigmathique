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

	fetchStudents = () => {
		// TODO: Récupérer les élèves disponibles depuis l'API
		// { ... }

		// Pour l'instant, on simule des élèves
		this.students = [
			{ id: 1, firstname: 'Jean', lastname: 'Dupont' },
			{ id: 2, firstname: 'Marie', lastname: 'Martin' },
			{ id: 3, firstname: 'Pierre', lastname: 'Durand' },
			{ id: 4, firstname: 'Julie', lastname: 'Dupuis' },
			{ id: 5, firstname: 'Paul', lastname: 'Martin' },
			{ id: 6, firstname: 'Jeanne', lastname: 'Durand' },
			{ id: 7, firstname: 'Jacques', lastname: 'Dupont' },
			{ id: 8, firstname: 'Sophie', lastname: 'Martin' },
			{ id: 9, firstname: 'Luc', lastname: 'Durand' },
			{ id: 10, firstname: 'Marie', lastname: 'Dupuis' },
			{ id: 11, firstname: 'Pierre', lastname: 'Martin' },
			{ id: 12, firstname: 'Julie', lastname: 'Durand' },
			{ id: 13, firstname: 'Paul', lastname: 'Dupont' },
			{ id: 14, firstname: 'Jeanne', lastname: 'Martin' },
			{ id: 15, firstname: 'Jacques', lastname: 'Durand' },
			{ id: 16, firstname: 'Sophie', lastname: 'Dupuis' },
			{ id: 17, firstname: 'Luc', lastname: 'Martin' },
			{ id: 18, firstname: 'Marie', lastname: 'Durand' },
			{ id: 19, firstname: 'Pierre', lastname: 'Dupont' },
			{ id: 20, firstname: 'Julie', lastname: 'Martin' },
			{ id: 21, firstname: 'Paul', lastname: 'Durand' },
			{ id: 22, firstname: 'Jeanne', lastname: 'Dupuis' },
			{ id: 23, firstname: 'Jacques', lastname: 'Martin' },
			{ id: 24, firstname: 'Sophie', lastname: 'Durand' },
			{ id: 25, firstname: 'Luc', lastname: 'Dupont' },
		];
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
}

module.exports = CompositionSession;
