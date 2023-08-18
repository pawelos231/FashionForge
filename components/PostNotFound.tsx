import React from "react";

const PostNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Oops! Post Not Found</h2>
      <p className="text-gray-600">
        The requested post could not be found. Please check the URL or try again
        later.
      </p>
    </div>
  );
};

export default PostNotFound;
