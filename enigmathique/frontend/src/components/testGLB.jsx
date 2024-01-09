/* eslint-disable indent */
import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { Html } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/models/test.glb");
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handlePointerOver = () => {
    setHovered(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={mesh}
        name="Suzanne"
        castShadow
        receiveShadow
        geometry={nodes.Suzanne.geometry}
        material={materials.RedColor}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        {hovered && !clicked && <meshBasicMaterial color={0x00ff00} />}
        {hovered && clicked && (
          <Html>
            <div style={{position: "absolute", 
                        top: "50%", 
                        left: "50%", 
                        transform: "translate(-50%, -50%)", 
                        padding: "20px", 
                        background: "white", 
                        borderRadius: "5px",
                        height: '20vh',
                        width: '20vw'}}>
              <h1>Page ouverte!</h1>
              <p>Le contenue de l enigme, attention un peux chiant a fermer quand on est loin de l objet.</p>
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/test.glb");
