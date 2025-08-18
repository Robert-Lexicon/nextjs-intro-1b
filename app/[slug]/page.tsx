import MainWrapper from "@/components/main-wrapper";
import { notFound } from "next/navigation";

const pages = [
  {
    slug: "animals",
    label: "Animals",
    title: "Welcome to the animals!",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At saepe, illo itaque eos voluptatem dolorum recusandae cumque quibusdam optio consequatur necessitatibus excepturi adipisci nesciunt inventore, hic aliquid, ab velit voluptates.",
  },
  {
    slug: "toys",
    label: "Toys",
    title: "See our toys",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At saepe, illo itaque eos voluptatem dolorum recusandae cumque quibusdam optio consequatur necessitatibus excepturi adipisci nesciunt inventore, hic aliquid, ab velit voluptates.",
  },
  {
    slug: "colors",
    label: "Colors",
    title: "Find your inner color",
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt optio libero excepturi. Labore eveniet vitae possimus. Et, a? Tempore fugiat molestiae quod. Eos alias, fugiat velit officia accusamus odio porro.
  Nisi nemo reiciendis eum dignissimos numquam exercitationem sapiente laudantium odit aperiam. Amet facere optio sapiente veniam. Corporis quia labore velit nulla? Harum sapiente veniam velit nihil consequuntur excepturi, rerum adipisci.
  Incidunt, reprehenderit nihil quisquam nisi at, delectus, dicta odio atque autem enim corrupti suscipit porro sunt? Quis nulla consectetur eos necessitatibus at temporibus, fuga illo unde! Laudantium facilis nostrum atque?`,
  },
];

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(slug);

  const page = pages.find((p) => p.slug === slug);

  if (!page) return notFound();

  console.log(page);

  return (
    <MainWrapper title={page.label}>
      <h2 className="text-xl font-bold">{page.title}</h2>
      <div>{page.content}</div>
    </MainWrapper>
  );
}
