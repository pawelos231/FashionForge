"use client";

import CustomCodeRenderer from "@components/renderers/CustomCodeRenderer";
import CustomImageRenderer from "@components/renderers/CustomImageRenderer";
import { FC } from "react";
import * as EditorErrTypes from "./types";
import {
  HeaderOutput,
  ParagraphOutput,
  CodeBoxOutput,
  ImageOutput,
  VideoOutput,
  EmbedOutput,
  TableOutput,
  ListOutput,
  ChecklistOutput,
  QuoteOutput,
  WarningOutput,
  LinkToolOutput,
  PersonalityOutput,
  DelimiterOutput,
} from "editorjs-react-renderer";

interface EditorOutputProps {
  content: any;
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

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return <Output style={style} renderers={renderers} data={content} />;
};

type HeaderOutputData = {
  text: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};

export const EditorOutputPostFeed: FC<EditorOutputProps> = ({ content }) => {
  if (!content) return;
  const headerBlocks = content.blocks.filter(
    (item) => item.type === "header"
  )[0];
  if (!headerBlocks) return;

  const dataHeader: HeaderOutputData = {
    text: headerBlocks.data.text,
  };

  return <Output style={style} renderers={renderers} data={content} />;
};

export default EditorOutput;

const config: EditorErrTypes.ErrTypesEditor.ErrConfig = {
  disableDefaultStyle: true,
};

type ErrOutputProps = {
  data: ErrOutputData;
  style?: EditorErrTypes.ErrTypesEditor.ErrOutputStyle;
  classNames?: EditorErrTypes.ErrTypesEditor.ErrOutputClassNames;
  config?: EditorErrTypes.ErrTypesEditor.ErrOutputConfig;
  renderers?: EditorErrTypes.ErrTypesEditor.ErrOutputRenderers;
};

//todo: rewrite table output

const Output = ({
  data,
  style,
  classNames,
  config,
  renderers,
}: ErrOutputProps): JSX.Element => {
  if (!data || typeof data !== "object") return <></>;
  if (!style || typeof style !== "object") style = {};
  if (!classNames || typeof classNames !== "object") classNames = {};
  if (!config || typeof config !== "object") config = {};
  if (!renderers || typeof renderers !== "object") renderers = {};

  return (
    <>
      {data.blocks.map((block, i) => {
        const key = block.type.toLowerCase();
        let Renderer = renderers![key] || getDefaultRenderer(key);

        if (!Renderer) return <></>;

        return (
          <Renderer
            key={i}
            data={block.data}
            style={style![key] || {}}
            config={config![key] || {}}
            classNames={classNames![key] || {}}
          />
        );
      })}
    </>
  );
};

const getDefaultRenderer = (key: string) => {
  switch (key) {
    case "codebox":
      return CodeBoxOutput;
    case "header":
      return HeaderOutput;
    case "paragraph":
      return ParagraphOutput;
    case "image":
      return ImageOutput;
    case "video":
      return VideoOutput;
    case "embed":
      return EmbedOutput;
    /*case "table":
      return TableOutput;  is the table really the case for all this drama ?*/
    case "list":
      return ListOutput;
    case "checklist":
      return ChecklistOutput;
    case "quote":
      return QuoteOutput;
    case "warning":
      return WarningOutput;
    case "linktool":
      return LinkToolOutput;
    case "personality":
      return PersonalityOutput;
    case "delimiter":
      return DelimiterOutput;
    default:
      return null;
  }
};

type ErrOutputData = {
  blocks: EditorErrTypes.ErrTypesEditor.ErrBlock[];
  time?: number;
  version?: string;
};
