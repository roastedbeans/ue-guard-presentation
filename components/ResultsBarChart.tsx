"use client";

const RESULTS_DATA = [
  { label: "UE-Guard", accuracy: 100, fpr: 0, isHighlight: true },
  { label: "LSTM", accuracy: 92.16, fpr: 14.29, isHighlight: false },
  { label: "GRU", accuracy: 88.24, fpr: 28.57, isHighlight: false },
  { label: "CNN", accuracy: 82.35, fpr: 42.86, isHighlight: false },
];

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
      <span className={`text-sm shrink-0 w-20 font-mono text-right ${isHighlight ? "text-emerald-700 font-semibold" : "text-zinc-600"}`}>
        {value.toFixed(2)}{unit}
      </span>
    </div>
  );
}

export default function ResultsBarChart() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-2">Accuracy (%)</p>
        <p className="text-xs text-zinc-500 mb-2">Higher is better</p>
        <div className="flex gap-4 mb-2">
          <span className="flex items-center gap-1.5 text-xs text-zinc-500">
            <span className="w-3 h-2.5 rounded bg-emerald-500" /> UE-Guard
          </span>
          <span className="flex items-center gap-1.5 text-xs text-zinc-500">
            <span className="w-3 h-2.5 rounded bg-zinc-400" /> Baselines
          </span>
        </div>
        <div className="space-y-0.5">
          {RESULTS_DATA.map((d) => (
            <BarRow
              key={`acc-${d.label}`}
              label={d.label}
              value={d.accuracy}
              max={100}
              unit="%"
              isHighlight={d.isHighlight}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-2">False Positive Rate (%)</p>
        <p className="text-xs text-zinc-500 mb-2">Lower is better — bar length = FPR</p>
        <div className="space-y-0.5">
          {RESULTS_DATA.map((d) => (
            <BarRow
              key={`fpr-${d.label}`}
              label={d.label}
              value={d.fpr}
              max={45}
              unit="%"
              isHighlight={d.isHighlight}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
