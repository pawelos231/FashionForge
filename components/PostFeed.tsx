"use client";

import { ExtendedPost } from "interfaces/db";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { PAGES_TO_FETCH } from "@constants/config";
import Post from "./Post";
import axios from "axios";
import NoPostsView from "./homepage/NoPostsView";

type Props = {
  initialPosts: ExtendedPost[];
};

const PostFeed = ({ initialPosts }: Props) => {
  const PostRef = useRef<HTMLElement>();

  const lastPostRef = useRef<HTMLElement>(null);
  const { isFetchingNextPage, fetchNextPage, hasNextPage, data } =
    useInfiniteQuery({
      queryKey: ["posts", "ininity"],
      queryFn: async ({ pageParam = 1 }) => {
        const query = `/api/posts?limit=${PAGES_TO_FETCH}&page=${pageParam}`;
        const { data } = await axios.get(query);
        return data as ExtendedPost[];
      },
      getNextPageParam: (_, pages) => pages.length + 1,
    });

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;
  console.log(posts);
  if (posts.length === 0) {
    return <NoPostsView />;
  }
  return (
    <div className="">
      {posts.map((post, i) => {
        return <div key={i}>{post.title}</div>;
      })}
    </div>
  );
};

export default PostFeed;
