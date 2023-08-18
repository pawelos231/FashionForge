import PostPage from "@components/PostPage";

interface PageProps {
  params: {
    slug: number;
  };
}

const ProjectPage = ({ params }: PageProps) => {
  console.log(params.slug);
  return (
    <div className="mt-20 w-full">
      <PostPage postId={Number(params.slug)} />
    </div>
  );
};

export default ProjectPage;
