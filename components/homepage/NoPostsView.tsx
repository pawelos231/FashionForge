import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TorusLoader from "./Torus";

const NoPostsView = () => {
  const torusRef = useRef<any>();

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-[40%] h-[45%] p-6 bg-white ">
        <Canvas
          camera={{ position: [0, 5, 10], fov: 25 }}
          gl={{ preserveDrawingBuffer: false }}
          className="w-[80%]  h-[80%] transition-all duration-0 ease-in"
        >
          <ambientLight intensity={0.1} />
          <pointLight position={[10, 10, 10]} />
          <TorusLoader />
          <OrbitControls />
        </Canvas>
        <p className="mt-6 text-xl font-semibold text-center">
          Oops! No posts available.
        </p>
      </div>
    </div>
  );
};

export default NoPostsView;
