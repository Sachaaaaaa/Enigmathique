/**
 * Ce fichier contient les messages qui transitent entre le serveur et le client.
*/

// Messages que le serveur envoie au client
const ServerToClient = {
	Connection: 'connect',
	Disconnection: 'disconnect',
	
	/** GAME */
	// Equipe
	SwitchRoom: 'room', // + {roomTag: string}
	Message: 'message', // + {message: string}
	StartRound: 'startRound', // + {}
	TeamCount: 'teamCount', // + {count: int}
	Feedback: 'feedback', // + {isSolved: bool, ~endMessage: string}
	Hint: 'hint', // + {hint: string}
	// Professeur
	TeamProgress: 'teamProgress', // + {teamId: int, progress: object}
	AllTeamsProgress: 'allTeamsProgress', // + {teamsProgress: object}

	/** TEAM COMPOSITION */
	SyncAvailableStudents: 'syncAvailableStudents', // + {students: array[]}
	// Equipe
	SyncTeamStudents: 'syncTeamStudents', // + {students: array[]}
	// Professeur
	SyncTeams: 'syncTeams', // + {teams: array[{students: array[], confirmed: bool}]}
};

// Messages que le client envoie au serveur
const ClientToServer = {
	Connection: 'connect', // + {roomTag: string} => dans le query
	Disconnection: 'disconnect', // { }
	Message: 'message', // + {message: string}

	/** GAME */
	// Equipe
	Submit: 'submit', // + {answer: string}
	AskHint: 'hint', // { }
	RoomLoaded: 'roomLoaded', // { }

	/** TEAM COMPOSITION */
	// Equipe
	AddStudent: 'addStudent', // + {studentId: int}
	RemoveStudent: 'removeStudent', // + {studentId: int}
	ConfirmTeam: 'confirmTeam', // { }

	// Professeur
	ValidateTeam: 'validateTeam', // + {teamId: int}
	RefuseTeam: 'refuseTeam', // + {teamId: int}
};

// Types de connexion
const ConnectionType = {
	Game: 'game',
	TeamComposition: 'teamComposition',
};

module.exports = {
	ServerToClient,
	ClientToServer,
	ConnectionType
};