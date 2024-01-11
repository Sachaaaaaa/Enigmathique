/* eslint-disable indent */
import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { Environment, OrbitControls } from "@react-three/drei";

import { Model } from "./testGLB";
import { Room001 } from "./rooms/Laboratory";
import { SocketContext } from "../context/socket";

export const Scene = () => {
	const socket = useContext(SocketContext);
	const [roomName, setRoomName] = useState(null);

	// Charge la scène en fonction de son nom
	useEffect(() => {
		if (roomName) {
			import(`./rooms/${roomName}.jsx`).then((scene) => {
				console.log(scene);
			});
		}
	}, [roomName]);

	useEffect(() => {
		const onConnection = () => {
			console.log('Connecté');
		};

		const onDisconnection = () => {
			console.log('Déconnecté');
		};

		const onScene = (data) => {
			setRoomName(data);
		};

		socket.on('connect', onConnection);
		socket.on('disconnect', onDisconnection);
		socket.on('scene', onScene);

		socket.connect();

		return () => {
			socket.off('connect', onConnection);
			socket.off('disconnect', onDisconnection);
			socket.off('scene', onScene);
		};
	});



	return (
		<>
			<Environment preset="sunset" />
			<ambientLight intensity={0.4} />
			<OrbitControls />

			{/* Mettre la scène ici
			<Model /> */}
			
			<Room001 />
		</>
	);
};
