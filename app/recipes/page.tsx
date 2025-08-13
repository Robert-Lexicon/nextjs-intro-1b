import Card from "@/components/card";
import MainWrapper from "@/components/main-wrapper";
import { Recipe } from "@/lib/interfaces";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
//import data from "@/lib/recipes.json";

interface RecipeResponse {
  limit: number;
  recipes: Recipe[];
  skip: number;
  total: number;
}

export const metadata: Metadata = {
  title: "Our Recipes",
  description: "A collection of delicious recipes",
};

export default async function Recipes() {
  const response = await fetch("https://dummyjson.com/recipes");

  //Do this for debugging
  // const json = await response.json();
  // console.dir(json, { depth: null });

  const { recipes }: RecipeResponse = await response.json();
  //const recipes: Recipe[] = data["recipes"];
  return (
    <MainWrapper title="Recipes">
      {/* this is actually not used right here, will try to explain later */}
      {/* https://nextjs.org/docs/app/getting-started/fetching-data#with-suspense */}
      <Suspense fallback={<p>Loading recipes...</p>}>
        <ul className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(30ch,1fr))] content-stretch">
          {recipes.map((recipe, i) => (
            <li key={i}>
              <Link href={`/recipes/${recipe.id}`}>
                <Card
                  recipe={recipe}
                  className="border border-neutral-300 rounded p-4 shadow-sm"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Suspense>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque dicta
        culpa veniam iusto voluptate laboriosam itaque, ullam, exercitationem
        magni sed quidem nihil aliquam fuga. Voluptatem exercitationem
        consectetur laboriosam neque est?
      </p>
    </MainWrapper>
  );
}
