const io = require('socket.io')();
const clc = require('cli-color');
const SocketManager = require('./socketManager');

require('dotenv').config();

const socketManager = new SocketManager(io);

console.log(clc.blue('Si le message Session Invalide apparait, vérifier les .env de enigmathique/game et enigmathique/api (TOKEN / URL)'))

io.listen(4000, {
	cors: {
		origin: "*",
	}
});