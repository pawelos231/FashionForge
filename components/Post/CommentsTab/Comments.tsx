import { usePostContext } from "../PostContext";
import PostVote from "@components/PostVote";
import Link from "next/link";
import { Icons } from "@UI/Icons";

const PostCommentsTab = () => {
  const {
    post: { id },
    currentVote,
    votesAmount,
    commentsAmount,
  } = usePostContext();
  return (
    <div className="bg-gray-50 text-sm px-4 py-3 flex items-center space-x-2">
      <Link href={`/project/${id}`}>
        <Icons.message className="h-5 w-5 text-gray-600" />
        <span className="text-gray-600">{commentsAmount} comments</span>
      </Link>
    </div>
  );
};

export default PostCommentsTab;
