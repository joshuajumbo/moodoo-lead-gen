/**
 * The eight mandalas on the strip, placed on the mood grid (energy × pleasantness,
 * 1–10, cells 1–2 … 9–10) supplied by the designer. Colour and glyph are the
 * cell's; handle positions derive from the cell centre: fraction = (v − 0.5)/10,
 * which reproduces Figma's high/mid/low check-in variants (≈0.1/0.5/0.9).
 */
export const MANDALAS = [
  { n: 1, color: "#807766", pleasant: 5.5, energy: 5.5 },
  { n: 2, color: "#747D7A", pleasant: 5.5, energy: 3.5 },
  { n: 3, color: "#304767", pleasant: 1.5, energy: 1.5 },
  { n: 4, color: "#3C3D5D", pleasant: 1.5, energy: 3.5 },
  { n: 5, color: "#433557", pleasant: 1.5, energy: 5.5 },
  { n: 6, color: "#854633", pleasant: 3.5, energy: 9.5 },
  { n: 7, color: "#C4BD74", pleasant: 9.5, energy: 5.5 },
  { n: 8, color: "#F8A706", pleasant: 9.5, energy: 9.5 },
] as const;

export const frac = (v: number) => (v - 0.5) / 10;

/** Conveyor rhythm: rest long enough to read a mandala, then one unhurried move. */
export const DWELL_MS = 2400;
export const MOVE_MS = 900;
export const MOVE_EASE = "cubic-bezier(0.65, 0, 0.35, 1)";
