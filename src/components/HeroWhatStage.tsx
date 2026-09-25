"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, motion, useAnimationFrame, useMotionValue, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { PhoneBezel } from "@/components/phone/PhoneBezel";
import { PhoneScreens } from "@/components/phone/PhoneScreens";
import { ChipFaces, ChipText, GlassChip } from "@/components/GlassChip";
import { INTRO, Line, d } from "@/components/intro";
import { SocialProof } from "@/components/SocialProof";
import type { SocialProof as Proof } from "@/lib/social-proof";
import { CHAPTER_CHIPS, CHAPTERS, HERO_CHIPS, HERO_CYCLE, HERO_CYCLE_MS, WHAT_CHIP, type ScreenId } from "@/content/moodoo";

/* ── Geometry, in 1440-frame px, straight from Figma ─────────────────────────
 * Hero phone 807:345634: rotated bbox 819,169 235×467 → unrotated 823,170.75
 * What phone 799:139694: rotated bbox 809,862 → unrotated 813,863.75
 * What section 799:139684 starts at y 745; panel 1233×1165 at 104,62 (state frames 801:154494…)
 * Last chapter block ends at panel y 1129 — the phone releases there.
 */
const HERO_H = 745;
const WHAT_H = 1289;
const PANEL = { x: 104, y: 62, w: 1233, h: 1165 };
const PHONE_W = 227;
const PHONE_H = 463.5;
const HERO_PHONE = { x: 823, y: 170.75 };
const SLOT = { x: 813, y: PANEL.y + 56.75 }; // relative to What section top
const TRACK_END = HERO_H + PANEL.y + 1129;
const ALL_SCREENS: ScreenId[] = ["high", "mid", "low", "dash", "insights", "resources", "culture"];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function useIsomorphicLayoutEffect(fn: React.EffectCallback, deps: React.DependencyList) {
  (typeof window === "undefined" ? useEffect : useLayoutEffect)(fn, deps);
}

