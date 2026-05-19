import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { Reviews } from "@/components/sections/Reviews";
import { getGoogleReviews } from "@/lib/google-reviews";

export default async function Home() {
  const reviewsData = await getGoogleReviews();

  return (
    <div className="min-h-screen bg-dark-base">
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Faq />
      <Contact />
      <Reviews data={reviewsData} />
    </div>
  );
}
