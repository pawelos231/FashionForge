"use client";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./Command";
const SearchBar = () => {
  const [input, setInput] = useState<string>("");

  return (
    <Command className="relative rounded-lg border max-w-lg z-50 overflow-visible">
      <CommandInput
        onValueChange={(text) => {
          setInput(text);
        }}
        value={input}
        isLoading={false}
        placeholder="Search communities..."
      />
      {input.length > 0 && (
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
        </CommandList>
      )}
    </Command>
  );
};

export default SearchBar;
