"use client";

import { ExtendedPost } from "interfaces/db";
import { useInfiniteQuery } from "@tanstack/react-query";

type Props = {
  posts: ExtendedPost[];
};

const PostFeed = ({ posts }: Props) => {
  const { isFetchingNextPage, fetchNextPage, hasNextPage, data } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: () => {
        return 5;
      },
      onError: (err) => {},
      onSuccess: (data) => {},
    });

  return (
    <div>
      <div>PostFeed</div>
    </div>
  );
};

export default PostFeed;
