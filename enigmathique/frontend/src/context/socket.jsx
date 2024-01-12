import { io } from 'socket.io-client';
import { createContext, useContext, useEffect, useState } from 'react';

// TODO: Mettre dans .env
const socket = new io('http://localhost:4000', {
	autoConnect: false,
});
const SocketContext = createContext();

export { socket, SocketContext };