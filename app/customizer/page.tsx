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
import { DecalTypes } from "@constants/CustomizerTabs";
import {
  DEFAULT_LOGO_DECAL,
  DEFAULT_FULL_DECAL,
} from "@constants/CustomizerTabs";

type ActiveFilterType = {
  logoShirt: boolean;
  stylishShirt: boolean;
};

export type CustomizerState = {
  logoDecal: string;
  fullDecal: string;
  color: string;
} & ActiveFilterType;

const Customizer = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
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

  const handleSetColor = useCallback((color: string) => {
    setColor(color);
  }, []);

  const handlePickFilter = useCallback((tabName) => {
    setActiveEditorTab(tabName);
  }, []);

  const handleSetFile = useCallback((file) => {
    setFile(file);
  }, []);

  const handleReadFile = useCallback(
    (type: string) => {
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
      return setActiveFilterTab(changed);
    },
    []
  );

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    console.log(result);
    //move this to enums later
    if (type == "full") {
      setFullDecal(result);
    } else if (type == "logo") {
      setLogoDecal(result);
    }

    if (!activeFilterTab[decalType.filterTab]) {
      handleChangeSelectedFilterTabs(decalType.filterTab);
    }
  };

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

  const state: CustomizerState = {
    logoShirt: activeFilterTab.logoShirt,
    stylishShirt: activeFilterTab.stylishShirt,
    logoDecal: logoDecal,
    fullDecal: fullDecal,
    color,
  };

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
                    handlePickFilter={handlePickFilter}
                  />
                );
              })}
              {generateTabContent()}
            </div>
          </div>
        </motion.div>

        <motion.div className="filtertabs-container" {...slideAnimation("up")}>
          <TabPickTexture
            tab="siema"
            handleClick={handleChangeSelectedFilterTabs}
            filterObj={activeFilterTab}
          />{" "}
          <TabPickFull
            tab="siema"
            handleClick={handleChangeSelectedFilterTabs}
            filterObj={activeFilterTab}
          />
        </motion.div>
        <Canvas state={state} />
      </>
    </AnimatePresence>
  );
};

export default Customizer;
