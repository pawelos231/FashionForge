"use client";

import Link from "next/link";
import { buttonVariants } from "@UI/Button";
import { Button } from "@UI/Button";
import SearchBar from "@UI/SearchBar";
import { usePathname } from "next/navigation";
import useToken from "@hooks/useToken";
const mockedLoggedInUser: boolean = true;

const Navbar = () => {
  const pathname = usePathname();
  const { token } = useToken();

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <Link href="/" className="flex gap-2 items-center">
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            Wolfin
          </p>
        </Link>

        <SearchBar />

        {token ? (
          <Link href="/project/create" className="flex gap-2 items-center">
            <Button className={buttonVariants()} variant={"link"}>
              {" "}
              Create Post
            </Button>
          </Link>
        ) : (
          <>
            {pathname.startsWith("/register") ? (
              <Link href={"/"}>
                <Button className={buttonVariants()} variant={"link"}>
                  Go back
                </Button>
              </Link>
            ) : (
              <Link href={"/register"}>
                <Button className={buttonVariants()} variant={"link"}>
                  Sign in
                </Button>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
