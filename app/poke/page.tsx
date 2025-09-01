import RandomButton from "@/components/random-button";
import PokemonCard from "@/components/random-card";
import Search from "@/components/search";
import SearchWButton from "@/components/search-w-button";
import { getRandomNumbers } from "@/lib/util";
import Link from "next/link";
import { Suspense } from "react";

interface PokemonShort {
  name: string;
  url: string;
}

interface PokemonFull {
  name: string;
  height: number;
  id: number;
}

async function fetchAllPokemonData(
  list: PokemonShort[]
): Promise<PokemonFull[]> {
  const fetchPromises = list.map((item) => fetch(item.url));

  try {
    const responses = await Promise.all(fetchPromises);

    if (responses.some((res) => !res.ok)) {
      throw new Error("one or more requests failed");
    }

    const jsonPromises = responses.map((res) => res.json());
    return await Promise.all(jsonPromises);
  } catch (e) {
    console.error("sjdflskjd");
    return [];
  }
}

export default async function Poke({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { query = "", random } = await searchParams;
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");

  const { results }: { results: PokemonShort[] } = await response.json();
  // console.log(results);

  console.log(results.length);

  //find first only
  //use toLowerCase to make it case insensitive
  const singlePokemon = results.find((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );
  //console.log(singlePokemon);

  //find all
  const allPokemons = results.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );
  //console.log(allPokemons);

  const allPokemonData =
    query !== "" ? await fetchAllPokemonData(allPokemons) : [];

  //console.log(allPokemonData);

  //use a random generator function to make a single and a list of 4 nrs to use
  const maxPokemonId = 1025;

  const [randomId] = getRandomNumbers(1, maxPokemonId);

  const randomFeatured = getRandomNumbers(4, maxPokemonId);

  return (
    <div className="max-w-5xl m-auto space-y-4">
      <div className="grid gap-4 items-center justify-center">
        {/* Simple button with hard coded random link, downside is that it will overwrite the current searchParams */}
        <Link
          className="rounded-sm bg-amber-300 text-neutral-900 font-bold text-center p-4 inline-block"
          href={`?random=${randomId}`}
        >
          Random
        </Link>
        {/* Button client component, advantage is that it doesn't overwrite current searchparams, downside is more complex */}
        <RandomButton />
        {/* Put all that has their own fetch inside suspense to make them stream */}
        {/* In this case I have a card component that takes an id and then fetch it's own data from that */}
        <Suspense
          key={random}
          fallback={
            <div className="animate-pulse w-58 h-65 bg-neutral-400/70 border rounded border-neutral-400 p-4">
              Loading...
            </div>
          }
        >
          <PokemonCard id={Number(random)} />
        </Suspense>
      </div>

      <Search placeholder="Search for pokemon" />
      <SearchWButton />
      {/* <div>
        <h2 className="font-bold">Filtered only</h2>
        <div className="flex gap-2 flex-wrap">
          {allPokemons.map((p) => (
            <a key={p.name} href={"/poke/" + p.name}>
              {p.name}
            </a>
          ))}
        </div>
      </div> */}
      <div>
        <h2 className="font-bold">Refetched</h2>
        {allPokemonData.map((p) => (
          <a key={p.name} href={"/poke/" + p.name}>
            {p.name}
          </a>
        ))}
      </div>
      {/* Here we take our 4 random nrs and loop them out into a random featured section */}
      <section>
        <h2 className="font-jersey text-4xl text-center m-4">
          Featured Pokemon
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {randomFeatured.map((r) => (
            <Suspense
              key={r}
              fallback={
                <div className="animate-pulse w-58 h-65 bg-neutral-400/70 border rounded border-neutral-400 p-4">
                  Loading...
                </div>
              }
            >
              <PokemonCard id={Number(r)} />
            </Suspense>
          ))}
        </div>
      </section>
    </div>
  );
}
