"use client";

type Section = { id: string; number: string; label: string };

export default function SlideNav({
  sections,
  active,
  onPrev,
  onNext,
  scrollTo,
}: {
  sections: Section[];
  active: string;
  onPrev?: () => void;
  onNext?: () => void;
  scrollTo?: (id: string) => void;
}) {
  const activeIndex = sections.findIndex((s) => s.id === active);

  function defaultScrollTo(id: string) {
    const container = document.getElementById("scroll-container");
    const el = document.getElementById(id);
    if (!container || !el) return;
    const top = container.scrollTop + el.getBoundingClientRect().top - container.getBoundingClientRect().top;
    container.scrollTo({ top, behavior: "smooth" });
  }

  const scrollToSection = scrollTo ?? defaultScrollTo;
  const handlePrev = onPrev ?? (() => activeIndex > 0 && scrollToSection(sections[activeIndex - 1].id));
  const handleNext = onNext ?? (() => activeIndex < sections.length - 1 && scrollToSection(sections[activeIndex + 1].id));
  const canPrev = activeIndex > 0;
  const canNext = activeIndex < sections.length - 1;

  return (
    <nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-2"
      aria-label="Slide navigation"
    >
      <button
        onClick={handlePrev}
        className={`text-zinc-500 hover:text-zinc-900 transition-colors text-sm font-mono ${
          !canPrev ? "opacity-0 pointer-events-none" : ""
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
            onClick={() => scrollToSection(s.id)}
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
        onClick={handleNext}
        className={`text-zinc-500 hover:text-zinc-900 transition-colors text-sm font-mono mt-1 ${
          !canNext ? "opacity-0 pointer-events-none" : ""
        }`}
        aria-label="Next slide"
      >
        ↓
      </button>
    </nav>
  );
}
