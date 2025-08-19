import Bagdes from "@/components/bagdes";
import MainWrapper from "@/components/main-wrapper";
import ReviewStars from "@/components/stars";
import { fetchAllRecipes, fetchRecipeById } from "@/lib/data/recipe";
import { Recipe } from "@/lib/interfaces/recipe";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

//Ensure the route is statically generated at build time by adding this function (optional)
export async function generateStaticParams() {
  const recipes = await fetchAllRecipes();

  return recipes.map((recipe) => ({
    id: recipe.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const recipe: Recipe = await fetchRecipeById(id);

  return {
    title: recipe.name,
    description: recipe.cuisine,
  };
}

//props is an object that contains things we want to pass to the component,
// params is one them we use on pages with dynamic routes

//alt 1
//using an interface to define the props for the component/page
// interface RecipePageProps {
//   params: Promise<{ id: string }>;
// }

//then using this interface on our props parameter
//export default async function RecipePage(props : RecipePageProps) {

//alt 2
//define the type inside the function parameters instead of using an interface
// export default async function RecipePage(props: {
//   params: Promise<{ id: string }>;
// }) {

//destructure id from the params.props
// const { id } = await props.params;

//alt 3 - most common way when having less than 3 parameters
//destructure params from props inside the function parameters
export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  //destructure id from params
  const { id } = await params;

  const recipe: Recipe = await fetchRecipeById(id);

  if (!recipe.id) return notFound();

  return (
    <MainWrapper title={recipe.name}>
      <article className="space-y-4">
        <div className="grid md:flex md:justify-between gap-4 ">
          <div className="space-y-4">
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
          <div className="order-first md:order-none relative">
            <span
              className={`p-2 font-serif absolute top-0 right-0 dark:text-neutral-950 ${
                recipe.difficulty.toLowerCase() === "easy"
                  ? "bg-green-200/90"
                  : recipe.difficulty.toLowerCase() === "medium"
                  ? "bg-orange-300/90"
                  : "bg-neutral-100/90"
              } `}
            >
              {recipe.difficulty}
            </span>
            <Image
              className="w-full md:max-w-[480px] md:max-h-[480px] md:w-auto "
              src={recipe.image}
              alt={recipe.name}
              width={400}
              height={400}
            />
          </div>
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
