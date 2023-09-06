"use client";

import React from "react";
import CanvasComponent from "./Canvas";
import { useState, useCallback } from "react";
import Modal from "./Modal";
import withPortal from "@lib/HOC/portal";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

type Props = {
  logoLink: string;
  fullTextureLink: string;
  pathToModel: string;
};

const ProjectView = ({ logoLink, fullTextureLink, pathToModel }: Props) => {
  const [openedModal, handleOpenModal] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);
  const onClose = useCallback(() => {
    handleOpenModal(false);
  }, []);

  const WrappedModal = withPortal(Modal, {
    portalId: "#three",
  });

  const canvasVariants = {
    open: { width: "100%", height: "100%" },
    closed: { width: "40%", height: "60vh" },
  };

  console.log(started);
  return (
    <LayoutGroup>
      <motion.div
        layoutId="modal-content"
        initial="closed"
        variants={canvasVariants}
        transition={{ duration: 0.3 }}
        className="flex h-[60vh] justify-center items-center w-[40%]"
        onClick={() => handleOpenModal((prev) => !prev)}
      >
        {!started && <CanvasComponent />}
      </motion.div>
      <AnimatePresence>
        {openedModal && (
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            layoutId="modal-content"
            className="bg-white rounded-lg shadow-md"
          >
            {" "}
            <WrappedModal key="modal" onClose={onClose} />{" "}
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
};

export default ProjectView;
