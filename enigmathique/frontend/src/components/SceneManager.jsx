/* eslint-disable indent */
<<<<<<< HEAD
import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';

import { Model } from './testGLB';
=======
import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';

import { Model } from './testGLB';
import { Room001 } from './RoomGLTF-001';
>>>>>>> fc267e90b21a1edaee5cb7f258723f4a35bd9f0e
import { SocketContext } from '../context/socket';

export const Scene = () => {
	const socket = useContext(SocketContext);
	const [roomComponent, setRoomComponent] = useState(null);
	const [roomName, setRoomName] = useState(null);

	// Charge la scène en fonction de son nom
	useEffect(() => {
		if (roomName) {
			const importComponent = async () => {
				console.log('Chargement de la scène : ' + roomName);
				const module = await import(`./rooms/${roomName}.jsx`);
				const AnotherComponent = module.default;
				setRoomComponent(<AnotherComponent />);
			};
	
			importComponent();
		}
	}, [roomName]);

	// Ecoute les changements de scène
	useEffect(() => {
		socket.on('connect', () => {
			console.log('Connecté au serveur');
		});

		socket.on('disconnect', () => {
			console.log('Déconnecté du serveur');
		});

		// { roomName, roomData }
		socket.on('room', (data) => {
			console.log(data);
			console.log('Changement de room : ' + data.roomName);
			setRoomName(data.roomName);
		});

		socket.connect();

		return () => {
			socket.off('connect');
			socket.off('disconnect');
			socket.off('room');
		};
	}, []);

	return (
		<>
			<Environment preset="sunset" />
			<ambientLight intensity={0.4} />
			<OrbitControls />
<<<<<<< HEAD
			{roomComponent}
=======

			{/* Mettre la scène ici
			<Room001 />*/}
			<Model /> 
			
>>>>>>> fc267e90b21a1edaee5cb7f258723f4a35bd9f0e
		</>
	);
};
