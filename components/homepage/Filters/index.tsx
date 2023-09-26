"use client";

import React, { useState } from "react";
import { SearchType } from "./enums";

type Props = {
  filterOption: SearchType;
  setFilter: (filter: SearchType) => void;
};
const FilterPosts = ({ filterOption, setFilter }: Props) => {
  return (
    <div className="mb-4 fixed top-32 right-12">
      <label htmlFor="filter" className="block font-medium text-gray-700">
        Filter by:
      </label>
      <select
        id="filter"
        onChange={(e: any) => setFilter(e.target.value)}
        className="block w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
        value={filterOption}
      >
        <option value={SearchType.ALL}>All Posts</option>
        <option value={SearchType.OLDEST}>Oldest Posts</option>
        <option value={SearchType.UP_VOTED}>UpVoted Posts</option>
        <option value={SearchType.DOWN_VOTED}>DownVoted Posts</option>
      </select>
    </div>
  );
};

export default FilterPosts;
