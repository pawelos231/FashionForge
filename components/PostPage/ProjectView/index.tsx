"use client";

import React from "react";
import CanvasComponent from "./Canvas";

type Props = {
  logoLink: string;
  fullTextureLink: string;
  pathToModel: string;
};

const ProjectView = ({ logoLink, fullTextureLink, pathToModel }: Props) => {
  console.log(logoLink, fullTextureLink, pathToModel);
  return (
    <div className="flex h-[60vh] justify-center items-center w-[40%] ">
      <CanvasComponent />
    </div>
  );
};

export default ProjectView;
