import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const PostVote = ({ postId }) => {
  const { mutate: PostVote } = useMutation({
    mutationFn: async ({ voteType }: { voteType: any }) => {
      console.log(voteType);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return <div>PostVote</div>;
};

export default PostVote;
