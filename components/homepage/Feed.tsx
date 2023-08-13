import { db } from "@lib/db";
import PostFeed from "@components/PostFeed";
import { PAGES_TO_FETCH } from "@constants/config";
import { ExtendedPost } from "@interfaces/db";

const Feed = async () => {
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      auhor: true,
      comments: true,
      votes: true,
    },
    take: PAGES_TO_FETCH,
  });

  return <PostFeed posts={posts as unknown as ExtendedPost[]} />;
};

export default Feed;
