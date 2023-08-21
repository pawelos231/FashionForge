import { usePostContext } from "./PostContext";
import React from "react";

const PostAuthorName = (props, ref) => {
  const { post } = usePostContext();
  return <span className="font-medium">Posted by u/{post.author.name}</span>;
};

export default PostAuthorName;
