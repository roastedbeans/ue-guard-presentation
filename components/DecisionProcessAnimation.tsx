"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

const STEP_DELAY_MS = 2200;
const THRESHOLD = 0.2858;

type Scenario = "layer1_override" | "layer2_detection" | "normal";

const SCENARIOS: { id: Scenario; layer1Violated: boolean; anomalyScore: number; verdict: "ANOMALOUS" | "NORMAL"; reason: string }[] = [
  {
    id: "layer1_override",
    layer1Violated: true,
    anomalyScore: 0.22,
    verdict: "ANOMALOUS",
    reason: "Layer 1 override (spec rule violated)",
  },
  {
    id: "layer2_detection",
    layer1Violated: false,
    anomalyScore: 0.42,
    verdict: "ANOMALOUS",
    reason: "Layer 2 detection (score ≥ θ)",
  },
  {
    id: "normal",
    layer1Violated: false,
    anomalyScore: 0.17,
    verdict: "NORMAL",
    reason: "No violation, score < θ",
  },
];

export default function DecisionProcessAnimation() {
  const [scenarioIndex, setScenarioIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setScenarioIndex((i) => (i >= SCENARIOS.length - 1 ? 0 : i + 1));
    }, STEP_DELAY_MS);
    return () => clearInterval(t);
  }, []);

  const s = SCENARIOS[scenarioIndex];
  const isAnomalous = s.verdict === "ANOMALOUS";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="rounded-lg border border-zinc-200 bg-zinc-50/50 p-4"
    >
      <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-3 text-center">
        Decision process (cycles through all outcomes)
      </p>
      <div className="flex flex-col gap-3">
        {/* Step 1: Layer 1 check */}
        <motion.div
          key={`step1-${scenarioIndex}`}
          className={`flex items-center justify-between gap-4 py-3 px-4 rounded-lg border ${
            s.layer1Violated
              ? "border-amber-500 bg-amber-50 ring-2 ring-amber-200"
              : "border-zinc-200 bg-white"
          }`}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-sm font-medium text-zinc-700">1. any_behavior_rule_violated?</span>
          <span className={`font-mono font-semibold ${s.layer1Violated ? "text-amber-700" : "text-zinc-600"}`}>
            {s.layer1Violated ? "yes" : "no"}
          </span>
        </motion.div>

        {s.layer1Violated ? (
          /* Layer 1 override branch */
          <motion.div
            key={`override-${scenarioIndex}`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2 pl-4 border-l border-amber-200"
          >
            <p className="text-xs text-amber-700 font-medium">Layer 1 override (skip Layer 2)</p>
            <div className="flex items-center gap-3 py-2 px-3 rounded-lg border border-red-200 bg-red-50">
              <span className="text-sm font-medium text-zinc-600">Verdict:</span>
              <span className="font-bold text-red-700">ANOMALOUS</span>
              <span className="text-xs text-zinc-500">({s.reason})</span>
            </div>
          </motion.div>
        ) : (
          /* Step 2: Layer 2 check */
          <motion.div
            key={`step2-${scenarioIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-2"
          >
            <motion.div
              className={`flex items-center justify-between gap-4 py-3 px-4 rounded-lg border ${
                s.anomalyScore >= THRESHOLD ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200" : "border-zinc-200 bg-white"
              }`}
            >
              <span className="text-sm font-medium text-zinc-700">
                2. anomaly_score ({s.anomalyScore.toFixed(2)}) ≥ θ ({THRESHOLD})?
              </span>
              <span
                className={`font-mono font-semibold ${
                  s.anomalyScore >= THRESHOLD ? "text-blue-700" : "text-zinc-600"
                }`}
              >
                {s.anomalyScore >= THRESHOLD ? "yes" : "no"}
              </span>
            </motion.div>
            <div className="flex flex-col gap-2 pl-4 border-l border-blue-200">
              <div
                className={`flex items-center gap-3 py-2 px-3 rounded-lg border ${
                  isAnomalous ? "border-red-200 bg-red-50" : "border-emerald-200 bg-emerald-50"
                }`}
              >
                <span className="text-sm font-medium text-zinc-600">Verdict:</span>
                <span className={`font-bold ${isAnomalous ? "text-red-700" : "text-emerald-700"}`}>
                  {s.verdict}
                </span>
                <span className="text-xs text-zinc-500">({s.reason})</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
