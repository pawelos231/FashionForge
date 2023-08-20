import { ACCESS_TOKEN_LOCAL_STORAGE_NAME } from "@utils/token";
import useLocalStorage from "./useLocalStorage";

const useToken = () => {
  const {
    storage: token,
    setStorage,
    clearStorage,
  } = useLocalStorage(ACCESS_TOKEN_LOCAL_STORAGE_NAME);
  return { token, setToken: setStorage, deleteToken: clearStorage };
};

export default useToken;
