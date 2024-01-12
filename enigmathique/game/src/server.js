const io = require('socket.io')();


io.on('connect', (socket) => {
	console.log('Nouvelle connexion ' + socket.id);
});

io.listen(4000, {
	cors: {
		origin: "*",
	}
});