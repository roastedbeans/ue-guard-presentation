import SectionHeader from "../SectionHeader";

type Column = { key: string; label: string };

export default function TableSlide({
  id,
  number,
  label,
  heading,
  columns,
  rows,
  keyGap,
  visual,
}: {
  id: string;
  number: string;
  label: string;
  heading: string;
  columns: Column[];
  rows: Record<string, string | number>[];
  keyGap?: string;
  visual?: React.ReactNode;
}) {
  return (
    <section id={id} style={{ scrollSnapAlign: "start" }}>
      <div
        className="flex flex-col justify-center px-6 md:px-10 lg:px-16 overflow-y-auto"
        style={{ height: "100vh", lineHeight: 1.6 }}
      >
        <SectionHeader number={number} label={label} heading={heading} />
        <div className="flex gap-12 justify-between items-start w-full max-w-7xl">
          <div className="flex-1 min-w-0 shrink-0">
            <table className="w-full text-base border-collapse">
              <thead>
                <tr className="border-b-2 border-zinc-300">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="text-left py-3.5 pr-6 text-zinc-600 first:pr-6"
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-zinc-200 text-zinc-700 ${row.system === "UE-Guard" ? "bg-zinc-100" : ""
                      }`}
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="py-2.5 pr-6">
                        {row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {keyGap && (
              <p className="mt-6 text-base text-zinc-600 italic">{keyGap}</p>
            )}
          </div>
          {visual && <div className="min-w-lg w-fit">{visual}</div>}
        </div>
      </div>
    </section>
  );
}
