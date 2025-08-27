import Card from "@/components/card";
import MainWrapper from "@/components/main-wrapper";
import Search from "@/components/search";
import SearchWForm from "@/components/search-w-form";
import { fetchSearchRecipes } from "@/lib/data/recipe";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Recipes",
  description: "A collection of delicious recipes",
};

//page component
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { query = "" } = await searchParams;
  const { recipes } = await fetchSearchRecipes(query);

  return (
    <MainWrapper title="Recipes">
      <Search placeholder="Search for recipes..." />
      <SearchWForm />
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
    </MainWrapper>
  );
}
