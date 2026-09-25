"use client";

import { createContext, useContext, useState } from "react";

export type StatId = "stress" | "lonely";

export const STATS: { id: StatId; value: number; tag: string; body: [string, string] }[] = [
  { id: "stress", value: 40, tag: "stress", body: ["of employees globally experienced significant", "stress the previous day"] },
  { id: "lonely", value: 22, tag: "loneliness", body: ["of employees globally experienced loneliness", "the previous day"] },
];

const Ctx = createContext<{ focus: StatId | null; setFocus: (f: StatId | null) => void }>({ focus: null, setFocus: () => {} });

/** Links the two figures to their markers on the curve: hover/focus/tap either side. */
export function StatFocusProvider({ children }: { children: React.ReactNode }) {
  const [focus, setFocus] = useState<StatId | null>(null);
  return <Ctx.Provider value={{ focus, setFocus }}>{children}</Ctx.Provider>;
}

export const useStatFocus = () => useContext(Ctx);
