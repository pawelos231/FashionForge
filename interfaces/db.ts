import { Post, User, PostVote, Comment } from "@prisma/client";

export type ExtendedPost = Post & {
  votes: PostVote[];
  author: User;
  commets: Comment[];
};
