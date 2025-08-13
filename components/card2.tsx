import { Recipe } from "@/lib/interfaces";
import Image from "next/image";

export default async function Card({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  // const idStr = (await params).id;
  // console.log(idStr);
  const response = await fetch(`https://dummyjson.com/recipes/${id}`);

  // Do this for debugging
  // const json = await response.json();
  // console.dir(json, { depth: null });

  const recipe: Recipe = await response.json();

  if (!recipe?.id) return null;
  return (
    <article className={`space-y-4 ${className}`}>
      <h2 className="text-lg font-bold">{recipe.name}</h2>
      <Image src={recipe.image} alt={recipe.name} width={300} height={200} />
      <section>
        <h3 className="font-bold">Ingredients</h3>
        <ul className="list-disc pl-6">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="font-bold">Instructions</h3>
        <p>{recipe.instructions}</p>
      </section>
    </article>
  );
}
