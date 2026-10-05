import type { Metadata, Viewport } from "next";
import { manrope, dmSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moodoo — Understand how your team feels. Know what to do next.",
  description:
    "Moodoo gives teams a simple way to check in, while helping people leaders understand patterns in mood, energy and team experience. Join early access.",
  openGraph: {
    title: "Moodoo — The emotional pulse of your workplace",
    description: "Know when a team may need support, inspiration, recognition or simply a reason to celebrate.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffeac0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
