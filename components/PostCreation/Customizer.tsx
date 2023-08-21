"use client";

import React from "react";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { reader } from "@helpers/helperFuncs";
import { slideAnimation } from "@helpers/motion";
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
import { DecalTypes } from "@constants/CustomizerTabs";
import {
  DEFAULT_LOGO_DECAL,
  DEFAULT_FULL_DECAL,
} from "@constants/CustomizerTabs";
import { TextureType } from "@components/Pickers/FilePicker";
import { FiArrowLeft } from "react-icons/fi";

// Define types
type ActiveFilterType = {
  logoShirt: boolean;
  stylishShirt: boolean;
};

export type CustomizerState = {
  logoDecal: string;
  fullDecal: string;
  color: string;
} & ActiveFilterType;

type Props = {
  changeView: (value: boolean) => void;
};

// Main component
const Customizer = ({ changeView }: Props) => {
  // State variables
  const [file, setFile] = useState<File | null>(null);
  const [color, setColor] = useState<string>("#fff");
  const [prompt, setPrompt] = useState<string>("");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [logoDecal, setLogoDecal] = useState<string>(DEFAULT_LOGO_DECAL);
  const [fullDecal, setFullDecal] = useState<string>(DEFAULT_FULL_DECAL);
  const [activeEditorTab, setActiveEditorTab] = useState<EditorTabsEnum | "">(
    ""
  );
  const [activeFilterTab, setActiveFilterTab] = useState<ActiveFilterType>({
    logoShirt: true,
    stylishShirt: false,
  });

  // Handlers
  const handleSetColor = useCallback((color: string) => {
    setColor(color);
  }, []);

  const handlePickFilter = useCallback((tabName) => {
    setActiveEditorTab(tabName);
  }, []);

  const handleSetFile = useCallback((file: File) => {
    setFile(file);
  }, []);

  const handleReadFile = useCallback(
    (type: TextureType) => {
      reader(file).then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      });
    },
    [file]
  );

  const handleSetPrompt = useCallback((value: string) => {
    setPrompt(value);
  }, []);

  const handleSetSubmit = useCallback(() => {
    // Your handleSubmit logic here
  }, []);

  const handleChangeSelectedFilterTabs = useCallback(
    (changed: ActiveFilterType) => {
      setActiveFilterTab(changed);
    },
    []
  );

  const handleDecals = (type: TextureType, result) => {
    const decalType = DecalTypes[type];

    if (type == TextureType.full) {
      setFullDecal(result);
    } else if (type == TextureType.logo) {
      setLogoDecal(result);
    }

    if (!activeFilterTab[decalType.filterTab]) {
      handleChangeSelectedFilterTabs({
        ...activeFilterTab,
        [decalType.filterTab]: decalType.filterTab,
      });
    }
  };

  // Generate tab content based on activeEditorTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case EditorTabsEnum.COLOR_PICKER:
        return <ColorPicker setColor={handleSetColor} color={color} />;
      case EditorTabsEnum.FILE_PICKER:
        return (
          <FilePicker
            file={file}
            setFile={handleSetFile}
            readFile={handleReadFile}
          />
        );
      case EditorTabsEnum.AIPICKER:
        return (
          <AIPicker
            prompt={prompt}
            generatingImg={generatingImg}
            setPrompt={handleSetPrompt}
            handleSubmit={handleSetSubmit}
          />
        );
      default:
        return null;
    }
  };

  // Define the CustomizerState
  const state: CustomizerState = {
    logoShirt: activeFilterTab.logoShirt,
    stylishShirt: activeFilterTab.stylishShirt,
    logoDecal: logoDecal,
    fullDecal: fullDecal,
    color,
  };

  // Return JSX
  return (
    <AnimatePresence>
      <motion.div
        className="absolute top-20 right-4 z-10"
        {...slideAnimation("right")}
      >
        <button
          className="flex items-center p-2 bg-white border border-gray-300 rounded cursor-pointer"
          onClick={() => changeView(false)}
        >
          <FiArrowLeft className="mr-1" />
          Go Back
        </button>
      </motion.div>
      <motion.div
        key="custom"
        className="absolute top-0 left-0 z-10"
        {...slideAnimation("left")}
      >
        <div className="flex items-center z-10">
          <div className="editortabs-container tabs z-10">
            {EditorTabs.map((item) => (
              <FilterTab
                key={item.name}
                tabName={item.name}
                alreadyActiveTabName={activeEditorTab}
                handlePickFilter={handlePickFilter}
              />
            ))}
            {generateTabContent()}
          </div>
        </div>
      </motion.div>

      <motion.div className="filtertabs-container" {...slideAnimation("up")}>
        <TabPickTexture
          tab={TextureType.logo}
          handleClick={handleChangeSelectedFilterTabs}
          filterObj={activeFilterTab}
        />
        <TabPickFull
          tab={TextureType.full}
          handleClick={handleChangeSelectedFilterTabs}
          filterObj={activeFilterTab}
        />
      </motion.div>
      <Canvas state={state} />
    </AnimatePresence>
  );
};

export default React.memo(Customizer);
