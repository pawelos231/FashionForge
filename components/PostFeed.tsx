"use client";

import { ExtendedPost } from "interfaces/db";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { PAGES_TO_FETCH } from "@constants/config";
import Post from "./Post";
import axios from "axios";
import NoPostsView from "./homepage/NoPostsView";
import PostSkeleton from "./Loaders/SkeletonPostLoader";
import { useIntersection } from "@mantine/hooks";
import { wait } from "@utils/wait";
import { VoteType } from "@prisma/client";
import { getUserData } from "@utils/getUserData";

type Props = {
  initialPosts: ExtendedPost[];
  postsCount: number;
};

const PostFeed = ({ initialPosts, postsCount }: Props) => {
  const lastPostRef = useRef<HTMLDivElement>(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { isFetchingNextPage, fetchNextPage, hasNextPage, data } =
    useInfiniteQuery({
      queryKey: ["posts", "ininity"],
      queryFn: async ({ pageParam = 1 }) => {
        await wait(5000); //for debug
        const query = `/api/posts?limit=${PAGES_TO_FETCH}&page=${pageParam}`;
        const { data } = (await axios.get(query)) as { data: ExtendedPost[] };
        return data;
      },
      getNextPageParam: (_, pages) => {
        if (Math.ceil(postsCount / PAGES_TO_FETCH) == pages.length)
          return undefined;
        return pages.length + 1;
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    });

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  useEffect(() => {
    console.log(entry?.isIntersecting, hasNextPage);
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const userData = getUserData();

  if (posts.length === 0) {
    return <NoPostsView />;
  }

  return (
    <div className="flex flex-col items-center space-y-6 py-6 mt-10">
      {posts.map((post, i) => {
        const votes = post.votes.reduce((acc, curr) => {
          if (curr.type === VoteType.UP) return acc + 1;
          if (curr.type === VoteType.DOWN) return acc - 1;
          return acc;
        }, 0);

        const currentVote = post.votes.find(
          (vote) => vote.userId === userData?.user?.userData.id
        );

        return (
          <div
            className="rounded-md bg-white shadow-md w-[60%]"
            key={post.id}
            ref={i == posts.length - 1 ? ref : null}
          >
            <Post
              key={i}
              votesAmount={votes}
              commentsAmount={post.comments.length}
              post={post}
              currentVote={currentVote?.type}
            />
          </div>
        );
      })}
      {isFetchingNextPage && (
        <>
          {Array(PAGES_TO_FETCH)
            .fill("")
            .map(() => {
              return (
                <div
                  className="rounded-md bg-white shadow-md w-[60%]"
                  key={Math.random()}
                >
                  <PostSkeleton key={Math.random()} />{" "}
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};

export default PostFeed;
