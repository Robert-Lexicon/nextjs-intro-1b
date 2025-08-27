import Form from "next/form";

export default function SearchWForm() {
  return (
    //leave action empty if using same path in url or add "/search/" or whatever your url is where you render the result
    //this overwrites old searchparams there are any from pagination or such, so be careful
    <Form className="flex gap-2" action="">
      <label className="sr-only" htmlFor="search">
        Search
      </label>
      <input
        className="w-full rounded-sm border border-gray-200 py-[9px] pl-4 text-sm placeholder:text-gray-500"
        id="search"
        name="query"
      />
      <button
        className="bg-neutral-700 text-neutral-100 px-2 rounded-sm cursor-pointer"
        type="submit"
      >
        Submit
      </button>
    </Form>
  );
}
