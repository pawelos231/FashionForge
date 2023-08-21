import React from "react";
import CretedPostsFeed from "@components/UserProfile/CreatedPosts";

const Page = async () => {
  return <CretedPostsFeed />;
};

export const revalidate = 600;

export default Page;
