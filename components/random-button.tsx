"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function RandomButton() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleRandomClick = () => {
    const params = new URLSearchParams(searchParams.toString());

    const maxPokemonId = 1025;
    const randomId = Math.floor(Math.random() * maxPokemonId) + 1;
    params.set("random", randomId.toString());

    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div>
      <button
        className="rounded-sm bg-amber-300 text-neutral-900 font-bold text-center p-4 inline-block"
        onClick={handleRandomClick}
      >
        Random
      </button>
    </div>
  );
}
