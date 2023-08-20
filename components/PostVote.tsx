"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { VoteType } from "@prisma/client";
import { Button } from "@UI/Button";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import useToken from "@hooks/useToken";
import { AxiosError } from "axios";
import { ACCESS_TOKEN_LOCAL_STORAGE_NAME } from "@utils/token";
import { redirect } from "next/navigation";

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

  const { token, setToken, deleteToken } = useToken();

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
      return successful(data.message);
    },
    onError: (err: any, voteType: VoteType) => {
      console.log(err.response?.data.error);
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          console.log("not found");
        }
        if (err.response?.status === 401) {
          console.log("not logged in");
          deleteToken();
          redirect("/login");
        }
      }

      return unsuccessful(err.error);
    },
    onMutate: (type: VoteType) => {
      if (currentVote === type) {
        setCurrentVote(undefined);
        if (type === VoteType.UP) setVotesAmt((prev) => prev - 1);
        else if (type === VoteType.DOWN) setVotesAmt((prev) => prev + 1);
      } else {
        setCurrentVote(type);
        if (type === VoteType.UP)
          setVotesAmt((prev) => prev + (currentVote ? 2 : 1));
        else if (type === VoteType.DOWN)
          setVotesAmt((prev) => prev - (currentVote ? 2 : 1));
      }
    },
  });

  useEffect(() => {
    setCurrentVote(initialVote);
  }, [initialVote]);

  return (
    <div className="absolute top-6 right-6 flex items-center space-x-4">
      {/* Upvote Button */}
      <Button
        onClick={() => {
          vote("UP");
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

      <span className="font-medium text-sm text-gray-600">{votesAmt}</span>

      <Button
        onClick={() => {
          vote("DOWN");
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
