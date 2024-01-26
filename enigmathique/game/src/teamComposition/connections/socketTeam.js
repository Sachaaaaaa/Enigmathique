const clc = require('cli-color');
const { ClientToServer, ServerToClient } = require('../../socketMessages');

const infoColor = clc.cyan;
const errorColor = clc.redBright;
const sendColor = clc.green;
const receiveColor = clc.yellow;

/**
 * Gère la connexion 
 */
class SocketTeam {
	constructor(socket, session) {
		console.log(clc.greenBright('[Team] Nouvelle connexion'));

		this.socket = socket;
		this.session = session;

		// Enregistre les événements
		this.socket.on(ClientToServer.Disconnection, this.onDisconnect);
		this.socket.on(ClientToServer.AddStudent, this.onAddStudent);
		this.socket.on(ClientToServer.RemoveStudent, this.onRemoveStudent);
		this.socket.on(ClientToServer.LockTeam, this.onLockTeam);

		this.name = 'undef';
		this.composition = [];

		this.locked = false;
		this.confirmed = false;
	}

	log = (message, color = infoColor) => {
		console.log(color(`[Team ${socket.id}]` + message));
	};

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

é

	/**
	 * Vérifie si l'étudiant est dans l'équipe
	 * @param {int} studentId 
	 * @returns {boolean} true si l'étudiant est dans l'équipe, false sinon
	 */
	hasStudent = (studentId) => {
		return this.composition.find(student => student.id === studentId);
	}

	/**
	 * Event appelé lors de la déconnexion d'un client
	 */
	onDisconnect = () => {
		this.log('Déconnexion', errorColor);
		this.socket.removeAllListeners();
		this.session.onTeamLeave(this);
	}

	/**
	 * Event appelé lors de l'ajout d'un étudiant à l'équipe
	 * @param {int} studentId 
	 */
	onAddStudent = (studentId) => {
		this.log('Ajout d\'un étudiant ' + studentId, receiveColor);

		// Vérifie si l'équipe est verrouillée ou confirmée
		if (this.locked || this.confirmed) {
			this.log('Tentative d\'ajout d\'un étudiant dans une équipe verrouillée ou confirmée', errorColor);
			return;
		}

		// Vérifie si l'étudiant est déjà dans une équipe
		if (!this.session.isStudentAvailable(studentId)) {
			this.log('Tentative d\'ajout d\'un étudiant déjà dans une équipe', errorColor);
			return;
		}

		// Vérifie si l'équipe n'est pas pleine
		if (this.composition.length >= this.session.maxTeamSize) {
			this.log('Tentative d\'ajout d\'un étudiant dans une équipe pleine', errorColor);
			return;
		}

		// Ajoute l'étudiant à l'équipe
		this.composition.push(this.session.getStudentWithId(studentId));

		// Rafraichit la liste des élèves disponibles
		this.session.onTeamCompositionChange(this);
	}

	/**
	 * Event appelé lors de la suppression d'un étudiant de l'équipe
	 * @param {int} studentId 
	 */
	onRemoveStudent = (studentId) => {
		this.log('Suppression d\'un étudiant ' + studentId, receiveColor);

		// Vérifie si l'équipe est verrouillée ou confirmée
		if (this.locked || this.confirmed) {
			console.log(clc.redBright('[Team] Tentative de suppresion d\'un étudiant dans une équipe verrouillée ou confirmée'));
			return;
		}

		// Supprime l'étudiant de l'équipe si il est dedans
		const index = this.composition.findIndex(student => student.id === studentId);
		if (index > -1) {
			this.composition.splice(index, 1);
		}

		// Rafraichit la liste des élèves disponibles
		this.session.onTeamCompositionChange(this);
	}

	/**
	 * Event appelé lors du verrouillage de l'équipe
	 */
	onLockTeam = ({name}) => {
		this.log(`Verrouillage de l'équipe ${name}`, receiveColor);

		// Vérifie si l'équipe est verrouillée ou confirmée
		if (this.locked || this.confirmed) {
			this.log('Tentative de verrouillage d\'une équipe déjà verrouillée ou confirmée', errorColor);
			this.socket.emit(ServerToClient.Error, {message: 'L\'équipe est déjà verrouillée ou confirmée', isFatal: false});
			return;
		}

		// Vérifie que l'équipe n'est pas vide
		if (this.composition.length === 0) {
			this.log('Tentative de verrouillage d\'une équipe vide', errorColor);
			this.socket.emit(ServerToClient.Error, {message: 'L\'équipe est vide', isFatal: false});
			return;
		}

		// Vérifie longueur du nom de l'équipe
		if (name.length > 50) {
			this.log('Tentative de verrouillage d\'une équipe avec un nom trop long', errorColor);
			this.socket.emit(ServerToClient.Error, {message: 'Le nom de l\'équipe est trop long', isFatal: false});
			return;
		}

		// Met à jour le nom de l'équipe et verrouille l'équipe
		this.name = name;
		this.locked = true;

		// Met à jour les équipe
		this.session.onTeamCompositionChange(this);
	}

	/**
	 * Envoie un message au client avec les informations de la session
	 * @param {int} maxTeamSize 
	 */
	sendGameInfo = (maxTeamSize) => {
		this.log('Envoi des informations de la session', sendColor);
		this.socket.emit(ServerToClient.GameInfo, { maxTeamSize: maxTeamSize });
	}

	/**
	 * Envoie un message au client avec les élèves disponibles
	 * @param {Array} students 
	 */
	sendAvailableStudents = (students) => {
		this.log('Envoi des élèves disponibles', sendColor);

		this.socket.emit(ServerToClient.SyncAvailableStudents, { students });
	}

	/**
	 * Envoie un message au client avec la composition de l'équipe
	 */
	sendTeamComposition = () => {
		this.log('Envoi de la composition de l\'équipe', sendColor);

		// TODO: Modifier { composition: this.toData() } => Côté client donne : data.composition.{...}, pas pratique
		this.socket.emit(ServerToClient.SyncTeamStudents, { composition: this.toData() });
	}

	/**
	 * Envoie un message au client avec leur id d'équipe (pour pouvoir s'identifier dans le jeu)
	 * @param {int} teamId 
	 */
	sendSessionStart = (teamId) => {
		this.log('Envoi du début de la session', sendColor);

		this.socket.emit(ServerToClient.CompositionFinished, { teamId });
	}

	/**
	 * Remet la composition à zéro
	 */
	wipeComposition = () => {
		this.log('Suppression de la composition de l\'équipe', infoColor);

		// Remet la composition à zéro
		this.composition = [];
		this.locked = false;
		this.confirmed = false;
		
		// Rafraichit la liste des élèves disponibles et des équipes
		this.session.onTeamCompositionChange(this);
	}
}

module.exports = SocketTeam;