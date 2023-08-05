"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { downloadCanvasToImage, reader } from "@helpers/helperFuncs";
import { fadeAnimation, slideAnimation } from "@helpers/motion";
import {
  AIPicker,
  ColorPicker,
  TabPickFull,
  TabPickTexture,
  FilePicker,
} from "@components/Pickers";
import Canvas from "@components/Canvas/Canvas";
import { EditorTabs } from "@constants/CustomizerTabs";
import FilterTab from "@components/Pickers/FilterTab";
import { EditorTabsEnum } from "@constants/CustomizerTabs";

type ActiveFilterType = {
  logoShirt: boolean;
  stylishShirt: boolean;
};

const Customizer = () => {
  const [file, setFile] = useState<File>();

  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState<EditorTabsEnum | "">(
    ""
  );
  const [activeFilterTab, setActiveFilterTab] = useState<ActiveFilterType>({
    logoShirt: true,
    stylishShirt: false,
  });

  const readFile = (type) => {
    reader(file).then((result) => {
      setActiveEditorTab("");
    });
  };

  const handleSubmit = () => {};

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case EditorTabsEnum.COLOR_PICKER:
        return <ColorPicker />;
      case EditorTabsEnum.FILE_PICKER:
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case EditorTabsEnum.AIPICKER:
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  const handle = useCallback(() => {
    console.log("siema");
  }, []);

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
              {EditorTabs.map((item) => {
                return (
                  <FilterTab
                    tabName={item.name}
                    alreadyActiveTabName={activeEditorTab}
                    handlePickFilter={useCallback((tabName) => {
                      setActiveEditorTab(tabName);
                    }, [])}
                  />
                );
              })}
              {generateTabContent()}
            </div>
          </div>
        </motion.div>

        <motion.div className="filtertabs-container" {...slideAnimation("up")}>
          <TabPickTexture tab="siema" handleClick={handle} />{" "}
          <TabPickFull tab="siema" handleClick={handle} />
        </motion.div>
        <Canvas />
      </>
    </AnimatePresence>
  );
};

export default Customizer;
