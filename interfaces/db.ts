import { Post, User, PostVote, Comment } from "@prisma/client";

export type ExtendedPost = Post & {
  votes: PostVote[];
  author: User;
  comments: Comment[];
};

export type IMiniPost = Post & {
  author: {
    name: string;
    photoLink: string;
    createdAt: string;
  };
};
