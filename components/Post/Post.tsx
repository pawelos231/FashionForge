import { forwardRef, useRef } from "react";
import { ExtendedPost } from "interfaces/db";
import { VoteType } from "@prisma/client";
import PostContext from "./PostContext";
import { ReactNode } from "react";

import PostCommentsTab from "./CommentsTab/Comments";
import PostVoteTab from "./Votes/Vote";
import PostEssentialData from "./PostEssentialData";
import PostContent from "./PostContent";
import PostImage from "./PostImage";
import PostTitle from "./PostTitle";
import PostMainContent from "./PostMainContent";

type PostProps = {
  votesAmount: number;
  commentsAmount: number;
  post: ExtendedPost;
  currentVote: VoteType | undefined;
  info?: ReactNode;
};

const defaultProfilePicture = "/defaultProfilePicture.png"; // Provide the default profile picture path

//make it composable

const Post = ({
  votesAmount,
  commentsAmount,
  post,
  currentVote,
  info,
}: PostProps) => {
  const pRef = useRef<HTMLParagraphElement>(null);

  return (
    <PostContext.Provider
      value={{ post, commentsAmount, currentVote, votesAmount }}
    >
      <div className="relative">{info}</div>
    </PostContext.Provider>
  );
};
Post.Comments = PostCommentsTab;
Post.Votes = PostVoteTab;
Post.Essentials = PostEssentialData;
Post.Content = PostContent;
Post.Image = PostImage;
Post.Title = PostTitle;
Post.MainContent = PostMainContent;

export default Post;
