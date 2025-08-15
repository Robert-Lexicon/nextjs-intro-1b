import Bagdes from "@/components/bagdes";
import MainWrapper from "@/components/main-wrapper";
import ReviewStars from "@/components/stars";
import { fetchRecipeById } from "@/lib/data/recipe";
import { Recipe } from "@/lib/interfaces";
import { Metadata } from "next";
import Image from "next/image";

// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json())

//   return posts.map((post) => ({
//     slug: post.slug,
//   }))
// }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  // read route params
  const { id } = await params;
  const response = await fetch(`https://dummyjson.com/recipes/${id}`);
  const recipe: Recipe = await response.json();

  return {
    title: recipe.name,
    description: recipe.cuisine,
  };
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe: Recipe = await fetchRecipeById(id);

  return (
    <MainWrapper title={recipe.name}>
      <article className="mb-12 space-y-4">
        <div className="grid md:flex md:justify-between gap-4 ">
          <div className="space-y-4">
            {/* TODO: hide for screenreaders */}
            <h2 className="text-xl font-bold">{recipe.name}</h2>
            <section>
              <div>
                <h3 className="font-bold sr-only">Time needed</h3>
                <div>Preparation: {recipe.prepTimeMinutes} minutes</div>
                <div>Cooking: {recipe.cookTimeMinutes} minutes</div>
              </div>
            </section>
            <div className="flex gap-2">
              <ReviewStars rating={recipe.rating} />({recipe.reviewCount})
            </div>
            <Bagdes className="bg-neutral-300" strings={recipe.tags} />
            <section>
              <h3 className="font-bold">Ingredients</h3>
              <ul className="list-disc pl-6">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </section>
          </div>
          <Image
            className="w-full md:max-w-[480px] md:w-auto order-first md:order-none"
            src={recipe.image}
            alt={recipe.name}
            width={400}
            height={400}
          />
        </div>
        <section>
          <h3 className="font-bold">Instructions</h3>
          <ol className="list-decimal pl-6">
            {recipe.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </section>
      </article>
    </MainWrapper>
  );
}
