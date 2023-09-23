import useToken from "@hooks/useToken";
import { VerifiedToken } from "./token";
import { useQuery } from "@tanstack/react-query";
import { AuthorizationHeaders } from "./token";
import axios from "axios";
import { AxiosError } from "axios";

type UserDataFromApi = {
  userData: VerifiedToken | null;
  accessToken: string | null;
};

export const getUserData = () => {
  const { token, setToken, deleteToken } = useToken();

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
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          console.log("not found");
        }
        if (err.response?.status === 401) {
          console.warn("not logged");
          deleteToken();
        }
      }
    },
  });

  if (error) return null;
  if (!isLoading && !isError) return userData.userData;
};
