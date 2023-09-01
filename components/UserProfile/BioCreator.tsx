import { Textarea } from "@UI/TextArea";
import React, { useState } from "react";

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
            className="h-8 w-8" // Adjust the height and width as needed
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
  initialBio: string;
  onSave: (bio: string) => void;
  onClose: (val: true) => void;
};

const BioCreator = ({ initialBio, onSave, onClose }: Props) => {
  const [bio, setBio] = useState<string>(initialBio);

  const handleSave = () => {
    onSave(bio);
    onClose(true);
  };

  return (
    <Modal onClose={onClose}>
      <Textarea
        onChange={(e) => setBio(e.target.value as string)}
        className="h-40"
      />
      <button
        onClick={handleSave}
        className="mt-12 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Bio
      </button>
    </Modal>
  );
};

export default BioCreator;
