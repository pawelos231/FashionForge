import { ACCESS_TOKEN_LOCAL_STORAGE_NAME } from "@utils/token";
import useLocalStorage from "./useLocalStorage";

const useToken = () => {
  const { storage: token, setStorage } = useLocalStorage(
    ACCESS_TOKEN_LOCAL_STORAGE_NAME
  );
  return { token, setToken: setStorage };
};

export default useToken;
