"use client";

import CustomCodeRenderer from "./renderers/CustomCodeRenderer";
import CustomImageRenderer from "./renderers/CustomImageRenderer";
import { FC } from "react";
import dynamic from "next/dynamic";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
);

interface EditorOutputProps {
  content: string;
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
};

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
};

//switch to Editor.js later and use this Output

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
};

export default EditorOutput;
