import React from "react";
import { ArrowBigDown, ArrowBigUp, Loader2 } from "lucide-react";
import EditorOutput from "../EditorOutput";
import { buttonVariants } from "@UI/Button";
import { formatTimeToNow } from "@lib/utils";
import { db } from "@lib/db";
import { Suspense } from "react";
import { PAGES_TO_FETCH } from "@constants/config";
import PostSkeleton from "../Loaders/SkeletonPostLoader";
import PostNotFound from "../PostNotFound";
import { VoteType } from "@prisma/client";
import CommentsSection from "./Comments/CommentsSection";
import Image from "next/image";

interface SubRedditPostPageProps {
  postId: number;
}

const PostPage = async ({ postId }: SubRedditPostPageProps) => {
  const post = await db.post.findFirst({
    where: {
      id: postId,
    },
    include: {
      votes: true,
      author: true,
    },
  });

  if (!post) return <PostNotFound />;

  const votes = post.votes.reduce((acc, curr) => {
    if (curr.type === VoteType.UP) return acc + 1;
    if (curr.type === VoteType.DOWN) return acc - 1;
    return acc;
  }, 0);

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-8xl bg-white rounded-lg p-6">
        <div className="flex flex-col sm:flex-row items-start">
          <div className="w-1/6 flex items-center justify-center flex-col">
            <div className={buttonVariants({ variant: "ghost" })}>
              <ArrowBigUp className="h-6 w-6 text-zinc-700" />
            </div>

            <div className="text-center py-2 font-medium text-sm text-zinc-900">
              {votes}
            </div>
            <div className={buttonVariants({ variant: "ghost" })}>
              <ArrowBigDown className="h-6 w-6 text-zinc-700" />
            </div>
          </div>

          <div className="w-full pr-4">
            <div className="flex">
              <UserProfilePicture profilePictureUrl={post.author.photoLink} />
              <div className="pb-24 ml-8">
                <p className="text-xs text-gray-500">
                  Posted by u/{post.author.name}{" "}
                  {formatTimeToNow(new Date(post?.createdAt))}
                </p>
                <h1 className="text-2xl font-semibold mt-2 text-gray-900">
                  {post.title}
                </h1>

                <EditorOutput content={post.content} />
              </div>
            </div>
            <Suspense fallback={<CommentsSectionSkeleton />}>
              <CommentsSection postId={postId} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommentsSectionSkeleton = () => {
  return (
    <div className="w-[80%] space-y-4">
      {Array(PAGES_TO_FETCH)
        .fill("")
        .map((_item, index) => {
          return (
            <div className="rounded-md bg-white shadow-md " key={Math.random()}>
              <PostSkeleton key={Math.random()} />{" "}
            </div>
          );
        })}
    </div>
  );
};

export default PostPage;

const UserProfilePicture = ({ profilePictureUrl }) => {
  if (profilePictureUrl) {
    return (
      <div className="w-[6%]  h-full rounded-full overflow-hidden">
        <Image
          src={profilePictureUrl}
          width={200}
          height={200}
          alt="profile picture"
          className="object-cover"
        />
      </div>
    );
  } else {
    return (
      <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center">
        <span className="text-white text-lg">Fallback</span>
      </div>
    );
  }
};
