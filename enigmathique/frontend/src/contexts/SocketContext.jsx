import { createContext, useContext } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_SOCKET : process.env.REACT_APP_DEV_SOCKET_URL;
export const socket = io(URL, { autoConnect: false, reconnection: false });