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

  const postsFromApi = data?.pages.flatMap((page) => page);
  const posts =
    !postsFromApi || postsFromApi.length === 0 ? initialPosts : postsFromApi;

  if (posts.length === 0) {
    return <NoPostsView />;
  }

  return (
    <div className="flex flex-col items-center space-y-6 py-6 mt-10">
      {posts.map((post, i) => (
        <Post
          key={i}
          likesAmount={post.votes.length}
          commentsAmount={post.comments.length}
          post={post}
        />
      ))}
    </div>
  );
};

export default PostFeed;
