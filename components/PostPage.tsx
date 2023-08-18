import { ArrowBigDown, ArrowBigUp, Loader2 } from "lucide-react";
import EditorOutput from "./EditorOutput";
import { buttonVariants } from "@UI/Button";
import { formatTimeToNow } from "@lib/utils";
import { db } from "@lib/db";
import { Suspense } from "react";
import CommentsSection from "./Comments/CommentsSection";
import { PAGES_TO_FETCH } from "@constants/config";
import PostLoader from "./Loaders/SkeletonPostLoader";

interface SubRedditPostPageProps {
  postId: number;
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

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

  if (!post) return null;

  return (
    <div>
      <div className="h-full flex flex-col sm:flex-row items-center sm:items-start justify-between">
        <div className="sm:w-0 w-full flex-1 bg-white p-4 rounded-sm">
          <p className="max-h-40 mt-1 truncate text-xs text-gray-500">
            Posted by u/{post?.author.name}{" "}
            {formatTimeToNow(new Date(post?.createdAt))}
          </p>
          <h1 className="text-xl font-semibold py-2 leading-6 text-gray-900">
            {post.title}
          </h1>

          <EditorOutput content={post?.content} />
          <Suspense
            fallback={
              <>
                {Array(PAGES_TO_FETCH)
                  .fill("")
                  .map(() => {
                    return <PostLoader key={Math.random()} />;
                  })}
              </>
            }
          >
            <CommentsSection postId={post.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );

  function PostVoteShell() {
    return (
      <div className="flex items-center flex-col pr-6 w-20">
        {/* upvote */}
        <div className={buttonVariants({ variant: "ghost" })}>
          <ArrowBigUp className="h-5 w-5 text-zinc-700" />
        </div>

        {/* score */}
        <div className="text-center py-2 font-medium text-sm text-zinc-900">
          <Loader2 className="h-3 w-3 animate-spin" />
        </div>

        {/* downvote */}
        <div className={buttonVariants({ variant: "ghost" })}>
          <ArrowBigDown className="h-5 w-5 text-zinc-700" />
        </div>
      </div>
    );
  }
};

export default PostPage;
