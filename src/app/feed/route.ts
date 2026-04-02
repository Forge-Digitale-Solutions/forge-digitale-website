import { getSortedPostsData } from "@/lib/posts";

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  const posts = getSortedPostsData();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Forge Digitale Solutions - Blog</title>
    <link>https://forgedigitalesolutions.com/blog</link>
    <description>Blog d'un expert numérique en Gironde. Web, hardware, Linux et conseils pour artisans du Médoc.</description>
    <language>fr-fr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://forgedigitalesolutions.com/feed" rel="self" type="application/rss+xml" />
    <image>
      <url>https://forgedigitalesolutions.com/images/og-image.jpg</url>
      <title>Forge Digitale Solutions</title>
      <link>https://forgedigitalesolutions.com</link>
    </image>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>https://forgedigitalesolutions.com/blog/${post.id}</link>
      <guid isPermaLink="true">https://forgedigitalesolutions.com/blog/${post.id}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <description>${escapeXml(post.excerpt)}</description>
      <author>contact@forgedigitalesolutions.com (Anthony Marcelin)</author>
      <content:encoded><![CDATA[
        <p>${escapeXml(post.excerpt)}</p>
        ${
          post.image
            ? `<img src="https://forgedigitalesolutions.com${post.image}" alt="${escapeXml(post.title)}" />`
            : ""
        }
        <p><a href="https://forgedigitalesolutions.com/blog/${post.id}">Lire l'article complet</a></p>
      ]]></content:encoded>
    </item>
    `,
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
