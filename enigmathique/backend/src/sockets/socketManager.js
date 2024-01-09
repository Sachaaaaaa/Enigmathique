function initSocketManager(io) {
	// Lorsqu'un client se connecte
	io.on("connection", (socket) => {
		console.log(`Client ${socket.id} connected.`);

		// Envoie un message au client
		socket.emit("message", "Hello from api!");

		// Lorsqu'un client envoie un message
		socket.on("message", (message) => {
			console.log(`Client ${socket.id} sent message: ${message}`);
		});

		// Lorsqu'un client se déconnecte
		socket.on("disconnect", () => {
			console.log(`Client ${socket.id} disconnected.`);
		});
	});
}

module.exports = {initSocketManager};