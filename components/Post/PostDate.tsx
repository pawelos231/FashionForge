import { usePostContext } from "./PostContext";
import React from "react";
import { formatTimeToNow } from "@lib/utils";

const PostDate = (props) => {
  const { post } = usePostContext();
  return <>{formatTimeToNow(new Date(post.createdAt))}</>;
};

export default PostDate;
