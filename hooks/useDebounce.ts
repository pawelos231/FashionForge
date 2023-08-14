import { useEffect } from "react";
import useTimeout from "./useTimeout";

const useDebounce = <T extends Function>(
  callback: T,
  debounceDelay: number,
  dependencies: any[]
) => {
  const { reset, clear } = useTimeout(callback, debounceDelay);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
};

export default useDebounce;
