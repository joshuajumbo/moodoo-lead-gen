"use client";

import { motion, type MotionValue } from "motion/react";
import type { Chip } from "@/content/moodoo";

/** "Background+Border+OverlayBlur" — 220 × 56 glass chip (801:154459). */
export function GlassChip({
  bg,
  className = "",
  style,
  children,
}: {
  bg: string | MotionValue<string>;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={`absolute h-[56px] w-[220px] rounded-[10px] border border-white/10 backdrop-blur-[6px] ${className}`}
      style={{
        backgroundColor: bg,
        boxShadow: "0 28px 56px -22px rgb(0 0 0 / 0.6), inset 0 1px 0 1px rgb(255 255 255 / 0.08)",
        ...style,
      }}
    >
      <div
        className="absolute left-[14px] top-1/2 grid size-[32px] -translate-y-1/2 place-items-center rounded-[10px]"
        style={{ backgroundImage: "linear-gradient(150deg, #e3c804 0%, #f8a706 100%)", boxShadow: "0 6px 14px -6px rgb(255 157 72 / 0.67)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/icons/chip-icon.svg" alt="" width={15} height={15} />
      </div>
      {children}
    </motion.div>
  );
}

/** Role + name text layer; stack several and fade between them to morph a chip. */
export function ChipText({ role, name, label, opacity }: Pick<Chip, "role" | "name" | "label"> & { opacity?: MotionValue<number> }) {
  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <p
        className="absolute left-[56px] right-[42px] top-[calc(50%-9px)] -translate-y-1/2 overflow-hidden whitespace-nowrap text-[9px] font-bold uppercase leading-[10.35px] tracking-[1.62px]"
        style={{ color: label }}
      >
        {role}
      </p>
      <p className="absolute left-[56px] right-[20px] top-[calc(50%+6.18px)] -translate-y-1/2 truncate text-[12.5px] font-semibold leading-[15.63px] tracking-[-0.062px] text-mist">
        {name}
      </p>
    </motion.div>
  );
}

/**
 * A stack of persona faces; `active` picks one. The outgoing face lifts out,
 * then the incoming one rises in after a short beat, so text never overlaps.
 */
export function ChipFaces({ chips, active, opacity }: { chips: Chip[]; active: number; opacity?: MotionValue<number> }) {
  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      {chips.map((c, i) => {
        const on = i === active;
        return (
          <div
            key={c.name}
            aria-hidden={!on}
            className="absolute inset-0"
            style={{
              opacity: on ? 1 : 0,
              translate: on ? "0 0" : i < active ? "0 -6px" : "0 6px",
              transition: on
                ? "opacity 320ms ease-out 140ms, translate 420ms var(--ease-expo) 140ms"
                : "opacity 160ms ease-in, translate 200ms ease-in",
            }}
          >
            <ChipText role={c.role} name={c.name} label={c.label} />
          </div>
        );
      })}
    </motion.div>
  );
}
