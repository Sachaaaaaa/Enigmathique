/* eslint-disable indent */
import React from "react";
import { useState } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
//import { Room001 } from "./RoomGLTF-001";
import SceneLoader from "./testGLB";

export const Scene = () => {
		const [hoveredObject, setHoveredObject] = useState(false);

    const scenePath = '/models/Demo_Room-002.glb';

    // Afficher les touts les objects de la scene
    const handleObjectsLoaded = (objects) => {
    console.log('Objects loaded:', objects);

  };

	// Afficher les objects survolés
	const handleHover = (object) => {
    setHoveredObject(object ? object === "Marmite" : false);
    console.log('Hovered object:', object);
  };
  
    return (
        <>
        <Environment preset="sunset" />
        <ambientLight intensity={0.3} />
        <OrbitControls />

        {// Comment
        //<Room001 />
        }

        <SceneLoader glbPath={scenePath} onObjectsLoaded={handleObjectsLoaded} onHover={handleHover}/>
        </>
    );
};