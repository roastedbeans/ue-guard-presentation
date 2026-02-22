import SectionHeader from "../SectionHeader";

export default function ContentSlide({
  id,
  number,
  label,
  heading,
  children,
  wide,
}: {
  id: string;
  number: string;
  label: string;
  heading: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <section id={id} style={{ scrollSnapAlign: "start" }}>
      <div
        className="flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-y-auto"
        style={{ height: "100vh", lineHeight: 1.6 }}
      >
        <SectionHeader number={number} label={label} heading={heading} />
        <div
          className={`text-base text-zinc-700 [&_pre]:font-mono [&_pre]:text-base [&_pre]:bg-zinc-100 [&_pre]:p-4 [&_pre]:rounded [&_pre]:overflow-x-auto [&_pre]:text-zinc-800 ${
            wide ? "w-full max-w-none" : "max-w-3xl"
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
