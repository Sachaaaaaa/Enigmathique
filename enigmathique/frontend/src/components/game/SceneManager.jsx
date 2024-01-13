/* eslint-disable indent */
import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';
import { SocketContext } from '../../contexts/SocketContext';
import { ClientToServer, ServerToClient } from '../../data/socketMessages';
import { RoomProvider, useRoom } from '../../contexts/RoomContext';
import useMemoryState from 'hooks/useMemoryState';

export const Scene = () => {
	const socket = useContext(SocketContext);
	const { room, setRoom } = useRoom();
	const [memoryState, setMemoryState, resetAllMemoryState] = useMemoryState();

	// Ecoute les changements de scène
	useEffect(() => {
		const importRoom = async (roomName) => {
			// Remet à 0 le hook useMemoryState
			// TODO : trouver une meilleure solution
			resetAllMemoryState();

			console.log('Chargement de la scène : ' + roomName);
			const module = await import(`./rooms/${roomName}.jsx`);
			const RoomComponent = module.default;
			return RoomComponent;
		};

		socket.on(ServerToClient.SwitchRoom, ({roomName, roomVariables}) => {
			console.log('Changement de room : ' + roomName);
			importRoom(roomName)
				.then((RoomComponent) => setRoom({ name: roomName, variables: roomVariables, component: <RoomComponent/> }))
			
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
