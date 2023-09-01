"use client";

import { useState } from "react";
import { Button } from "@UI/Button";

const CommentCreation = () => {
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = () => {
    if (commentText.trim() !== "") {
      setCommentText("");
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        placeholder="Type your comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      <Button
        onClick={handleCommentSubmit}
        disabled={false}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
      >
        Submit Comment
      </Button>
    </div>
  );
};

export default CommentCreation;
