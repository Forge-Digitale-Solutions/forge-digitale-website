import { MetadataRoute } from "next";
import { getSortedPostsData } from "@/lib/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://forgedigitalesolutions.com";

  const mainRoute = {
    url: `${baseUrl}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
  };

  const blogRoute = {
    url: `${baseUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  };

  const legalRoutes = ["/cgv", "/mentions-legales", "/confidentialite"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    }),
  );

  const posts = getSortedPostsData();
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [mainRoute, blogRoute, ...legalRoutes, ...blogRoutes];
}
