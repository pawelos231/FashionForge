import { SearchType } from "@components/homepage/Filters/enums";
import { db } from "@lib/db";
import { VoteType } from "@prisma/client";

export const getOldestPosts = async (page: string, limit: string) => {
  const posts = await db.post.findMany({
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: {
      createdAt: "asc",
    },
    include: {
      author: {
        select: {
          name: true,
          photoLink: true,
          createdAt: true,
          role: true,
          commentsLikes: true,
          postLikes: true,
        },
      },
      comments: true,
      votes: true,
    },
  });
  return posts;
};

export const getAllPosts = async (page: string, limit: string) => {
  const posts = await db.post.findMany({
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          name: true,
          photoLink: true,
          createdAt: true,
          role: true,
          commentsLikes: true,
          postLikes: true,
        },
      },
      comments: true,
      votes: true,
    },
  });
  return posts;
};

type getPostsFunc = (limit: string, page: string) => any;
type getDownVotedPosts = (
  limit: string,
  page: string,
  userId: number,
  voteType: VoteType
) => any;

export const getVotedPosts: getDownVotedPosts = async (
  page,
  limit,
  userId,
  voteType: VoteType
) => {
  const posts = await db.post.findMany({
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          name: true,
          photoLink: true,
          createdAt: true,
          role: true,
          commentsLikes: true,
          postLikes: true,
        },
      },
      comments: true,
      votes: true,
    },
    where: {
      votes: {
        some: {
          userId: userId,
          type: voteType,
        },
      },
    },
  });
  return posts;
};
