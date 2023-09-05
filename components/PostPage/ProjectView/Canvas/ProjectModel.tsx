"use client";

import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { CustomizerState } from "@components/PostCreation/Customizer";

const ProjectModel = () => {
  const SHIRT_PATH = "/shirt_baked.glb";
  const { nodes, materials } = useGLTF(SHIRT_PATH) as any;

  return (
    <group key={Math.random()}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} />

        <Decal
          position={[0, 0.04, 0.15]}
          rotation={[0, 0, 0]}
          scale={0.15}
          depthTest={false}
        />
      </mesh>
    </group>
  );
};

export default ProjectModel;
