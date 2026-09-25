"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { DWELL_MS, MANDALAS, MOVE_MS } from "@/content/mandalas";

/**
 * One beat = the strip moves one slot to the right. The tile left of the phone
 * slides under it and becomes the screen; the screen's mandala exits right as
 * the first tile after the phone. Runs only while the strip is on screen, the
 * tab is visible, motion is allowed, and the visitor hasn't paused it.
 */
type Cycle = {
  step: number;
  phone: number; // index into MANDALAS currently in the phone
  paused: boolean;
  canAnimate: boolean;
  togglePause: () => void;
  setVisible: (v: boolean) => void;
};

const Ctx = createContext<Cycle | null>(null);
export const N = MANDALAS.length;
export const mod = (a: number, n: number) => ((a % n) + n) % n;

export function MandalaCycle({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [canAnimate, setCanAnimate] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setCanAnimate(!mq.matches);
    const onVis = () => setTabVisible(!document.hidden);
    mq.addEventListener("change", onMq);
    document.addEventListener("visibilitychange", onVis);
    const id = requestAnimationFrame(() => {
      onMq();
      onVis();
    });
    return () => {
      cancelAnimationFrame(id);
      mq.removeEventListener("change", onMq);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const running = visible && tabVisible && canAnimate && !paused;

  useEffect(() => {
    if (!running) return;
    // first move after a full dwell, then one beat per dwell + move
    timer.current = window.setTimeout(function tick() {
      setStep((s) => s + 1);
      timer.current = window.setTimeout(tick, DWELL_MS + MOVE_MS);
    }, DWELL_MS);
    return () => window.clearTimeout(timer.current);
  }, [running]);

  const togglePause = useCallback(() => setPaused((p) => !p), []);

  return (
    <Ctx.Provider value={{ step, phone: mod(-step, N), paused, canAnimate, togglePause, setVisible }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCycle() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCycle must be used inside <MandalaCycle>");
  return c;
}
