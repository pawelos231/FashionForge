import useToken from "@hooks/useToken";
import { VerifiedToken } from "./token";
import { useQuery } from "@tanstack/react-query";
import { AuthorizationHeaders } from "./token";
import axios from "axios";
import { AxiosError } from "axios";
import { ACCESS_TOKEN_LOCAL_STORAGE_NAME } from "./token";

type Combined = {
  userData: VerifiedToken;
};

type UserDataFromApi = {
  user: Combined | null;
  accessToken: string | null;
};

export const getUserData = () => {
  const { token, setToken } = useToken();

  const {
    data: userData,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
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
    },
    onSuccess: (data) => {
      if (data.accessToken) {
        setToken(data.accessToken);
      }
    },
    onError: (err: any) => {
      console.log(err.response?.data.error);
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          console.log("not found");
        }
        if (err.response?.status === 401) {
          localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_NAME);
        }
      }
    },
  });

  if (error) throw new Error(error);
  if (!isLoading && !isError) return userData;
};
