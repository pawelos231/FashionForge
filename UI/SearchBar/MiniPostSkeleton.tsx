import React from "react";
import { CommandItem } from "cmdk";

const MiniPostSkeleton = () => {
  return (
    <CommandItem className=" p-2 m-[4px]">
      <div className="border rounded p-4 mb-4 animate-pulse">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
          <div className="ml-3">
            <div className="h-4 bg-gray-300 w-20 mb-1"></div>
            <div className="h-3 bg-gray-300 w-16"></div>
          </div>
        </div>
        <div className="h-4 bg-gray-300 mt-2 w-32"></div>
        <div className="mt-2 flex items-center space-x-2">
          <div className="h-4 bg-gray-300 w-10"></div>
        </div>
      </div>
    </CommandItem>
  );
};

export default MiniPostSkeleton;
