"use client";

import { useEffect, useState } from "react";
import { PhoneBezel } from "@/components/phone/PhoneBezel";
import { PhoneScreens } from "@/components/phone/PhoneScreens";
import { ChipText, GlassChip } from "@/components/GlassChip";
import { SocialProof } from "@/components/SocialProof";
import { INTRO, Line, d } from "@/components/intro";
import type { SocialProof as Proof } from "@/lib/social-proof";
import { HERO_CHIPS, HERO_CYCLE, HERO_CYCLE_MS } from "@/content/moodoo";

/**
 * Hero below 1280px. Same copy, type ratios and phone as the Figma hero, laid
 * out for the width: stacked on phones and tablets, two columns from 1024.
 */
export function FluidHero({ proof }: { proof: Proof }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desk = window.matchMedia("(min-width: 80rem)");
    if (reduce.matches) return;
    const id = window.setInterval(() => {
      if (!desk.matches && !document.hidden) setI((v) => (v + 1) % HERO_CYCLE.length);
    }, HERO_CYCLE_MS);
    return () => window.clearInterval(id);
  }, []);

  const [engineer, manager] = HERO_CHIPS;

  return (
    <section aria-labelledby="hero-title-m" data-nav-tint="#fff5e2" className="relative overflow-hidden bg-butter desk:hidden">
      <div aria-hidden className="dot-field" style={{ ["--dot" as string]: "#f8a706" }} />
      <div className="relative mx-auto grid max-w-[1120px] px-6 pb-16 pt-[117px] md:px-10 md:pb-24 md:pt-[136px] lg:grid-cols-[minmax(0,1fr)_460px] lg:items-center lg:gap-10 lg:pb-28 lg:pt-[148px]">
        <div className="flex max-w-[564px] flex-col gap-[28px] md:gap-[32px]">
          <div className="flex flex-col items-start gap-[19px]">
            <p style={d(INTRO.eyebrow)} className="eyebrow intro-fade max-md:!whitespace-normal max-md:!rounded-[14px] max-md:!py-[6px] max-md:!text-left max-md:!text-[10.5px] max-md:!leading-[15px]">
              For teams, managers, and organizations building healthier ways of working.
            </p>
            <div className="flex flex-col gap-[18px] md:gap-[21px]">
              <h1
                id="hero-title-m"
                className="flex flex-col gap-[2px] text-[clamp(38px,10.2vw,64px)] leading-[1] lg:text-[clamp(48px,4.6vw,58px)]"
              >
                <span className="font-bold tracking-[-0.01725em] text-ink">
                  <Line delay={INTRO.lines[0]}>Understand how</Line>
                  <Line delay={INTRO.lines[1]}>your team feels</Line>
                </span>
                <span className="font-normal tracking-[-0.006em] text-plum">
                  <Line delay={INTRO.lines[2]}>Your team’s mood,</Line>
                  <Line delay={INTRO.lines[3]}>made visible</Line>
                </span>
              </h1>
              <p className="intro-fade text-[17px] leading-[1.62] text-ink-soft md:text-[18px]" style={d(INTRO.body)}>
                The small moments of stress, disconnection, and exhaustion don’t always show up in a meeting. Moodoo helps
                teams check in, understand their emotional patterns, and make space for better ways of working
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-[12px]">
            <a href="#join" className="btn-primary intro-fade" style={d(INTRO.cta)}>
              Join Early Access
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/icons/arrow.svg" alt="" width={14} height={14} className="btn-arrow" />
            </a>
            <div className="intro-fade" style={d(INTRO.proof)}>
              <SocialProof {...proof} />
            </div>
          </div>
        </div>

        {/* phone + chips: Figma offsets from 768px, tucked against the bezel on phones */}
        <div className="relative mx-auto mt-14 h-[488px] w-full max-w-[560px] lg:mt-0 lg:max-w-none">
          <div className="intro-phone absolute left-[calc(50%-113.5px)] top-[12px]" style={d(INTRO.phone)}>
            <div className="phone-float">
              <PhoneBezel>
                <PhoneScreens active={HERO_CYCLE[i]} screens={HERO_CYCLE} priority />
              </PhoneBezel>
            </div>
          </div>
          <div className="absolute left-[calc(50%-173.5px)] top-[229px] origin-left scale-[0.82] md:left-[calc(50%-349.5px)] md:scale-100 lg:left-[calc(50%-243.5px)]">
            <div className="intro-chip absolute inset-0" style={d(INTRO.chips[0])}>
              <GlassChip bg={engineer.bg} style={{ left: 0, top: 0 }}>
                <ChipText {...engineer} />
              </GlassChip>
            </div>
          </div>
          <div className="absolute left-[calc(50%-6.5px)] top-[391px] origin-left scale-[0.82] md:left-[calc(50%+129.5px)] md:scale-100 lg:left-[calc(50%+23.5px)]">
            <div className="intro-chip absolute inset-0" style={d(INTRO.chips[1])}>
              <GlassChip bg={manager.bg} style={{ left: 0, top: 0 }}>
                <ChipText {...manager} />
              </GlassChip>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
