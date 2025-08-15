import Hero from "./hero";

export default function MainWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="content-grid">
      <header className="content-grid full-width">
        <Hero title={title} />
      </header>
      <section className="space-y-4 my-8">{children}</section>
    </main>
  );
}
