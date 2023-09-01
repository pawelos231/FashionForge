"use client";

import { useRef } from "react";
import React from "react";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

const Backdrop = () => {
  const shadows = useRef(null);

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        intensity={0.55}
        radius={9}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.2}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
};

export default React.memo(Backdrop);
