import HeroWithChildren from "@/components/hero-with-children";
import SpaceWrapper from "@/components/space-wrapper";

export default function Contact() {
  return (
    <main>
      <HeroWithChildren>
        {/* everything inside the component is passed as children */}
        <h1 className="text-6xl text-neutral-100 py-4 font-bold">Contact us</h1>
        <p className="text-zinc-50 p-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </HeroWithChildren>
      <SpaceWrapper>
        <p className="py-4">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae
          quae totam modi deserunt. Placeat id corrupti atque. Cupiditate
          quisquam, distinctio repudiandae, magnam et eligendi magni mollitia
          ratione aspernatur soluta nisi!
        </p>
      </SpaceWrapper>
    </main>
  );
}
