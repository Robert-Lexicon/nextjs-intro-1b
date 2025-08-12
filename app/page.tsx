import Hero from "@/components/hero";
import SpaceWrapper from "@/components/space-wrapper";

export default function Home() {
  return (
    <main>
      <Hero title={"Welcome"} id={1} />
      <SpaceWrapper>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae
          quae totam modi deserunt. Placeat id corrupti atque. Cupiditate
          quisquam, distinctio repudiandae, magnam et eligendi magni mollitia
          ratione aspernatur soluta nisi!
        </p>
      </SpaceWrapper>
    </main>
  );
}
