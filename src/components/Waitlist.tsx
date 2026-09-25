import { WaitlistForm } from "@/components/WaitlistForm";

/** Newsletter / waitlist (788:14622). 1440 × 900 on butter. */
export function Waitlist() {
  return (
    <section id="join" data-nav-tint="#fff5e2" aria-labelledby="join-title" className="relative bg-butter desk:min-h-[900px]">
      <div className="relative mx-auto flex w-full max-w-[1046px] flex-col items-center px-6 pb-20 pt-[72px] md:px-10 md:pb-24 md:pt-[88px] desk:max-w-[966px] desk:px-0 desk:pb-[51px] desk:pt-[98px]">
        {/* logo 788:14639 — 169.142 × 31.607, nudged +4.8 as in Figma */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/icons/logo.svg" alt="" width={169.142} height={31.607} className="relative left-[4.8px] h-[26px] w-auto md:h-[31.607px]" />

        <div className="relative left-[0.5px] mt-[15.63px] flex w-full max-w-[457px] flex-col items-center gap-[9px]">
          <div className="flex h-[50.345px] w-[186.334px] items-center justify-center">
            <p className="relative grid h-[37.59px] w-[184.16px] rotate-4 place-items-center rounded-[32px] border-2 border-white bg-white font-[family-name:var(--font-display-pill)] text-[18px] font-bold leading-[21.6px] text-ink [font-variation-settings:'opsz'_14]">
              Stay Updated
            </p>
          </div>
          <div className="flex flex-col items-center gap-[9px] text-center">
            <h2 id="join-title" className="text-[clamp(32px,8.6vw,48px)] font-semibold leading-[1.1] tracking-[-0.033em] text-ink">
              Be among the first to experience Moodoo
            </h2>
            <p className="max-w-[418px] text-[16px] leading-[1.7] text-ink-muted md:text-[18px]">
              We’re building a more thoughtful way for teams to understand their emotional experience at work
            </p>
          </div>
        </div>

        <WaitlistForm />
      </div>
    </section>
  );
}
