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
			{ id: 1, name: 'Jean', surname: 'Dupont' },
			{ id: 2, name: 'Marie', surname: 'Martin' },
			{ id: 3, name: 'Pierre', surname: 'Durand' },
			{ id: 4, name: 'Julie', surname: 'Dupuis' },
			{ id: 5, name: 'Paul', surname: 'Dujardin' },
			{ id: 6, name: 'Sophie', surname: 'Dumont' },
			{ id: 7, name: 'Luc', surname: 'Dubois' },
			{ id: 8, name: 'Cécile', surname: 'Lefebvre' },
			{ id: 9, name: 'Thomas', surname: 'Leroy' },
			{ id: 10, name: 'Laure', surname: 'Rousseau' },
			{ id: 11, name: 'Antoine', surname: 'Vincent' },
			{ id: 12, name: 'Catherine', surname: 'Lambert' },
			{ id: 13, name: 'Jeanne', surname: 'Moreau' },
			{ id: 14, name: 'Marc', surname: 'Fournier' },
			{ id: 15, name: 'Marie', surname: 'Girard' },
			{ id: 16, name: 'Christophe', surname: 'André' },
			{ id: 17, name: 'Anne', surname: 'Mercier' },
			{ id: 18, name: 'Philippe', surname: 'Dupuis' },
			{ id: 19, name: 'Juliette', surname: 'Lefevre' },
			{ id: 20, name: 'Jean', surname: 'Mercier' },
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
		return this.teamSockets.filter((t) => t.locked);
	};

	getConfirmedTeams = () => {
		return this.teamSockets.filter((t) => t.confirmed);
	};

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
