import Hero from "@/components/hero";
import SpaceWrapper from "@/components/space-wrapper";

const data = { title: "undefined", discounted: true };

export default function Home() {
  //early return to avoid rendering if data is not available
  if (!data) {
    // https://nextjs.org/docs/app/api-reference/functions/not-found
    // return notFound(); // this would be a 404 page
    return (
      <main>
        <p>Couldn't find the data</p>
      </main>
    );
  }

  return (
    <main>
      {/* conditional rendering based on data availability, one example with && and one with ternary */}
      {data && <Hero title={data ? data.title : "Welcome"} />}
      {data ? <Hero title={data ? data.title : "Welcome"} /> : <p>Hej</p>}
      <SpaceWrapper>
        {/* conditional className based on data property */}
        <p className={data.discounted ? "bg-amber-600" : ""}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae
          quae totam modi deserunt. Placeat id corrupti atque. Cupiditate
          quisquam, distinctio repudiandae, magnam et eligendi magni mollitia
          ratione aspernatur soluta nisi!
        </p>
      </SpaceWrapper>
    </main>
  );
}
