import React from 'react';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { SocketManager } from '../components/SocketManager';
import { Scene } from '../components/SceneGLTF';

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
			<meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
		</mesh>
	);
}
*/
const Game = () => {
	return (
		<Canvas shadows camera={{position:[8,8,8], fov:35}} style={{height:'100vh' , width:'100vw' }} >
			<SocketManager />
			<color attach="background" args={["#9999e6"]} />
			<Scene />
		</Canvas>
	);
};

export default Game;
