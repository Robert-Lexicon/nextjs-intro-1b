import MainWrapper from "@/components/main-wrapper";
import {
  characterQueryWithFragment,
  getDataGeneric,
} from "@/lib/data/futurama";
import { CharacterResponseData } from "@/lib/interfaces/futurama";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Futurama Characters",
  description: "A list of Futurama characters",
};

export default async function Futurama() {
  // try {
  //   const test = await fetch("https://futuramaapi.com/api/characters/87987");

  //   console.dir(test.ok, { depth: null });

  //   if (!test.ok) {
  //     //console.error("Error fetching data from Futurama API");
  //     throw new Error(`Error status: ${test.status}`);
  //   }
  // } catch (error) {
  //   console.error("oh no" + error);
  //   throw new Error(`Error status: ${error}`);
  // }

  const response = await getDataGeneric<CharacterResponseData>({
    query: characterQueryWithFragment,
  });

  // if we want to log the response
  // console.dir(response, { depth: null })

  // get characters from response
  // const characters = response.body.data.characters.edges;

  // Or get characters from response by destructuring.
  // By adding : we can rename edges as characters

  const {
    characters: { edges: characters },
  } = response.body.data;

  return (
    <MainWrapper title="Futurama Characters">
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
