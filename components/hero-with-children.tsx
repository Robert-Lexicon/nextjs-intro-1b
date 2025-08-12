export default function HeroWithChildren({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid justify-center items-center min-h-42 bg-pattern text-center px-4">
      {children}
    </section>
  );
}
