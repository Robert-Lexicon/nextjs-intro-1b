import { tagColors } from "@/lib/data/tag-colors";
import { tagColors } from "@/lib/data/tag-colors";
import Image from "next/image";

interface PokemonFull {
  name: string;
  weight: number;
  height: number;
  id: number;
  types: Array<{ type: { name: string } }>;
  types: Array<{ type: { name: string } }>;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

async function fetchPokemon(id: number): Promise<PokemonFull> {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + id.toString()
  );
  const data = await response.json();
  return data;
}

export default async function PokemonCard({ id }: { id?: number }) {
  const randomPokemon = id ? await fetchPokemon(id) : undefined;

  if (!randomPokemon) {
    return null;
  }

  //get the first type since this is our main type
  // as keyof typeof is to add the right key type in tagColors
  const mainType = randomPokemon.types[0].type.name as keyof typeof tagColors;
  const borderClass = tagColors[mainType].border;
  const badgeClass = tagColors[mainType].badge;

  return (
    <div className="grid gap-2 justify-items-center bg-teal-50 dark:bg-slate-900 rounded-lg shadow-md border-indigo-400 border-6 py-16 px-4">
      <h3 className="font-jersey text-3xl text-center capitalize pb-1.5">
        {randomPokemon.name}
      </h3>
      <span
        className={`-order-1 rounded-full px-2 py-1 flex items-center justify-center text-xs font-bold capitalize text-neutral-50 ${badgeClass}`}
      >
        #{randomPokemon.id}
      </span>
      <div
        className={`order-first rounded-full w-2/3 overflow-clip aspect-square border-3 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 ${borderClass}`}
      >
        <Image
          className="p-4"
          alt="random"
          height={200}
          width={200}
          src={randomPokemon.sprites.other["official-artwork"].front_default}
        />
      </div>

      <ul className="flex flex-wrap gap-2">
        {randomPokemon.types.map(({ type }, i) => {
          //here we get the tagcolor for the current type and then return our object
          //if we want to do ts/js inside a map we can do this by adding { ... return <></>} to the .map
          const bgClass = tagColors[type.name as keyof typeof tagColors].badge;
          return (
            <li
              className={`rounded-full px-3 py-1 flex items-center justify-center text-sm font-bold capitalize text-neutral-100  ${bgClass}`}
              key={i}
            >
              {type.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
