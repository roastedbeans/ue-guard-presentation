"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

const STEP_DELAY_MS = 1800;

/**
 * Animates the asymmetric authentication in 4G/5G:
 * - Network authenticates UE ✓
 * - UE does not authenticate base station ✗
 */
export default function AsymmetricAuthAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setStep((s) => (s >= 2 ? 1 : s + 1));
    }, STEP_DELAY_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-[380px] shrink-0"
    >
      <div className="flex items-center justify-between gap-6 py-4">
        {/* Network / gNB */}
        <motion.div
          className="flex flex-col items-center shrink-0"
          animate={{ scale: step >= 0 ? 1 : 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 rounded-lg border border-zinc-300 bg-zinc-50 flex items-center justify-center">
            <span className="text-xs font-mono text-zinc-600">gNB</span>
          </div>
          <span className="mt-2 text-xs text-zinc-600">Network</span>
        </motion.div>

        {/* Center: two arrows — fixed width so layout stays consistent */}
        <div className="flex flex-col gap-6 w-[200px] shrink-0">
          {/* Arrow 1: Network → UE (authenticates ✓) */}
          <div className="flex flex-col items-center gap-1 min-h-[40px]">
            <div className="flex items-center w-full h-4">
              <motion.div
                className="h-0.5 flex-1 min-w-0 bg-emerald-400 rounded overflow-hidden"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: step >= 1 ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ originX: 0 }}
              />
              <svg
                className="w-4 h-4 shrink-0 text-emerald-500 -ml-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="h-4 flex items-center justify-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: step >= 1 ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-[10px] text-emerald-700 text-center leading-tight"
              >
                Network authenticates UE
              </motion.span>
            </div>
          </div>

          {/* Arrow 2: UE → Network (does not authenticate ✗) */}
          <div className="flex flex-col items-center gap-1 min-h-[40px]">
            <div className="flex items-center w-full h-4 flex-row-reverse">
              <motion.div
                className="h-0.5 flex-1 min-w-0 border border-dashed border-zinc-300 rounded overflow-hidden"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: step >= 2 ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ originX: 1 }}
              />
              <svg
                className="w-4 h-4 shrink-0 text-zinc-400 -mr-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="h-4 flex items-center justify-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: step >= 2 ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-[10px] text-zinc-500 text-center leading-tight"
              >
                UE does not authenticate base station
              </motion.span>
            </div>
          </div>
        </div>

        {/* UE */}
        <motion.div
          className="flex flex-col items-center"
          animate={{ scale: step >= 1 ? 1 : 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 rounded-lg border border-zinc-300 bg-zinc-50 flex items-center justify-center">
            <span className="text-xs font-mono text-zinc-600">UE</span>
          </div>
          <span className="mt-2 text-xs text-zinc-600">Device</span>
        </motion.div>
      </div>

      <p className="text-center text-xs text-zinc-500 mt-4">
        4G LTE · 5G
      </p>
    </motion.div>
  );
}
