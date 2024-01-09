import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/models/test.glb");
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);

  const handlePointerOver = () => {
    setHovered(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
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
      >
        {/* Change la couleur du matériau lorsqu'il est survolé */}
        {hovered && (
          <meshBasicMaterial color={0xffffff} /> 
          // Vous pouvez ajuster la couleur ou utiliser un matériau différent ici
        )}
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/test.glb");
