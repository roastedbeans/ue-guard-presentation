"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

const STEP_DELAY_MS = 1800;

const DESIGN_STEPS = [
  { label: "3GPP Protocol Standard" },
  { label: "System Requirements Spec" },
  { label: "Security Threat Definition" },
  { label: "Layer 1–3 Rules" },
  { label: "Verification (UPPAAL & Empirical)" },
  { label: "Layer 3 Calibration" },
  { label: "Hybrid System Generated" },
] as const;

const RUNTIME_INPUT = [
  { label: "UE Monitoring (RRC & NAS)" },
  { label: "CSV Preprocessing" },
  { label: "Hybrid Detection Execution" },
] as const;

const RUNTIME_LAYERS = [
  { label: "Layer 1: Deterministic (BR-1–14)" },
  { label: "Layer 2: Probabilistic (Transition & Field)" },
  { label: "Layer 3: Adaptive Threshold" },
] as const;

const TOTAL_STEPS = DESIGN_STEPS.length + RUNTIME_INPUT.length + RUNTIME_LAYERS.length + 2; // +2 for Compliance and Final

const Arrow = () => (
  <svg className="w-4 h-4 shrink-0 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const ArrowDown = () => (
  <svg className="w-3 h-3 shrink-0 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
);

export default function ProcessFlowAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setStep((s) => (s >= TOTAL_STEPS - 1 ? 0 : s + 1));
    }, STEP_DELAY_MS);
    return () => clearInterval(t);
  }, []);

  const Node = ({
    label,
    isActive,
    variant,
  }: {
    label: string;
    isActive: boolean;
    variant: "design" | "runtime" | "final";
  }) => {
    const activeStyles =
      variant === "final"
        ? "border-emerald-500 ring-2 ring-emerald-200"
        : variant === "design"
          ? "border-amber-500 ring-2 ring-amber-200"
          : "border-blue-500 ring-2 ring-blue-200";
    return (
      <motion.div
        className={`min-w-[90px] rounded-lg border px-2.5 py-2 transition-colors ${
          isActive ? activeStyles : "border-zinc-200 bg-white"
        }`}
        animate={{ scale: isActive ? 1.02 : 1 }}
        transition={{ duration: 0.25 }}
      >
        <span className="text-xs text-zinc-800 leading-tight">{label}</span>
      </motion.div>
    );
  };

  const designStep = (i: number) => step === i;
  const runtimeInputStep = (i: number) => step === DESIGN_STEPS.length + i;
  const layersStep = (i: number) => step === DESIGN_STEPS.length + RUNTIME_INPUT.length + i;
  const complianceStep = step === DESIGN_STEPS.length + RUNTIME_INPUT.length + RUNTIME_LAYERS.length;
  const finalStep = step === DESIGN_STEPS.length + RUNTIME_INPUT.length + RUNTIME_LAYERS.length + 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative w-full overflow-x-auto rounded-lg border border-zinc-200 bg-white"
    >
      <div className="relative flex flex-col gap-3 p-3">
        {/* Phase 1: Design — with amber-tinted background */}
        <div className="rounded-lg border border-amber-200 p-3">
          <p className="text-xs font-medium uppercase tracking-wider text-amber-700 mb-2">
            Design & Verification Phase
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            {DESIGN_STEPS.map((node, i) => (
              <div key={i} className="flex items-center">
                <Node label={node.label} isActive={designStep(i)} variant="design" />
                {i < DESIGN_STEPS.length - 1 && <Arrow />}
              </div>
            ))}
          </div>
        </div>

        {/* Connector: Deploys to Runtime */}
        <div className="flex flex-col items-center gap-0.5">
          <motion.div
            className="h-4 w-0.5 bg-zinc-400 rounded"
            animate={{ scaleY: step >= DESIGN_STEPS.length ? 1 : 0.2 }}
            transition={{ duration: 0.3 }}
            style={{ originY: 0 }}
          />
          <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
            Deploys to runtime
          </span>
        </div>

        {/* Phase 2: Runtime — with blue-tinted background */}
        <div className="rounded-lg border border-blue-200 p-3 flex flex-col gap-3">
          <p className="text-xs font-medium uppercase tracking-wider text-blue-700">
            Runtime Detection Phase
          </p>
          {/* Input pipeline */}
          <div className="flex flex-wrap items-center gap-1.5">
            {RUNTIME_INPUT.map((node, i) => (
              <div key={i} className="flex items-center">
                <Node label={node.label} isActive={runtimeInputStep(i)} variant="runtime" />
                {i < RUNTIME_INPUT.length - 1 && <Arrow />}
              </div>
            ))}
          </div>
          {/* Three layers (parallel) → Compliance → Final */}
          <div className="flex flex-wrap items-center gap-1.5">
            <div className="flex items-center gap-1.5 rounded-lg border border-dashed border-zinc-300 bg-white px-2 py-1.5">
              {RUNTIME_LAYERS.map((node, i) => (
                <div key={i} className="flex items-center">
                  <Node label={node.label} isActive={layersStep(i)} variant="runtime" />
                  {i < RUNTIME_LAYERS.length - 1 && (
                    <span className="mx-1 text-zinc-300">|</span>
                  )}
                </div>
              ))}
            </div>
            <Arrow />
            <Node
              label="Compliance Calculation"
              isActive={complianceStep}
              variant="runtime"
            />
            <Arrow />
            <Node label="NORMAL / ANOMALOUS" isActive={finalStep} variant="final" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
