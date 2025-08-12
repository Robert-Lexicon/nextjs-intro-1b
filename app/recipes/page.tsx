import MainWrapper from "@/components/main-wrapper";
import { Recipe } from "@/lib/interfaces";
import data from "@/lib/recipes.json";

export default function Recipes() {
  const recipes: Recipe[] = data["recipes"];
  return (
    <MainWrapper title="Recipes">
      <ul className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(30ch,1fr))] content-stretch">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="border rounded p-4">
            <article className="space-y-4">
              <h2 className="text-lg font-bold">{recipe.name}</h2>
              <ul className="list-disc pl-6">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <p>{recipe.instructions}</p>
            </article>
          </li>
        ))}
      </ul>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque dicta
        culpa veniam iusto voluptate laboriosam itaque, ullam, exercitationem
        magni sed quidem nihil aliquam fuga. Voluptatem exercitationem
        consectetur laboriosam neque est?
      </p>
    </MainWrapper>
  );
}
