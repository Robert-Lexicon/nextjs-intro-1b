import { Recipe } from "@/lib/interfaces";
import Image from "next/image";

export default function Card({
  recipe,
  className,
}: {
  recipe: Recipe;
  className?: string;
}) {
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
