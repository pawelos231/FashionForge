"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import CanvasComponent from "../Canvas";

const Modal = ({ onClose }) => {
  const modalContainerStyle =
    "fixed inset-0 w-[100vw] h-[100vh] flex items-center justify-center z-[9000] backdrop-blur-md bg-opacity-50 bg-black";

  const modalContentStyle =
    "bg-white rounded-md shadow-md w-[100vw] h-[100vh] flex justify-center items-center relative";

  const [animationComplete, setAnimationComplete] = useState<boolean>(false);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      layoutId="modal-content"
      className={modalContainerStyle}
      onAnimationComplete={handleAnimationComplete}
    >
      <div className="z-[10000]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        {animationComplete && <CanvasComponent />}
      </div>
    </motion.div>
  );
};

export default Modal;