export function HeroWhatStage({ proof }: { proof: Proof }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const whatRef = useRef<HTMLElement>(null);
  const blockRefs = useRef<(HTMLElement | null)[]>([]);

  const [pinTop, setPinTop] = useState(HERO_PHONE.y);
  const [active, setActive] = useState(0);
  const [cycleIndex, setCycleIndex] = useState(0);
  const [handedOff, setHandedOff] = useState(false);
  const [inPanel, setInPanel] = useState(false); // hand-off complete: chip follows the active chapter
  const [reduced, setReduced] = useState(false);
  const [isDesk, setIsDesk] = useState(false);

  // scroll offsets bounding the hand-off, measured on layout
  const range = useRef({ s0: 0, s1: 693 });
  const progress = useMotionValue(0);
  const { scrollY } = useScroll();

  const measure = useCallback(() => {
    const vh = window.innerHeight;
    // keep the phone fully visible on short viewports; Figma's 170.75 otherwise
    const top = Math.min(HERO_PHONE.y, Math.max(96, vh - PHONE_H - 40));
    setPinTop(top);
    const stageTop = (stageRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY;
    const s0 = stageTop + HERO_PHONE.y - top;
    const s1 = stageTop + HERO_H + SLOT.y - top;
    range.current = { s0, s1 };
  }, []);

  useIsomorphicLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", measure);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dq = window.matchMedia("(min-width: 80rem)");
    const onMq = () => {
      setReduced(mq.matches);
      setIsDesk(dq.matches);
    };
    onMq();
    mq.addEventListener("change", onMq);
    dq.addEventListener("change", onMq);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", onMq);
      dq.removeEventListener("change", onMq);
    };
  }, [measure]);

  const update = useCallback(
    (y: number) => {
      if (!isDesk) return; // stage is display:none below 1280
      const { s0, s1 } = range.current;
      const p = clamp01((y - s0) / Math.max(1, s1 - s0));
      progress.set(p);
      setHandedOff(p >= 0.5);
      setInPanel(p >= 0.999);

      // reading line sits in the phone's lower third
      const line = pinTop + 390;
      let idx = 0;
      blockRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) idx = i;
      });
      setActive(idx);
    },
    [pinTop, progress, isDesk],
  );

  useMotionValueEvent(scrollY, "change", update);
  useEffect(() => update(window.scrollY), [update]);

  // hero screen cycle — only while the phone is still in the hero
  useEffect(() => {
    if (reduced || handedOff || !isDesk) return;
    const id = window.setInterval(() => setCycleIndex((i) => (i + 1) % HERO_CYCLE.length), HERO_CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduced, handedOff, isDesk]);

  const screen: ScreenId = handedOff ? CHAPTERS[active].screen : HERO_CYCLE[cycleIndex];

  /* scroll-scrubbed hand-off */
  const x = useTransform(progress, [0, 1], [0, SLOT.x - HERO_PHONE.x]);
  const driftAmp = useTransform(progress, [0, 0.6], [1, 0]);
  // idle drift: a slow 7s breath (±5px, ±0.6°) that decays to rest as the phone hands off
  const driftY = useMotionValue(0);
  const driftR = useMotionValue(0);
  useAnimationFrame((t) => {
    const amp = reduced || !isDesk ? 0 : driftAmp.get();
    if (amp === 0 && driftY.get() === 0) return;
    const phase = (t / 7000) * Math.PI * 2;
    driftY.set(Math.sin(phase) * 5 * amp);
    driftR.set(Math.sin(phase + Math.PI / 3) * 0.6 * amp);
  });
  const heroChipOpacity = useTransform(progress, [0, 0.4], [1, 0]);
  const heroChipY = useTransform(progress, [0, 0.4], [0, -24]);
  const rightChipY = useTransform(progress, [0.15, 1], [HERO_CHIPS[1].y, WHAT_CHIP.y]);
  const rightChipX = useTransform(progress, [0.15, 1], [HERO_CHIPS[1].x, WHAT_CHIP.x]);
  // one chip morphs: body colour interpolates, text swaps out-then-in (never overlapping)
  const chipBg = useTransform(progress, [0.45, 0.7], [HERO_CHIPS[1].bg, WHAT_CHIP.bg]);
  // after the hand-off the chip eases between chapter personas; one motion value
  // throughout, so the scroll-driven and state-driven colours never fight
  const personaBg = useMotionValue(CHAPTER_CHIPS[0].bg);
  useEffect(() => {
    const target = CHAPTER_CHIPS[inPanel ? active : 0].bg;
    const c = animate(personaBg, target, { duration: 0.48, ease: [0.22, 1, 0.36, 1] });
    return () => c.stop();
  }, [active, inPanel, personaBg]);
  const liveChipBg = useTransform(() => (progress.get() < 0.999 ? chipBg.get() : personaBg.get()));
  const managerText = useTransform(progress, [0.45, 0.55], [1, 0]);
  const supportText = useTransform(progress, [0.58, 0.7], [0, 1]);

  return (
    <div ref={stageRef} className="relative hidden overflow-x-clip desk:block">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section data-nav-tint="#fff5e2" className="relative h-[745px] overflow-hidden bg-butter" aria-labelledby="hero-title">
        <div aria-hidden className="dot-field" style={{ ["--dot" as string]: "#f8a706" }} />
        <div className="relative mx-auto h-full w-[1440px] max-w-none" style={{ marginLeft: "calc(50% - 720px)" }}>
          <div className="absolute left-[140px] top-[128px] flex w-[564px] flex-col gap-[32px]">
            <div className="flex flex-col items-start gap-[19px]">
              <p className="eyebrow intro-fade" style={d(INTRO.eyebrow)}>For teams, managers, and organizations building healthier ways of working.</p>
              <div className="flex flex-col gap-[21px]">
                <h1 id="hero-title" className="flex flex-col gap-[2px] text-[64px] leading-[64px]">
                  <span className="font-bold tracking-[-1.104px] text-ink">
                    <Line delay={INTRO.lines[0]}>Understand how</Line>
                    <Line delay={INTRO.lines[1]}>your team feels</Line>
                  </span>
                  <span className="font-normal tracking-[-0.39px] text-plum">
                    <Line delay={INTRO.lines[2]}>Your team’s mood,</Line>
                    <Line delay={INTRO.lines[3]}>made visible</Line>
                  </span>
                </h1>
                <p className="intro-fade text-[18px] leading-[29.16px] text-ink-soft" style={d(INTRO.body)}>
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
        </div>
      </section>

      {/* ── What is Moodoo ───────────────────────────────────── */}
      <section
        id="what-is-moodoo"
        ref={whatRef}
        data-nav-tint="#fff5e2"
        className="relative overflow-hidden"
        style={{ height: WHAT_H }}
        aria-labelledby="what-title"
      >
        <Image src="/img/photos/office-team.jpg" alt="" fill sizes="100vw" quality={85} className="object-cover" />
        <div className="relative mx-auto h-full w-[1440px]" style={{ marginLeft: "calc(50% - 720px)" }}>
          <div className="absolute bg-cream" style={{ left: PANEL.x, top: PANEL.y, width: PANEL.w, height: PANEL.h }}>
            <header
              ref={(el) => {
                blockRefs.current[0] = el;
              }}
              className="absolute left-[36px] top-[36px] flex w-[564px] flex-col items-start gap-[19px] transition-opacity duration-300 ease-out"
              style={{ opacity: active === 0 ? 1 : 0.32 }}
            >
              <p className="eyebrow">What is moodoo</p>
              <div className="flex flex-col gap-[21px]">
                <h2 id="what-title" className="w-[499.283px] text-[40px] font-bold leading-[50px] tracking-[-0.6px] text-ink">
                  Some things don’t show up in a status update
                </h2>
                {CHAPTERS[0].body.map((p) => (
                  <p key={p} className="text-[16px] leading-[26px] text-ink-muted">
                    {p}
                  </p>
                ))}
              </div>
            </header>

            <ol className="absolute left-[36px] top-[437px] flex w-[602px] flex-col gap-[56px]">
              {CHAPTERS.slice(1).map((c, i) => (
                <li
                  key={c.id}
                  ref={(el) => {
                    blockRefs.current[i + 1] = el;
                  }}
                  className="relative flex min-h-[118px] gap-[36px] transition-opacity duration-300 ease-out"
                  style={{ opacity: active === i + 1 ? 1 : 0.32 }}
                  aria-current={active === i + 1 ? "step" : undefined}
                >
                  {/* rail marks the active chapter only: grows down on arrival, fades on departure */}
                  <span
                    aria-hidden
                    className="absolute left-[-2px] top-0 h-[118px] w-[4px] origin-top"
                    style={{
                      background: "linear-gradient(180deg, #e3c804 0%, #fff5e2 100%)",
                      opacity: active === i + 1 ? 1 : 0,
                      scale: active === i + 1 ? "1 1" : "1 0.35",
                      transition: "opacity 300ms ease-out, scale 500ms var(--ease-expo)",
                    }}
                  />
                  <span aria-hidden className="w-0 shrink-0" />
                  <div className="flex w-[566px] flex-col gap-[8px]">
                    <p className="text-[16px] leading-[26px] text-ink-muted">{c.number}</p>
                    <h3 className="text-[40px] font-bold leading-[50px] tracking-[-0.6px] text-ink">{c.title}</h3>
                    <p className="text-[16px] leading-[26px] text-ink-muted">{c.body[0]}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── The persistent phone ─────────────────────────────── */}
      <div aria-hidden={false} className="pointer-events-none absolute inset-x-0 top-0" style={{ height: TRACK_END }}>
        <div className="relative mx-auto h-full w-[1440px]" style={{ marginLeft: "calc(50% - 720px)" }}>
          <motion.div
            className="sticky"
            style={{ top: pinTop, marginTop: HERO_PHONE.y, marginLeft: HERO_PHONE.x, width: PHONE_W, height: PHONE_H, x }}
          >
            <motion.div className="relative size-full" style={{ y: driftY, rotate: driftR }}>
              <div className="intro-phone size-full" style={d(INTRO.phone)}>
                <div className="size-full" style={{ transform: "rotate(-1deg)" }}>
                  <PhoneBezel>
                    <PhoneScreens active={screen} screens={ALL_SCREENS} priority />
                  </PhoneBezel>
                </div>
              </div>

              {/* left chip leaves during the hand-off */}
              <motion.div style={{ opacity: heroChipOpacity, y: heroChipY }}>
                <div className="intro-chip absolute inset-0" style={d(INTRO.chips[0])}>
                  <GlassChip bg={HERO_CHIPS[0].bg} style={{ left: HERO_CHIPS[0].x, top: HERO_CHIPS[0].y }}>
                    <ChipText {...HERO_CHIPS[0]} />
                  </GlassChip>
                </div>
              </motion.div>

              {/* right chip travels to its What-section slot and changes persona */}
              <motion.div className="absolute left-0 top-0" style={{ x: rightChipX, y: rightChipY }}>
                <div className="intro-chip absolute inset-0" style={d(INTRO.chips[1])}>
                  {/* while scrubbing the hand-off the colour is scroll-driven; once in the
                      panel it eases between chapter personas */}
                  <GlassChip bg={liveChipBg} style={{ left: 0, top: 0 }}>
                    <ChipText {...HERO_CHIPS[1]} opacity={managerText} />
                    <ChipFaces chips={CHAPTER_CHIPS} active={inPanel ? active : 0} opacity={supportText} />
                  </GlassChip>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
