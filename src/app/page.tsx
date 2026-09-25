import { Nav } from "@/components/Nav";
import { HeroWhatStage } from "@/components/HeroWhatStage";
import { Stats } from "@/components/Stats";
import { Personas } from "@/components/Personas";
import { Mandalas } from "@/components/Mandalas";
import { Waitlist } from "@/components/Waitlist";
import { FluidHero } from "@/components/fluid/FluidHero";
import { FluidWhat } from "@/components/fluid/FluidWhat";
import { FluidStats } from "@/components/fluid/FluidStats";
import { FluidPersonas } from "@/components/fluid/FluidPersonas";
import { FluidMandalas } from "@/components/fluid/FluidMandalas";
import { getSocialProof } from "@/lib/social-proof";

/** Static page; refreshed on every sign-up (see joinWaitlist) with a 5-minute safety net. */
export const revalidate = 300;

/*
 * ≥1280px renders the pinned, pixel-faithful Figma composition; below that each
 * section has a purpose-built fluid layout. Exactly one of each pair is
 * displayed (CSS), so there is no layout shift and no duplicate ids.
 */
export default async function Home() {
  const proof = await getSocialProof();
  return (
    <>
      <span id="top" aria-hidden className="absolute top-0" />
      <Nav />
      <main>
        <HeroWhatStage proof={proof} />
        <FluidHero proof={proof} />
        <FluidWhat />
        <Stats />
        <FluidStats />
        <Personas />
        <FluidPersonas />
        <Mandalas />
        <FluidMandalas />
        <Waitlist />
      </main>
    </>
  );
}
