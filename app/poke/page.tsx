import Search from "@/components/search";
import SearchWButton from "@/components/search-w-button";

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
  const { query = "" } = await searchParams;
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");

  const { results }: { results: PokemonShort[] } = await response.json();
  // console.log(results);

  //find first only
  const singlePokemon = results.find((p) => p.name.includes(query));
  //console.log(singlePokemon);

  //find all
  const allPokemons = results.filter((p) => p.name.includes(query));
  //console.log(allPokemons);

  const allPokemonData =
    query !== "" ? await fetchAllPokemonData(allPokemons) : [];

  console.log(allPokemonData);

  return (
    <div>
      <Search placeholder="Search for pokemon" />
      <SearchWButton />
      {allPokemons.map((p) => (
        <a key={p.name} href={"/poke/" + p.name}>
          {p.name}
        </a>
      ))}
      {allPokemonData.map((p) => (
        <a key={p.name} href={"/poke/" + p.name}>
          {p.name}
        </a>
      ))}
    </div>
  );
}
