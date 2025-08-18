import MainWrapper from "@/components/main-wrapper";
import Image from "next/image";

interface Character {
  id: string;
  name: string;
  species: string;
  image?: string;
}
interface ResponseData {
  data: {
    characters: {
      total: number;
      edges: Character[];
    };
  };
}

export default async function Futurama() {
  const endpoint = "https://futuramaapi.com/graphql";

  const query = `
    query getCharacters {
        characters {
            total
            edges {
                id
                name
                species
            }
        }
  }`;

  // you can use a fragment to avoid repeating the same fields in the query
  const charFragment = `fragment characterInfo on Character {
    id
    name
    species
    image
    status
    gender
  }`;

  const query2 = `
  query getCharactersWithFragment {
  characters {
    edges {
        ...characterInfo
    }
  }
}${charFragment}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: query2 }),
  });

  const result: ResponseData = await response.json();
  console.dir(result, { depth: null });

  //get characters from result
  //const characters = result.data.characters.edges;

  //get characters from result by destructuring, by adding : we can name edges as characters
  const {
    characters: { edges: characters },
  } = result.data;
  return (
    <MainWrapper title="Recipes">
      <ul className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(25ch,1fr))]">
        {characters.map((character) => (
          <li className="p-4 bg-neutral-300/20 text-center" key={character.id}>
            <h2 className="font-bold text-xl text-balance">{character.name}</h2>
            <p>{character.species}</p>
            {character.image ? (
              <Image
                className="w-full object-cover aspect-square"
                alt={`Image of ${character.name}`}
                src={character.image}
                width={300}
                height={380}
              />
            ) : (
              <div
                aria-hidden="true"
                className="w-full aspect-square bg-neutral-50/40 grid justify-center items-center"
              >
                No Image
              </div>
            )}
          </li>
        ))}
      </ul>
    </MainWrapper>
  );
}
