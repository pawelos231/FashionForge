"use client";

import React from "react";
import CanvasComponent from "./Canvas";
import { useState, useCallback } from "react";
import Modal from "./Modal";
import withPortal from "@lib/HOC/portal";

type Props = {
  logoLink: string;
  fullTextureLink: string;
  pathToModel: string;
};

const ProjectView = ({ logoLink, fullTextureLink, pathToModel }: Props) => {
  const [openedModal, handleOpenModal] = useState<boolean>(false);
  const onClose = useCallback(() => {
    handleOpenModal(false);
  }, []);

  const WrappedModal = withPortal(Modal, {
    portalId: "#three",
  });
  console.log(openedModal);
  return (
    <>
      <div
        className="flex h-[60vh] justify-center items-center w-[40%]"
        onClick={() => handleOpenModal((prev) => !prev)}
      >
        <CanvasComponent />
      </div>
      {openedModal ? <WrappedModal onClose={onClose} /> : null}
    </>
  );
};

export default ProjectView;
