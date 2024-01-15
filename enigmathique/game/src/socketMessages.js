/**
 * Ce fichier contient les messages qui transitent entre le serveur et le client.
*/

// Messages que le serveur envoie au client
const ServerToClient = {
	Connection: 'connect',
	Disconnection: 'disconnect',
	
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
};

// Messages que le client envoie au serveur
const ClientToServer = {
	Connection: 'connect', // + {roomTag: string} => dans le query
	Disconnection: 'disconnect', // { }
	Message: 'message', // + {message: string}
	Submit: 'submit', // + {answer: string}
	AskHint: 'hint', // { }
	RoomLoaded: 'roomLoaded', // { }
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