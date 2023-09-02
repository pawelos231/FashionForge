import { usePostContext } from "./PostContext";

const PostTitle = () => {
  const { post } = usePostContext();
  return (
    <a href={`/`}>
      <h2 className="text-lg font-semibold leading-tight text-gray-900">
        {post.title}
      </h2>
    </a>
  );
};

export default PostTitle;
