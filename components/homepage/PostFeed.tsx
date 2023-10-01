"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";
import { VoteType } from "@prisma/client";
import { useUserData } from "@hooks/useUserData";
import { PAGES_TO_FETCH } from "@constants/config";
import FilterPosts from "./Filters";
import NoPostsView from "./NoPostsView";
import PostSkeleton from "../Loaders/SkeletonPostLoader";
import { ExtendedPost } from "@interfaces/db";
import Post from "../Post/Post";
import { SearchType } from "./Filters/enums";

type Props = {
  initialPosts: ExtendedPost[];
  postsCount: number;
};

const PostFeed: React.FC<Props> = ({ initialPosts, postsCount }) => {
  const lastPostRef = useRef<HTMLDivElement>(null);
  const user = useUserData();

  const [filterCriteria, handleFilterCriteria] = useState<SearchType>(
    SearchType.ALL
  );

  const setFilter = useCallback((filter: SearchType) => {
    handleFilterCriteria(filter);
  }, []);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteQuery(
    {
      queryKey: ["posts", "infinity"],
      queryFn: async ({ pageParam = 1 }) => {
        console.log(filterCriteria);
        const query = `/api/posts?limit=${PAGES_TO_FETCH}&page=${pageParam}&filter=${filterCriteria}`;
        const { data } = (await axios.get(query)) as { data: ExtendedPost[] };
        return data;
      },
      getNextPageParam: (_, pages) => {
        if (Math.ceil(postsCount / PAGES_TO_FETCH) === pages.length) {
          return undefined;
        }
        return pages.length + 1;
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
      refetchInterval: false,
    }
  );

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  useEffect(() => {
    refetch();
  }, [filterCriteria]);

  if (!posts || posts.length === 0) {
    return <NoPostsView />;
  }

  return (
    <div className="flex flex-col items-center space-y-6 py-6 mt-10 relative">
      <FilterPosts filterOption={filterCriteria} setFilter={setFilter} />
      {posts.map((post, i) => {
        const votes = post.votes.reduce((acc, curr) => {
          if (curr.type === VoteType.UP) return acc + 1;
          if (curr.type === VoteType.DOWN) return acc - 1;
          return acc;
        }, 0);

        const currentVote = post.votes.find((vote) => {
          return vote.userId === user?.id;
        });

        return (
          <div
            className="rounded-md bg-white shadow-md w-[60%]"
            key={post.id}
            ref={i === posts.length - 1 ? ref : null}
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
