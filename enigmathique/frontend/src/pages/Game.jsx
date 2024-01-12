import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

import { SocketManager, socket } from '../components/SocketManager';
import { Scene } from '../components/SceneManager';
import { SocketContext } from '../context/socket';
import { useSearchParams } from 'react-router-dom';

const Game = () => {
	// Recupère l'id de session dans l'url
	const [searchParams, setSearchParams] = useSearchParams();
	const sessionId = searchParams.get('sessionId');

	// Si l'id de session n'est pas défini, on quitte la page
	if (!sessionId) {
		window.location.href = '/';
	}

	// Met à jour l'id de session dans le handshake du socket
	socket.io.opts.query = { sessionId };

	useEffect(() => {
		socket.on('message', (message) => {
			console.log('Message du serveur : ' + message);
		});
	});

	return (
		<SocketContext.Provider value={socket}>
			<Canvas shadows camera={{position:[8,8,8], fov:35}} style={{height:'100vh' , width:'100vw' }} >
				<color attach="background" args={['#9999e6']} />
				<Scene />
			</Canvas>
		</SocketContext.Provider>
	);
};

export default Game;
