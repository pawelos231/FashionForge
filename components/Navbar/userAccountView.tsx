"use client";

import React from "react";
import { UserAccountNav } from "@components/UserAccountNav";
import { usePathname } from "next/navigation";
import { Button } from "@UI/Button";
import useToken from "@hooks/useToken";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { buttonVariants } from "@UI/Button";
import { ACCESS_TOKEN_LOCAL_STORAGE_NAME, VerifiedToken } from "@utils/token";
import { useUserData } from "@hooks/useUserData";

const UserAccountView = () => {
  const pathname = usePathname();

  const { deleteToken } = useToken();

  const [tk, setTk] = useState<null | undefined | string>(null);
  const [userData, setUserData] = useState<VerifiedToken | null | undefined>();
  const data = useUserData();

  useEffect(() => {
    setUserData(data);
  }, [JSON.stringify(data)]);

  useEffect(() => {
    const storedToken = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_NAME);
    if (storedToken !== "undefined") {
      setTk(storedToken);
    }
  }, [pathname]);

  const handleTokenChange = () => {
    setTk(null);
    deleteToken();
  };

  return (
    <>
      {" "}
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
    </>
  );
};

export default UserAccountView;
