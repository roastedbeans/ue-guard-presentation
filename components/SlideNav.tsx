"use client";

type Section = { id: string; number: string; label: string };

export default function SlideNav({
  sections,
  active,
}: {
  sections: Section[];
  active: string;
}) {
  const activeIndex = sections.findIndex((s) => s.id === active);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-2"
      aria-label="Slide navigation"
    >
      <button
        onClick={() =>
          activeIndex > 0 && scrollTo(sections[activeIndex - 1].id)
        }
        className={`text-zinc-500 hover:text-zinc-900 transition-colors text-sm font-mono ${
          activeIndex === 0 ? "opacity-0 pointer-events-none" : ""
        }`}
        aria-label="Previous slide"
      >
        ↑
      </button>
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="group flex items-center gap-3"
            aria-label={`Go to ${s.label}`}
          >
            <span
              className={`text-xs font-mono transition-all whitespace-nowrap ${
                isActive
                  ? "text-zinc-900 opacity-100"
                  : "text-zinc-400 opacity-0 group-hover:opacity-100"
              }`}
            >
              {s.number}. {s.label}
            </span>
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${
                isActive ? "bg-zinc-900 scale-[1.75]" : "bg-zinc-300"
              }`}
            />
          </button>
        );
      })}
      <button
        onClick={() =>
          activeIndex < sections.length - 1 &&
          scrollTo(sections[activeIndex + 1].id)
        }
        className={`text-zinc-500 hover:text-zinc-900 transition-colors text-sm font-mono mt-1 ${
          activeIndex === sections.length - 1
            ? "opacity-0 pointer-events-none"
            : ""
        }`}
        aria-label="Next slide"
      >
        ↓
      </button>
    </nav>
  );
}
