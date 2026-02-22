"use client";

import { useState, useEffect, useCallback } from "react";
import SlideNav from "@/components/SlideNav";
import { SLIDES } from "@/lib/slides";

const SECTIONS = SLIDES.map((s) => s.id);

function scrollToSection(id: string) {
  const container = document.getElementById("scroll-container");
  const el = document.getElementById(id);
  if (!container || !el) return;
  const top = container.scrollTop + el.getBoundingClientRect().top - container.getBoundingClientRect().top;
  container.scrollTo({ top, behavior: "smooth" });
}

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState("s0");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }, []);

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const goToPrev = useCallback(() => {
    const idx = SECTIONS.indexOf(active);
    if (idx > 0) scrollToSection(SECTIONS[idx - 1]);
  }, [active]);

  const goToNext = useCallback(() => {
    const idx = SECTIONS.indexOf(active);
    if (idx < SECTIONS.length - 1) scrollToSection(SECTIONS[idx + 1]);
  }, [active]);

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;

    function onScroll() {
      const c = document.getElementById("scroll-container");
      if (!c) return;
      const scrollTop = c.scrollTop;
      const height = c.clientHeight;
      let best = SECTIONS[0];
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollTop + height * 0.4) best = id;
      }
      setActive(best);
    }

    onScroll();
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (target?.closest("input, textarea, [contenteditable]")) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        goToPrev();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToPrev, goToNext]);

  const activeIndex = SECTIONS.indexOf(active);
  const activeSlide = SLIDES[activeIndex] as { number?: string } | undefined;
  const pageNum = activeSlide?.number ?? "00";

  return (
    <div className="h-screen bg-white text-zinc-900 flex flex-col overflow-hidden">
      <button
        onClick={toggleFullscreen}
        className="fixed left-6 top-6 z-50 p-2 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        {isFullscreen ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        )}
      </button>
      <div
        className="fixed right-12 -top-24 -z-10 text-[16rem] font-mono font-light text-zinc-100 tracking-tight"
        aria-label={`Page ${activeIndex + 1}`}
      >
        {pageNum}
      </div>
      <SlideNav sections={SLIDES} active={active} onPrev={goToPrev} onNext={goToNext} scrollTo={scrollToSection} />
      {children}
    </div>
  );
}
