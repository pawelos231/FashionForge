import { forwardRef, useRef } from "react";
import { formatTimeToNow } from "@lib/utils";
import { ExtendedPost } from "interfaces/db";

type ExtendedPostSi = {
  likesAmount: number;
  commentsAmount: number;
  post: ExtendedPost;
};

const Post = forwardRef(
  ({ likesAmount, commentsAmount, post }: ExtendedPostSi, ref) => {
    const pRef = useRef<HTMLParagraphElement>(null);

    return (
      <div className="rounded-md bg-white shadow">
        <div className="px-6 py-4 flex justify-between">
          {likesAmount}

          <div className="w-0 flex-1">
            <div className="max-h-40 mt-1 text-xs text-gray-500">
              <span>Posted by u/{post.author.name}</span>{" "}
              {formatTimeToNow(new Date(post.createdAt))}
            </div>

            <div
              className="relative text-sm max-h-40 w-full overflow-clip"
              ref={pRef}
            >
              {pRef.current?.clientHeight === 160 ? (
                // blur bottom if content is too long
                <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 z-20 text-sm px-4 py-4 sm:px-6">siema</div>
      </div>
    );
  }
);

export default Post;
