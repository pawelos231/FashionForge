import React from "react";
import CretedPostsFeed from "@components/UserProfile/CreatedPosts";

const CreatedPosts = async () => {
  return <CretedPostsFeed />;
};

export const revalidate = 600;

export default CreatedPosts;
