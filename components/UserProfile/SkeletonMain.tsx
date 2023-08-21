import React from "react";
import { Loader2 } from "lucide-react";

const UserProfileSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg mt-24">
      <div className="bg-gray-200 h-60 rounded-lg mb-6"></div>
      <div className="flex items-center mb-6">
        <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
        <div className="ml-8">
          <h1 className="text-4xl font-bold">
            {" "}
            <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
          </h1>
          <p className="text-gray-600 flex">
            Email: <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
          </p>
          <p className="text-gray-600 flex">
            Role: <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
          </p>
          <p className="text-gray-600 flex">
            CreatedPosts:{" "}
            <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
          </p>
          <p className="text-gray-600 flex">
            Created Comments:{" "}
            <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
          </p>
        </div>
      </div>
      <div className="mt-4 mb-4">
        <span className="text-blue-500">Loading...</span>
        <span className="mx-2 text-gray-400">|</span>
        <span className="text-blue-500">Loading...</span>
      </div>
      <div className="mb-8">
        <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
