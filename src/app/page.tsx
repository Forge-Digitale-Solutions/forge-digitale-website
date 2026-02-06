import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-base">
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Contact />
    </div>
  );
}
