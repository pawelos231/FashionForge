import { forwardRef, useRef } from "react";
import { formatTimeToNow } from "@lib/utils";
import { ExtendedPost } from "interfaces/db";
import { Icons } from "@UI/Icons"; // Assuming you have icon components

type PostProps = {
  likesAmount: number;
  commentsAmount: number;
  post: ExtendedPost;
};

const Post = forwardRef(
  ({ likesAmount, commentsAmount, post }: PostProps, ref) => {
    const pRef = useRef<HTMLParagraphElement>(null);

    return (
      <div className="rounded-md bg-white shadow-md">
        <div className="px-6 py-4 space-y-4">
          <div className="flex items-center space-x-2">
            <Icons.heart className="h-5 w-5 text-red-500" />
            <span className="text-gray-600">{likesAmount}</span>
          </div>

          <div className="text-xs text-gray-500">
            <span className="font-medium">Posted by u/{post.author.name}</span>{" "}
            {formatTimeToNow(new Date(post.createdAt))}
          </div>

          <a href={`/r/${post.authorId}/post/${post.id}`}>
            <h2 className="text-lg font-semibold leading-tight text-gray-900">
              {post.title}
            </h2>
          </a>

          <div className="relative text-sm max-h-40 overflow-hidden" ref={pRef}>
            {pRef.current?.clientHeight === 160 && (
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 text-sm px-4 py-3 flex items-center space-x-2">
          <Icons.message className="h-5 w-5 text-gray-600" />
          <span className="text-gray-600">{commentsAmount} comments</span>
        </div>
      </div>
    );
  }
);

export default Post;
