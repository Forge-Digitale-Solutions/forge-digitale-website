import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { Reviews } from "@/components/sections/Reviews";
import { GridDivider } from "@/components/ui/section";
import { getGoogleReviews } from "@/lib/google-reviews";

export default async function Home() {
  const reviewsData = await getGoogleReviews();

  return (
    <div className="min-h-screen bg-bg">
      <Hero />
      <Services />
      <GridDivider />
      <Portfolio />
      <GridDivider />
      <About />
      <GridDivider />
      <Faq />
      <GridDivider />
      <Contact />
      <GridDivider />
      <Reviews data={reviewsData} />
    </div>
  );
}
