"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { downloadCanvasToImage, reader } from "@helpers/helperFuncs";
import { fadeAnimation, slideAnimation } from "@helpers/motion";
import { AIPicker, ColorPicker, Tab, FilePicker } from "@components/Pickers";
import Canvas from "@components/Canvas/Canvas";

const Customizer = () => {
  return (
    <AnimatePresence>
      <>
        <motion.div
          key="custom"
          className="absolute top-0 left-0 z-10"
          {...slideAnimation("left")}
        >
          <div className="flex items-center z-10">
            <div className="editortabs-container tabs z-10">
              {[1, 2, 3].map((tab) => (
                <Tab key={Math.random()} tab="siema" />
              ))}
              siii
            </div>
          </div>
        </motion.div>

        <motion.div className="filtertabs-container" {...slideAnimation("up")}>
          {[1, 2, 3].map((tab) => (
            <Tab key={Math.random()} tab="siema" />
          ))}
        </motion.div>
        <Canvas />
      </>
    </AnimatePresence>
  );
};

export default Customizer;
