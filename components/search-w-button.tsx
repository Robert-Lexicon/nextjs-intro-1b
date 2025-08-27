"use client";

import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchWButton() {
  //here we use useState to control the passing of values from the input to the search when clicking a button
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearchClick = () => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params}`);
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label className="sr-only" htmlFor="search">
        Search
      </label>
      <input
        className="block w-full rounded-sm border border-gray-200 py-[9px] pl-4 text-sm placeholder:text-gray-500"
        id="search"
        placeholder="Search for recipe..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <button
        className="absolute right-3 top-1/2 h-6 w-8 -translate-y-1/2 rounded-sm bg-blue-500 flex items-center justify-center"
        type="button"
        onClick={handleSearchClick}
      >
        <SearchIcon size={14} className="text-neutral-50" />
        <p className="sr-only">Search</p>
      </button>
    </div>
  );
}
