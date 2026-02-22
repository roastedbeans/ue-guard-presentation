"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

const STEP_DELAY_MS = 700;

const STEPS = [
  { from: "ue", to: "fbs", label: "RRC Connection Request", phase: "RRC", normal: true },
  { from: "fbs", to: "ue", label: "RRC Connection Setup", phase: "RRC", normal: true },
  { from: "ue", to: "fbs", label: "RRC Connection Setup Complete", phase: "RRC", normal: true },
  { from: "ue", to: "fbs", label: "NAS Attach Request", phase: "NAS", normal: true },
  { from: "fbs", to: "ue", label: "Identity Request (IMSI)", phase: "NAS", normal: false },
  { from: "ue", to: "fbs", label: "Identity Response (IMSI)", phase: "NAS", normal: false },
] as const;

export default function AttackFlowSequence() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setStep((s) => (s >= STEPS.length - 1 ? 0 : s + 1));
    }, STEP_DELAY_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md"
    >
      <div className="flex items-stretch gap-6">
        {/* UE */}
        <div className="flex flex-col items-center shrink-0">
          <div className="w-12 h-12 rounded-lg border border-zinc-300 bg-zinc-50 flex items-center justify-center">
            <span className="text-xs font-mono text-zinc-600">UE</span>
          </div>
          <span className="mt-1.5 text-[10px] text-zinc-500">Device</span>
        </div>

        {/* Messages */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex flex-col gap-3 py-2">
          {STEPS.map((s, i) => {
            const isUeToFbs = s.from === "ue";
            const isActive = step === i;
            const isPast = i < step;
            return (
              <motion.div
                key={i}
                className={`flex items-center gap-2 py-2 px-3 rounded-lg border transition-colors ${
                    isActive
                      ? s.normal
                        ? "border-zinc-400 bg-zinc-100 shadow-sm"
                        : "border-red-500 bg-red-50 shadow-sm ring-2 ring-red-200"
                      : "border-zinc-200 bg-white"
                  }`}
                  animate={{
                    scale: isActive ? 1.02 : 1,
                    opacity: isActive ? 1 : isPast ? 0.85 : 0.7,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <span
                    className={`text-[10px] font-medium uppercase shrink-0 ${
                      s.phase === "RRC" ? "text-emerald-600" : "text-violet-600"
                    }`}
                  >
                    {s.phase}
                  </span>
                  <span
                    className={`shrink-0 text-zinc-400 ${
                      isUeToFbs ? "" : "rotate-180"
                    }`}
                    title={isUeToFbs ? "UE → FBS" : "FBS → UE"}
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  <span className="flex-1 min-w-0 text-xs text-zinc-700 truncate">{s.label}</span>
                  {!s.normal && isActive && (
                    <span className="text-[9px] font-semibold text-red-600 shrink-0 uppercase animate-pulse">attack</span>
                  )}
              </motion.div>
            );
          })}
          </div>
        </div>

        {/* FBS (attacker) */}
        <div className="flex flex-col items-center shrink-0">
          <div className="w-12 h-12 rounded-lg border border-red-200 bg-red-50 flex items-center justify-center">
            <span className="text-xs font-mono text-red-700">FBS</span>
          </div>
          <span className="mt-1.5 text-[10px] text-red-600">Rogue BS</span>
        </div>
      </div>

      <p className="text-center text-[10px] text-zinc-500 mt-4">
        Identity Request before auth → IMSI exposed (BR-10 violation)
      </p>
    </motion.div>
  );
}
