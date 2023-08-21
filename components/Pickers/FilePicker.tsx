"use client";

import React from "react";
import { Button } from "@UI/Button";

type Event = React.ChangeEvent<HTMLInputElement>;

export enum TextureType {
  logo = "logo",
  full = "full",
}

type Props = {
  file: File | undefined;
  setFile: (file: File | undefined) => void;
  readFile: (type: TextureType) => void;
};

const FilePicker = ({ file, setFile, readFile }: Props) => {
  return (
    <div className="filepicker-container relative">
      {/* File Input */}
      <div className="flex-1 flex flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e: Event) => setFile(e.target.files![0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>
        <p className="mt-2 text-gray-500 text-xs truncate">
          {!file ? "No file selected" : file.name}
        </p>
      </div>

      {/* Buttons for Texture Types */}
      <div className="mt-2 flex absolute bottom-2 gap-3 h-12 basis-[50%] w-full">
        <Button
          onClick={() => readFile(TextureType.full)}
          className="text-xs bg-slate-100 w-[40%] h-[40%] border text-black hover:text-white rounded-md p-4"
        >
          Full
        </Button>
        <Button
          onClick={() => readFile(TextureType.logo)}
          className="text-xs bg-slate-100 w-[40%] h-[40%] border text-black hover:text-white rounded-md p-4"
        >
          Logo
        </Button>
      </div>
    </div>
  );
};

export default FilePicker;
