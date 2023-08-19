import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { VoteType } from "@prisma/client";

// Toast notifications
const successful = (message) => toast.success(message);
const unsuccessful = (error) => toast.error(error);
const notify = () => toast("siuema");

// Types
interface PostVoteProps {
  postId: number;
  initialVotesAmount: number;
  initialVote?: VoteType | null;
}

type PostVoteRequest = {
  voteType: VoteType;
  postId: number;
};

type SuccessfulPost = {
  message: string;
};

type UnsuccessfulPost = {
  error: string;
};

const PostVote = ({
  postId,
  initialVote,
  initialVotesAmount,
}: PostVoteProps) => {
  const { mutate: vote } = useMutation({
    mutationFn: async (voteType: VoteType) => {
      const payload: PostVoteRequest = {
        voteType: voteType,
        postId: postId,
      };

      try {
        const { data } = await axios.patch("/api/posts/vote", payload);
        return data;
      } catch (error) {
        throw error.response.data;
      }
    },
    onSuccess: (data: SuccessfulPost) => {
      successful(data.message);
    },
    onError: (err: UnsuccessfulPost, voteType: VoteType) => {
      unsuccessful(err.error);
    },
  });

  return (
    <>
      <button onClick={notify} className="absolute top-6 right-6">
        Make me a toast
      </button>
      <Toaster gutter={4} position="bottom-right" reverseOrder={false} />
    </>
  );
};

export default PostVote;
