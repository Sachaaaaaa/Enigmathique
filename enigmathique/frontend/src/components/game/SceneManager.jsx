/* eslint-disable indent */
import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';
import { SocketContext } from '../../contexts/SocketContext';
import { ClientToServer, ServerToClient } from '../../data/socketMessages';
import { RoomProvider, useRoom } from '../../contexts/RoomContext';
import useMemoryState from 'hooks/useMemoryState';
import PropTypes from 'prop-types';

export const Scene = ({setIsLoading}) => {
	const socket = useContext(SocketContext);
	const { room, setRoom } = useRoom();
	const [memoryState, setMemoryState, resetAllMemoryState] = useMemoryState();

	// Ecoute les changements de scène
	useEffect(() => {
		const importRoom = async (roomName) => {
			resetAllMemoryState();
			// Affiche le chargement
			setIsLoading(true);

			// Importe la scène
			console.log('Chargement de la scène : ' + roomName);
			const module = await import(`./rooms/${roomName}.jsx`);
			const RoomComponent = module.default;

			// Cache le chargement
			setIsLoading(false);

			return RoomComponent;
		};

		socket.on(ServerToClient.SwitchRoom, ({roomName, roomVariables}) => {
			console.log('Changement de room : ' + roomName);
			importRoom(roomName)
				.then((RoomComponent) => setRoom({ name: roomName, variables: roomVariables, component: <RoomComponent/> }))
			
		});

		socket.connect();

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

Scene.propTypes = {
	setIsLoading: PropTypes.func.isRequired,
};
