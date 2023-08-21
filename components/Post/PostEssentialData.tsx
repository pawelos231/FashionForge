import { usePostContext } from "./PostContext";
import { formatTimeToNow } from "@lib/utils";

const PostEssentialData = ({ children }) => {
  const { post } = usePostContext();
  return <div className="text-xs text-gray-500">{children}</div>;
};

export default PostEssentialData;
