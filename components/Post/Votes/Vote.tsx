import { usePostContext } from "../PostContext";
import PostVote from "@components/PostVote";

const PostVoteTab = () => {
  const {
    post: { id },
    currentVote,
    votesAmount,
  } = usePostContext();
  return (
    <PostVote
      initialVote={currentVote}
      postId={id}
      initialVotesAmount={votesAmount}
    />
  );
};

export default PostVoteTab;
