"use client";

import { useState, useRef, useEffect } from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandGroup,
} from "./Command";
import { useOnclickOutside } from "@hooks/useOnClickOutside";
import useDebounce from "@hooks/useDebounce";
import { usePathname } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MiniPost } from "./MiniPost";
import { IMiniPost } from "@interfaces/db";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const SearchBar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [input, setInput] = useState<string>("");
  const commandRef = useRef<HTMLDivElement>(null);

  useOnclickOutside(commandRef, () => {
    setInput("");
  });

  useDebounce(
    async () => {
      refetch();
    },
    300,
    [input]
  );

  const queryClient = useQueryClient();

  const {
    isFetching,
    data: queryResults,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];

      const { data } = await axios.get(`/api/posts/search?q=${input}`);
      console.log(data);
      return data as IMiniPost[];
    },
    queryKey: ["search-query"],
    enabled: false,
  });

  useEffect(() => {
    setInput("");
  }, [pathName]);

  return (
    <Command
      ref={commandRef}
      className="relative rounded-lg border max-w-[40rem] z-50 overflow-visible"
    >
      <CommandInput
        onValueChange={(text) => {
          console.log(input);
          setInput(text);
        }}
        value={input}
        isLoading={false}
        placeholder="Search Projects..."
      />
      {input.length > 0 && (
        <MiniPostList
          router={router}
          queryResults={queryResults!}
          isFetched={isFetched}
        />
      )}
    </Command>
  );
};

type MiniPostListProps = {
  isFetched: boolean;
  queryResults: IMiniPost[];
  router: AppRouterInstance;
};

export const MiniPostList = ({
  isFetched,
  queryResults,
  router,
}: MiniPostListProps) => {
  return (
    <CommandList className="absolute bg-white top-full inset-x-0 shadow rounded-b-md max-h-[100px] overflow-scroll overflow-x-hidden">
      {isFetched && <CommandEmpty>No results found.</CommandEmpty>}
      {(queryResults?.length ?? 0) > 0 ? (
        <CommandGroup heading="Posts">
          {queryResults?.map((post) => (
            <MiniPost router={router} post={post} />
          ))}
        </CommandGroup>
      ) : null}
    </CommandList>
  );
};

export default SearchBar;
