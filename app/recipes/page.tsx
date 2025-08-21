import Card from "@/components/card";
import MainWrapper from "@/components/main-wrapper";
import { fetchAllRecipes } from "@/lib/data/recipe";
import { Recipe } from "@/lib/interfaces/recipe";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Our Recipes",
  description: "A collection of delicious recipes",
};

//https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL#parameters
//https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional

//inline component
async function RecipeList({ limit, skip }: { limit?: number; skip?: number }) {
  const recipes: Recipe[] = await fetchAllRecipes(limit, skip);
  return (
    <ul className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(20ch,1fr))]">
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
  const pageLimit = Number(limit) || 8;

  const skip = (currentPage - 1) * pageLimit;

  return (
    <MainWrapper title="Recipes">
      <p className="text-center text-pretty mb-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque dicta
        culpa veniam iusto voluptate laboriosam itaque, ullam, exercitationem
        magni sed quidem nihil aliquam fuga.
      </p>
      <div className="my-4 flex gap-4">
        <Link
          className="bg-neutral-200 rounded cursor-pointer p-4"
          href={`?page=${currentPage - 1}`}
        >
          Previous
        </Link>
        <Link
          className="bg-neutral-200 rounded cursor-pointer p-4"
          href={`?page=${currentPage + 1}`}
        >
          Next
        </Link>
      </div>
      {/* https://nextjs.org/docs/app/getting-started/fetching-data#with-suspense */}
      <Suspense fallback={<p>Loading recipes...</p>}>
        <RecipeList limit={pageLimit} skip={skip} />
      </Suspense>
    </MainWrapper>
  );
}
