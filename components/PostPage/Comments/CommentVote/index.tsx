import React from "react";

const CommentVote = ({ vote, currentVote, votesAmt }) => {
  return (
    <div className="absolute top-6 right-6 flex items-center space-x-4">
      {/* Upvote Button */}
      <button
        onClick={() => {
          vote("UP");
        }}
        className={`text-lg ${
          currentVote === "UP"
            ? "text-emerald-500 fill-emerald-500"
            : "text-gray-500"
        }`}
        aria-label="upvote"
      >
        <i className="fas fa-thumbs-up"></i>
      </button>

      <span className="font-medium text-sm text-gray-600">{votesAmt}</span>

      <button
        onClick={() => {
          vote("DOWN");
        }}
        className={`text-lg ${
          currentVote === "DOWN" ? "text-red-500 fill-red-500" : "text-gray-500"
        }`}
        aria-label="downvote"
      >
        <i className="fas fa-thumbs-down"></i>
      </button>
    </div>
  );
};

export default CommentVote;
