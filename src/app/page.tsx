import { Nav } from "@/components/Nav";
import { HeroWhatStage } from "@/components/HeroWhatStage";
import { Stats } from "@/components/Stats";
import { Personas } from "@/components/Personas";
import { Mandalas } from "@/components/Mandalas";
import { Waitlist } from "@/components/Waitlist";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroWhatStage />
        <Stats />
        <Personas />
        <Mandalas />
        <Waitlist />
      </main>
    </>
  );
}
