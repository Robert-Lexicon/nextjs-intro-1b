import Card from "@/components/card";
import MainWrapper from "@/components/main-wrapper";
import { Recipe } from "@/lib/interfaces";
import { notFound } from "next/navigation";

// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json())

//   return posts.map((post) => ({
//     slug: post.slug,
//   }))
// }

export default async function Recipes({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // const idStr = (await params).id;
  // console.log(idStr);
  const response = await fetch(`https://dummyjson.com/recipes/${id}`);

  // Do this for debugging
  // const json = await response.json();
  // console.dir(json, { depth: null });

  const recipe: Recipe = await response.json();

  if (!recipe?.id) return notFound();

  console.dir(recipe, { depth: null });
  //const recipes: Recipe[] = data["recipes"];
  return (
    <MainWrapper title="Recipes">
      <ul className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(30ch,1fr))] content-stretch">
        <Card
          recipe={recipe}
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
