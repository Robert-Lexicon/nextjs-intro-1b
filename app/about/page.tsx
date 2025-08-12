import Hero from "@/components/hero";
import HeroWithChildren from "@/components/hero-with-children";
import Image from "next/image";

// This is a fake "component" without props, anon parameter
function Func(str: string) {
  return <p>{str}</p>;
}

export default function AboutPage() {
  return (
    <main>
      {/* I can send data into the component with props. For ex title, text... */}
      {/* <Hero title={"About us"} id={2} /> */}
      <HeroWithChildren>
        {/* everything inside the component is passed as children */}
        <h1 className="text-6xl text-neutral-100 py-4 font-bold">About us</h1>
        <p className="text-zinc-50 p-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus magni labore dicta aut atque doloremque a officiis
          possimus excepturi itaque sit iusto, iure enim eveniet ratione. Saepe
          quia necessitatibus veritatis.
        </p>
      </HeroWithChildren>
      {/* Don't! */}
      {/* {Func("About us")}
      <Func str="About us" /> */}
      <Image
        className="dark:invert"
        src="https://picsum.photos/id/37/200/300"
        alt="Next.js logo"
        width={200}
        height={300}
        priority
      />
      <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
        <li className="mb-2 tracking-[-.01em]">
          Get started by editing{" "}
          <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
            app/page.tsx
          </code>
          .
        </li>
        <li className="tracking-[-.01em]">
          Save and see your changes instantly.
        </li>
      </ol>
    </main>
  );
}
