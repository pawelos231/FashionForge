import React from "react";

const PostLoader = () => {
  return (
    <div className="rounded-md bg-white shadow-md w-[50%] animate-pulse">
      <div className="px-6 py-4 space-y-4">
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>

        <div className="h-3 bg-gray-300 rounded w-1/4"></div>

        <div className="h-3 bg-gray-300 rounded w-1/3"></div>

        <div className="h-3 bg-gray-300 rounded w-1/4"></div>

        <div className="relative h-12 bg-gray-300 rounded">
          <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
        </div>
      </div>

      <div className="bg-gray-50 text-sm px-4 py-3 flex items-center space-x-2">
        <div className="h-4 w-4 bg-gray-300 rounded"></div>
        <div className="h-6 w-12 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default PostLoader;
