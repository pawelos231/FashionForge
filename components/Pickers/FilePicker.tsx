import React from "react";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e: InputEvent) => setFile(e.target.files![0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>

        <p className="mt-2 text-gray-500 text-xs truncate">
          {file === "" ? "No file selected" : file?.name || ""}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          title="Logo"
          onClick={() => readFile("logo")}
          className="text-xs"
        />
        <button
          title="Full"
          onClick={() => readFile("full")}
          className="text-xs"
        />
      </div>
    </div>
  );
};

export default FilePicker;
