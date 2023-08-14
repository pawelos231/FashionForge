import { Suspense } from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const TorusLoader = () => {
  const torusRef = useRef<any>();

  useFrame(() => {
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.005;
      torusRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="white" />
      <Suspense fallback={null}>
        <mesh ref={torusRef}>
          <torusKnotGeometry args={[1.3, 0.3, 240, 20, 3, 5]} />
          <meshStandardMaterial color={"#000"} wireframe />
        </mesh>
      </Suspense>
    </group>
  );
};

export default TorusLoader;
