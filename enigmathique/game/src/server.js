const io = require('socket.io')();
const Game = require('./game');
const { ClientToServer } = require('./socketMessages');

const game = new Game(io);

io.listen(4000, {
	cors: {
		origin: "*",
	}
});