import { Nav } from "@/components/Nav";
import { HeroWhatStage } from "@/components/HeroWhatStage";
import { Stats } from "@/components/Stats";
import { Personas } from "@/components/Personas";
import { Mandalas } from "@/components/Mandalas";
import { Waitlist } from "@/components/Waitlist";
import { getSocialProof } from "@/lib/social-proof";

/** Static page; refreshed on every sign-up (see joinWaitlist) with a 5-minute safety net. */
export const revalidate = 300;

export default async function Home() {
  const proof = await getSocialProof();
  return (
    <>
      <Nav />
      <main>
        <HeroWhatStage proof={proof} />
        <Stats />
        <Personas />
        <Mandalas />
        <Waitlist />
      </main>
    </>
  );
}
