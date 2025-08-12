import Hero from "./hero";

export default function MainWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="content-grid full-width">
      <header className="content-grid full-width">
        <Hero title={title} />
      </header>
      <section className="content-grid space-y-4 mt-8">{children}</section>
    </main>
  );
}
