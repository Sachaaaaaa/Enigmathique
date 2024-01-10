/* eslint-disable indent */
import React from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { Room001 } from "./RoomGLTF-001";
import SceneLoader from "./testGLB";

export const Scene = () => {
    const glbPath = '/models/Demo_Room-002.glb';

    const handleObjectsLoaded = (objects) => {
    console.log('Objects loaded:', objects);
    // Faites quelque chose avec les objets de la scène
  };
  
    return (
        <>
        <Environment preset="sunset" />
        <ambientLight intensity={0.3} />
        <OrbitControls />
        {// Comment
        //<Room001 />
        }
        <SceneLoader glbPath={glbPath} onObjectsLoaded={handleObjectsLoaded}/>
        </>
    );
};