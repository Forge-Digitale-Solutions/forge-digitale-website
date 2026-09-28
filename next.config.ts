import type { NextConfig } from "next";

// `.htaccess` is not read by `next start`. These headers keep the agent-ready
// signals that Apache used to send on every response (OVH static export).
const AGENT_LINK =
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json", </llms.txt>; rel="describedby"; type="text/plain", </sitemap.xml>; rel="describedby"; type="application/xml", </auth.md>; rel="describedby"; type="text/markdown", </.well-known/agent-skills/index.json>; rel="describedby"; type="application/json", </.well-known/ai-catalog.json>; rel="describedby"; type="application/json"';

const discoveryCache = [
  { key: "Cache-Control", value: "no-cache, max-age=0, must-revalidate" },
];

const corsRead = [
  { key: "Access-Control-Allow-Origin", value: "*" },
  { key: "Access-Control-Allow-Methods", value: "GET, HEAD, OPTIONS" },
  { key: "Access-Control-Allow-Headers", value: "Accept, Content-Type" },
];

const nextConfig: NextConfig = {
  trailingSlash: true,
  // Next prepends a priority redirect that adds the slash before user rules,
  // so `/services` became `/services/` and only then `/`. Own the slash in
  // `src/proxy.ts` and point legacy sources at the final URL in one hop.
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Link", value: AGENT_LINK },
          {
            key: "Content-Signal",
            value: "search=yes, ai-input=yes, ai-train=no",
          },
          { key: "Vary", value: "Accept" },
        ],
      },
      {
        source: "/:path*.md",
        headers: [
          { key: "Content-Type", value: "text/markdown; charset=utf-8" },
        ],
      },
      {
        source: "/.well-known/api-catalog",
        headers: [
          {
            key: "Content-Type",
            value: "application/linkset+json; charset=utf-8",
          },
          ...discoveryCache,
        ],
      },
      { source: "/robots.txt", headers: discoveryCache },
      { source: "/llms.txt", headers: discoveryCache },
      { source: "/auth.md", headers: discoveryCache },
      {
        source: "/api/public/site.json",
        headers: [
          { key: "Content-Type", value: "application/json; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=3600" },
          ...corsRead,
        ],
      },
      {
        source: "/.well-known/ai-catalog.json",
        headers: [
          { key: "Content-Type", value: "application/json; charset=utf-8" },
          ...corsRead,
        ],
      },
      {
        source: "/.well-known/agent-skills/index.json",
        headers: [
          { key: "Content-Type", value: "application/json; charset=utf-8" },
          ...corsRead,
        ],
      },
    ];
  },
  async redirects() {
    // Path 301s that lived in public/.htaccess. www / HTTP→HTTPS stay on the
    // reverse proxy (Dokploy / Traefik): doing them here loops behind TLS
    // termination.
    return [
      {
        source: "/atelier-saint-laurent-medoc/",
        destination: "/rendez-vous-saint-laurent-medoc/",
        permanent: true,
      },
      {
        source: "/atelier-saint-laurent-medoc.html",
        destination: "/rendez-vous-saint-laurent-medoc/",
        permanent: true,
      },
      {
        source: "/atelier-saint-laurent-medoc/index.html",
        destination: "/rendez-vous-saint-laurent-medoc/",
        permanent: true,
      },
      {
        source: "/services/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/pack-agent-ready/",
        destination: "/services/agent-ready/",
        permanent: true,
      },
      {
        source: "/about/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/contact/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/realisations/",
        destination: "/",
        permanent: true,
      },
      {
        // Keep GSC verification and the Apache 404 document on their .html URL.
        // `$` is the end of the path, so only those two files are excluded.
        source:
          "/:path((?!googlee61c0f8344857e94\\.html\\/?$|404\\.html\\/?$).*)\\.html",
        destination: "/:path/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
