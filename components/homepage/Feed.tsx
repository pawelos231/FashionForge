import { db } from "@lib/db";
import PostFeed from "@components/PostFeed";
import { PAGES_TO_FETCH } from "@constants/config";
import { ExtendedPost } from "@interfaces/db";

const Feed = async () => {
  const postsPromise = db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          name: true,
          photoLink: true,
          createdAt: true,
          role: true,
          commentsLikes: true,
          postLikes: true,
        },
      },
      comments: true,
      votes: true,
    },
    take: PAGES_TO_FETCH,
  });

  const countPostsPromise = db.post.count();

  const [posts, postsCount] = await Promise.all([
    postsPromise,
    countPostsPromise,
  ]);

  return (
    <PostFeed
      initialPosts={posts as unknown as ExtendedPost[]}
      postsCount={postsCount}
    />
  );
};

export default Feed;
