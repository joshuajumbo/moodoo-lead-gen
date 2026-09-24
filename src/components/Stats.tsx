/**
 * Burnout stats (801:257562). 1440 × 723 on sage, navy dot field.
 * The chart is composed from the section's own vectors (805:264785–91), each
 * placed at its Figma render bounds relative to a (830, 30) origin.
 */
export function Stats() {
  return (
    <section
      id="why-moodoo"
      data-nav-tint="#dfe4da"
      className="relative h-[723px] scroll-mt-[96px] overflow-hidden bg-sage text-white"
      aria-labelledby="stats-title"
    >
      <div aria-hidden className="dot-field" style={{ ["--dot" as string]: "#244b65" }} />
      <div className="relative h-full w-[1440px]" style={{ marginLeft: "calc(50% - 720px)" }}>
        {/* quote glyph 805:264777 */}
        <svg aria-hidden className="absolute left-[102.16px] top-[126.88px]" width="28" height="30" viewBox="0 0 28 30" fill="none">
          <path d="M10.8398 1.12L3.83984 25.12" stroke="white" strokeWidth="8" />
          <path d="M23.8398 4.12L16.8398 28.12" stroke="white" strokeWidth="8" />
        </svg>

        <blockquote className="absolute left-[140px] top-[125px] w-[549px]">
          <p id="stats-title" className="text-[40px] font-bold leading-[50px] tracking-[-0.6px]">
            The emotional experience of work is often invisible but the data shows it matters.
          </p>
          <footer className="absolute left-0 top-[182px] whitespace-nowrap text-[18px] font-bold leading-[26.4px] tracking-[-0.6px] text-white/80">
            Source:{"\u00a0\u00a0"}
            <cite className="not-italic">Gallup, State of the Global Workplace 2026</cite>. Data collected in 2025
          </footer>
        </blockquote>

        <GrowthChart />

        <dl id="statistics" className="absolute left-[140px] top-[464px] flex scroll-mt-[160px] gap-[100px]">
          {[
            { v: "40%", d: <>of employees globally experienced significant<br />stress the previous day</> },
            { v: "22%", d: <>of employees globally experienced loneliness<br />the previous day</> },
          ].map((s) => (
            <div key={s.v} className="flex w-[356px] flex-col-reverse gap-[32px]">
              <dd className="text-[16px] leading-[26px]">{s.d}</dd>
              <dt className="text-[64px] font-bold leading-[50px] tracking-[-0.6px]">{s.v}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function GrowthChart() {
  const O = { x: 830, y: 30 };
  const at = (x: number, y: number) => `translate(${(x - O.x).toFixed(2)} ${(y - O.y).toFixed(2)})`;
  return (
    <svg aria-hidden className="absolute" style={{ left: O.x, top: O.y }} width="500" height="335" viewBox="0 0 500 335" fill="none">
      <defs>
        <linearGradient id="growth-fill" x1="231" y1="0" x2="231" y2="402" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DEB23D" />
          <stop offset="1" stopColor="#F8F6F0" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* area under curve — Vector 10 */}
      <path
        transform={at(846, 44.5)}
        d="M48.3367 298.5C29.6618 299.524 13.1553 299.375 0 298.5H48.3367C125.719 294.257 240.331 269.87 308 193.5C392 98.7 445.667 25 462 0V298.5H48.3367Z"
        fill="url(#growth-fill)"
        fillOpacity="0.34"
      />
      {/* baseline — Vector 8 */}
      <path transform={at(841, 340)} d="M0 4H467" stroke="#F8F6F0" strokeOpacity="0.34" strokeWidth="8" />
      {/* curve — Vector 11 */}
      <path transform={at(841.03, 36.99)} d="M0.469238 304.505C295.008 339.3 436 39.8014 465.969 2.50549" stroke="#DEB23D" strokeWidth="8" />
      {/* ticks — Vectors 13, 12, 14 */}
      <path transform={at(1285, 36.01)} d="M0 4L38 4" stroke="#F8F6F0" strokeWidth="8" />
      <path transform={at(834.5, 321.5)} d="M4 0V38" stroke="#F8F6F0" strokeWidth="8" />
      <path transform={at(1304.5, 321.5)} d="M4 0V38" stroke="#F8F6F0" strokeWidth="8" />
    </svg>
  );
}
