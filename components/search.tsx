"use client";

import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

//pass in placeholder as props to make it usable anywhere
export default function Search({ placeholder }: { placeholder?: string }) {
  //import our hooks from next/navigation
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  //debounce our handleChange so it won't trigger every time you write smt, instead wait 600 ms
  const handleChange = useDebouncedCallback((queryString: string) => {
    //make a new instance of our searchParams and set or delete depending if we have a query or not
    const params = new URLSearchParams(searchParams);
    if (queryString) {
      params.set("query", queryString);
    } else {
      params.delete("query");
    }
    //then update the url to the new url with our searchparams
    replace(`${pathname}?${params}`);
  }, 600);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label className="sr-only" htmlFor="search">
        {placeholder ?? "Search"}
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        id="search"
        placeholder={placeholder ?? "Search..."}
        //pass the value of our input box to the callback function
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        //set the default value to the value of the urls search params
        defaultValue={searchParams.get("query")?.toString()}
      />
      <SearchIcon className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
