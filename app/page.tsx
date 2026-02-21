import PageWrapper from "@/components/PageWrapper";
import TitleSlide from "@/components/slides/TitleSlide";
import AgendaSlide from "@/components/slides/AgendaSlide";
import BulletSlide from "@/components/slides/BulletSlide";
import TableSlide from "@/components/slides/TableSlide";
import ContentSlide from "@/components/slides/ContentSlide";
import DatasetSlide from "@/components/slides/DatasetSlide";
import ProcessFlowAnimation from "@/components/ProcessFlowAnimation";
import AsymmetricAuthAnimation from "@/components/AsymmetricAuthAnimation";
import AttackFlowSequence from "@/components/AttackFlowSequence";
import Layer2StateAnimation from "@/components/Layer2StateAnimation";
import DecisionProcessAnimation from "@/components/DecisionProcessAnimation";
import PerformanceBarChart from "@/components/PerformanceBarChart";
import ResultsBarChart from "@/components/ResultsBarChart";
import { SLIDES } from "@/lib/slides";
import { emphasize } from "@/lib/emphasize";

export default function PresentationPage() {
  return (
    <PageWrapper>
      <main
        id="scroll-container"
        className="flex-1 overflow-y-auto"
        style={{ scrollSnapType: "y mandatory" }}
      >
        <TitleSlide
          heading={SLIDES[0].heading}
          subtitle={(SLIDES[0] as (typeof SLIDES)[0] & { subtitle: string }).subtitle}
          authors={(SLIDES[0] as (typeof SLIDES)[0] & { authors: string }).authors}
          venue={(SLIDES[0] as (typeof SLIDES)[0] & { venue: string }).venue}
        />

        <AgendaSlide
          id={(SLIDES[1] as { id: string }).id}
          number={SLIDES[1].number}
          label={SLIDES[1].label}
          time={SLIDES[1].time}
          items={(SLIDES[1] as { items: string[] }).items}
        />

        <BulletSlide
          id={SLIDES[2].id}
          number={SLIDES[2].number}
          label={SLIDES[2].label}
          heading={SLIDES[2].heading}
          time={SLIDES[2].time}
          bullets={(SLIDES[2] as { bullets: { main: string; sub: string[] }[] }).bullets}
          visual={<AsymmetricAuthAnimation />}
          emphasizeKeywords={["4G LTE", "5G", "asymmetric authentication", "UE", "False Base Station", "FBS", "IMSI catching", "security downgrade", "illegitimate signaling"]}
        />

        <TableSlide
          id={SLIDES[3].id}
          number={SLIDES[3].number}
          label={SLIDES[3].label}
          heading={SLIDES[3].heading}
          time={SLIDES[3].time}
          columns={[
            { key: "category", label: "Attack Category" },
            { key: "example", label: "Example" },
            { key: "phase", label: "Phase" },
          ]}
          rows={(SLIDES[3] as { table: { category: string; example: string; phase: string }[] }).table}
          visual={<AttackFlowSequence />}
        />

        <TableSlide
          id={SLIDES[4].id}
          number={SLIDES[4].number}
          label={SLIDES[4].label}
          heading={SLIDES[4].heading}
          time={SLIDES[4].time}
          columns={[
            { key: "approach", label: "Approach" },
            { key: "limitation", label: "Limitation" },
          ]}
          rows={(SLIDES[4] as { table: { approach: string; limitation: string }[] }).table}
          keyGap={(SLIDES[4] as { keyGap: string }).keyGap}
        />

        <ContentSlide
          id={SLIDES[5].id}
          number={SLIDES[5].number}
          label={SLIDES[5].label}
          heading={SLIDES[5].heading}
          time={SLIDES[5].time}
          wide
        >
          <div className="flex gap-10 items-stretch w-full">
            <div className="w-xl shrink-0 flex flex-col gap-5 border-r border-zinc-200 pr-8">
              <div>
                <h3 className="text-amber-600 text-base mb-2">Design phase</h3>
                <p className="text-base text-zinc-700">
                  {emphasize((SLIDES[5] as { designPhase: string }).designPhase, ["3GPP", "UPPAAL", "empirically calibrated"])}
                </p>
              </div>
              <div className="h-px bg-zinc-200" />
              <div>
                <h3 className="text-blue-600 text-base mb-2">Runtime phase</h3>
                <p className="text-base text-zinc-700">
                  {emphasize((SLIDES[5] as { runtimePhase: string }).runtimePhase, ["RRC/NAS", "three layers", "compliance decision"])}
                </p>
              </div>
              <div className="h-px bg-zinc-200" />
              <div>
                <h3 className="text-zinc-600 text-base mb-2">Layer definitions</h3>
                <ul className="space-y-1.5 text-base text-zinc-700">
                  <li>• {emphasize((SLIDES[5] as { layer1: string }).layer1, ["Deterministic", "protocol violations", "BR-1–14"])}</li>
                  <li>• {emphasize((SLIDES[5] as { layer2: string }).layer2, ["Probabilistic", "anomalous transitions", "field values"])}</li>
                  <li>• {emphasize((SLIDES[5] as { layer3: string }).layer3, ["Adaptive threshold", "attack/normal"])}</li>
                </ul>
              </div>
            </div>
            <div className="flex-1 min-w-0 max-w-3xl">
              <ProcessFlowAnimation />
            </div>
          </div>
        </ContentSlide>

        <ContentSlide
          id={SLIDES[6].id}
          number={SLIDES[6].number}
          label={SLIDES[6].label}
          heading={SLIDES[6].heading}
          time={SLIDES[6].time}
        >
          <p className="text-zinc-600 text-base mb-4">
            {emphasize((SLIDES[6] as { source: string }).source, ["3GPP", "TS 24.301", "TS 36.331", "TS 38.331"])}
          </p>
          <ol className="space-y-1 mb-4">
            {((SLIDES[6] as { rules: string[] }).rules).map((r, i) => (
              <li key={i}>{i + 1}. {emphasize(r, ["shall not", "shall", "BR-1–14"])}</li>
            ))}
          </ol>
          <p className="text-zinc-600 text-base">
            {emphasize((SLIDES[6] as { output: string }).output, ["14 Behavior Rules", "BR-1–7", "BR-8–14", "RRC", "NAS"])}
          </p>
        </ContentSlide>

        <ContentSlide
          id={SLIDES[7].id}
          number={SLIDES[7].number}
          label={SLIDES[7].label}
          heading={SLIDES[7].heading}
          time={SLIDES[7].time}
          wide
        >
          <div className="max-w-4xl">
            <div className="flex gap-8">
              <div className="flex-1 min-w-0">
                <h3 className="text-zinc-800 text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="font-mono">RRC</span>
                  <span className="text-zinc-600 font-normal">BR-1 to BR-7</span>
                </h3>
                <ul className="space-y-3">
                  {((SLIDES[7] as { rrcRules: { id: string; desc: string }[] }).rrcRules).map((r) => (
                    <li key={r.id} className="flex gap-3 items-center">
                      <span className="shrink-0 font-mono font-semibold text-zinc-800 px-2 py-0.5 text-base">
                        {r.id}
                      </span>
                      <span className="text-zinc-700 text-base">{r.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-px shrink-0 bg-zinc-200" aria-hidden />
              <div className="flex-1 min-w-0">
                <h3 className="text-zinc-800 text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="font-mono">NAS</span>
                  <span className="text-zinc-600 font-normal">BR-8 to BR-14</span>
                </h3>
                <ul className="space-y-3">
                  {((SLIDES[7] as { nasRules: { id: string; desc: string }[] }).nasRules).map((r) => (
                    <li key={r.id} className="flex gap-3 items-center">
                      <span className="shrink-0 font-mono font-semibold text-zinc-800 px-2 py-0.5 text-base">
                        {r.id}
                      </span>
                      <span className="text-zinc-700 text-base">{r.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ContentSlide>

        <ContentSlide
          id={SLIDES[8].id}
          number={SLIDES[8].number}
          label={SLIDES[8].label}
          heading={SLIDES[8].heading}
          time={SLIDES[8].time}
        >
          <p className="text-zinc-700 max-w-2xl">
            {emphasize((SLIDES[8] as { methodology: string }).methodology, ["Layer 1", "timed automata", "UPPAAL", "Layers 2 and 3"])}
          </p>
        </ContentSlide>

        <ContentSlide
          id={SLIDES[9].id}
          number={SLIDES[9].number}
          label={SLIDES[9].label}
          heading={SLIDES[9].heading}
          time={SLIDES[9].time}
          wide
        >
          <div className="max-w-6xl flex gap-6 items-start flex-wrap">
            <figure className="shrink-0 max-w-[420px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/uppaal/detection_agent.png"
                alt="UPPAAL Detection_Agent template"
                className="w-full rounded border border-zinc-200"
              />
              <figcaption className="text-xs text-zinc-500 mt-2 text-center">
                Fig. 1. UPPAAL Detection_Agent timed automaton.
              </figcaption>
            </figure>
            <div className="flex-1 min-w-0 max-w-6xl">
              <p className="text-xs font-semibold text-zinc-600 mb-2 uppercase tracking-wider">
                Pseudocode (document/spec_verification.xml)
              </p>
              <pre className="text-xs font-mono text-zinc-700 bg-zinc-100 p-4 rounded border border-zinc-200 w-4xl min-h-[28rem] max-h-[41rem] overflow-auto">
{`// GOAL: Detect FBS violations; set ASI bit i when BR-(i+1) violated

// RRC rules (BR-1 to BR-7)
checkBR01: if msg == RRC_REESTABLISH || RRC_RECONFIG
           && rrc_reestablish_count > THRESH → abnormal

checkBR02: if msg == RRC_SIB
           && (MCC|MNC|TAC) changed without handover → abnormal

checkBR03: if msg == RRC_PAGING
           && (identity == IMSI || paging_count > THRESH) → abnormal

checkBR04: if msg == RRC_CONNECTION_REQUEST
           && cell_barred → abnormal

checkBR05: if msg in {RRC_CONNECTION_REQUEST, RRC_REJECT}
           && rate > THRESH → abnormal

checkBR06: if msg in {RRC_RELEASE, RRC_REJECT}
           && (rate > THRESH || wait_time > 16) → abnormal

checkBR07: if msg == SECURITY_MODE_CMD
           && (enc_alg == NULL || int_alg == NULL) → abnormal

// NAS rules (BR-8 to BR-14)
checkBR08: if msg in {ATTACH_REJECT, REG_REJECT}
           && (no prior request || attach_count > THRESH) → abnormal

checkBR09: if msg in {AUTH_FAILURE, AUTH_REJECT}
           → abnormal

checkBR10: if msg == IDENTITY_REQUEST
           && !auth_completed && (IMSI | IMEI) → abnormal

checkBR11: if security_active
           && plaintext NAS (not in exemption list) → abnormal

checkBR12: if msg in {TAU_REJECT, SERVICE_REJECT}
           || tau_service_count > THRESH → abnormal

checkBR13: if msg is REJECT
           && persistent_cause && !integrity_protected → abnormal

checkBR14: if msg == DETACH_REQUEST (downlink)
           && !integrity_protected → abnormal`}
              </pre>
            </div>
          </div>
        </ContentSlide>

        <ContentSlide
          id={SLIDES[10].id}
          number={SLIDES[10].number}
          label={SLIDES[10].label}
          heading={SLIDES[10].heading}
          time={SLIDES[10].time}
          wide
        >
          <div className="max-w-6xl flex gap-6 items-start flex-wrap">
            <figure className="shrink-0 max-w-[420px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/uppaal/checker.png"
                alt="UPPAAL Checker template"
                className="w-full rounded border border-zinc-200"
              />
              <figcaption className="text-xs text-zinc-500 mt-2 text-center">
                Fig. 2. UPPAAL Checker parameterized template.
              </figcaption>
            </figure>
            <div className="flex-1 min-w-0 max-w-5xl">
              <p className="text-xs font-semibold text-zinc-600 mb-2 uppercase tracking-wider">
                Pseudocode (document/spec_verification.xml)
              </p>
              <pre className="text-xs font-mono text-zinc-700 bg-zinc-100 p-4 rounded border border-zinc-200 w-4xl min-h-[28rem] max-h-[41rem] overflow-auto">
{`// GOAL: Verify that when a BR violation occurs, Detection_Agent correctly
//       sets the corresponding ASI bit. No_error = correct; Error = missed.

// Parameterized template: one checker per BR
Checker(id, mask)   // mask = 2^id  (e.g. BR-1: mask=1, BR-10: mask=512)

  init: Error       // Assume Detection_Agent might miss violations

// Transition 1: Correct detection
  if (ASI & mask) == mask
     → Error → No_error   // Attack present, ASI bit set ✓

// Transition 2: Missed or wrong detection (self-loop)
  if (ASI & mask) != mask
     → Error → Error     // Bit not set (or wrong) → verification fails

// 14 checkers: checker0..checker13 for BR-1..BR-14
// Reachability of No_error proves: every attack is detectable`}
              </pre>
            </div>
          </div>
        </ContentSlide>

        <ContentSlide
          id={SLIDES[11].id}
          number={SLIDES[11].number}
          label={SLIDES[11].label}
          heading={SLIDES[11].heading}
          time={SLIDES[11].time}
        >
          <table className="w-full text-base border-collapse max-w-xl mb-4">
            <thead>
              <tr className="border-b-2 border-zinc-300">
                <th className="text-left py-2.5 text-zinc-700 font-semibold">Property</th>
                <th className="text-left py-2.5 text-zinc-700 font-semibold">Query</th>
                <th className="text-left py-2.5 text-zinc-700 font-semibold">Count</th>
                <th className="text-left py-2.5 text-zinc-700 font-semibold">Result</th>
              </tr>
            </thead>
            <tbody>
              {((SLIDES[11] as { results: { property: string; query: string; count: number; result: string }[] }).results).map((r, i) => (
                <tr key={i} className="border-b border-zinc-200">
                  <td className="py-2">{r.property}</td>
                  <td className="py-2 font-mono text-sm">{r.query}</td>
                  <td className="py-2">{r.count}</td>
                  <td className="py-2 font-semibold text-zinc-800">{r.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-zinc-800 font-semibold">
            {emphasize((SLIDES[11] as { total: string }).total, ["29/29"])}
          </p>
        </ContentSlide>

        <ContentSlide
          id={SLIDES[12].id}
          number={SLIDES[12].number}
          label={SLIDES[12].label}
          heading={SLIDES[12].heading}
          time={SLIDES[12].time}
          wide
        >
          <div className="flex gap-8 items-start">
            <div className="flex-1 min-w-0 max-w-2xl pr-4 space-y-5">
              <p className="text-base leading-relaxed text-zinc-700">
                {emphasize((SLIDES[12] as { goal: string }).goal, ["normal traffic", "rarity", "common", "rare"])}
              </p>
              <ol className="space-y-4 list-none pl-0">
                {((SLIDES[12] as { steps: { step: number; title: string; desc: string; stateExamples?: { network: string; protocolDirection: string; messageType: string }[] }[] }).steps).map((s) => (
                  <li key={s.step} className="flex gap-3">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-zinc-200 text-zinc-700 text-sm font-semibold flex items-center justify-center">
                      {s.step}
                    </span>
                    <div className="min-w-0">
                      <span className="font-semibold text-zinc-800 block mb-0.5 text-base">{s.title}</span>
                      <span className="text-zinc-600 text-base leading-relaxed">
                        {s.step === 1
                          ? emphasize(s.desc, ["network", "protocol", "message type"])
                          : s.step === 2
                            ? emphasize(s.desc, ["normal traffic", "transition", "probability"])
                            : s.step === 3
                              ? emphasize(s.desc, ["transition probability", "rarer", "anomaly scores"])
                              : s.desc}
                      </span>
                      {"stateExamples" in s && s.stateExamples && (
                        <table className="mt-2 w-full text-base border-collapse border border-zinc-200 rounded overflow-hidden max-w-md">
                          <thead>
                            <tr className="bg-zinc-100">
                              <th className="text-left py-1.5 px-2 text-zinc-600 font-medium">Network</th>
                              <th className="text-left py-1.5 px-2 text-zinc-600 font-medium">Protocol + direction</th>
                              <th className="text-left py-1.5 px-2 text-zinc-600 font-medium">Message type</th>
                            </tr>
                          </thead>
                          <tbody>
                            {s.stateExamples.map((ex, i) => (
                              <tr key={i} className="border-t border-zinc-200">
                                <td className="py-1.5 px-2 text-zinc-700">{ex.network}</td>
                                <td className="py-1.5 px-2 text-zinc-700">{ex.protocolDirection}</td>
                                <td className="py-1.5 px-2 text-zinc-700">{ex.messageType}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-100/80 px-4 py-3">
                <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-1.5">
                  Training result
                </p>
                <p className="text-base font-semibold text-zinc-800 tracking-tight">
                  {(SLIDES[12] as { trainingResult: string }).trainingResult}
                </p>
              </div>
            </div>
            <div className="shrink-0 min-w-[22rem] max-w-2xl">
              <Layer2StateAnimation />
            </div>
          </div>
        </ContentSlide>

        <ContentSlide
          id={SLIDES[13].id}
          number={SLIDES[13].number}
          label={SLIDES[13].label}
          heading={SLIDES[13].heading}
          time={SLIDES[13].time}
          wide
        >
          <div className="flex gap-8 items-start w-full">
            <div className="flex-1 min-w-0 max-w-2xl">
              <p className="mb-3 text-zinc-600 text-base leading-relaxed">
                {emphasize((SLIDES[13] as { intro: string }).intro, ["surprising", "rare", "lower probability", "self-information", "surprisal"])}
              </p>
              <div className="mb-4">
                <p className="font-mono text-zinc-800 text-lg font-semibold">{emphasize((SLIDES[13] as { formula: string }).formula, ["max_surprise", "-log₂(P)"])}</p>
                {"formulaNote" in SLIDES[13] && (SLIDES[13] as { formulaNote?: string }).formulaNote && (
                  <p className="mt-1 text-base text-zinc-600">{emphasize((SLIDES[13] as { formulaNote: string }).formulaNote, ["max_surprise"])}</p>
                )}
              </div>
              <table className="w-full text-base border-collapse mb-4 max-w-xl">
                <thead>
                  <tr className="border-b border-zinc-300">
                    <th className="text-left py-2 text-zinc-600">Scenario</th>
                    <th className="text-left py-2 text-zinc-600">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {((SLIDES[13] as { scoreTable: { scenario: string; score: string }[] }).scoreTable).map((r, i) => (
                    <tr key={i} className="border-b border-zinc-200">
                      <td className="py-2">{r.scenario}</td>
                      <td className="py-2 font-mono">{r.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-zinc-600 text-base leading-relaxed">
                {emphasize((SLIDES[13] as { combined: string }).combined, ["0.7", "0.3", "Behavioral patterns"])}
              </p>
            </div>
            {"rarityTable" in SLIDES[13] && (SLIDES[13] as { rarityTable?: { type: string; weight: string; desc: string; example: string }[] }).rarityTable && (
              <div className="shrink-0 w-2xl border-l border-zinc-200 pl-8">
                <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-3">Rarity components</p>
                <table className="w-full text-base border-collapse border border-zinc-200 rounded overflow-hidden">
                  <thead>
                    <tr className="bg-zinc-100">
                      <th className="text-left py-2 px-3 text-zinc-600 font-medium text-base">Component</th>
                      <th className="text-left py-2 px-3 text-zinc-600 font-medium w-16 text-base">Weight</th>
                      <th className="text-left py-2 px-3 text-zinc-600 font-medium text-base">Description</th>
                      <th className="text-left py-2 px-3 text-zinc-600 font-medium text-base">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {((SLIDES[13] as { rarityTable: { type: string; weight: string; desc: string; example: string | string[] }[] }).rarityTable).map((r, i) => (
                      <tr key={i} className="border-t border-zinc-200">
                        <td className="py-2 px-3 font-semibold text-zinc-800 text-base">{r.type}</td>
                        <td className="py-2 px-3 text-zinc-700 font-mono text-base">{r.weight}</td>
                        <td className="py-2 px-3 text-zinc-600 text-sm leading-relaxed">{r.desc}</td>
                        <td className="py-2 px-3 text-zinc-500 text-sm font-mono leading-relaxed">
                          {Array.isArray(r.example) ? (
                            <ul className="list-disc list-inside pl-0 space-y-0.5 m-0">
                              {r.example.map((item, j) => (
                                <li key={j}>{item}</li>
                              ))}
                            </ul>
                          ) : (
                            r.example
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </ContentSlide>

        <ContentSlide
          id={SLIDES[14].id}
          number={SLIDES[14].number}
          label={SLIDES[14].label}
          heading={SLIDES[14].heading}
          time={SLIDES[14].time}
          wide
        >
          <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl items-start">
            <div className="flex-1 min-w-0 max-w-2xl shrink-0">
              <p className="mb-4 text-base leading-relaxed text-zinc-600">
                {emphasize((SLIDES[14] as { purpose: string }).purpose, ["optimal anomaly threshold", "labeled data", "adaptive", "stability"])}
              </p>
              <div className="mb-6 rounded-lg border border-zinc-200 bg-zinc-100/80 px-4 py-3 max-w-lg">
                <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-1">Learned threshold</p>
                <p className="text-lg font-semibold text-zinc-800">
                  θ_anomaly = {(SLIDES[14] as { threshold: string }).threshold}
                </p>
              </div>
              <p className="text-sm font-medium text-zinc-600 mb-2">Decision logic</p>
              <pre className="text-base font-mono bg-zinc-100 border border-zinc-200 rounded-lg p-4 overflow-x-auto w-lg">
{((SLIDES[14] as { decision: string[] }).decision || []).join("\n")}
              </pre>
            </div>
            <div className="w-full lg:min-w-[22rem] lg:w-[26rem] xl:w-[30rem] shrink-0">
              <DecisionProcessAnimation />
            </div>
          </div>
        </ContentSlide>

        <DatasetSlide
          id={SLIDES[15].id}
          number={SLIDES[15].number}
          label={SLIDES[15].label}
          heading={SLIDES[15].heading}
          time={SLIDES[15].time}
          columns={[
            { key: "category", label: "Category" },
            { key: "samples", label: "Samples" },
            { key: "examples", label: "Examples" },
          ]}
          rows={(SLIDES[15] as { table: { category: string; samples: number; examples: string }[] }).table}
          pipeline={(SLIDES[15] as { pipeline: string }).pipeline}
        />

        <TableSlide
          id={SLIDES[16].id}
          number={SLIDES[16].number}
          label={SLIDES[16].label}
          heading={SLIDES[16].heading}
          time={SLIDES[16].time}
          columns={[
            { key: "system", label: "System" },
            { key: "accuracy", label: "Accuracy" },
            { key: "tp", label: "TP" },
            { key: "tn", label: "TN" },
            { key: "fp", label: "FP" },
            { key: "fn", label: "FN" },
            { key: "tpr", label: "TPR" },
            { key: "tnr", label: "TNR" },
            { key: "fpr", label: "FPR" },
          ]}
          rows={(SLIDES[16] as { resultsTable: Record<string, string | number>[] }).resultsTable}
          keyGap={(SLIDES[16] as { separation: string }).separation}
          visual={<ResultsBarChart />}
        />

        <ContentSlide
          id={SLIDES[17].id}
          number={SLIDES[17].number}
          label={SLIDES[17].label}
          heading={SLIDES[17].heading}
          time={SLIDES[17].time}
          wide
        >
          <div className="flex flex-col lg:flex-row gap-8 items-start w-full max-w-6xl">
            <div className="w-full max-w-2xl shrink-0">
              <table className="w-full text-base border-collapse">
                <thead>
                  <tr className="border-b border-zinc-300">
                    <th className="text-left py-2 pr-2 text-zinc-600 text-base">Approach</th>
                    <th className="text-right py-2 pr-2 text-zinc-600 text-base">Preprocess (ms)</th>
                    <th className="text-right py-2 pr-2 text-zinc-600 text-base">Detection (ms)</th>
                    <th className="text-right py-2 pr-2 text-zinc-600 text-base">Total (ms)</th>
                    <th className="text-right py-2 text-zinc-600 text-base">Memory (MB)</th>
                  </tr>
                </thead>
                <tbody>
                  {((SLIDES[17] as { performanceTable: Record<string, string | number>[] }).performanceTable).map((row, i) => (
                    <tr
                      key={i}
                      className={`border-b border-zinc-200 text-zinc-700 ${row.system === "UE-Guard" ? "bg-zinc-100" : ""}`}
                    >
                      <td className="py-1.5 pr-2 text-sm">{row.approach}</td>
                      <td className="py-1.5 pr-2 text-right font-mono text-sm">{row.preprocess}</td>
                      <td className="py-1.5 pr-2 text-right font-mono text-sm">{row.detection}</td>
                      <td className="py-1.5 pr-2 text-right font-mono text-sm">{row.total}</td>
                      <td className="py-1.5 text-right font-mono text-sm">{row.memory}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul className="mt-4 grid grid-cols-1 gap-y-1.5">
                {((SLIDES[17] as { noteBullets: { label: string; value: string }[] }).noteBullets).map((b, i) => (
                  <li key={i} className="flex gap-2 text-sm text-zinc-600">
                    <span className="font-medium text-zinc-700 shrink-0">{b.label}:</span>
                    <span>{b.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 min-w-0 w-full max-w-xl">
              <PerformanceBarChart />
            </div>
          </div>
        </ContentSlide>

        <TableSlide
          id={SLIDES[18].id}
          number={SLIDES[18].number}
          label={SLIDES[18].label}
          heading={SLIDES[18].heading}
          time={SLIDES[18].time}
          columns={[
            { key: "dim", label: "Dimension" },
            { key: "l1", label: "Layer 1 (Spec-Based)" },
            { key: "l2", label: "Layer 2 (Probabilistic)" },
          ]}
          rows={(SLIDES[18] as { table: { dim: string; l1: string; l2: string }[] }).table}
          keyGap={(SLIDES[18] as { together: string }).together}
        />

        <ContentSlide
          id={SLIDES[19].id}
          number={SLIDES[19].number}
          label={SLIDES[19].label}
          heading={SLIDES[19].heading}
          time={SLIDES[19].time}
          wide
        >
          <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
            <div className="flex-1 min-w-0">
              <h3 className="text-zinc-700 text-lg font-semibold mb-3">Key Contributions</h3>
              <ol className="space-y-2 text-zinc-700 text-base leading-relaxed">
                {((SLIDES[19] as { contributions: string[] }).contributions).map((c, i) => (
                  <li key={i}>
                    {i + 1}. {emphasize(c, i === 1 ? ["Layer 1"] : i === 2 ? ["Layer 2"] : i === 3 ? ["Layer 3"] : ["4G/5G", "IoT", "IoMT", "14", "BR-1–14", "UPPAAL", "29/29", "100%", "19.10 ms", "0.22 MB", "45.8×", "394×", "3GPP"])}
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-zinc-700 text-lg font-semibold mb-3">Future Work</h3>
              <div className="space-y-4">
                {((SLIDES[19] as { future: { area: string; items: string[] }[] }).future).map((f, i) => (
                  <div key={i}>
                    <p className="text-base font-medium text-zinc-700 mb-1.5">{emphasize(f.area, ["Deployment", "Dataset", "Layer 2"])}</p>
                    <ul className="space-y-1 text-base text-zinc-600">
                      {f.items.map((item, j) => (
                        <li key={j}>• {emphasize(item, ["Qualcomm QXDM", "IoT", "IoMT", "evasion", "signature reshaping", "Online adaptation", "Cross-layer", "physical layer"])}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ContentSlide>
      </main>
    </PageWrapper>
  );
}
