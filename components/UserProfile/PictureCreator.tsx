import React, { useState } from "react";
import "@uploadthing/react/styles.css";
import { UploadButton } from "@utils/uploadthing";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-md backdrop-filter z-50">
      <div className="bg-white p-4 rounded-lg shadow-md w-[40%]">
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

type Props = {
  onSave: (imageUrl: string) => void;
  onClose: () => void;
};

const ImageUploader = ({ onSave, onClose }: Props) => {
  const handleSave = (fileUrl: string) => {
    onSave(fileUrl);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          if (res) {
            console.log(res[0].fileUrl);
            handleSave(res[0].fileUrl);
          }
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </Modal>
  );
};

export default ImageUploader;
