import type { SocialProof as Proof } from "@/lib/social-proof";

/*
 * Avatar treatments by slot, from the hero in Figma (S, P, R, M).
 * Slot colour is positional, so the first sign-up always wears marigold.
 */
const SLOTS = [
  { c: "#e07f2a", bg: "rgb(255 157 72 / 0.13)", bd: "rgb(255 157 72 / 0.35)" },
  { c: "#2e7868", bg: "rgb(78 166 146 / 0.13)", bd: "rgb(78 166 146 / 0.35)" },
  { c: "#4f3e5e", bg: "rgb(109 89 122 / 0.13)", bd: "rgb(109 89 122 / 0.35)" },
  { c: "#043a4e", bg: "rgb(4 58 78 / 0.13)", bd: "rgb(4 58 78 / 0.35)" },
];

export function SocialProof({ total, initials }: Proof) {
  if (total === 0) {
    return (
      <p className="flex h-[30px] items-center text-[13px] leading-[19.5px] text-ink-soft/60">
        Be among the first on the list
      </p>
    );
  }

  return (
    <div className="flex h-[30px] items-center gap-[16px]">
      <div aria-hidden className="flex items-center">
        {initials.map((letter, i) => {
          const s = SLOTS[i];
          return (
            <span
              key={i}
              className="relative grid size-[30px] place-items-center rounded-full border text-[11px] font-bold leading-[16.5px] tracking-[0.11px]"
              style={{
                color: s.c,
                background: s.bg,
                borderColor: s.bd,
                marginRight: i < initials.length - 1 ? -8 : 0,
                boxShadow: "0 0 0 1.5px #e8f0e5",
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>
      <p className="text-[13px] leading-[19.5px] text-ink-soft">
        <span className="font-bold tabular-nums">{total.toLocaleString("en-US")}</span>
        <span className="text-ink-soft/60"> already on the list</span>
      </p>
    </div>
  );
}
