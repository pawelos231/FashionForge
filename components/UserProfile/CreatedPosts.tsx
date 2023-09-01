"use client";

import { ExtendedPost } from "interfaces/db";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useMemo, useState } from "react";
import { PAGES_TO_FETCH } from "@constants/config";
import Post from "../Post/Post";
import axios, { AxiosError } from "axios";
import NoPostsView from "../homepage/NoPostsView";
import PostSkeleton from "../Loaders/SkeletonPostLoader";
import { useIntersection } from "@mantine/hooks";
import { VoteType } from "@prisma/client";
import useToken from "@hooks/useToken";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { VerifiedToken } from "@utils/token";
import { getUserData } from "@utils/getUserData";

const deleteIcon = "❌";
const successful = (message) => toast.success(message);
const unsuccessful = (error) => toast.error(error);

const CretedPostsFeed = () => {
  const [user, setUserData] = useState<VerifiedToken | undefined | null>();
  const lastPostRef = useRef<HTMLDivElement>(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const router = useRouter();
  const { token } = useToken();

  const { isFetchingNextPage, fetchNextPage, hasNextPage, data, isFetching } =
    useInfiniteQuery({
      queryKey: ["posts", "ininity"],
      queryFn: async ({ pageParam = 1 }) => {
        const query = `/api/user/posts/?limit=${PAGES_TO_FETCH}&page=${pageParam}`;
        const { data } = (await axios.get(query, {
          headers: {
            Authorization: token,
          },
        })) as { data: ExtendedPost[] };
        return data;
      },
      getNextPageParam: (_, pages) => {
        console.log(pages);

        return pages.length + 1;
      },
      onError: (err: any) => {
        if (err instanceof AxiosError) {
          if (err.response?.status === 404) {
            return unsuccessful(err.response.data.error);
          }
          if (err.response?.status === 409) {
            return unsuccessful(err.response.data.error);
          }
          if (err.response?.status === 401) {
            unsuccessful(err.response.data.error);
            return router.push("/login");
          }
        }
      },
    });

  const posts = data?.pages.flatMap((page) => page);

  const handleDeletePost = (postId: number) => {};

  useEffect(() => {
    console.log(entry?.isIntersecting, hasNextPage);
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const userData = getUserData();

  useEffect(() => {
    setUserData(userData);
  }, [JSON.stringify(userData)]);

  if (!isFetching && (!posts || posts.length === 0)) {
    return <NoPostsView />;
  }

  return (
    <div className="flex flex-col items-center space-y-6 py-6 mt-10">
      {posts?.map((post, i) => {
        const votes = post.votes.reduce((acc, curr) => {
          if (curr.type === VoteType.UP) return acc + 1;
          if (curr.type === VoteType.DOWN) return acc - 1;
          return acc;
        }, 0);

        const currentVote = post.votes.find((vote) => {
          return vote.userId === user?.id;
        });

        return (
          <div className="flex w-full justify-center">
            <div
              className="rounded-md bg-white shadow-md w-[60%] mt-12"
              key={post.id}
              ref={i == posts.length - 1 ? ref : null}
            >
              <Post
                key={i}
                votesAmount={votes}
                commentsAmount={post.comments.length}
                post={post}
                currentVote={currentVote?.type}
                info={
                  <>
                    <Post.MainContent>
                      <Post.Essentials>
                        <Post.Date />
                      </Post.Essentials>
                      <Post.Title />
                      <Post.Content />
                    </Post.MainContent>
                    <Post.Votes />
                    <Post.Comments />
                  </>
                }
              />
            </div>
            {user?.id === post.authorId && (
              <button
                className="text-red-500 hover:text-red-600 p-2 cursor-pointer"
                onClick={() => handleDeletePost(post.id)} // Replace with your delete post logic
              >
                {deleteIcon}
              </button>
            )}
          </div>
        );
      })}
      {(isFetchingNextPage || isFetching) && (
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

export default CretedPostsFeed;
