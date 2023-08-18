import { Post, User, PostVote, Comment, VoteType } from "@prisma/client";

export type ExtendedPost = Post & {
  votes: PostVote[];
  author: User;
  comments: Comment[];
};
