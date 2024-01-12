<<<<<<< HEAD
import React from 'react';
import {Canvas} from '@react-three/fiber';
import {SocketManager} from '../components/SocketManager';
import {Scene} from '../components/SceneGLTF';

/*
function Box(props) {
	// This reference will give us direct access to the mesh
	const meshRef = useRef();
	// Set up state for the hovered and active state
	const [hovered, setHover] = useState(false);
	const [active, setActive] = useState(false);
	// Subscribe this component to the render-loop, rotate the mesh every frame
	useFrame((state, delta) => (meshRef.current.rotation.x += delta));
	// Return view, these are regular three.js elements expressed in JSX
	return (
		<mesh
			{...props}
			ref={meshRef}
			scale={active ? 1.5 : 1}
			onClick={(event) => setActive(!active)}
			onPointerOver={(event) => setHover(true)}
			onPointerOut={(event) => setHover(false)}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
		</mesh>
	);
}
*/
=======
import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

import { SocketManager, socket } from '../components/SocketManager';
import { Scene } from '../components/SceneManager';
import { SocketContext } from '../context/socket';
import { useSearchParams } from 'react-router-dom';

>>>>>>> game
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
<<<<<<< HEAD
		<Canvas shadows camera={{position: [8, 8, 8], fov: 35}} style={{height: '100vh', width: '100vw'}}>
			<SocketManager/>
			<color attach='background' args={['#9999e6']}/>
			<Scene/>
		</Canvas>
=======
		<SocketContext.Provider value={socket}>
			<Canvas shadows camera={{position:[8,8,8], fov:35}} style={{height:'100vh' , width:'100vw' }} >
				<color attach="background" args={['#9999e6']} />
				<Scene />
			</Canvas>
		</SocketContext.Provider>
>>>>>>> game
	);
};

export default Game;
