import localFont from "next/font/local";

/**
 * Self-hosted (Fontsource, OFL) so builds are deterministic and no request
 * leaves for Google at runtime. Manrope carries the whole page; DM Sans is used
 * once, for the "Stay Updated" pill, at the optical size Figma specifies (opsz 14).
 */
export const manrope = localFont({
  src: [
    { path: "../fonts/manrope-latin.woff2", weight: "200 800", style: "normal" },
    { path: "../fonts/manrope-latin-ext.woff2", weight: "200 800", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const dmSans = localFont({
  src: [{ path: "../fonts/dm-sans-latin.woff2", weight: "100 1000", style: "normal" }],
  variable: "--font-dm-sans",
  display: "swap",
  preload: false,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});
