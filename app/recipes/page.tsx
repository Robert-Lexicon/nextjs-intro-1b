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

async function RecipeList({ limit, skip }: { limit?: number; skip?: number }) {
  const recipes: Recipe[] = await fetchAllRecipes(skip, limit);
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

export default async function Recipes({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page, limit } = await searchParams;

  const currentPage = Number(page) || 1;
  const itemLimit = Number(limit) || 20;
  const skip = (currentPage - 1) * itemLimit;

  return (
    <MainWrapper title="Recipes">
      <p className="text-center text-pretty mb-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque dicta
        culpa veniam iusto voluptate laboriosam itaque, ullam, exercitationem
        magni sed quidem nihil aliquam fuga.
      </p>
      {/* https://nextjs.org/docs/app/getting-started/fetching-data#with-suspense */}
      <Suspense fallback={<p>Loading recipes...</p>}>
        <RecipeList skip={skip} limit={itemLimit} />
      </Suspense>
    </MainWrapper>
  );
}
