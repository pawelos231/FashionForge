import React from "react";
import { CommandItem } from "cmdk";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { IMiniPost } from "@interfaces/db";
import Link from "next/link";

export const MiniPost = ({
  router,
  post,
}: {
  router: AppRouterInstance;
  post: IMiniPost;
}) => {
  const defaultProfilePicture = "/defaultProfilePicture.png";
  const photo =
    post.author.photoLink.length != 0
      ? post.author.photoLink
      : defaultProfilePicture;
  return (
    <Link href={`/project/${post.id}`}>
      <CommandItem
        className=" p-2 m-[4px]"
        onSelect={(e) => {
          router.push(`/project/${post.id}`);
          router.refresh();
        }}
        key={post.id}
        value={post.title}
      >
        <div className="border rounded p-4 mb-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <img
                src={photo}
                alt={post.author.name}
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{post.author.name}</p>
              <p className="text-xs text-gray-500">{post.author.createdAt}</p>
            </div>
          </div>
          <p>{post.title}</p>

          <div className="mt-2 flex items-center space-x-2">
            <span className="text-xs text-gray-500">0 points</span>
          </div>
        </div>
      </CommandItem>
    </Link>
  );
};
