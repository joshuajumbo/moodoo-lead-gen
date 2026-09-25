import { GrowthChart } from "@/components/stats/GrowthChart";
import { StatFocusProvider } from "@/components/stats/StatFocus";
import { StatItems } from "@/components/stats/StatItems";

/** Burnout stats below 1280px: quote and chart pair up from 1024, stack below. */
export function FluidStats() {
  return (
    <section id="why-moodoo-m" aria-labelledby="stats-title-m" data-nav-tint="#dfe4da" className="relative overflow-hidden bg-sage text-white desk:hidden">
      <div aria-hidden className="dot-field" style={{ ["--dot" as string]: "#244b65" }} />
      <StatFocusProvider>
      <div className="relative mx-auto max-w-[1120px] px-6 py-16 md:px-10 md:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,549px)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <blockquote>
            <svg aria-hidden className="mb-4 md:mb-5" width="28" height="30" viewBox="0 0 28 30" fill="none">
              <path d="M10.8398 1.12L3.83984 25.12" stroke="white" strokeWidth="8" />
              <path d="M23.8398 4.12L16.8398 28.12" stroke="white" strokeWidth="8" />
            </svg>
            <p id="stats-title-m" className="text-[clamp(28px,6.6vw,40px)] font-bold leading-[1.25] tracking-[-0.015em]">
              The emotional experience of work is often invisible but the data shows it matters.
            </p>
            <footer className="mt-6 text-[15px] font-bold leading-[1.47] tracking-[-0.02em] text-white/80 md:mt-8 md:text-[18px]">
              Source:{"\u00a0\u00a0"}
              <cite className="not-italic">Gallup, State of the Global Workplace 2026</cite>. Data collected in 2025
            </footer>
          </blockquote>
          <GrowthChart className="h-auto w-full max-w-[500px] lg:justify-self-end" />
        </div>

        <dl id="statistics-m" className="mt-16 grid max-w-[812px] gap-10 sm:grid-cols-2 sm:gap-8 lg:mt-20">
          <StatItems variant="fluid" />
        </dl>
      </div>
      </StatFocusProvider>
    </section>
  );
}
