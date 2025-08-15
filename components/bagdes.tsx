export default function Bagdes({
  strings,
  className,
}: {
  strings: string[];
  className?: string;
}) {
  return (
    <ul className="flex gap-1 flex-wrap">
      {strings.map((tag, i) => (
        <li
          className={`text-sm dark:text-neutral-950 px-2 py-0.5 ${className}`}
          key={i}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
