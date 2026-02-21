export default function TitleSlide({
  heading,
  subtitle,
  authors,
  venue,
}: {
  heading: string;
  subtitle: string;
  authors: string;
  venue: string;
}) {
  return (
    <section id="s0" style={{ scrollSnapAlign: "start" }}>
      <div
        className="flex flex-col justify-center px-8 md:px-24 lg:px-32"
        style={{
          height: "100vh",
          lineHeight: 1.6,
        }}
      >
        <h1
          className="font-light text-zinc-900 leading-[1.5] tracking-tight max-w-4xl"
          style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
        >
          {heading}
        </h1>
        <p
          className="mt-6 text-zinc-600 max-w-2xl"
          style={{ fontSize: "clamp(1.125rem, 1.75vw, 1.5rem)" }}
        >
          {subtitle}
        </p>
        <div className="mt-16 flex flex-col gap-1 text-base text-zinc-600">
          <span>{authors}</span>
          <span>{venue}</span>
        </div>
      </div>
    </section>
  );
}
