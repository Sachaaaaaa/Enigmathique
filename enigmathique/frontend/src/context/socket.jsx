import { createContext, useContext } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const URL = 'http://localhost:4000';
export const socket = io(URL, { autoConnect: false });