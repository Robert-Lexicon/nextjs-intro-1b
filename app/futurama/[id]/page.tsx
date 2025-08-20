import { notFound, redirect } from "next/navigation";

// we can do try catch on the whole component, but this is not recommended!!
// if we do it on only the fetch we have a scope so we can't access the response if we don't use let data or something before = messy
export default async function Character({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  try {
    // if we used an interface here we would have type safety but not any safety when it comes to the actual data on run time
    const response = await fetch(
      `https://futuramaapi.com/api/characters/${id}`
    );

    // we can check if the response is ok - that is it's not rejected (status 200-299)
    if (!response.ok) {
      return notFound();
    }

    // if it is ok we can parse the data
    const data = await response.json();

    // for demo not recommended
    // we can also redirect if we want to handle different status codes
    if (response.status === 500) {
      redirect("/");
    }

    //we can check some or all propertis if we want some safety
    if (!data.id) {
      return notFound();

      //or if we want we can throw an error at let it bubble up to nearest error boundary (we can't do both!)
      // throw new Error("Character not found");
    }

    //more detailed but not fun... use zod or smt instead if you really want control
    if (
      !data ||
      typeof data.id !== "number" ||
      typeof data.name !== "string" ||
      typeof data.image !== "string"
    ) {
      return notFound();
    }

    // now finally we can return our tsx safely
    return <div>{data.name}</div>;

    //if anything inside try fails it will be caught here in catch
  } catch (error) {
    // we can log the error
    console.error("Error fetching character data:", error);
    // and/or we can throw an error to be handled by the caller
    throw new Error(
      `Failed to fetch characters: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
