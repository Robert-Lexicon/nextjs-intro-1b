export default function Hero({ title }: { title: string }) {
  return (
    <section className="full-width items-center min-h-48 bg-pattern">
      <h1 className="text-6xl text-center text-neutral-100 py-4 font-bold max-w-[15ch] m-auto text-balance leading-12">
        {title}
      </h1>
    </section>
  );
}
