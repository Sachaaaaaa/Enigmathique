/**
 * Ce fichier contient les messages qui transitent entre le serveur et le client.
*/

// Messages que le serveur envoie au client
const ServerToClient = {
	SwitchRoom: 'room', // + {roomTag: string}
	Message: 'message', // + {message: string}
};

// Messages que le client envoie au serveur
const ClientToServer = {
	Connection: 'connection', // + {roomTag: string} => dans le query
	Disconnection: 'disconnection', // { }
	Message: 'message', // + {message: string}
	Submit: 'submit', // + {answer: string}
	Hint: 'hint', // + {hint: string}
	Ready: 'ready', // { }
};

module.exports = {
	ServerToClient,
	ClientToServer,
};