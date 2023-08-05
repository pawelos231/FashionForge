"use client";
import { CustomizerState } from "@app/customizer/page";
import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import Shirt from "./Shirt";
import CameraRig from "./CameraRig";
import Backdrop from "./Backdrop";

type Props = {
  state: CustomizerState;
};

const CanvasMod = ({ state }: Props) => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="absolute top-0 z-0"
    >
      <ambientLight intensity={0.5}></ambientLight>
      <Environment preset="city"></Environment>
      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt PassedState={state} />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasMod;
