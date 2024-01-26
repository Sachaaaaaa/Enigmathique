const { Server } = require('socket.io');
const { createServer } = require('http');
const SocketManager = require('./socketManager');
const clc = require('cli-color');

require('dotenv').config();

const httpServer = createServer();
const io = new Server(httpServer, {cors: {origin: '*'}});

// Initalise le SocketManager
const socketManager = new SocketManager(io);

// Bug quand les .env n'ont pas les bonnes valeurs.
// La requête à l'API ne fonctionne pas et la session donnée est considéré comme invalide.
console.log(clc.blue('Si le message Session Invalide apparait, vérifier les .env de enigmathique/game et enigmathique/api (TOKEN / URL)'))

// Lance le serveur
httpServer.listen(4000);