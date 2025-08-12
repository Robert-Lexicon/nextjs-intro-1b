import Link from "next/link";
import Image from "next/image";
import data from "@/lib/pages.json";
import SpaceWrapper from "./space-wrapper";

const linkList = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/test", label: "Test" },
];

//local to this file
function test() {
  return "test";
}

export default function NavMain() {
  return (
    <SpaceWrapper>
      <nav className="flex items-center justify-between">
        <Link href={"/"}>
          <Image src="/next.svg" alt="Logo" width={100} height={32} />
        </Link>
        <ul className="flex gap-4 ">
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
    </SpaceWrapper>
  );
}
