import { MetadataRoute } from "next";
import { getSortedPostsData } from "@/lib/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://forgedigitalesolutions.com";
  const posts = getSortedPostsData();

  const mainRoute = {
    url: `${baseUrl}`,
    lastModified: new Date("2026-05-19"),
    changeFrequency: "monthly" as const,
    priority: 1,
  };

  const blogRoute = {
    url: `${baseUrl}/blog`,
    lastModified: new Date("2026-07-19"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  };

  const legalRoutes = ["/cgv", "/mentions-legales", "/confidentialite"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date("2026-07-19"),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    }),
  );

  const servicePages = [
    { route: "/creation-site-web", lastModified: "2026-06-02" },
    { route: "/developpeur-medoc", lastModified: "2026-06-02" },
    { route: "/maintenance-site-web", lastModified: "2026-06-02" },
    { route: "/installation-linux", lastModified: "2026-06-17" },
    { route: "/montage-pc", lastModified: "2026-06-02" },
  ].map(
    ({ route, lastModified }) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(lastModified),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }),
  );

  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.lastModified || post.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // trailingSlash: true -> le sitemap doit matcher les canonical (slash final)
  return [
    mainRoute,
    ...servicePages,
    blogRoute,
    ...legalRoutes,
    ...blogRoutes,
  ].map((r) => ({ ...r, url: r.url.endsWith("/") ? r.url : `${r.url}/` }));
}
