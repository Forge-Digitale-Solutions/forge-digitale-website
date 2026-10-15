import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { Reviews } from "@/components/sections/Reviews";
import { HomeBlog } from "@/components/sections/HomeBlog";
import { GridDivider } from "@/components/ui/section";
import { getGoogleReviews } from "@/lib/google-reviews";
import { getSortedPostsData } from "@/lib/posts";

export const revalidate = 300;

export default async function Home() {
  const [reviewsData, posts] = await Promise.all([
    getGoogleReviews(),
    getSortedPostsData(),
  ]);
  const latestPosts = posts.slice(0, 3);
  const latestPost = latestPosts[0]
    ? { id: latestPosts[0].id, title: latestPosts[0].title }
    : null;

  return (
    <div className="min-h-screen bg-bg">
      <Hero latestPost={latestPost} />
      <GridDivider />
      <Services />
      <GridDivider />
      <Portfolio />
      <GridDivider />
      <HomeBlog posts={latestPosts} />
      {latestPosts.length > 0 ? <GridDivider /> : null}
      <About />
      <GridDivider />
      <FAQSchema />
      <Faq />
      <GridDivider />
      <Contact />
      <GridDivider />
      <Reviews data={reviewsData} />
    </div>
  );
}
