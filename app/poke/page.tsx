interface PokeToRender {
  img: string;
  name: string;
  order: number;
}
export default async function Poke() {
  const secondResponse = await fetch("https://pokeapi.co/api/v2/pokemon/1");

  const detailedData = await secondResponse.json();
  console.log(detailedData);

  //här destructurerar vi ut det vi vill ha, i detta fall img, name och order
  const {
    sprites: {
      other: {
        "official-artwork": { front_default: img },
      },
    },
    name,
    id: order,
  } = detailedData;

  //här gör vi ett nytt objekt
  const pokemon: PokeToRender = {
    img,
    name,
    order,
  };
  console.log(pokemon);

  return <div>Hej</div>;
}
