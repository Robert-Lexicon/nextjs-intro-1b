const endpoint = "https://futuramaapi.com/graphql";

//if we have many queries we can move these into a separate file instead
export const characterQueryBasic = `
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

// you can use a fragment to avoid repeating the same things in the query
const characterFragment = `
fragment characterInfo on Character {
  id
  name
  species
  image
  status
  gender
}`;

export const characterQueryWithFragment = `
  query getCharactersWithFragment {
  characters {
    edges {
        ...characterInfo
    }
  }
}${characterFragment}`;

export async function getCharacters() {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: characterQueryWithFragment }),
  });

  const result = await response.json();
  return result;
}

export async function getDataGeneric<T>({
  query,
}: {
  query: string;
}): Promise<{ status: number; body: T } | never> {
  //TODO: handle errors with try/catch here

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // check if query is falsy = null, undefined or empty string. If so it will not be included in the body
    // (by using ..., aka the spread operator, we will make the falsy body into {} which is valid JSON)
    body: JSON.stringify({ ...(query && { query }) }),
  });

  const body = await response.json();

  //return the result, we can also return status code if we want to handle errors
  return {
    status: response.status,
    body,
  };
}
