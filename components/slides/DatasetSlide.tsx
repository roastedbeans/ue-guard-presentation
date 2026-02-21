import SectionHeader from "../SectionHeader";

export default function DatasetSlide({
  id,
  number,
  label,
  heading,
  time,
  columns,
  rows,
  pipeline,
}: {
  id: string;
  number: string;
  label: string;
  heading: string;
  time?: string;
  columns: { key: string; label: string }[];
  rows: Record<string, string | number>[];
  pipeline: string;
}) {
  return (
    <section id={id} style={{ scrollSnapAlign: "start" }}>
      <div
        className="flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-y-auto py-12"
        style={{ minHeight: "100vh", lineHeight: 1.6 }}
      >
        <SectionHeader number={number} label={label} heading={heading} time={time} />
        <div className="max-w-4xl">
          <table className="w-full text-base border-collapse mb-6">
            <thead>
              <tr className="border-b-2 border-zinc-300">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="text-left py-3.5 pr-6 text-zinc-600"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-zinc-200 text-zinc-700">
                  {columns.map((col) => (
                    <td key={col.key} className="py-2.5 pr-6">
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-base text-zinc-500">{pipeline}</p>
        </div>
      </div>
    </section>
  );
}
