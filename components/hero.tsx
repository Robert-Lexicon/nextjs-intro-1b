export default function Hero({ title }: { title: string }) {
  return (
    <section className="full-width items-center min-h-42 bg-pattern">
      <h1 className="text-6xl text-center text-neutral-100 py-4 font-bold">
        {title}
      </h1>
    </section>
  );
}
