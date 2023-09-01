import React from "react";
import { db } from "@lib/db";
import CommentCreation from "./CreateComment";

type Props = {
  postId: number;
};

const CommentsSection = async ({ postId }: Props) => {
  const comments = await db.comment.findMany({});

  return (
    <div>
      <CommentCreation />
      <div className="mt-20">
        {comments.length === 0 ? (
          <div>nic tu nie ma</div>
        ) : (
          <div>
            {comments.map((comment) => {
              return <div>comment</div>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
