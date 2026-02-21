"use client";

import { useState, useEffect } from "react";
import SlideNav from "./SlideNav";
import { SLIDES } from "@/lib/slides";

const SECTIONS = SLIDES.map((s) => s.id);

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState("s0");

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

  return (
    <div className="h-screen bg-white text-zinc-900 flex flex-col overflow-hidden">
      <SlideNav sections={SLIDES} active={active} />
      {children}
    </div>
  );
}
