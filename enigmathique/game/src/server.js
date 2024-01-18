const io = require('socket.io')();
const ApiService = require('./api/api');
const SocketManager = require('./socketManager');

//ApiService.isTokenValid('123', 1);

const socketManager = new SocketManager(io);

io.listen(4000, {
	cors: {
		origin: "*",
	}
});