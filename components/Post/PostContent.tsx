import { usePostContext } from "./PostContext";
import EditorOutput from "@components/EditorOutput";
import React from "react";

const PostContent = React.forwardRef((props, ref) => {
  const { post } = usePostContext();
  console.log(ref);
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative text-sm max-h-40 w-full overflow-clip"
      ref={containerRef}
    >
      <EditorOutput content={post.content} />
      {containerRef.current?.clientHeight! >= 160 ? (
        <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
      ) : null}
    </div>
  );
});

export default PostContent;
