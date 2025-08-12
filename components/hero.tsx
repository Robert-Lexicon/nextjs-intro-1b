//we can import our interfaces from a collection of interfaces..
import { HeroProps } from "@/lib/interfaces";

//history, don't do it this way - not common pattern
// export function Hero2(props: { title: string; text?: string }) {
//   return (
//     <section className="grid justify-center items-center min-h-42 bg-pattern">
//       <h1 className="text-6xl text-neutral-100 py-4 font-bold">
//         {props.title}
//       </h1>
//       {/* { text ? <p>text</p> : <p>Default</p>} */}
//       {props.text && <p className=" text-neutral-100 ">text</p>}
//     </section>
//   );
// }

// //use interface if more than one/two prop
// interface HeroProps {
//   title: string;
//   text?: string;
//   id?: number;
// }

//destructure props, with or without interface - most common pattern
export default function Hero({ title, text, id }: HeroProps) {
  //     export default function Hero({
  //   title,
  //   text,
  //   id,
  // }: {
  //   title: string;
  //   text?: string;
  //   id?: number;
  // }) {
  //   console.log(title);
  return (
    <section className="grid justify-center items-center min-h-42 bg-pattern">
      <h1 className="text-6xl text-neutral-100 py-4 font-bold">{title}</h1>
      {/* { text ? <p>text</p> : <p>Default</p>} */}
      {text && <p className=" text-neutral-100 ">text</p>}
    </section>
  );
}
