"use client";

import { useEffect, useRef, useState } from "react";
import { STATS, useStatFocus, type StatId } from "./StatFocus";

/*
 * Burnout curve (Figma 805:264785–91), composed in a 500 × 335 box whose origin
 * is the section's (830, 30). The chart is illustrative, so it carries no
 * invented values: the only points on it are the section's two real figures,
 * placed where the curve reaches 22% and 40% of its height (baseline y 314 →
 * top cap y 10). Positions were solved from the Bézier numerically.
 */
const MARKERS: Record<StatId, { x: number; y: number }> = {
  lonely: { x: 271.61, y: 247.12 },
  stress: { x: 338.49, y: 192.4 },
};

export function GrowthChart({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  const ref = useRef<SVGSVGElement>(null);
  const [shown, setShown] = useState(false);
  const [instant, setInstant] = useState(false);
  const [settled, setSettled] = useState(false); // first reveal finished → no more stagger delays
  const [k, setK] = useState(1); // 500 / rendered width: keeps labels ~13px on screen at any size

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const w = e.contentRect.width;
      if (w > 0) setK(Math.min(1.7, Math.max(1, 500 / w)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const { focus, setFocus } = useStatFocus();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setInstant(reduce); // reduced motion: appear complete, no drawing
        setShown(true);
        if (reduce) setSettled(true);
        else window.setTimeout(() => setSettled(true), 2100);
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const t = (ms: number, delay = 0) =>
    instant ? "none" : `all ${ms}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`;

  return (
    <svg
      ref={ref}
      role="img"
      aria-label="A curve rising steeply from a flat baseline, marking 22% of employees experiencing loneliness and 40% experiencing significant stress"
      className={className}
      style={style}
      width="500"
      height="335"
      viewBox="0 0 500 335"
      fill="none"
      overflow="visible"
    >
      <defs>
        <linearGradient id="growth-fill" x1="247" y1="14.5" x2="247" y2="416.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DEB23D" />
          <stop offset="1" stopColor="#F8F6F0" stopOpacity="0" />
        </linearGradient>
        <clipPath id="growth-reveal">
          <rect x="0" y="0" height="335" style={{ width: shown ? 500 : 0, transition: instant ? "none" : "width 1400ms cubic-bezier(0.65, 0, 0.35, 1) 300ms" }} />
        </clipPath>
      </defs>

      {/* area fill — wipes in behind the line */}
      <path
        clipPath="url(#growth-reveal)"
        d="M64.34 313C45.66 314.02 29.16 313.87 16 313H64.34C141.72 308.76 256.33 284.37 324 208C408 113.2 461.67 39.5 478 14.5V313H64.34Z"
        fill="url(#growth-fill)"
        fillOpacity="0.34"
      />
      {/* baseline + ticks */}
      <path d="M11 314H478" stroke="#F8F6F0" strokeOpacity="0.34" strokeWidth="8" />
      <path d="M8.5 291.5V329.5" stroke="#F8F6F0" strokeWidth="8" />
      <path d="M478.5 291.5V329.5" stroke="#F8F6F0" strokeWidth="8" />
      {/* top cap drops in as the line arrives */}
      <path
        d="M455 10L493 10"
        stroke="#F8F6F0"
        strokeWidth="8"
        style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(-10px)", transition: t(500, 1250) }}
      />
      {/* the curve draws itself */}
      <path
        d="M11.5 311.5C306.04 346.29 447.03 46.79 477 9.5"
        stroke="#DEB23D"
        strokeWidth="8"
        strokeLinecap="butt"
        pathLength={1}
        strokeDasharray="1"
        style={{ strokeDashoffset: shown ? 0 : 1, transition: instant ? "none" : "stroke-dashoffset 1400ms cubic-bezier(0.65, 0, 0.35, 1) 150ms" }}
      />

      {/* markers for the section's two figures */}
      {STATS.map((s, i) => {
        const m = MARKERS[s.id];
        const on = focus === s.id;
        const dim = focus !== null && !on;
        return (
          <g
            key={s.id}
            tabIndex={0}
            role="button"
            aria-label={`${s.value}% of employees experienced ${s.tag} the previous day`}
            aria-pressed={on}
            onPointerEnter={(e) => e.pointerType === "mouse" && setFocus(s.id)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setFocus(null)}
            onFocus={() => setFocus(s.id)}
            onBlur={() => setFocus(null)}
            onClick={() => setFocus(s.id)}
            className="cursor-pointer outline-none [&:focus-visible_.ring]:opacity-100"
            style={{ opacity: shown ? (dim ? 0.4 : 1) : 0, transition: t(450, settled ? 0 : 1350 + i * 140) }}
          >
            {/* guide to the baseline */}
            <line
              x1={m.x} y1={m.y + 10} x2={m.x} y2={308}
              stroke="#F8F6F0" strokeWidth="1.5" strokeDasharray="3 5" strokeLinecap="round"
              style={{ opacity: on ? 0.9 : 0.45, transition: t(250) }}
            />
            {/* generous invisible hit area for touch */}
            <circle cx={m.x} cy={m.y} r={22 * k} fill="transparent" />
            <circle className="ring opacity-0 transition-opacity duration-200" cx={m.x} cy={m.y} r={15 * k} stroke="#fff" strokeWidth={1.5 * k} />
            <circle
              cx={m.x} cy={m.y} r={(on ? 9 : 7) * k}
              fill="#F8F6F0" stroke="#95a38b" strokeWidth={3 * k}
              style={{ transition: t(250) }}
            />
            {/* label, sitting left of the marker, clear of the fill; scaled about the marker */}
            <g
              transform={`translate(${m.x} ${m.y}) scale(${k})`}
              style={{ opacity: on || focus === null ? 1 : 0, transition: t(250) }}
            >
              <g style={{ transform: on ? "translateX(-4px)" : "none", transition: t(250) }}>
                <rect x={-124} y={-15} width="104" height="30" rx="15" fill="#F8F6F0" />
                <text x={-72} y={5} textAnchor="middle" fill="#33353b" fontSize="13" fontWeight="700" style={{ fontFamily: "var(--font-manrope)" }}>
                  {s.value}% {s.tag === "loneliness" ? "lonely" : "stressed"}
                </text>
              </g>
            </g>
          </g>
        );
      })}
    </svg>
  );
}
