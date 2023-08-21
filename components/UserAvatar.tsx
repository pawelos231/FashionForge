import { User } from "@prisma/client";
import { AvatarProps } from "@radix-ui/react-avatar";

import { Icons } from "@UI/Icons";
import { Avatar, AvatarFallback } from "@UI/Avatar";
import Image from "next/image";

interface UserAvatarProps extends AvatarProps {
  user: /*Pick<User, "photoLink" | "name">*/ any;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.photoLink ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            fill
            src={user.photoLink}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
