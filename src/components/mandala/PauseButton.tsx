"use client";

import { useCycle } from "./Cycle";

/** WCAG 2.2.2: anything that moves on its own for more than 5s must be pausable. */
export function PauseButton({ className = "" }: { className?: string }) {
  const { paused, togglePause, canAnimate } = useCycle();
  if (!canAnimate) return null;
  return (
    <button
      type="button"
      onClick={togglePause}
      aria-label={paused ? "Play mandala animation" : "Pause mandala animation"}
      aria-pressed={paused}
      className={`grid size-[36px] place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-[6px] transition-colors duration-200 hover:bg-white/20 focus-visible:!rounded-full ${className}`}
    >
      {paused ? (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
          <path d="M3 1.8v8.4a.6.6 0 0 0 .9.52l7.2-4.2a.6.6 0 0 0 0-1.04L3.9 1.28A.6.6 0 0 0 3 1.8Z" />
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
          <rect x="2.2" y="1.5" width="2.6" height="9" rx="0.9" />
          <rect x="7.2" y="1.5" width="2.6" height="9" rx="0.9" />
        </svg>
      )}
    </button>
  );
}
