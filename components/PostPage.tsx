import React from "react";
import { ArrowBigDown, ArrowBigUp, Loader2 } from "lucide-react";
import EditorOutput from "./EditorOutput";
import { buttonVariants } from "@UI/Button";
import { formatTimeToNow } from "@lib/utils";
import { db } from "@lib/db";
import { Suspense } from "react";
import CommentsSection from "./Comments/CommentsSection";
import { PAGES_TO_FETCH } from "@constants/config";
import PostSkeleton from "./Loaders/SkeletonPostLoader";
import PostNotFound from "./PostNotFound";

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

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-7xl bg-white rounded-lg p-6">
        <div className="flex flex-col sm:flex-row items-start">
          <div className="w-1/6 flex items-center justify-center flex-col">
            <div className={buttonVariants({ variant: "ghost" })}>
              <ArrowBigUp className="h-6 w-6 text-zinc-700" />
            </div>
            <div className="text-center py-2 font-medium text-sm text-zinc-900">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
            <div className={buttonVariants({ variant: "ghost" })}>
              <ArrowBigDown className="h-6 w-6 text-zinc-700" />
            </div>
          </div>

          <div className="w-full pr-4">
            <div className="pb-24">
              <p className="text-xs text-gray-500">
                Posted by u/{post.author.name}{" "}
                {formatTimeToNow(new Date(post?.createdAt))}
              </p>
              <h1 className="text-2xl font-semibold mt-2 text-gray-900">
                {post.title}
              </h1>

              <EditorOutput content={post.content} />
            </div>
            <Suspense
              fallback={
                <>
                  {Array(PAGES_TO_FETCH)
                    .fill("")
                    .map(() => {
                      return (
                        <div
                          className="rounded-md bg-white shadow-md w-[60%]"
                          key={Math.random()}
                        >
                          <PostSkeleton key={Math.random()} />{" "}
                        </div>
                      );
                    })}
                </>
              }
            >
              <CommentsSectionSkeleton />
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
