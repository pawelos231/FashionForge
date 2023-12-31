"use client";

import { useRef } from "react";
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
import PostAuthorName from "./PostAuthorName";
import PostDate from "./PostDate";

type PostProps = {
  votesAmount: number;
  commentsAmount: number;
  post: ExtendedPost;
  currentVote: VoteType | undefined;
  info?: ReactNode;
};

const defaultProfilePicture = "/defaultProfilePicture.png"; // Provide the default profile picture path

const Post = ({
  votesAmount,
  commentsAmount,
  post,
  currentVote,
  info,
}: PostProps) => {
  return (
    <PostContext.Provider
      value={{ post, commentsAmount, currentVote, votesAmount }}
    >
      <div className="relative">{info ?? DEFAULT_INFO}</div>
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
Post.Author = PostAuthorName;
Post.Date = PostDate;

//default info represents the post composed of all the available parts
const DEFAULT_INFO = (
  <>
    <Post.MainContent>
      <Post.Image />
      <Post.Essentials>
        <Post.Author />
        <Post.Date />
      </Post.Essentials>
      <Post.Title />
      <Post.Content />
    </Post.MainContent>
    <Post.Votes />
    <Post.Comments />
  </>
);

export default Post;
