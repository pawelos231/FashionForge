import React from "react";

const Modal = ({ onClose }) => {
  const modalContainerStyle =
    "fixed inset-0 w-[100vw] h-[100vh] flex items-center justify-center z-[9000] backdrop-blur-md bg-opacity-50 bg-black";

  const modalContentStyle =
    "bg-white rounded-md shadow-md w-[90%] h-[90%] flex justify-center items-center relative";

  return (
    <div className={modalContainerStyle}>
      <div className={modalContentStyle}>
        <div className="p-4">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="text-2xl font-semibold mb-4 text-center">
            Cool Modal
          </div>
          <p className="text-gray-600">
            This is a stylish modal with Tailwind CSS!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
