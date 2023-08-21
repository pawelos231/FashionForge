"use client";

import useToken from "@hooks/useToken";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import UserProfileSkeleton from "./SkeletonMain";
import NoUserView from "./NoUser";

type Count = {
  _count: {
    posts: number;
    comments: number;
  };
};

type ExtendedUser = Count & User;

const successful = (message) => toast.success(message);
const unsuccessful = (error) => toast.error(error);

const UserProfile = () => {
  const router = useRouter();

  const { token } = useToken();
  const { data: user, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = (await axios.get("/api/user/main", {
        headers: {
          Authorization: token,
        },
      })) as { data: ExtendedUser };
      return data;
    },
    onError: (err: any) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          return unsuccessful(err.response.data.error);
        }
        if (err.response?.status === 409) {
          return unsuccessful(err.response.data.error);
        }
        if (err.response?.status === 401) {
          unsuccessful(err.response.data.error);
          return router.push("/");
        }
      }
    },
  });

  console.log(user?._count.posts);

  if (isLoading) return <UserProfileSkeleton />;
  if (!user) return <NoUserView />;

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg mt-24">
      <div className="bg-gray-200 h-60 rounded-lg mb-6"></div>
      <div className="flex items-center mb-6">
        <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
        <div className="ml-8">
          <h1 className="text-4xl font-bold">{user.name}</h1>
          <p className="text-gray-600">Email: {user.email}</p>
          {/* Display user role */}
          <p className="text-gray-600">Role: {user.role}</p>
          <p className="text-gray-600">CreatedPosts: {user._count.posts}</p>
          <p className="text-gray-600">
            Created Comments: {user._count.comments}
          </p>

          {/* Display social links */}
          {user.socialLinks && user.socialLinks.length > 0 && (
            <div className="flex space-x-4">
              {user.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  Social Link {index + 1}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 mb-4">
        <a href="/profile/posts" className="text-blue-500 hover:underline">
          View Created Posts
        </a>
        <span className="mx-2 text-gray-400">|</span>
        <a href="/profile/comments" className="text-blue-500 hover:underline">
          View Created Comments
        </a>
      </div>
      <div className="mb-8">
        {/* Display user bio */}
        <p className="text-gray-800 text-lg">
          {user?.description || "No bio available"}
        </p>
      </div>
      {/* Add more sections for user activity, posts, friends, etc. */}
    </div>
  );
};

export default UserProfile;
