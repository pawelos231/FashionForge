import { usePostContext } from "./PostContext";
import { formatTimeToNow } from "@lib/utils";

const PostEssentialData = () => {
  const { post } = usePostContext();
  return (
    <div className="text-xs text-gray-500">
      <span className="font-medium">Posted by u/{post.author.name}</span>{" "}
      {formatTimeToNow(new Date(post.createdAt))}
    </div>
  );
};

export default PostEssentialData;
