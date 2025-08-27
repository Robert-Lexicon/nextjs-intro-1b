import Card from "@/components/card";
import MainWrapper from "@/components/main-wrapper";
import { fetchAllRecipes } from "@/lib/data/recipe";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Our Recipes",
  description: "A collection of delicious recipes",
};

//https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL#parameters
//https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional

const DEFAULT_LIMIT = 8;

//inline component
async function RecipeList({
  limit = DEFAULT_LIMIT,
  page = 1,
}: {
  limit?: number;
  page?: number;
}) {
  const skip = (page - 1) * limit;

  const { recipes, total } = await fetchAllRecipes(limit, skip);
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      {/* TODO: extract this into a separate component/function instead */}
      <nav
        role="navigation"
        aria-label="pagination"
        className="my-8 flex gap-4 items-center justify-center"
      >
        {/* see if the page is already at 0 - if so, render the link as a disabled button instead */}
        {page - 1 > 0 ? (
          <Link
            className="bg-neutral-200 p-2 rounded cursor-pointer dark:text-neutral-900 flex items-center"
            href={`?page=${page - 1}`}
          >
            <ChevronLeft size={20} /> Previous
          </Link>
        ) : (
          <button
            className="bg-neutral-500 p-2  rounded cursor-pointer dark:text-neutral-900 flex items-center"
            type="button"
            disabled
            aria-disabled="true"
          >
            <ChevronLeft size={20} /> Previous
          </button>
        )}
        {/* If we want we can display current/total pages */}
        {/* <div>
          {page}/{totalPages}
        </div> */}
        {/* or render a button for each page */}
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <Link
              key={i}
              className={`py-2 px-4 rounded cursor-pointer dark:text-neutral-900 ${
                i + 1 === page ? "bg-neutral-400" : "bg-neutral-200"
              }`}
              href={`?page=${i + 1}`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
        {/* see if the page is higher than pages divided with items per page - if so, render the link as a disabled button */}
        {page + 1 <= totalPages ? (
          <Link
            className="bg-neutral-200 p-2 rounded cursor-pointer dark:text-neutral-900 flex items-center"
            href={`?page=${page + 1}`}
          >
            Next
            <ChevronRight size={20} />
          </Link>
        ) : (
          <button
            className="bg-neutral-500 p-2  rounded cursor-pointer dark:text-neutral-900 flex items-center"
            type="button"
            disabled
            aria-disabled="true"
          >
            Next
            <ChevronRight size={20} />
          </button>
        )}
      </nav>
      <ul className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(20ch,1fr))]">
        {recipes.map((recipe, i) => (
          <li key={i}>
            <Link href={`/recipes/${recipe.id}`}>
              <Card
                recipe={recipe}
                className="border border-neutral-300 shadow-sm h-full"
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

//page component
export default async function RecipesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page, limit } = await searchParams;
  const currentPage = Number(page) || 1;
  const pageLimit = Number(limit) || DEFAULT_LIMIT;

  return (
    <MainWrapper title="Recipes">
      <p className="text-center text-pretty mb-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque dicta
        culpa veniam iusto voluptate laboriosam itaque, ullam, exercitationem
        magni sed quidem nihil aliquam fuga.
      </p>

      {/* https://nextjs.org/docs/app/getting-started/fetching-data#with-suspense */}
      <Suspense fallback={<p>Loading recipes...</p>}>
        <RecipeList limit={pageLimit} page={currentPage} />
      </Suspense>
    </MainWrapper>
  );
}
