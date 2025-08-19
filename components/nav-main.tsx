import Link from "next/link";
import Image from "next/image";
import data from "@/lib/data/pages.json";

export default async function NavMain() {
  return (
    <nav className="breakout flex items-center justify-between">
      <Link href={"/"}>
        <Image
          src="/next.svg"
          alt="Logo"
          width={100}
          height={32}
          className="dark:invert"
        />
      </Link>
      <ul className="flex gap-4">
        {data["pages"].map((link, index) => (
          <li key={index}>
            <Link
              className="p-4 block text-lg uppercase hover:bg-neutral-700 hover:text-neutral-100"
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
