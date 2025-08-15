import { Recipe } from "@/lib/interfaces";
import Image from "next/image";
import ReviewStars from "./stars";
import { Clock } from "lucide-react";

export default function Card({
  recipe,
  className,
}: {
  recipe: Recipe;
  className?: string;
}) {
  return (
    <article className={`grid grid-rows-[auto_1fr_auto] gap-4 ${className}`}>
      <h2 className="px-4 text-lg/5 text-balance font-bold">{recipe.name}</h2>
      <section className="order-first relative">
        <Image
          className="w-full"
          src={recipe.image}
          alt={recipe.name}
          width={300}
          height={300}
        />
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
      </section>
      <footer className="px-4 pb-4 space-y-2">
        <div className="flex items-center gap-1">
          <Clock size={18} className="stroke-neutral-500" />
          {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min.
        </div>

        <div className="flex gap-2">
          <ReviewStars rating={recipe.rating} />({recipe.reviewCount})
        </div>
      </footer>
    </article>
  );
}
