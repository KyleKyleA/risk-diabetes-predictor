// Author: Kyle Angeles
// File-Name: DashBoard.jsx
// Description: This component handles the dashboard which will should different parts of Analytics where the user can 
// see real time updates.

import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  ExternalLink,
  HeartPulse,
  Info,
  ShieldCheck,
  Sparkles,
  TrendingDown,
} from "lucide-react";

// This component will be handled by the machine learning model
const riskFactors = [
  {
    name: "A1C result",
    value: 14,
    display: "+14 pts",
    direction: "up",
    description: "Your average blood sugar over the past 2–3 months.",
    context: "Your result is 5.8%, just above the usual healthy range.",
  },
  {
    name: "Activity pattern",
    value: -9,
    display: "−9 pts",
    direction: "down",
    description: "How often you move throughout a typical week.",
    context: "Your recent movement is helping lower your estimated risk.",
  },
  {
    name: "Family history",
    value: 8,
    display: "+8 pts",
    direction: "up",
    description: "Whether a close family member has had type 2 diabetes.",
    context:
      "A parent or sibling with type 2 diabetes adds some background risk.",
  },
  {
    name: "Age",
    value: 6,
    display: "+6 pts",
    direction: "up",
    description: "Age is one of several signals used in the estimate.",
    context: "Risk tends to change gradually with age, not all at once.",
  },
  {
    name: "Sleep consistency",
    value: -4,
    display: "−4 pts",
    direction: "down",
    description: "How regular your sleep schedule has been recently.",
    context:
      "More consistent sleep is a small, positive signal in your profile.",
  },
];
const trendValues = [
  31, 31, 30, 30, 29, 30, 29, 28, 29, 28, 28, 27, 28, 27, 27, 28, 27, 26,
  27, 26, 27, 26, 25, 26, 27, 26, 27, 26, 27, 28,
];
const trendLabels = ["May 08", "May 15", "May 22", "May 29", "Jun 06"];
const iconTileClass =
  "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#eef0ff] text-[#5966cf]";
