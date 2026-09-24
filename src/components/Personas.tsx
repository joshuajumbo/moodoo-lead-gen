"use client";

import Image from "next/image";
import { useRef } from "react";
import { cubicBezier, motion, useScroll, useTransform } from "motion/react";
import { PERSONAS } from "@/content/moodoo";

/**
 * "Built for the people" (807:323382) with the card column stepping per the
 * state frames 807:323284 → 323431 → 323774 → 323989. Each card is 500 tall with
 * a 16 gap, so one step is 516px. The scroll track alternates a dwell (card at
 * rest, exactly as in Figma) with an eased move to the next state.
 */
const STEP = 516;
const DWELL = 170;
const MOVE = 360;
const STEPS = PERSONAS.length - 1;
const TRACK = (STEPS + 1) * DWELL + STEPS * MOVE;
const ease = cubicBezier(0.65, 0, 0.35, 1);

const stops: number[] = [];
const values: number[] = [];
for (let k = 0; k <= STEPS; k++) {
  const start = k * (DWELL + MOVE);
  stops.push(start / TRACK, (start + DWELL) / TRACK);
  values.push(-k * STEP, -k * STEP);
}

/*
 * The floating nav occupies y 20–77, and Figma's state frames (which have no
 * nav) put the eyebrow at y 40 — so on the pinned stage everything shifts by
 * NAV_CLEAR to seat the eyebrow 16px below the nav. Relationships inside the
 * stage are unchanged.
 */
const NAV_CLEAR = 53;

// nav anchors land on the middle of a card's dwell
const anchorFor: Record<string, string> = { managers: "for-managers", remote: "for-remote", creatives: "for-creatives" };

export function Personas() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const y = useTransform(scrollYProgress, stops, values, { ease: stops.slice(1).map((_, i) => (i % 2 === 0 ? ease : (t: number) => t)) });

  return (
    <section
      ref={ref}
      data-nav-tint="#fff5e2"
      aria-labelledby="personas-title"
      className="relative bg-butter"
      style={{ height: `calc(min(${900 + NAV_CLEAR}px, 100svh) + ${TRACK}px)` }}
    >
      {PERSONAS.map((p, k) =>
        anchorFor[p.id] ? (
          <span key={p.id} id={anchorFor[p.id]} aria-hidden className="absolute left-0 h-px w-px" style={{ top: k * (DWELL + MOVE) + DWELL / 2 }} />
        ) : null,
      )}

      <div className="sticky top-0 h-[min(953px,100svh)] overflow-hidden">
        <div className="relative h-full w-[1440px]" style={{ marginLeft: "calc(50% - 720px)" }}>
          <header className="absolute left-[calc(50%-0.36px)] top-[93px] flex w-[499.283px] -translate-x-1/2 flex-col items-center gap-[19px]">
            <p className="eyebrow">building a healthier workplace culture</p>
            <h2 id="personas-title" className="whitespace-nowrap text-center text-[40px] font-bold leading-[50px] tracking-[-0.6px] text-ink">
              Built for the people
              <br />
              shaping how work feels
            </h2>
          </header>

          {/* state frames 807:323431… use 451 × 655 here (main page shows 475 × 603) */}
          <div className="absolute left-[140px] top-[286px] h-[655px] w-[451px] overflow-hidden">
            <Image src="/img/photos/office-team.jpg" alt="Two colleagues at a shared desk late in the day, one resting his head in his hand" fill sizes="451px" quality={85} className="object-cover" />
          </div>

          <div className="absolute bottom-0 left-[647px] top-[286px] w-[653px] overflow-hidden">
            <motion.ol className="flex flex-col gap-[16px]" style={{ y }}>
              {PERSONAS.map((p) => (
                <li key={p.id} className="flex flex-col gap-[22px] bg-white p-[44px]">
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[16px] leading-[26px] text-ink-muted">{p.number}</p>
                    <h3 className="text-[32px] font-bold leading-[35.2px] tracking-[-0.6px] text-ink">{p.title}</h3>
                    <p className="text-[16px] leading-[26px] text-ink-muted">{p.body}</p>
                  </div>
                  <div className="relative h-[260px] w-full overflow-hidden border border-cream">
                    <Image src={p.img} alt={p.alt} fill sizes="565px" quality={85} className="object-cover" />
                  </div>
                </li>
              ))}
            </motion.ol>
          </div>
        </div>
      </div>
    </section>
  );
}
