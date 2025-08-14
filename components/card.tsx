import { Recipe } from "@/lib/interfaces";
import Image from "next/image";
import ReviewStars from "./stars";

export default function Card({
  recipe,
  className,
}: {
  recipe: Recipe;
  className?: string;
}) {
  return (
    <article className={`grid space-y-4 ${className}`}>
      <h2 className="px-4 mb-0 text-lg font-bold">{recipe.name}</h2>
      <section className="order-first relative">
        <Image
          className="w-full"
          src={recipe.image}
          alt={recipe.name}
          width={300}
          height={300}
        />
        <span className="p-2 absolute top-0 right-0 bg-neutral-100/80">
          {recipe.difficulty}
        </span>
      </section>
      <footer className="px-4 pb-4">
        <div className="flex gap-2">
          <ReviewStars rating={recipe.rating} />({recipe.reviewCount})
        </div>
        <div>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} minutes</div>
      </footer>
    </article>
  );
}
