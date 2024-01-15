const io = require('socket.io')();
const SocketManager = require('./socketManager');

const socketManager = new SocketManager(io);

io.listen(4000, {
	cors: {
		origin: "*",
	}
});