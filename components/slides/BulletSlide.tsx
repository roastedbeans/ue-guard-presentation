import SectionHeader from "../SectionHeader";
import { emphasize } from "@/lib/emphasize";

type Bullet = { main: string; sub?: string[] };

export default function BulletSlide({
  id,
  number,
  label,
  heading,
  bullets,
  visual,
  emphasizeKeywords,
}: {
  id: string;
  number: string;
  label: string;
  heading: string;
  bullets: Bullet[];
  visual?: React.ReactNode;
  emphasizeKeywords?: string[];
}) {
  return (
    <section id={id} style={{ scrollSnapAlign: "start" }}>
      <div
        className="flex flex-col justify-center px-6 md:px-10 lg:px-16 overflow-y-auto"
        style={{ minHeight: "100vh", lineHeight: 1.6 }}
      >
        <SectionHeader number={number} label={label} heading={heading} />
        <div className="flex gap-12 items-start">
          <ul className="space-y-5 text-base max-w-3xl flex-1 shrink-0">
          {bullets.map((b, i) => (
            <li key={i}>
              <span className="text-zinc-900">{emphasizeKeywords ? emphasize(b.main, emphasizeKeywords) : b.main}</span>
              {b.sub && b.sub.length > 0 && (
                <ul className="mt-2 ml-4 space-y-1.5 text-base text-zinc-600">
                  {b.sub.map((s, j) => (
                    <li key={j}>• {emphasizeKeywords ? emphasize(s, emphasizeKeywords) : s}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          </ul>
          {visual && <div className="shrink-0 w-fit">{visual}</div>}
        </div>
      </div>
    </section>
  );
}
