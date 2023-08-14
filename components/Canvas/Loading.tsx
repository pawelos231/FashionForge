import React from "react";
import { Suspense } from "react";

const ShirtLoader = () => {
  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="white" />
      <Suspense fallback={null}>
        <mesh>
          <torusKnotGeometry args={[0.08, 0.015, 240, 20, 3, 5]} />
          <meshStandardMaterial color={"#000"} wireframe />
        </mesh>
      </Suspense>
    </group>
  );
};

export default ShirtLoader;