function SectionHeader({ eyebrow, title, description, icon }) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className={iconTileClass} aria-hidden="true">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="m-0 text-[0.68rem] font-extrabold uppercase tracking-[0.15em] leading-tight text-[#6a74bf]">
          {eyebrow}
        </p>
        <h2 className="m-0 mt-1 text-[1.06rem] font-extrabold tracking-[-0.035em] text-[#2f3654]">
          {title}
        </h2>
        <p className="m-0 mt-1 max-w-[35rem] text-[0.72rem] leading-relaxed text-[#798198]">
          {description}
        </p>
      </div>
    </div>
  );
}
function FactorChart({ detailed }) {
  return (
    <div>
      <div
        className="mt-[1.15rem] grid grid-cols-[minmax(0,1fr)_2.75rem_minmax(0,1fr)] text-[0.62rem] font-extrabold uppercase tracking-[0.11em] text-[#8990a5]"
        aria-hidden="true"
      >
        <span className="pr-3 text-right">Lowers risk</span>
        <span className="text-center">0</span>
        <span className="pl-3">Raises risk</span>
      </div>
      <div
        className="mt-3 grid gap-4"
        aria-label="Top five factors that shaped the risk score"
      >
        {riskFactors.map((factor, index) => {
          const barWidth = `${Math.round(
            (Math.abs(factor.value) / 16) * 100,
          )}%`;
          const isProtective = factor.direction === "down";
          return (
            <div
              className="min-w-0"
              key={factor.name}
              data-testid={`factor-row-${index}`}
            >
              <div className="mb-1 flex items-baseline justify-between gap-3">
                <div className="min-w-0">
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[0.78rem] font-extrabold text-[#29304c]">
                    {factor.name}
                  </div>
                  {detailed && (
                    <p className="m-0 mt-1 text-[0.68rem] leading-relaxed text-[#858ca2]">
                      {factor.description}
                    </p>
                  )}
                </div>
                <span
                  className={`shrink-0 text-[0.72rem] font-extrabold ${
                    factor.direction === "up"
                      ? "text-[#b35e55]"
                      : "text-[#27836e]"
                  }`}
                >
                  {factor.display}
                </span>
              </div>
              <div
                className="grid grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] items-center"
                role="img"
                aria-label={`${factor.name}: ${factor.display}`}
              >
                <div className="flex h-3 justify-end">
                  {isProtective && (
                    <div
                      className="h-full rounded-l-full bg-[#59b7a1] transition-[width] duration-300"
                      style={{ width: barWidth }}
                    />
                  )}
                </div>
                <div className="h-5 bg-[#b5bdd1]" />
                <div className="flex h-3">
                  {!isProtective && (
                    <div
                      className="h-full rounded-r-full bg-[#e49b8e] transition-[width] duration-300"
                      style={{ width: barWidth }}
                    />
                  )}
                </div>
              </div>
              {detailed && (
                <p className="m-0 mt-2 rounded-lg bg-[#fafbfe] px-3 py-2 text-[0.68rem] leading-relaxed text-[#6e7690]">
                  {factor.context}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 border-t border-[#eef0f6] pt-4 text-[0.68rem] font-semibold text-[#727b94]">
        <span className="inline-flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full bg-[#59b7a1]"
            aria-hidden="true"
          />
          Helps lower your score
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full bg-[#e49b8e]"
            aria-hidden="true"
          />
          Adds to your score
        </span>
      </div>
    </div>
  );
}
function TrendChart() {
  const points = useMemo(() => {
    const left = 18;
    const right = 382;
    const top = 16;
    const bottom = 116;
    const min = 23;
    const max = 32;
    return trendValues.map((value, index) => ({
      x: left + (index / (trendValues.length - 1)) * (right - left),
      y: top + ((max - value) / (max - min)) * (bottom - top),
    }));
  }, []);
  const pointString = points
    .map((point) => `${point.x},${point.y}`)
    .join(" ");
  const areaString = `${points[0].x},128 ${pointString} ${
    points[points.length - 1].x
  },128`;
  return (
    <div className="mt-5">
      <figure className="m-0 h-[13.25rem]" data-testid="chart-risk-trend">
        <svg
          className="block h-[10.4rem] w-full overflow-visible"
          viewBox="0 0 400 132"
          role="img"
          aria-label="Risk score moved from 31 to 28 over the last 30 days"
        >
          <defs>
            <linearGradient id="trendArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#7180e7" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#eef0ff" stopOpacity="0.06" />
            </linearGradient>
          </defs>
          {[16, 49, 82, 116].map((y) => (
            <line
              key={y}
              x1="18"
              x2="382"
              y1={y}
              y2={y}
              stroke="#e4e8f3"
              strokeDasharray="3 4"
            />
          ))}
          <polygon points={areaString} fill="url(#trendArea)" />
          <polyline
            points={pointString}
            fill="none"
            stroke="#5363d8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
          {[0, 7, 14, 21, 29].map((index) => (
            <circle
              key={index}
              cx={points[index].x}
              cy={points[index].y}
              r={index === 29 ? 4.5 : 2.5}
              fill={index === 29 ? "#fff" : "#5363d8"}
              stroke="#5363d8"
              strokeWidth={index === 29 ? 3 : 0}
            />
          ))}
          <g fill="#7c849d" fontSize="10" fontWeight="600">
            <text x="0" y="20">
              32
            </text>
            <text x="0" y="53">
              29
            </text>
            <text x="0" y="86">
              26
            </text>
            <text x="0" y="120">
              23
            </text>
          </g>
        </svg>
        <div className="mt-1 flex justify-between text-[0.65rem] font-semibold text-[#8990a5]">
          {trendLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </figure>
      <div className="mt-2 flex items-center justify-between gap-3 rounded-xl bg-[#f3f5ff] px-3 py-2.5 text-[0.68rem] font-extrabold text-[#4c58b9]">
        <span className="inline-flex items-center gap-2">
          <TrendingDown size={14} aria-hidden="true" />
          3 points lower than 30 days ago
        </span>
        <span className="font-semibold text-[#7b849c]">Low range</span>
      </div>
    </div>
  );
}
export default function DiabetesDashboard() {
  const [viewMode, setViewMode] = useState("summary");
  const [showMethod, setShowMethod] = useState(false);
  const [shared, setShared] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  async function shareSummary() {
    const summary =
      "Kyle's Diabetes Risk Predictor Dashboard: current estimate 28 out of 100, in the lower range.";
    try {
      await navigator.clipboard?.writeText(summary);
    } catch {
      // Clipboard permissions vary by browser.
    }
    setShared(true);
  }
  function prepareSummary() {
    const summary = [
      "Kyle's Diabetes Risk Predictor Dashboard",
      "Current risk estimate: 28 out of 100 (lower range)",
      "30-day trend: 3 points lower",
      "Helpful signals: activity pattern, sleep consistency",
      "Worth discussing: A1C result (5.8%)",
      "Educational estimate, not a diagnosis or medical advice.",
    ].join("\n");
    const url = URL.createObjectURL(
      new Blob([summary], {
        type: "text/plain;charset=utf-8",
      }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "clarity-health-summary.txt";
    link.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  }
  return (
    <main className="min-h-dvh bg-[radial-gradient(circle_at_87%_0%,rgb(231_235_255_/_55%),transparent_30rem),linear-gradient(180deg,#fafbff_0%,#f7f9fd_100%)] font-sans text-[#2d3450]">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-[1180px] py-5 sm:py-6">
        <header className="flex flex-col items-start justify-between gap-4 border-b border-[#e3e7f2] pb-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div
              className="relative grid h-11 w-11 place-items-center rounded-[0.95rem] bg-[#5968d7] text-white shadow-[0_9px_18px_rgb(89_104_215_/_18%)]"
              aria-hidden="true"
            >
              <HeartPulse size={22} strokeWidth={2.1} />
              <span className="absolute -bottom-[0.18rem] -right-[0.22rem] h-3 w-3 rounded-full border-2 border-[#fafbff] bg-[#59b7a1]" />
            </div>
            <div>
              <p className="m-0 text-[0.68rem] font-extrabold uppercase tracking-[0.15em] text-[#6a74bf]">
                Here to help you understand your risk
              </p>
              <p className="m-0 mt-1 text-[0.84rem] font-bold text-[#3a415d]">
                Educational estimate, not a diagnosis or medical advice
              </p>
            </div>
          </div>
          <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
            <div className="flex items-center gap-2 text-[0.7rem] font-medium text-[#81899e]">
              <Clock3 size={14} aria-hidden="true" />
              <span>Updated today, 9:42 AM</span>
            </div>
            <button
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#dfe3f0] bg-white/75 px-3.5 py-2.5 text-[0.72rem] font-bold text-[#5662be] transition hover:border-[#bfc6eb] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5968d7]"
              type="button"
              onClick={shareSummary}
            >
              {shared ? (
                <Check size={15} aria-hidden="true" />
              ) : (
                <ExternalLink size={15} aria-hidden="true" />
              )}
              {shared ? "Link copied" : "Share summary"}
            </button>
          </div>
        </header>
        <section
          className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]"
          aria-label="Current risk overview"
        >
          <div className="relative overflow-hidden rounded-3xl border border-[#dde2f4] bg-[#eef0ff] shadow-[0_16px_36px_rgb(73_82_150_/_7%)]">
            <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full border-[1.35rem] border-[#dfe3ff] opacity-70" />
            <div className="pointer-events-none absolute -bottom-20 right-28 h-32 w-32 rounded-full bg-[#e0e7ff] opacity-60" />
            <div className="relative z-10 p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-[0.68rem] font-extrabold text-[#5965c2]">
                  <CheckCircle2 size={14} aria-hidden="true" />
                  Lower range
                </span>
                <button
                  className="inline-flex min-h-10 items-center gap-2 border-0 bg-transparent p-0 text-[#5966cf] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5968d7]"
                  type="button"
                  onClick={() => setShowMethod((value) => !value)}
                  aria-label="About your risk score"
                >
                  <Info size={16} aria-hidden="true" />
                </button>
              </div>
              <p className="m-0 mt-9 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-[#6873bf]">
                Your current risk score
              </p>
              <div className="mt-1 flex items-end gap-3">
                <span className="text-[clamp(4.5rem,9vw,5.7rem)] font-extrabold leading-[0.95] tracking-[-0.09em] text-[#303a8e]">
                  28
                </span>
                <span className="mb-2.5 text-[0.82rem] font-bold text-[#626da9]">
                  out of 100
                </span>
              </div>
              <p className="m-0 mt-4 max-w-[30rem] text-[0.84rem] leading-relaxed text-[#535e92]">
                Your results suggest a lower likelihood of developing type 2
                diabetes in the next 5 years.
              </p>
              <div
                className="mt-7 flex items-center gap-3"
                aria-label="Risk score is 28 out of 100"
              >
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#d5daf8]">
                  <span className="block h-full w-[28%] rounded-full bg-[#5968d7]" />
                </div>
                <span className="whitespace-nowrap text-[0.68rem] font-extrabold text-[#5662b8]">
                  Low 0–35
                </span>
              </div>
              <button
                className="mt-3 inline-flex min-h-10 items-center gap-2 border-0 bg-transparent p-0 text-[0.72rem] font-extrabold text-[#4d5ab5] transition hover:text-[#303a8e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5968d7]"
                type="button"
                onClick={() => setShowMethod((value) => !value)}
              >
                How this score is calculated
                <ChevronDown
                  size={15}
                  className={`transition-transform ${
                    showMethod ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              {showMethod && (
                <p className="m-0 mt-3 rounded-xl border border-[#d8ddfb] bg-white/55 px-4 py-3 text-[0.72rem] leading-relaxed text-[#5d6797]">
                  This estimate looks at several signals, including A1C,
                  movement, family history, age, and sleep. It is a starting
                  point for a conversation with a clinician.
                </p>
              )}
            </div>
          </div>
          <div className="rounded-3xl border border-[#e3e7f2] bg-white/80 p-5 shadow-[0_12px_30px_rgb(47_56_101_/_3.5%)] sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="m-0 text-[0.68rem] font-extrabold uppercase tracking-[0.15em] text-[#6a74bf]">
                  A simple read
                </p>
                <h2 className="m-0 mt-2 max-w-xs text-[clamp(1.2rem,2.3vw,1.38rem)] font-extrabold leading-tight tracking-[-0.04em] text-[#2f3654]">
                  You have a steady starting point.
                </h2>
              </div>
              <div
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#edf8f4] text-[#318a76]"
                aria-hidden="true"
              >
                <ShieldCheck size={20} />
              </div>
            </div>
            <p className="m-0 mt-4 text-[0.79rem] leading-relaxed text-[#727b93]">
              The biggest helpful signals are your activity and more consistent
              sleep. One thing worth watching is your A1C, which is only
              slightly above the usual healthy range.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-[#e8ebf2] bg-[#fbfcff] p-3.5">
                <div className="text-[0.62rem] font-extrabold uppercase tracking-[0.1em] text-[#8b92a5]">
                  Since last check
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[1.05rem] font-extrabold text-[#328b77]">
                  <TrendingDown size={17} aria-hidden="true" />
                  3 pts
                </div>
                <p className="m-0 mt-1 text-[0.68rem] text-[#858da2]">
                  lower risk estimate
                </p>
              </div>
              <div className="rounded-2xl border border-[#e8ebf2] bg-[#fbfcff] p-3.5">
                <div className="text-[0.62rem] font-extrabold uppercase tracking-[0.1em] text-[#8b92a5]">
                  Next check-in
                </div>
                <div className="mt-2 text-[1.05rem] font-extrabold text-[#3c4566]">
                  Oct 06
                </div>
                <p className="m-0 mt-1 text-[0.68rem] text-[#858da2]">
                  about 4 months away
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="my-5 flex flex-col items-start justify-between gap-3 rounded-2xl border border-[#e3e7f2] bg-white/70 px-4 py-3 text-[0.7rem] text-[#707a92] sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <Info size={15} aria-hidden="true" />
            <span>
              Use this view to understand what moved your estimate, not to
              diagnose a condition.
            </span>
          </div>
          <span className="text-[0.68rem] font-bold text-[#969caf]">
            Personal estimate · 5-year horizon
          </span>
        </div>
        <section
          className="grid gap-5 lg:grid-cols-[minmax(0,1.17fr)_minmax(0,0.83fr)]"
          aria-label="Risk factors and trend"
        >
          <div className="rounded-3xl border border-[#e3e7f2] bg-white/80 p-5 shadow-[0_12px_30px_rgb(47_56_101_/_3.5%)] sm:p-7">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
              <SectionHeader
                eyebrow="What shaped your score"
                title="Top five signals"
                description="Bars to the right add to the estimate. Bars to the left are protective signals."
                icon={<Activity size={18} />}
              />
              <div
                className="flex w-full shrink-0 rounded-xl border border-[#e0e4ef] bg-[#f5f6fb] p-1 sm:w-auto"
                role="group"
                aria-label="Factor view"
              >
                <button
                  className={`min-h-9 flex-1 rounded-lg border-0 px-3.5 text-[0.7rem] font-extrabold transition sm:flex-none ${
                    viewMode === "summary"
                      ? "bg-white text-[#4e5bc0] shadow-[0_2px_8px_rgb(55_65_120_/_10%)]"
                      : "bg-transparent text-[#858ca1]"
                  }`}
                  type="button"
                  aria-pressed={viewMode === "summary"}
                  onClick={() => setViewMode("summary")}
                >
                  Summary
                </button>
                <button
                  className={`min-h-9 flex-1 rounded-lg border-0 px-3.5 text-[0.7rem] font-extrabold transition sm:flex-none ${
                    viewMode === "detailed"
                      ? "bg-white text-[#4e5bc0] shadow-[0_2px_8px_rgb(55_65_120_/_10%)]"
                      : "bg-transparent text-[#858ca1]"
                  }`}
                  type="button"
                  aria-pressed={viewMode === "detailed"}
                  onClick={() => setViewMode("detailed")}
                >
                  Detailed
                </button>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[0.68rem] text-[#8b92a5]">
              <strong className="text-[#626b83]">
                {viewMode === "summary" ? "Summary view" : "Detailed view"}
              </strong>
              <span
                className="h-1 w-1 rounded-full bg-[#b8becd]"
                aria-hidden="true"
              />
              <span>
                {viewMode === "summary"
                  ? "Quick context at a glance"
                  : "Plain-language context for every signal"}
              </span>
            </div>
            <FactorChart detailed={viewMode === "detailed"} />
          </div>
          <div className="rounded-3xl border border-[#e3e7f2] bg-white/80 p-5 shadow-[0_12px_30px_rgb(47_56_101_/_3.5%)] sm:p-7">
            <SectionHeader
              eyebrow="A little perspective"
              title="Your 30-day trend"
              description="Small changes matter. This line shows how your estimated score has moved recently."
              icon={<TrendingDown size={18} />}
            />
            <TrendChart />
            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-[#f8f9fc] p-3 text-[0.68rem] leading-relaxed text-[#777f97]">
              <div className={iconTileClass}>
                <ArrowDownRight size={15} />
              </div>
              <span>
                Your score has been gently trending down. That usually reflects
                several small habits adding up, rather than one perfect week.
              </span>
            </div>
          </div>
        </section>
        <section
          className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.16fr)_minmax(0,0.84fr)]"
          aria-label="Personal insights and next steps"
        >
          <div className="relative overflow-hidden rounded-3xl border border-[#dfe3f8] bg-[#f1f2ff] p-5 sm:p-7">
            <div className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-[#e4e6ff]" />
            <div className="relative z-10">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                <SectionHeader
                  eyebrow="Generated for you"
                  title="A clearer next step"
                  description="A plain-language summary of the patterns in your results."
                  icon={<Sparkles size={18} />}
                />
                <span className="rounded-full border border-[#d5daf9] bg-white/65 px-3 py-1.5 text-[0.68rem] font-extrabold text-[#6571c4]">
                  AI insight
                </span>
              </div>
              <div className="mt-5 rounded-2xl border border-[#dce1fa] bg-white/60 p-4 text-[0.8rem] leading-relaxed text-[#4f5a8b]">
                <strong className="text-[#39468f]">The short version:</strong>{" "}
                your current pattern looks encouraging. Keep the movement
                routine that is already helping, and consider asking your
                clinician whether a repeat A1C in a few months would be useful.
                <div className="my-4 h-px bg-[#dfe3f4]" />
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-start gap-2 text-[0.68rem] leading-relaxed text-[#667193]">
                    <CheckCircle2
                      className="shrink-0 text-[#318b76]"
                      size={16}
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="text-[#4f5d85]">Keep doing:</strong>{" "}
                      20–30 minutes of movement most days.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-[0.68rem] leading-relaxed text-[#667193]">
                    <ArrowUpRight
                      className="shrink-0 text-[#c47a6f]"
                      size={16}
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="text-[#4f5d85]">Ask about:</strong> what
                      your A1C means for you personally.
                    </span>
                  </div>
                </div>
              </div>
              <p className="m-0 mt-3 text-[0.62rem] leading-relaxed text-[#7b84a4]">
                This insight was generated from the signals shown above. It is
                educational and not medical advice. A qualified clinician can
                interpret your results in context.
              </p>
            </div>
          </div>
          <div className="rounded-3xl border border-[#e3e7f2] bg-white/80 p-5 shadow-[0_12px_30px_rgb(47_56_101_/_3.5%)] sm:p-7">
            <div className="flex items-center gap-3">
              <div
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#edf8f4] text-[#318a76]"
                aria-hidden="true"
              >
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="m-0 text-[0.68rem] font-extrabold uppercase tracking-[0.15em] text-[#6a74bf]">
                  Small actions, not a score chase
                </p>
                <h2 className="m-0 mt-1 text-[1.06rem] font-extrabold tracking-[-0.035em] text-[#2c3350]">
                  What you can do next
                </h2>
              </div>
            </div>
            <ol className="mt-5 grid list-none gap-3 p-0">
              {[
                [
                  "Stay with your movement rhythm",
                  "Aim for the routine you can repeat, not an intense burst.",
                ],
                [
                  "Bring this summary to your next visit",
                  "It can help your clinician start with the signals that matter most.",
                ],
                [
                  "Recheck when it feels useful",
                  "A future result gives this estimate more context over time.",
                ],
              ].map(([title, description], index) => (
                <li
                  className="flex gap-3 rounded-2xl border border-[#edf0f5] bg-[#fbfcff] p-3"
                  key={title}
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#eef0ff] text-[0.68rem] font-extrabold text-[#5866ca]">
                    {index + 1}
                  </span>
                  <div>
                    <p className="m-0 text-[0.7rem] font-extrabold text-[#424b68]">
                      {title}
                    </p>
                    <p className="m-0 mt-1 text-[0.66rem] leading-relaxed text-[#858da1]">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <button
              className="mt-5 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#5968d7] bg-[#5968d7] px-4 py-2.5 text-[0.72rem] font-bold text-white shadow-[0_8px_18px_rgb(86_101_216_/_18%)] transition hover:border-[#3d4ba7] hover:bg-[#3d4ba7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5968d7]"
              type="button"
              onClick={prepareSummary}
            >
              {downloaded ? (
                <Check size={15} aria-hidden="true" />
              ) : (
                <ExternalLink size={15} aria-hidden="true" />
              )}
              {downloaded
                ? "Summary ready to save"
                : "Prepare a share-ready summary"}
            </button>
          </div>
        </section>
        <footer className="flex flex-col items-start justify-between gap-2 py-6 text-[0.62rem] leading-relaxed text-[#949bae] sm:flex-row sm:items-center">
          <span>Kyle's Diabetes Risk Predictor · Your information stays yours.</span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={12} aria-hidden="true" />
            Educational estimate, not a diagnosis and working prototype that companies can inspired from.
          </span>
        </footer>
      </div>
    </main>
  );
}


