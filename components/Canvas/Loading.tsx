import React from "react";

//render something useful here later
const ShirtLoader = () => {
  return (
    <mesh>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
};

export default ShirtLoader;
