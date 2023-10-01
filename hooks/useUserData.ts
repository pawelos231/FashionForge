import useToken from "@hooks/useToken";
import { VerifiedToken } from "../utils/token";
import { useQuery } from "@tanstack/react-query";
import { AuthorizationHeaders } from "../utils/token";
import axios from "axios";
import { AxiosError } from "axios";
import { useState } from "react";

type UserDataFromApi = {
  userData: VerifiedToken | null;
  accessToken: string | null;
};
type TokenReturnType = VerifiedToken | undefined | null;

export const useUserData = () => {
  const { token, setToken, deleteToken } = useToken();
  const [user, setUser] = useState<TokenReturnType>(undefined);

  const getUser = async () => {
    const headers: AuthorizationHeaders = {
      Authorization: token,
    };
    const query = "/api/auth/token";
    const { data } = (await axios.get(query, {
      headers,
    })) as {
      data: UserDataFromApi;
    };

    return data;
  };

  const handleSuccess = (data) => {
    setUser(data.userData);
    if (data.accessToken) {
      setToken(data.accessToken);
    }
  };

  const handleError = (err: any) => {
    if (err instanceof AxiosError) {
      if (err.response?.status === 404) {
        console.warn("not found");
      }
      if (err.response?.status === 401) {
        console.warn("not logged");
        deleteToken();
      }
    }
  };

  const {
    data: userData,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: getUser,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  if (error) return null;
  if (!isLoading && !isError) return user;
};
