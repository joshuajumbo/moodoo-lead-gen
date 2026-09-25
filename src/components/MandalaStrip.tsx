/**
 * Mandala tiles either side of a centred gap for the phone. Figma shows tiles
 * 1–4 | gap | 5–8 on the 1440 frame; the strip continues the colour cycle
 * outward (5–8 before 1, 1–4 after 8) so any viewport width is filled edge to
 * edge. Size, gutter and gap come from CSS vars so each breakpoint can retune it:
 *   --t tile, --g gutter, --sp gap (Figma: 159 / 4 / 183 → 191 with gutters)
 */
const SIDE = [5, 6, 7, 8, 1, 2, 3, 4];

export function MandalaStrip({ className = "" }: { className?: string }) {
  const tile = (n: number, key: string) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img key={key} src={`/img/mandalas/mandala-${n}.svg`} alt="" width={159} height={159} className="size-[var(--t)] shrink-0" />
  );
  return (
    <div aria-hidden className={`flex w-max gap-[var(--g)] ${className}`}>
      {SIDE.map((n, i) => tile(n, `l${i}`))}
      <span className="w-[var(--sp)] shrink-0" />
      {SIDE.map((n, i) => tile(n, `r${i}`))}
    </div>
  );
}
