"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

const STEP_DELAY_MS = 1200;
const THRESHOLD = 0.2858;

const NORMAL_TRANSITIONS = [
  { from: "AttachRequest", to: "IdentityRequest", p: "0.82", score: 0.12 },
  { from: "IdentityRequest", to: "SecurityModeCommand", p: "0.91", score: 0.08 },
  { from: "SecurityModeCommand", to: "SecurityModeComplete", p: "0.78", score: 0.14 },
  { from: "SecurityModeComplete", to: "TAURequest", p: "0.65", score: 0.19 },
  { from: "TAURequest", to: "TAUAccept", p: "0.88", score: 0.10 },
];

const ANOMALY_TRANSITIONS = [
  { from: "AttachRequest", to: "IdentityRequest", p: "0.82", score: 0.12, isAnomaly: false },
  { from: "IdentityRequest", to: "SecurityModeCommand", p: "0.91", score: 0.08, isAnomaly: false },
  { from: "SecurityModeCommand", to: "RegistrationReject", p: "0.01", score: 0.66, isAnomaly: true },
  { from: "Idle", to: "RRCReestablishment", p: "0.00", score: 0.90, isAnomaly: true },
  { from: "Unknown", to: "—", p: "—", score: 1.0, isAnomaly: true },
];

const NORMAL_AGGREGATE = 0.17;
const ANOMALY_AGGREGATE = 0.66;

export default function Layer2StateAnimation() {
  const [step, setStep] = useState(0);

  const transitionCount = Math.max(NORMAL_TRANSITIONS.length, ANOMALY_TRANSITIONS.length);
  const decisionStep = transitionCount;
  const maxSteps = transitionCount + 1;

  useEffect(() => {
    const t = setInterval(() => {
      setStep((s) => (s >= maxSteps - 1 ? 0 : s + 1));
    }, STEP_DELAY_MS);
    return () => clearInterval(t);
  }, []);

  const showDecision = step === decisionStep;
  const isActive = (i: number) => !showDecision && step === i;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="rounded-lg border border-zinc-200 bg-zinc-50/50 p-4 mb-4"
    >
      <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-1 text-center">
        State transition → score
      </p>
      <p className="text-sm text-zinc-600 mb-3 text-center">
        Threshold {THRESHOLD}: when score meets or exceeds threshold, classify as anomalous
      </p>
      <div className="grid grid-cols-2 gap-4">
        {/* Normal flow */}
        <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-3 flex flex-col">
          <p className="text-sm font-semibold text-emerald-700 mb-3 text-center">Normal</p>
          <div className="space-y-2">
            {NORMAL_TRANSITIONS.map((t, i) => {
              return (
                <motion.div
                  key={i}
                  className={`flex items-center justify-between gap-2 py-2 px-3 rounded-lg border text-sm ${
                    isActive(i) ? "border-emerald-500 bg-white shadow-md ring-2 ring-emerald-200" : "border-emerald-200 bg-white/60"
                  }`}
                  animate={{ scale: isActive(i) ? 1.02 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="font-mono text-zinc-700 truncate flex-1">
                    {t.from} <br/>→ {t.to}
                  </span>
                  <span className="shrink-0 text-emerald-700 font-bold">score={t.score.toFixed(2)}</span>
                </motion.div>
              );
            })}
          </div>
          <motion.div
            className="mt-3 pt-3 border-t border-emerald-200 text-center text-sm"
            initial={false}
            animate={{ opacity: showDecision ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-zinc-600">Score {NORMAL_AGGREGATE.toFixed(2)} is below threshold, so </span>
            <br/>
            <span className="font-semibold text-emerald-700">NORMAL</span>
          </motion.div>
        </div>

        {/* Anomaly flow */}
        <div className="rounded-lg border border-red-200 bg-red-50/80 p-3 flex flex-col">
          <p className="text-sm font-semibold text-red-700 mb-3 text-center">Anomaly</p>
          <div className="space-y-2">
            {ANOMALY_TRANSITIONS.map((t, i) => {
              const isAnom = t.isAnomaly;
              return (
                <motion.div
                  key={i}
                  className={`flex items-center justify-between gap-2 py-2 px-3 rounded-lg border text-sm ${
                    isActive(i)
                      ? isAnom
                        ? "border-red-500 bg-white shadow-md ring-2 ring-red-200"
                        : "border-emerald-500 bg-white shadow-md ring-2 ring-emerald-200"
                      : isAnom
                        ? "border-red-200 bg-white/60"
                        : "border-emerald-200 bg-white/60"
                  }`}
                  animate={{ scale: isActive(i) ? 1.02 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="font-mono text-zinc-700 truncate flex-1">
                    {t.from} <br/>→ {t.to}
                  </span>
                  <span className={`shrink-0 font-bold ${isAnom ? "text-red-700" : "text-emerald-700"}`}>score={t.score.toFixed(2)}</span>
                </motion.div>
              );
            })}
          </div>
          <motion.div
            className="mt-3 pt-3 border-t border-red-200 text-center text-sm"
            initial={false}
            animate={{ opacity: showDecision ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-zinc-600">Score {ANOMALY_AGGREGATE.toFixed(2)} meets or exceeds threshold, so </span>
            <br/>
            <span className="font-semibold text-red-700">ANOMALOUS</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
