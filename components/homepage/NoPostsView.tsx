import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";

const NoPostsView = () => {
  return (
    <div className="no-posts-container">
      <div className="no-posts-content">
        <Canvas camera={{ position: [0, 5, 15] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls />
          <Box args={[10, 10, 10]} position={[0, 0, 0]} />
          {/* Use the Box component */}
        </Canvas>
        <p className="no-posts-text">Oops! No posts available.</p>
      </div>
      <style jsx>{`
        .no-posts-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f0f0f0;
        }
        .no-posts-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .no-posts-text {
          font-size: 20px;
          margin-top: 20px;
          text-align: center;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default NoPostsView;
