import Card from "@/components/card";
import Card2 from "@/components/card2";
import MainWrapper from "@/components/main-wrapper";
import { Recipe } from "@/lib/interfaces";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json())

//   return posts.map((post) => ({
//     slug: post.slug,
//   }))
// }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  // read route params
  const { id } = await params;
  const response = await fetch(`https://dummyjson.com/recipes/${id}`);
  const recipe: Recipe = await response.json();

  return {
    title: recipe.name,
    description: recipe.cuisine,
  };
}

export default async function Recipes({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <MainWrapper title="Recipes">
      <ul className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(30ch,1fr))] content-stretch">
        <Card2
          id={id}
          className="border border-neutral-300 rounded p-4 shadow-sm"
        />
      </ul>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque dicta
        culpa veniam iusto voluptate laboriosam itaque, ullam, exercitationem
        magni sed quidem nihil aliquam fuga. Voluptatem exercitationem
        consectetur laboriosam neque est?
      </p>
    </MainWrapper>
  );
}
