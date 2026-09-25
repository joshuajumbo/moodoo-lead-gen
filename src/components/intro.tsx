/** Stagger delay for the on-load intro classes in globals.css. */
export const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as React.CSSProperties;

/** One masked headline line that rises into place on load. */
export function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="intro-line">
      <span style={d(delay)}>{children}</span>
    </span>
  );
}

/*
 * Sequence (ms) — one expo-out curve, done by ~1.4s:
 *   nav 0 · eyebrow 80 · headline lines 160/230/300/370 · phone 260
 *   body 520 · CTA 620 · social proof 700 · chips 800/900
 */
export const INTRO = { nav: 0, eyebrow: 80, lines: [160, 230, 300, 370], phone: 260, body: 520, cta: 620, proof: 700, chips: [800, 900] };
