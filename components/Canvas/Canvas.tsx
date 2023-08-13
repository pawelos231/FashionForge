"use client";
import { CustomizerState } from "@components/PostCreation/Customizer";
import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import Shirt from "./Shirt";
import CameraRig from "./CameraRig";
import Backdrop from "./Backdrop";
import { Suspense } from "react";
import ShirtLoader from "./Loading";

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
      <Environment preset="city" />
      <CameraRig>
        <Suspense fallback={<ShirtLoader />}>
          <Backdrop />
          <ambientLight intensity={0.1} />
          <Center>
            <Shirt PassedState={state} />
          </Center>
        </Suspense>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasMod;
