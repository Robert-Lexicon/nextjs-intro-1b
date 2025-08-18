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

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const result: ResponseData = await response.json();
  //   console.dir(result, { depth: null });

  //get characters from result
  //const characters = result.data.characters.edges;

  //get characters from result by destructuring, by adding : we can name edges as characters
  const {
    characters: { edges: characters },
  } = result.data;
  return (
    <ul>
      {characters.map((character) => (
        <li key={character.id}>{character.name}</li>
      ))}
    </ul>
  );
}
