"use client";

import { useState } from "react";
import { Button } from "@UI/Button";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CommentRequest } from "@lib/validators/comment";
import { successful, unsuccessful } from "@utils/commonToasts";
import useToken from "@hooks/useToken";
import { useRouter } from "next/navigation";

type SuccessfulMutationReq = {
  message: string;
};

type Props = {
  postId: number;
};

const CommentCreation = ({ postId }: Props) => {
  const [commentText, setCommentText] = useState("");

  const { token, deleteToken } = useToken();

  const router = useRouter();

  const { mutate: addComment } = useMutation({
    mutationFn: async ({ postId, text }: CommentRequest) => {
      const payload: CommentRequest = { postId, text };
      const { data } = await axios.post("/api/posts/comments/create", payload, {
        headers: {
          Authorization: token,
        },
      });
      return data;
    },
    onSuccess: (data: SuccessfulMutationReq) => {
      return successful(data.message);
    },
    onError: (err: any) => {
      console.log(err.response?.data.error);
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          console.log("not found");
        }
        if (err.response?.status === 401) {
          console.log("not logged in");
          deleteToken();
          return router.push("/login");
        }
      }

      return unsuccessful(err.error);
    },
  });

  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        placeholder="Type your comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      <Button
        disabled={false}
        onClick={() =>
          addComment({
            postId,
            text: commentText,
          })
        }
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
      >
        Submit Comment
      </Button>
    </div>
  );
};

export default CommentCreation;
