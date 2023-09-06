import PostPage from "@components/PostPage/PostPage";

interface PageProps {
  params: {
    slug: number;
  };
}

const ProjectPage = ({ params }: PageProps) => {
  return (
    <div className="mt-20 w-full">
      <PostPage postId={Number(params.slug)} />
    </div>
  );
};

export default ProjectPage;
