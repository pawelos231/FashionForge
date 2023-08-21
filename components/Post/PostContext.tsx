import { createContext, useContext } from "react";
import { ExtendedPost } from "@interfaces/db";
import { VoteType } from "@prisma/client";

type Props = {
  votesAmount: number;
  commentsAmount: number;
  post: ExtendedPost;
  currentVote: VoteType | undefined;
};

const PostContext = createContext<Props | null>(null);

export const usePostContext = (): Props => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("Post context failed");
  }
  return context;
};

export default PostContext;
