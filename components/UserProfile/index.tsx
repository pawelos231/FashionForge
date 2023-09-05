"use client";

import useToken from "@hooks/useToken";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import UserProfileSkeleton from "./SkeletonMain";
import NoUserView from "./NoUser";
import { useCallback, useState } from "react";
import BioCreator from "./BioCreator";
import ImageUploader from "./PictureCreator";
import Image from "next/image";

type Count = {
  _count: {
    posts: number;
    comments: number;
  };
};

type SuccessfulMutationReq = {
  message: string;
};

type ExtendedUser = Count & User;

const successful = (message) => toast.success(message);
const unsuccessful = (error) => toast.error(error);

const UserProfile = () => {
  const [openedBioCreator, setOpenBioCreator] = useState<boolean>(false);
  const [openedPictureCreator, setOpenPictureCreator] =
    useState<boolean>(false);

  const [bio, setBio] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");

  const router = useRouter();
  const { token, deleteToken } = useToken();

  const handleSetOpenPictureCreator = useCallback((val: boolean) => {
    setOpenPictureCreator(val);
  }, []);

  const handleSetBioCreator = useCallback((val: boolean) => {
    setOpenBioCreator(val);
  }, []);

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
        unsuccessful(err?.response?.data.error);
      }
    },
  });

  const { mutate: saveBio } = useMutation({
    mutationFn: async (bio: string) => {
      const payload = {
        bio,
      };

      const { data } = await axios.post("/api/user/bio", payload, {
        headers: {
          Authorization: token,
        },
      });

      return data;
    },
    onSuccess: (data: SuccessfulMutationReq) => {
      return successful(data.message);
    },
    onError: (err: any) => {
      console.log(err.response?.data.error);
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          console.log("not found");
        }
        if (err.response?.status === 401) {
          console.log("not logged in");
          deleteToken();
          return router.push("/login");
        }
      }

      return unsuccessful(err.error);
    },
    onMutate: (bio: string) => {
      setBio(bio);
    },
  });

  const { mutate: savePicture } = useMutation({
    mutationFn: async (fileUrl: string) => {
      const payload = {
        fileUrl,
      };

      console.log(payload);

      const { data } = await axios.post("/api/user/picture", payload, {
        headers: {
          Authorization: token,
        },
      });

      return data;
    },
    onSuccess: (data: SuccessfulMutationReq) => {
      return successful(data.message);
    },
    onError: (err: any) => {
      console.log(err.response?.data.error);
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          console.log("not found");
        }
        if (err.response?.status === 401) {
          console.log("not logged in");
          deleteToken();
          return router.push("/login");
        }
      }

      return unsuccessful(err.error);
    },
    onMutate: (fileUrl: string) => {
      setProfilePicture(fileUrl);
    },
  });

  if (isLoading) return <UserProfileSkeleton />;
  if (!user) return <NoUserView />;

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg mt-24">
      <div className="bg-gray-200 h-60 rounded-lg mb-6"></div>
      <div className="flex items-center mb-6">
        {user.photoLink.length == 0 ? (
          <div
            className="w-24 h-24 bg-gray-300 rounded-full"
            onClick={() => setOpenPictureCreator((prev) => !prev)}
          ></div>
        ) : (
          <div
            className="w-[15%] h-full rounded-full overflow-hidden"
            onClick={() => setOpenPictureCreator((prev) => !prev)}
          >
            <Image
              src={user.photoLink}
              width={200}
              height={200}
              alt="profile picture"
              className="object-cover"
            />
          </div>
        )}
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
        <div className="text-gray-800 text-lg">
          <p
            className="cursor-pointer"
            onClick={() => setOpenBioCreator((prev) => !prev)}
          >
            {bio.length != 0 ? bio : user.description}
          </p>
        </div>
      </div>
      {/* Add more sections for user activity, posts, friends, etc. */}
      {openedBioCreator ? (
        <BioCreator
          initialBio={bio}
          onClose={() => handleSetBioCreator(false)}
          onSave={saveBio}
        />
      ) : null}

      {openedPictureCreator ? (
        <ImageUploader
          onClose={() => handleSetOpenPictureCreator(false)}
          onSave={savePicture}
        />
      ) : null}
    </div>
  );
};

export default UserProfile;
