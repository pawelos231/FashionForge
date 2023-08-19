import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { VoteType } from "@prisma/client";
import { Button } from "@UI/Button";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { cn } from "@lib/utils";
import useToken from "@hooks/useToken";

// Toast notifications
const successful = (message) => toast.success(message);
const unsuccessful = (error) => toast.error(error);

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
  const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmount);
  const [currentVote, setCurrentVote] = useState(initialVote);

  console.log(initialVote);

  const { token, setToken } = useToken();

  const { mutate: vote } = useMutation({
    mutationFn: async (voteType: VoteType) => {
      const payload: PostVoteRequest = {
        voteType: voteType,
        postId: postId,
      };

      try {
        const { data } = await axios.patch("/api/posts/vote", payload, {
          headers: {
            Authorization: token,
          },
        });
        return data;
      } catch (error) {
        throw error.response.data;
      }
    },
    onSuccess: (data: SuccessfulPost) => {
      console.log(data);
      return successful(data.message);
    },
    onError: (err: UnsuccessfulPost, voteType: VoteType) => {
      console.log(err);
      return unsuccessful(err.error);
    },
    onMutate: () => {},
  });

  return (
    <div className="absolute top-6 right-6 flex items-center space-x-4">
      {/* Upvote Button */}
      <Button
        onClick={() => {
          vote("UP");
          setCurrentVote("UP");
          setVotesAmt(votesAmt + 1);
        }}
        size="sm"
        variant="ghost"
        aria-label="upvote"
      >
        <ArrowBigUp
          className={`h-5 w-5 ${
            currentVote === "UP" ? "text-emerald-500 fill-emerald-500" : ""
          }`}
        />
      </Button>

      {/* Votes */}
      <span className="font-medium text-sm text-gray-600">{votesAmt}</span>

      {/* Downvote Button */}
      <Button
        onClick={() => {
          vote("DOWN");
          setCurrentVote("DOWN");
          setVotesAmt(votesAmt - 1);
        }}
        size="sm"
        variant="ghost"
        aria-label="downvote"
      >
        <ArrowBigDown
          className={`h-5 w-5 ${
            currentVote === "DOWN" ? "text-red-500 fill-red-500" : ""
          }`}
        />
        <Toaster position="bottom-right" reverseOrder={false} />
      </Button>
    </div>
  );
};

export default PostVote;
