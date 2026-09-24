import type { Metadata, Viewport } from "next";
import { manrope, dmSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moodoo — Understand how your team feels",
  description:
    "Moodoo helps teams check in, understand their emotional patterns, and make space for better ways of working. Join early access.",
  openGraph: {
    title: "Moodoo — Your team's mood, made visible",
    description: "Simple, everyday check-ins that help teams understand how work feels.",
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
