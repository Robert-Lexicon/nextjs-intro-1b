import Image from "next/image";

interface PokemonFull {
  name: string;
  weight: number;
  height: number;
  id: number;
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

  return (
    <div className="border rounded border-neutral-400 p-4">
      <h3 className="text-lg font-bold text-center capitalize">
        {randomPokemon.name}
      </h3>
      <Image
        alt="random"
        height={200}
        width={200}
        src={randomPokemon.sprites.other["official-artwork"].front_default}
      />
    </div>
  );
}
