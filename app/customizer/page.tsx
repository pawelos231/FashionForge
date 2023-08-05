"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { downloadCanvasToImage, reader } from "@helpers/helperFuncs";
import { fadeAnimation, slideAnimation } from "@helpers/motion";
import { AIPicker, ColorPicker, Tab, FilePicker } from "@components/Pickers";

const Customizer = () => {
  return (
    <AnimatePresence>
      <motion.div key={"custom"} {...slideAnimation("left")}>
        <div>
          <div className="editortabs-container tabs">
            {" "}
            {["siema", "siema2", "siema3"].map((item) => {
              return <Tab key={item} tab={item} />;
            })}
          </div>
        </div>
      </motion.div>
      <motion.div className="filtertabs-container" {...slideAnimation("up")}>
        {["siema", "siema2", "siema3"].map((item) => {
          return <Tab key={item} tab={item} />;
        })}
      </motion.div>
    </AnimatePresence>
  );
};

export default Customizer;
