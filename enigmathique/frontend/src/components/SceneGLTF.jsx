/* eslint-disable indent */
import React from "react";
import { useState } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import {Model} from "./testGLB";
import {Room001} from "./RoomGLTF-001";

export const Scene = () => {
		const [hoveredObject, setHoveredObject] = useState(false);
		const scenePath = '/models/Demo_Room-002.glb';
		
		// Afficher les touts les objects de la scene
		const handleObjectsLoaded = (objects) => {
			console.log('Objects loaded:', objects);
		};

	// Afficher les objets survolés
	const handleHover = (object) => {
	// Vérifiez si l'objet survolé a le nom "Marmite"
	const isHoverable = object ? object.name === 'Marmite' : false;

	// Mise à jour de l'état uniquement si l'objet est survolable
	if (isHoverable) {
		setHoveredObject(isHoverable);
		console.log('Hovered object:', hoveredObject, object);
	}
};

  
    return (
        <>
        <Environment preset="sunset" />
        <ambientLight intensity={0.4} />
        <OrbitControls />

        {// Comment
        //
				// <SceneLoader glbPath={scenePath} onObjectsLoaded={handleObjectsLoaded} onHover={handleHover}/>
				<Model />
        }
				<Room001 />        
        </>
    );
};