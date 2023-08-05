import React from "react";
import { Button } from "@UI/Button";

const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className="filepicker-container relative">
      <div className="flex-1 flex flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files![0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>

        <p className="mt-2 text-gray-500 text-xs truncate">
          {!file || file === "" ? "No file selected" : file.name}
        </p>
      </div>

      <div className="mt-2 flex  absolute bottom-2  gap-3 h-12 basis-[50%] w-full">
        <Button
          onClick={() => readFile("full")}
          className="text-xs bg-slate-100 w-[40%] h-[40%] borde text-black hover:text-white rounded-md p-4 "
          placeholder="logo"
        >
          Full
        </Button>
        <Button
          onClick={() => readFile("logo")}
          className="text-xs bg-slate-100 w-[40%] h-[40%] borde text-black hover:text-white rounded-md p-4 "
          placeholder="logo"
        >
          Logo
        </Button>
      </div>
    </div>
  );
};

export default FilePicker;
