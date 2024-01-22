const clc = require('cli-color');
const { ClientToServer, ServerToClient } = require('../../socketMessages');

class SocketTeam {
	constructor(socket, session) {
		console.log(clc.greenBright('[Team] Nouvelle connexion'));

		this.socket = socket;
		this.session = session;

		this.socket.on(ClientToServer.Disconnection, this.onDisconnect);
		this.socket.on(ClientToServer.AddStudent, this.onAddStudent);
		this.socket.on(ClientToServer.RemoveStudent, this.onRemoveStudent);
		this.socket.on(ClientToServer.LockTeam, this.onLockTeam);

		this.name = 'undef';
		this.composition = [];

		this.locked = false;
		this.confirmed = false;
	}

	/**
	 * Permet de convertir l'objet en données JSON.
	 * @returns {Object} Les données de l'équipe
	 */
	toData = () => {
		return {
			id: this.socket.id,
			name: this.name,
			locked: this.locked,
			confirmed: this.confirmed,
			students: this.composition
		}
	}

	toPostData = () => {
		// retourne sous la forme:  {name: "nom de l'équipe", students: [id1, id2, id3]}
		return {
			idSocket: this.socket.id, // Rajoute l'id de la socket pour pouvoir l'identifier plus tard (retour de l'id de l'équipe depuis API)
			name: this.name,
			idStudents: this.composition.map((student) => student.id)
		}
	}

	hasStudent = (studentId) => {
		return this.composition.find(student => student.id === studentId);
	}

	onDisconnect = () => {
		console.log(clc.redBright('[Team] Déconnexion'));
		this.socket.removeAllListeners();

		this.session.onTeamLeave(this);
	}

	onAddStudent = (studentId) => {
		console.log(clc.cyan('[Team] Ajout d\'un étudiant'));

		// Vérifie si l'équipe est verrouillée ou confirmée
		if (this.locked || this.confirmed) {
			console.log(clc.redBright('[Team] Tentative d\'ajout d\'un étudiant dans une équipe verrouillée ou confirmée'));
			return;
		}

		if (!this.session.isStudentAvailable(studentId)) {
			return;
		}

		if (this.composition.length >= this.session.maxTeamSize) {
			return;
		}
		this.composition.push(this.session.getStudentWithId(studentId));

		console.log(this.composition);

		this.session.onTeamCompositionChange(this);
	}

	onRemoveStudent = (studentId) => {
		console.log(clc.cyan('[Team] Suppression d\'un étudiant ' + studentId));

		// Vérifie si l'équipe est verrouillée ou confirmée
		if (this.locked || this.confirmed) {
			console.log(clc.redBright('[Team] Tentative de suppresion d\'un étudiant dans une équipe verrouillée ou confirmée'));
			return;
		}

		const index = this.composition.findIndex(student => student.id === studentId);
		if (index > -1) {
			this.composition.splice(index, 1);
		}

		this.session.onTeamCompositionChange(this);
	}

	onLockTeam = ({name}) => {
		console.log(clc.cyan('[Team] Verrouillage de l\'équipe ' + clc.bold(name)));

		// Vérifie si l'équipe est verrouillée ou confirmée
		if (this.locked || this.confirmed) {
			console.log(clc.redBright('[Team] Tentative de verrouillage d\'une équipe déjà verrouillée ou confirmée'));
			return;
		}

		this.name = name;
		this.locked = true;
		this.session.onTeamCompositionChange(this);
	}

	sendGameInfo = (maxTeamSize) => {
		console.log(clc.yellowBright('[Team] Envoi des informations de la session'));

		this.socket.emit(ServerToClient.GameInfo, { maxTeamSize: maxTeamSize });
	}

	sendAvailableStudents = (students) => {
		console.log(clc.yellowBright('[Team] Envoi des étudiants disponibles'));

		this.socket.emit(ServerToClient.SyncAvailableStudents, { students });
	}

	sendTeamComposition = () => {
		console.log(clc.yellowBright('[Team] Envoi de la composition de l\'équipe'));

		// TODO: Modifier { composition: this.toData() } => Côté client donne : data.composition.{...}, pas pratique
		this.socket.emit(ServerToClient.SyncTeamStudents, { composition: this.toData() });
	}

	sendSessionStart = (teamId) => {
		console.log(clc.yellowBright('[Team] Envoi du début de la session'));

		this.socket.emit(ServerToClient.CompositionFinished, { teamId });
	}

	wipeComposition = () => {
		console.log(clc.yellowBright('[Team] Suppression de la composition de l\'équipe'));

		this.composition = [];
		this.session.onTeamCompositionChange(this);

		this.locked = false;
		this.confirmed = false;
	}
}

module.exports = SocketTeam;