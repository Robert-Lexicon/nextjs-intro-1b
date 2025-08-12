import Link from "next/link";
import data from "@/lib/pages.json";

const linkList = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

//local to this file
function test() {
  return "test";
}

export default function NavMain() {
  return (
    <nav>
      <ul className="flex gap-4 px-4 md:px-8">
        {/* {data["pages"].map((link, index) => (
          <li key={index}>
            <Link
              className="bg-amber-600 p-4 block text-xl font-bold"
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))} */}
        {linkList.map((link, i) => (
          <li key={i}>
            <Link className="p-4 block text-lg font-bold" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
