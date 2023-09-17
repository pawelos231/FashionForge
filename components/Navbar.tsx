"use client";

import Link from "next/link";
import { buttonVariants } from "@UI/Button";
import { Button } from "@UI/Button";
import SearchBar from "@UI/SearchBar";
import { usePathname } from "next/navigation";
import useToken from "@hooks/useToken";
import { getUserData } from "@utils/getUserData";
import { useEffect, useState } from "react";
import { UserAccountNav } from "./UserAccountNav";
import { VerifiedToken } from "@utils/token";
import { useCallback } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const { token, deleteToken } = useToken();

  const [tk, setTk] = useState<null | string>(null);
  const [userData, setUserData] = useState<VerifiedToken | null | undefined>();

  const data = getUserData();

  useEffect(() => {
    setUserData(data);
  }, [JSON.stringify(data)]);

  useEffect(() => {
    setTk(token);
  }, [token]);

  const handleTokenChange = useCallback(() => {
    setTk(null);
    deleteToken();
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <Link href="/" className="flex gap-2 items-center">
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            Wolfin
          </p>
        </Link>

        <SearchBar />

        {tk ? (
          <UserAccountNav user={userData} deleteToken={handleTokenChange} />
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
