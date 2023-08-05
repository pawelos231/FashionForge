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
      className="w-full max-w-full h-full transition-all duration-0 ease-in"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
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
