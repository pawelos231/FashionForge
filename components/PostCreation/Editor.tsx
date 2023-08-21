"use client";

import "react-quill/dist/quill.snow.css";
import { memo } from "react";
import React from "react";

import Quill from "react-quill";
const ToolbarView = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

type Props = {
  HandleChange: (value: string) => void;
};

const QuillTextEditor = ({ HandleChange }: Props): JSX.Element => {
  return (
    <div className="h-[30%]">
      <Quill modules={ToolbarView} theme="snow" onChange={HandleChange} />
    </div>
  );
};

export default memo(QuillTextEditor);
