/* eslint-disable indent */
import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { SocketContext } from "../context/socket";

export const Scene = () => {
	const socket = useContext(SocketContext);
	const [roomComponent, setRoomComponent] = useState(null);
	const [roomName, setRoomName] = useState(null);


	// Charge la scène en fonction de son nom
	useEffect(() => {
		if (roomName) {
			const importComponent = async () => {
				const module = await import(`./rooms/${roomName}.jsx`);
				const AnotherComponent = module.default;
				setRoomComponent(<AnotherComponent />);
			};
	
			importComponent();
		}
	}, [roomName]);

	return (
		<>
			<Environment preset="sunset" />
			<ambientLight intensity={0.4} />
			<OrbitControls />
			{roomComponent}
		</>
	);
};
