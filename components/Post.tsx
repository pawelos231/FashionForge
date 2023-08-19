import { forwardRef, useRef } from "react";
import { formatTimeToNow } from "@lib/utils";
import { ExtendedPost } from "interfaces/db";
import { Icons } from "@UI/Icons";
import EditorOutput from "./EditorOutput";
import Image from "next/image";
import { shimmer, toBase64 } from "./Loaders/Shimmer";
import Link from "next/link";
import PostVote from "./PostVote/PostVote";

type PostProps = {
  votesAmount: number;
  commentsAmount: number;
  post: ExtendedPost;
  currentVote;
};

const defaultProfilePicture = "/defaultProfilePicture.png"; // Provide the default profile picture path

const Post = forwardRef(
  ({ votesAmount, commentsAmount, post }: PostProps, ref) => {
    const pRef = useRef<HTMLParagraphElement>(null);

    return (
      <>
        <div className="px-6 py-4 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-[7%]">
              <Image
                layout="responsive"
                width={20}
                height={20}
                className="h-10 w-10 rounded-full"
                src={post.author.photoLink || defaultProfilePicture}
                alt={`${post.author.name}'s Profile`}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(100, 60)
                )}`}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Icons.heart className="h-5 w-5 text-red-500" />
              <span className="text-gray-600">{votesAmount}</span>
            </div>
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

          <div
            className="relative text-sm max-h-40 w-full overflow-clip"
            ref={pRef}
          >
            <EditorOutput content={post.content} />
            {pRef.current?.clientHeight! >= 160 ? (
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
            ) : null}
          </div>
        </div>

        <div className="bg-gray-50 text-sm px-4 py-3 flex items-center space-x-2">
          <Link href={`/project/${post.id}`}>
            <Icons.message className="h-5 w-5 text-gray-600" />
            <span className="text-gray-600">{commentsAmount} comments</span>
          </Link>
        </div>
      </>
    );
  }
);

export default Post;
