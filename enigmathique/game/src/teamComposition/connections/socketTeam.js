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

		this.composition = [];

		this.locked = false;
		this.confirmed = false;
	}

	hasStudent = (studentId) => {
		return this.composition.find(student => student.id === studentId);
	}

	onDisconnect = () => {
		console.log(clc.redBright('[Team] Déconnexion'));
		this.socket.removeAllListeners();

		this.session.onTeamLeave(this);
	}

	onAddStudent = (student) => {
		console.log(clc.yellowBright('[Team] Ajout d\'un étudiant'));

		this.composition.push(student);

		this.session.onTeamCompositionChange(this);
	}

	onRemoveStudent = (student) => {
		console.log(clc.yellowBright('[Team] Suppression d\'un étudiant'));

		const index = this.composition.indexOf(student);
		if (index > -1) {
			this.composition.splice(index, 1);
		}

		this.session.onTeamCompositionChange(this);
	}

	onLockTeam = () => {
		console.log(clc.yellowBright('[Team] Verrouillage de l\'équipe'));

		this.locked = true;
		this.session.onTeamCompositionChange(this);
	}

	sendAvailableStudents = (students) => {
		console.log(clc.yellowBright('[Team] Envoi des étudiants disponibles'));

		this.socket.emit(ServerToClient.SyncAvailableStudents, { students });
	}

	sendTeamComposition = () => {
		console.log(clc.yellowBright('[Team] Envoi de la composition de l\'équipe'));

		this.socket.emit(ServerToClient.SyncTeamStudents, { composition: this.composition });
	}

	wipeComposition = () => {
		console.log(clc.yellowBright('[Team] Suppression de la composition de l\'équipe'));

		this.composition = [];
		this.session.onTeamCompositionChange(this);
	}
}

module.exports = SocketTeam;