"use client";

import { ExtendedPost } from "interfaces/db";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { PAGES_TO_FETCH } from "@constants/config";
import Post from "./Post";
import axios from "axios";
import NoPostsView from "./homepage/NoPostsView";
import PostLoader from "./Loaders/SkeletonPostLoader";
import { useIntersection } from "@mantine/hooks";
import { wait } from "@utils/wait";

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
        await wait(1000); //for debug
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

  if (posts.length === 0) {
    return <NoPostsView />;
  }

  return (
    <div className="flex flex-col items-center space-y-6 py-6 mt-10">
      {posts.map((post, i) => (
        <div
          className="rounded-md bg-white shadow-md w-[50%]"
          key={i}
          ref={i == posts.length - 1 ? ref : null}
        >
          <Post
            key={i}
            likesAmount={post.votes.length}
            commentsAmount={post.comments.length}
            post={post}
          />
        </div>
      ))}
      {isFetchingNextPage && (
        <>
          {Array(PAGES_TO_FETCH)
            .fill("")
            .map(() => {
              return <PostLoader />;
            })}
        </>
      )}
    </div>
  );
};

export default PostFeed;
