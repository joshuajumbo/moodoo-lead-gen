"use client";

import { useEffect, useRef } from "react";
import { MANDALAS, MOVE_EASE, MOVE_MS } from "@/content/mandalas";
import { N, mod, useCycle } from "./Cycle";

/*
 * 24 tiles (a multiple of 8, so the colour sequence survives wrap-around) on
 * slots −12…11 around the phone. Slot 0 sits under the phone; the gap there is
 * wider than a tile pitch (Figma: 191 vs 163), so slot centres are computed:
 *   ±1 → ±(sp/2 + g + t/2),   ±n → that ± (n−1)(t + g)
 * Sizes come from CSS vars (--t tile, --g gutter, --sp gap) set per breakpoint.
 * Each beat every tile advances one slot; the one leaving the far right edge
 * jumps (untransitioned, off-screen) to the far left.
 */
const COUNT = 24;
const HALF = COUNT / 2;

function slotX(s: number) {
  if (s === 0) return "0px";
  const sign = s < 0 ? -1 : 1;
  const n = Math.abs(s);
  return `calc(${sign} * (var(--sp) / 2 + var(--g) + var(--t) / 2 + ${n - 1} * (var(--t) + var(--g))))`;
}

export function MandalaConveyor({ className = "" }: { className?: string }) {
  const { step, canAnimate, setVisible } = useCycle();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [setVisible]);

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none h-[var(--t)] w-full ${className}`}>
      {Array.from({ length: COUNT }, (_, d) => {
        const s = mod(d + step, COUNT) - HALF; // slot this tile occupies now
        const wrapped = s === -HALF && step > 0; // just jumped from the far right
        const m = MANDALAS[mod(d - HALF, N)]; // fixed per tile
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={d}
            src={`/img/mandalas/mandala-${m.n}.svg`}
            alt=""
            width={159}
            height={159}
            className="absolute left-1/2 top-0 size-[var(--t)] max-w-none"
            style={{
              marginLeft: "calc(var(--t) / -2)",
              translate: `${slotX(s)} 0`,
              transition: canAnimate && !wrapped ? `translate ${MOVE_MS}ms ${MOVE_EASE}` : "none",
            }}
          />
        );
      })}
    </div>
  );
}
