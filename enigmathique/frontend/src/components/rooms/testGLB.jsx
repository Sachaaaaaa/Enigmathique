/* eslint-disable indent */
// Test
import React, { useRef, useState, useContext, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { Html } from "@react-three/drei";
import { node } from "prop-types";
import { SocketContext } from "../../context/socket";

import useInteractiveObject from "../../hooks/useInteractiveObject";

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

	// Initialiser d'un objet interactif avec le hook
	const Object1 = () => {
    const { mesh, hovered, clicked, handlePointerOver, handlePointerOut, handleClick } =
      useInteractiveObject();
		// Mettre les paramètres de l'objet qu'on veut modifier dans le hook
    return (
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Suzanne.geometry}
        material={materials.RedColor}
        position={[0, 0, 0]}
        ref={mesh}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        {hovered && <meshBasicMaterial color={0x00ff00} />}
        {clicked && console.log("Object1 clicked")}
      </mesh>
    );
  };

	const Object2 = () => {
    const { mesh, hovered, clicked, handlePointerOver, handlePointerOut, handleClick } =
      useInteractiveObject();

    return (
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Suzanne.geometry}
        material={materials.RedColor}
        position={[4, 0, 0]}
        ref={mesh}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        {hovered && <meshBasicMaterial color={0xff0000} />}
        {clicked && console.log("Object2 clicked")}
      </mesh>
    );
  };

  return (
    <group {...props} dispose={null}>
      <Object1 />
			<Object2 />
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

