"use client";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

const Backdrop = () => {
  const shadows = useRef(null);

  return (
    <AccumulativeShadows
      position={[0, 0, -0.14]}
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      ref={shadows}
    >
      <RandomizedLight
        amount={4}
        intensity={0.5}
        radius={9}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight />
    </AccumulativeShadows>
  );
};

export default Backdrop;
