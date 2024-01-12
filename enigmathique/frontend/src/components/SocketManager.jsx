import {useEffect} from 'react';
import {io} from 'socket.io-client';

export const socket = io('http://localhost:5000', {
	autoConnect: false,
});

export const SocketManager = () => {
	useEffect(() => {
		// Evénements à écouter
		function onConnect() {
			console.log('Connecté');
		}

		function onDisconnect() {
			console.log('Déconnecté');
		}

		function onMessage(data) {
			console.log('Message de server: ' + data);
		}

		// Bind les événements
		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);
		socket.on('message', onMessage);

		// Se connecter au serveur
		socket.connect();

		// Unbind les événements
		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
		};

	}, []);

	return null;
};