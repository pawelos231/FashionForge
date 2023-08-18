import { useState, useEffect, useRef } from "react";

type FetchOptions = {
  method: "GET";
  headers?: { [key: string]: string };
  body?: string;
  signal?: AbortSignal;
};

const useFetch = <T>(url: string, headers = {}) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const clearState = (): void => {
    setData(null);
    setLoading(true);
    setError(null);
  };

  const abortControllerRef = useRef<AbortController>();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;

      const fetchOptions: FetchOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        signal,
      };

      try {
        const res: Response = await fetch(url, fetchOptions);

        const dataFromFetch: T = await res.json();

        setData(dataFromFetch);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    clearState();
    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [url, JSON.stringify(headers)]);

  return { data, loading, error };
};

export default useFetch;
