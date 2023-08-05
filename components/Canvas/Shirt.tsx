import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { StateCanvasProps } from "./Canvas";

const Shirt = ({ state, color }: StateCanvasProps) => {
  const { nodes, materials } = useGLTF("/shirt_baked.glb") as any;

  const logoTexture = useTexture("/krzysiaPysk.png");
  const fullTexture = useTexture("/progf.jpg");

  useFrame((state, delta) => {
    easing.dampC(materials.lambert1.color, color, 0.25, delta);
  });

  const stateString = JSON.stringify(Math.random()); // for now, it rerenders when state changes

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {state.stylishShirt ? (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        ) : null}

        {state.logoShirt ? (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            depthTest={false}
          />
        ) : null}
      </mesh>
    </group>
  );
};

export default Shirt;
