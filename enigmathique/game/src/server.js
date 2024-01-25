const { Server } = require('socket.io');
const { createServer } = require('http');
const SocketManager = require('./socketManager');
const clc = require('cli-color');

require('dotenv').config();
const httpServer = createServer();
const io = new Server(httpServer, {cors: {origin: '*'}});


const socketManager = new SocketManager(io);

console.log(clc.blue('Si le message Session Invalide apparait, vérifier les .env de enigmathique/game et enigmathique/api (TOKEN / URL)'))

httpServer.listen(4000);