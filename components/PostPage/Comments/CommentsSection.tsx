import React from "react";
import { db } from "@lib/db";
import CommentCreation from "./CreateComment";
import Comment from "./Comment";
import NoCommentsView from "./NoComments";

type Props = {
  postId: number;
};

const CommentsSection = async ({ postId }: Props) => {
  const comments = await db.comment.findMany({
    where: {
      postId: postId,
    },
    include: {
      user: true,
      likes: true,
    },
  });

  return (
    <div>
      <CommentCreation postId={postId} />
      <div className="mt-20">
        {comments.length === 0 ? (
          <NoCommentsView />
        ) : (
          <div>
            {comments.map((comment) => {
              return <Comment comment={comment} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
