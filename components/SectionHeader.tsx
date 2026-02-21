type SectionHeaderProps = {
  number: string;
  label: string;
  heading: string;
  time?: string;
};

export default function SectionHeader({
  number,
  label,
  heading,
  time,
}: SectionHeaderProps) {
  return (
    <div className="mb-10">
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-mono text-sm text-zinc-600">{number}</span>
        <span className="text-sm text-zinc-600 uppercase tracking-[0.18em]">
          {label}
        </span>
        {time && (
          <span className="ml-auto text-sm text-zinc-500 font-mono">
            {time}
          </span>
        )}
      </div>
      <h2
        className="font-light leading-[1.6] tracking-tight text-zinc-900"
        style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
      >
        {heading}
      </h2>
    </div>
  );
}
