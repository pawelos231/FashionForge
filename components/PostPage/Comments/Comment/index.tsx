import React from "react";

const Comment = ({ comment }) => {
  return (
    <div className="border rounded p-4 mb-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <img
            src={comment.user.photoLink}
            alt={comment.user.name}
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">{comment.user.name}</p>
          <p className="text-xs text-gray-500">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <p className="mt-2 text-sm">{comment.content}</p>
      <div className="mt-2 flex items-center space-x-2">
        <button className="text-xs text-gray-500">Upvote</button>
        <button className="text-xs text-gray-500">Downvote</button>
        <span className="text-xs text-gray-500">
          {comment.likes.length} points
        </span>
        <button className="text-xs text-gray-500">Reply</button>
      </div>
      {comment.children?.map((childComment) => (
        <Comment key={childComment.id} comment={childComment} />
      ))}
    </div>
  );
};

export default Comment;
