import React from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { AmbientLight } from "three";
import { Room001 } from "./RoomGLTF-001";

export const Scene = () => {
    return (
        <>
        <Environment preset="sunset" />
        <ambientLight intensity={0.3} />
        <OrbitControls />
        <Room001 />
        </>
    );
};