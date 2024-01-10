/* eslint-disable indent */
import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { Model } from "./testGLB";
import Room001 from "./RoomGLTF-001";
import { SocketContext } from "../context/socket";

export const Scene = () => {
	const socket = useContext(SocketContext);

	useEffect(() => {
		const onConnection = () => {
			console.log('Connecté');
		};

		const onDisconnection = () => {
			console.log('Déconnecté');
		};

		socket.on('connect', onConnection);
		socket.on('disconnect', onDisconnection);

		socket.connect();

		return () => {
			socket.off('connect', onConnection);
			socket.off('disconnect', onDisconnection);
		};
	});

	return (
		<>
			<Environment preset="sunset" />
			<ambientLight intensity={0.4} />
			<OrbitControls />

			{/* Mettre la scène ici */}
			<Model />
		</>
	);
};
