/* eslint-disable indent */
// Test
import React, { useRef, useState, useContext, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { Html } from "@react-three/drei";
import { node } from "prop-types";
import { SocketContext } from "../context/socket";

export function Model(props) {
	const socket = useContext(SocketContext);
	const { nodes, materials } = useGLTF("/models/test.glb");

	useEffect(() => {
		const onGameEvent = (data) => {
			console.log('Evenement de jeu: ' + data);
		};

		socket.on('gameEvent', onGameEvent);

		return () => {
			socket.off('gameEvent', onGameEvent);
		};
	}, []);

	const [gameState, setGameState] = useState({
		'suzanneClicked': false,
		'test': 'test',
	});
	
	const handleCickSuzanne = (e) => {
		setGameState({
			...gameState,
			'suzanneClicked': true,
		});
		console.log("Suzanne clicked");
		console.log(gameState);

		socket.emit('message', 'J\'ai cliqué sur Suzanne mdr');
	};


  return (
    <group {...props} dispose={null}>
      <mesh
        name="Suzanne"
        castShadow
        receiveShadow
        geometry={nodes.Suzanne.geometry}
        material={materials.RedColor}
				onPointerDown={handleCickSuzanne}
      >
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/test.glb");

// SceneLoader
/*
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useGLTF } from '@react-three/drei';

const SceneLoader = ({ glbPath, onObjectsLoaded, onHover}) => {
  const group = useRef();
  const gltf = useGLTF(glbPath);

  if (gltf && gltf.scene && onObjectsLoaded) {
    onObjectsLoaded(gltf.scene.children);
  }

	const handlePointerOver = (event) => {
    if (onHover) {
      onHover(event.object);
    }
  };

  const handlePointerOut = () => {
    if (onHover) {
      onHover(false);
    }
  };
  
  return <group ref={group}>
		{gltf ? <primitive object={gltf.scene || gltf.group} 
		onPointerOver={handlePointerOver}
		onPointerOut={handlePointerOut}
		/> : null}
		</group>;
};

SceneLoader.propTypes = {
  glbPath: PropTypes.string.isRequired,
  onObjectsLoaded: PropTypes.func,
	onHover: PropTypes.func,
};

export default SceneLoader;
*/

