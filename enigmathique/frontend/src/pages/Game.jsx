import React from 'react';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { SocketManager, socket } from '../components/SocketManager';
import { Scene } from '../components/SceneManager';
import { SocketContext } from '../context/socket';

const Game = () => {
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
