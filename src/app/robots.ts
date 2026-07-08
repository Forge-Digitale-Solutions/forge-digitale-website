import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // ponytail: fichiers RSC internes Next.js exportés (payloads de prefetch),
        // pas des pages — Google ne doit pas tenter de les indexer
        disallow: "/*__next",
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-Web",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://forgedigitalesolutions.com/sitemap.xml",
  };
}
