import { usePostContext } from "./PostContext";
import { formatTimeToNow } from "@lib/utils";
import Image from "next/image";
import { toBase64 } from "@components/Loaders/Shimmer";
import { shimmer } from "@components/Loaders/Shimmer";
import { Icons } from "@UI/Icons";

const PostImage = () => {
  const defaultProfilePicture = "/defaultProfilePicture.png"; // Provide the default profile picture path

  const { post, votesAmount } = usePostContext();
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0 w-[7%]">
        <Image
          layout="responsive"
          width={20}
          height={20}
          className="h-10 w-10 rounded-full"
          src={post.author.photoLink || defaultProfilePicture}
          alt={`${post.author.name}'s Profile`}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(20, 20))}`}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Icons.heart className="h-5 w-5 text-red-500" />
        <span className="text-gray-600">{votesAmount}</span>
      </div>
    </div>
  );
};

export default PostImage;
