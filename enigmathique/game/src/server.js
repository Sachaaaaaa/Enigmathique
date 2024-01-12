const io = require('socket.io')();
const Game = require('./game');

io.on('connect', (socket) => {
	console.log('Nouvelle connexion ' + socket.id);
});

const game = new Game(io);

io.listen(4000, {
	cors: {
		origin: "*",
	}
});