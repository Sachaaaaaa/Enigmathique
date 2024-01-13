/**
 * Ce fichier contient les messages qui transitent entre le serveur et le client.
*/

// Messages que le serveur envoie au client
const ServerToClient = {
	Connection: 'connect',
	Disconnection: 'disconnect',
	SwitchRoom: 'room', // + {roomTag: string}
	Message: 'message', // + {message: string}
	StartRound: 'startRound', // + {}
	TeamCount: 'teamCount', // + {count: int}
	Feedback: 'feedback', // + {isSolved: bool, ~endMessage: string}
};

// Messages que le client envoie au serveur
const ClientToServer = {
	Connection: 'connect', // + {roomTag: string} => dans le query
	Disconnection: 'disconnect', // { }
	Message: 'message', // + {message: string}
	Submit: 'submit', // + {answer: string}
	Hint: 'hint', // + {hint: string}
	RoomLoaded: 'roomLoaded', // { }
};

module.exports = {
	ServerToClient,
	ClientToServer,
};