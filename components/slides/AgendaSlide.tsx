import SectionHeader from "../SectionHeader";

export default function AgendaSlide({
  id,
  number,
  label,
  items,
}: {
  id: string;
  number: string;
  label: string;
  items: string[];
}) {
  return (
    <section id={id} style={{ scrollSnapAlign: "start" }}>
      <div
        className="flex flex-col justify-center px-6 md:px-10 lg:px-16"
        style={{ height: "100vh", lineHeight: 1.6 }}
      >
        <SectionHeader number={number} label={label} heading="Agenda" />
        <ol className="space-y-4 text-base text-zinc-700 max-w-2xl">
          {items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-mono text-zinc-600 shrink-0">{i + 1}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
