"use client";

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import CameraRig from "@components/Canvas/CameraRig";
import { Suspense } from "react";
import ShirtLoader from "@components/Canvas/Loading";
import Backdrop from "@components/Canvas/Backdrop";
import { Center } from "@react-three/drei";
import ProjectModel from "./ProjectModel";

const ProjectLoader = ShirtLoader;

const CanvasComponent = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full h-full transition-all duration-0 ease-in"
    >
      <Environment preset="city" />
      <CameraRig>
        <ambientLight intensity={0.1} />
        <Suspense fallback={<ProjectLoader />}>
          <Backdrop />
          <Center>
            <ProjectModel />
          </Center>
        </Suspense>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasComponent;
