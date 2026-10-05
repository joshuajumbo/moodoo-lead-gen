import { GrowthChart } from "@/components/stats/GrowthChart";
import { StatFocusProvider } from "@/components/stats/StatFocus";
import { StatItems } from "@/components/stats/StatItems";

/**
 * Burnout stats (801:257562). 1440 × 723 on sage, navy dot field.
 * The chart is composed from the section's own vectors (805:264785–91), each
 * placed at its Figma render bounds relative to a (830, 30) origin.
 */
export function Stats() {
  return (
    <section
      id="why-moodoo"
      data-nav-tint="#dfe4da"
      className="relative hidden h-[820px] overflow-hidden bg-sage text-white desk:block"
      aria-labelledby="stats-title"
    >
      <div aria-hidden className="dot-field" style={{ ["--dot" as string]: "#244b65" }} />
      <StatFocusProvider>
      <div className="relative h-full w-[1440px]" style={{ marginLeft: "calc(50% - 720px)" }}>
        {/* quote glyph 805:264777 */}
        <svg aria-hidden className="absolute left-[102.16px] top-[126.88px]" width="28" height="30" viewBox="0 0 28 30" fill="none">
          <path d="M10.8398 1.12L3.83984 25.12" stroke="white" strokeWidth="8" />
          <path d="M23.8398 4.12L16.8398 28.12" stroke="white" strokeWidth="8" />
        </svg>

        <p className="eyebrow absolute left-[140px] top-[60px]">The emotional side of work is often invisible</p>
        <blockquote className="absolute left-[140px] top-[125px] w-[549px]">
          <p id="stats-title" className="text-[40px] font-bold leading-[50px] tracking-[-0.6px]">
            What people feel at work shapes how they collaborate, contribute and stay connected.
          </p>
          <footer className="mt-[32px] whitespace-nowrap text-[18px] font-bold leading-[26.4px] tracking-[-0.6px] text-white/80">
            Source:{"\u00a0\u00a0"}
            <cite className="not-italic">Gallup, State of the Global Workplace 2026</cite>
          </footer>
        </blockquote>

        <GrowthChart className="absolute" style={{ left: 830, top: 30 }} />

        <dl id="statistics" className="absolute left-[140px] top-[464px] flex gap-[100px]">
          <StatItems variant="desk" />
        </dl>

        <p className="absolute left-[140px] top-[680px] w-[700px] text-[22px] font-semibold leading-[1.45] tracking-[-0.2px]">
          But emotional signals are not only warning signs. They can also reveal when teams feel energised, connected and
          worth celebrating.
        </p>
      </div>
      </StatFocusProvider>
    </section>
  );
}
