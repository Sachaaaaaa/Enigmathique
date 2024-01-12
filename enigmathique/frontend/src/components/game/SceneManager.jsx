/* eslint-disable indent */
import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';
import { SocketContext } from '../../context/SocketContext';
import { ClientToServer, ServerToClient } from '../../data/socketMessages';
import { RoomProvider, useRoom } from '../../context/RoomContext';

export const Scene = () => {
	const socket = useContext(SocketContext);
	const { room, setRoom } = useRoom();

	// Charge la scène en fonction de son nom
	useEffect(() => {
		if (room.name) {
			const importComponent = async () => {
				console.log('Chargement de la scène : ' + room.name);
				const module = await import(`./rooms/${room.name}.jsx`);
				const AnotherComponent = module.default;
				setRoom((val) => ({ ...val, component: <AnotherComponent /> }));
			};

			importComponent();
		}
	}, [room.name]);

	// Ecoute les changements de scène
	useEffect(() => {
		socket.on(ServerToClient.SwitchRoom, ({ roomName, roomData }) => {
			console.log('Changement de room : ' + roomName);
			setRoom({ name: roomName, data: roomData, component: null });
		});

		socket.connect('http://localhost:4000');

		return () => {
			socket.off(ServerToClient.SwitchRoom);
		};
	}, []);

	return (
		<>
			<Environment preset="sunset" />
			<ambientLight intensity={0.4} />
			<OrbitControls />
			{room.component}
		</>
	);
};
