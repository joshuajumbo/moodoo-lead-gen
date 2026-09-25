"use client";

import Image from "next/image";
import { MANDALAS, MOVE_EASE, MOVE_MS, frac } from "@/content/mandalas";
import { N, mod, useCycle } from "./Cycle";

/*
 * The check-in screen as live layers, so colour, mandala and handles can move:
 *   1. screen colour
 *   2. dot grid — additive (Figma composites it as a +22 lift), stops at the panel
 *   3. mandala glyph — tile geometry at 0.94×, centred where Figma draws it
 *   4. chrome — status bar, header, sliders, labels, translucent panel, bar
 *      (matted from Figma's three variants; see scripts/matte-checkin-chrome.md)
 *   5. slider handles
 * Geometry in 1× screen px (215 × 451.5), measured from the Figma exports.
 */
const PLEASANT = { x0: 3, len: 208.67, y: 79.33 }; // horizontal slider
const ENERGY = { x: 200.3, y0: 67, len: 292 }; // vertical slider (higher energy sits lower)
const GLYPH = { left: 33.23, top: 148.37, size: 149.46 };

export function CheckinScreen() {
  const { phone, canAnimate } = useCycle();
  const m = MANDALAS[phone];
  const t = (props: string) => (canAnimate ? props.split(",").map((p) => `${p.trim()} ${MOVE_MS}ms ${MOVE_EASE}`).join(", ") : "none");

  return (
    <div aria-hidden className="absolute inset-0">
      <div className="absolute inset-0" style={{ backgroundColor: m.color, transition: t("background-color") }} />
      <div className="dots-additive absolute inset-x-0 top-0 h-[359.33px]" />

      {MANDALAS.map((g, i) => {
        // entering from the left, resting, or leaving to the right — the conveyor's direction
        const state = i === phone ? 0 : i === mod(phone + 1, N) ? 1 : -1;
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={g.n}
            src={`/img/mandalas/glyph-${g.n}.svg`}
            alt=""
            width={159}
            height={159}
            className="absolute"
            style={{
              left: GLYPH.left,
              top: GLYPH.top,
              width: GLYPH.size,
              height: GLYPH.size,
              opacity: state === 0 ? 1 : 0,
              translate: `${state * 26}px 0`,
              scale: state === 0 ? "1" : "0.94",
              transition: t("opacity, translate, scale"),
            }}
          />
        );
      })}

      <Image src="/img/screens/checkin-chrome.png" alt="" width={645} height={1354} sizes="215px" quality={90} className="absolute inset-0 size-full" />

      <span
        className="absolute rounded-full bg-white"
        style={{
          left: PLEASANT.x0 - 5.17,
          top: PLEASANT.y - 2.17,
          width: 10.33,
          height: 4.33,
          translate: `${frac(m.pleasant) * PLEASANT.len}px 0`,
          transition: t("translate"),
        }}
      />
      <span
        className="absolute rounded-full bg-white"
        style={{
          left: ENERGY.x - 2,
          top: ENERGY.y0 - 5.17,
          width: 4,
          height: 10.33,
          translate: `0 ${frac(m.energy) * ENERGY.len}px`,
          transition: t("translate"),
        }}
      />
    </div>
  );
}
