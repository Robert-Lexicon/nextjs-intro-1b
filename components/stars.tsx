import { Star } from "lucide-react";

export default function ReviewStars({ rating }: { rating: number }) {
  return (
    <div className="grid">
      <div className="flex col-start-1 row-start-1">
        {Array.from({ length: 5 }, (_, index) => (
          <Star className="stroke-amber-400" key={index} />
        ))}
      </div>
      <div className="flex  col-start-1 row-start-1">
        {Array.from({ length: Math.round(rating) }, (_, index) => (
          <Star className="fill-amber-400 stroke-0" key={index} />
        ))}
      </div>
    </div>
  );
}
