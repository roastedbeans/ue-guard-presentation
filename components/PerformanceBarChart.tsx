"use client";

const TIME_DATA = [
  { label: "UE-Guard", preprocess: 616.41, detection: 19.1, isHighlight: true },
  { label: "CNN", preprocess: 886.86, detection: 374.87, isHighlight: false },
  { label: "GRU", preprocess: 886.86, detection: 737.7, isHighlight: false },
  { label: "LSTM", preprocess: 886.86, detection: 875.73, isHighlight: false },
];

const MEMORY_DATA = [
  { label: "UE-Guard", value: 0.22, isHighlight: true },
  { label: "CNN", value: 86.75, isHighlight: false },
  { label: "GRU", value: 86.75, isHighlight: false },
  { label: "LSTM", value: 86.75, isHighlight: false },
];

const MAX_TOTAL_TIME = 1762.59;
const MAX_MEMORY = 86.75;

function StackedBarRow({
  label,
  preprocess,
  detection,
  max,
  isHighlight,
}: {
  label: string;
  preprocess: number;
  detection: number;
  max: number;
  isHighlight: boolean;
}) {
  const total = preprocess + detection;
  const preprocessPct = (preprocess / max) * 100;
  const detectionPct = (detection / max) * 100;
  return (
    <div className="flex items-center gap-3 py-1">
      <span
        className={`text-sm shrink-0 w-20 font-medium ${isHighlight ? "text-emerald-700" : "text-zinc-600"}`}
      >
        {label}
      </span>
      <div className="flex-1 h-6 bg-zinc-100 rounded overflow-hidden flex">
        <div
          className={`h-full ${isHighlight ? "bg-emerald-200" : "bg-blue-200"}`}
          style={{ width: `${Math.max(0.5, preprocessPct)}%` }}
          title={`Preprocess: ${preprocess.toFixed(2)} ms`}
        />
        <div
          className={`h-full ${isHighlight ? "bg-emerald-500" : "bg-blue-400"}`}
          style={{ width: `${Math.max(0.5, detectionPct)}%` }}
          title={`Detection: ${detection.toFixed(2)} ms`}
        />
      </div>
      <span className={`text-sm shrink-0 w-20 font-mono ${isHighlight ? "text-emerald-700 font-semibold" : "text-zinc-600"}`}>
        {(total).toFixed(2)}
      </span>
    </div>
  );
}

function BarRow({
  label,
  value,
  max,
  unit,
  isHighlight,
}: {
  label: string;
  value: number;
  max: number;
  unit: string;
  isHighlight: boolean;
}) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="flex items-center gap-3 py-1">
      <span
        className={`text-sm shrink-0 w-20 font-medium ${isHighlight ? "text-emerald-700" : "text-zinc-600"}`}
      >
        {label}
      </span>
      <div className="flex-1 h-6 bg-zinc-100 rounded overflow-hidden">
        <div
          className={`h-full rounded transition-all duration-500 ${isHighlight ? "bg-emerald-500" : "bg-zinc-400"}`}
          style={{ width: `${Math.max(2, pct)}%` }}
        />
      </div>
      <span className={`text-sm shrink-0 w-20 font-mono ${isHighlight ? "text-emerald-700 font-semibold" : "text-zinc-600"}`}>
        {value.toFixed(2)}{unit}
      </span>
    </div>
  );
}

export default function PerformanceBarChart() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-2">Preprocess + Detection (ms)</p>
        <div className="flex gap-4 mb-2">
          <span className="flex items-center gap-1.5 text-xs text-zinc-500 whitespace-nowrap">
            <span className="w-3 h-2.5 rounded bg-emerald-200" /> Preprocess (UE-Guard)
          </span>
          <span className="flex items-center gap-1.5 text-xs text-zinc-500 whitespace-nowrap">
            <span className="w-3 h-2.5 rounded bg-blue-200" /> Preprocess (baselines)
          </span>
          <span className="flex items-center gap-1.5 text-xs text-zinc-500 whitespace-nowrap">
            <span className="w-3 h-2.5 rounded bg-blue-400" /> Detection (baselines)
          </span>
          <span className="flex items-center gap-1.5 text-xs text-zinc-500 whitespace-nowrap">
            <span className="w-3 h-2.5 rounded bg-emerald-500" /> Detection (UE-Guard)
          </span>
        </div>
        <div className="space-y-0.5">
          {TIME_DATA.map((d) => (
            <StackedBarRow
              key={d.label}
              label={d.label}
              preprocess={d.preprocess}
              detection={d.detection}
              max={MAX_TOTAL_TIME}
              isHighlight={d.isHighlight}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-2">Memory (MB)</p>
        <div className="flex gap-4 mb-2">
          <span className="flex items-center gap-1.5 text-xs text-zinc-500">
            <span className="w-3 h-2.5 rounded bg-emerald-500" /> UE-Guard
          </span>
          <span className="flex items-center gap-1.5 text-xs text-zinc-500">
            <span className="w-3 h-2.5 rounded bg-zinc-400" /> Baselines
          </span>
        </div>
        <div className="space-y-0.5">
          {MEMORY_DATA.map((d) => (
            <BarRow
              key={d.label}
              label={d.label}
              value={d.value}
              max={MAX_MEMORY}
              unit=" MB"
              isHighlight={d.isHighlight}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
