import React from "react";

const PostSkeleton = () => {
  return (
    <>
      <div className="w-full animate-pulse px-6 py-4 space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 w-[7%] h-10  bg-gray-300 rounded-full"></div>
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
            <div className="h-5 w-12 bg-gray-300"></div>
          </div>
        </div>

        <div className="text-xs text-gray-300">
          <span className="font-medium bg-gray-300 h-4 w-20"></span>
        </div>

        <a href="/">
          <h2 className="text-lg font-semibold leading-tight text-gray-300 bg-gray-300 h-8 w-72"></h2>
        </a>

        <div className="relative text-sm max-h-40 w-full overflow-clip">
          <div className="bg-gray-300 h-36 w-full"></div>
        </div>
      </div>

      <div className="bg-gray-50 text-sm px-4 py-3 flex items-center space-x-2">
        <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
        <span className="text-gray-300 bg-gray-300 h-4 w-12"></span>
      </div>
    </>
  );
};

export default PostSkeleton;
