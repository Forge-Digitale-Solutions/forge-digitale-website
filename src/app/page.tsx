import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617]">
      {" "}
      <Hero />
      <Services />
      <Portfolio />
      <Contact />
    </main>
  );
}
