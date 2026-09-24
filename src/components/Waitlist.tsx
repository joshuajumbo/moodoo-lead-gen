import { WaitlistForm } from "@/components/WaitlistForm";

/** Newsletter / waitlist (788:14622). 1440 × 900 on butter. */
export function Waitlist() {
  return (
    <section id="join" data-nav-tint="#fff5e2" aria-labelledby="join-title" className="relative min-h-[900px] scroll-mt-[80px] bg-butter">
      <div className="relative mx-auto flex w-full max-w-[966px] flex-col items-center pb-[51px] pt-[98px]">
        {/* logo 788:14639 — 169.142 × 31.607, nudged +4.8 as in Figma */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/icons/logo.svg" alt="" width={169.142} height={31.607} className="relative left-[4.8px] h-[31.607px] w-[169.142px]" />

        <div className="relative left-[0.5px] mt-[15.63px] flex w-[457px] flex-col items-center gap-[9px]">
          <div className="flex h-[50.345px] w-[186.334px] items-center justify-center">
            <p className="relative grid h-[37.59px] w-[184.16px] rotate-4 place-items-center rounded-[32px] border-2 border-white bg-white font-[family-name:var(--font-display-pill)] text-[18px] font-bold leading-[21.6px] text-ink [font-variation-settings:'opsz'_14]">
              Stay Updated
            </p>
          </div>
          <div className="flex flex-col items-center gap-[9px] text-center">
            <h2 id="join-title" className="text-[48px] font-semibold leading-[52.8px] tracking-[-1.6px] text-ink">
              Be among the first to experience Moodoo
            </h2>
            <p className="w-[418px] text-[18px] leading-[30.6px] text-ink-muted">
              We’re building a more thoughtful way for teams to understand their emotional experience at work
            </p>
          </div>
        </div>

        <WaitlistForm />
      </div>
    </section>
  );
}
