import React from "react";

export function emphasize(text: string, keywords: string[]): React.ReactNode {
  if (keywords.length === 0) return text;
  const escaped = keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`(${escaped.join("|")})`, "g");
  const parts = text.split(re);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="font-semibold text-zinc-800">{part}</span>
    ) : (
      part
    )
  );
}
