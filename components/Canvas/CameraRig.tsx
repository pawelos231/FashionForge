"use client";

import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";
import { Group, Object3D } from "three";

type PosType = [x: number, y: number, z: number];

const CameraRig = ({ children }) => {
  const group = useRef<Group | null>(null);
  useFrame((state, delta) => {
    let targetPosition = [0, 0, 2] as PosType;
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    easing.dampE(
      group.current!.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
