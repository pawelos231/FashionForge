import { usePostContext } from "./PostContext";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const PostMainContent = ({ children }) => {
  return <div className="px-6 py-4 space-y-4">{children}</div>;
};

export default PostMainContent;
