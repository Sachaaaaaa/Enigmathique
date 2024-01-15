const io = require('socket.io')();
const Game = require('./gameManager');

const game = new Game(io);

io.listen(4000, {
	cors: {
		origin: "*",
	}
});