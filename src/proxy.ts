import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_DIR = path.join(process.cwd(), "public");

// Final URLs for legacy paths. Checked with and without a trailing slash so
// `/services` does not stop at `/services/` before the next.config 308.
// Keep in sync with the sources in `next.config.ts`.
const LEGACY_REDIRECTS: Record<string, string> = {
  "/services": "/",
  "/pack-agent-ready": "/services/agent-ready/",
  "/about": "/",
  "/contact": "/",
  "/realisations": "/",
  "/atelier-saint-laurent-medoc": "/rendez-vous-saint-laurent-medoc/",
  "/atelier-saint-laurent-medoc.html": "/rendez-vous-saint-laurent-medoc/",
  "/atelier-saint-laurent-medoc/index.html":
    "/rendez-vous-saint-laurent-medoc/",
};

function legacyTarget(pathname: string): string | null {
  if (LEGACY_REDIRECTS[pathname]) return LEGACY_REDIRECTS[pathname];
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return LEGACY_REDIRECTS[pathname.slice(0, -1)] ?? null;
  }
  return null;
}

function isWellKnown(pathname: string): boolean {
  return pathname === "/.well-known" || pathname.startsWith("/.well-known/");
}

function hasFileExtension(pathname: string): boolean {
  const last = pathname.slice(pathname.lastIndexOf("/") + 1);
  return last.includes(".");
}

function redirectTo(request: NextRequest, pathname: string) {
  const url = new URL(request.url);
  url.pathname = pathname;
  return NextResponse.redirect(url, 308);
}

function normalizePath(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl;
  const legacy = legacyTarget(pathname);
  if (legacy && legacy !== pathname) {
    return redirectTo(request, legacy);
  }

  if (isWellKnown(pathname)) return null;

  if (
    pathname.length > 1 &&
    pathname.endsWith("/") &&
    hasFileExtension(pathname.slice(0, -1))
  ) {
    return redirectTo(request, pathname.slice(0, -1));
  }

  if (!pathname.endsWith("/") && !hasFileExtension(pathname)) {
    return redirectTo(request, `${pathname}/`);
  }

  return null;
}

function markdownTarget(pathname: string): string | null {
  const clean = pathname.replace(/^\/+|\/+$/g, "");
  const candidates = [
    path.join(PUBLIC_DIR, clean, "index.md"),
    path.join(PUBLIC_DIR, `${clean}.md`),
  ];

  for (const file of candidates) {
    const resolved = path.resolve(/*turbopackIgnore: true*/ file);
    if (
      !resolved.startsWith(PUBLIC_DIR + path.sep) &&
      resolved !== path.join(PUBLIC_DIR, "index.md")
    ) {
      continue;
    }
    if (
      fs.existsSync(/*turbopackIgnore: true*/ resolved) &&
      fs.statSync(/*turbopackIgnore: true*/ resolved).isFile()
    ) {
      const rel = path.relative(PUBLIC_DIR, resolved).split(path.sep).join("/");
      return `/${rel}`;
    }
  }

  return null;
}

export function proxy(request: NextRequest) {
  const normalized = normalizePath(request);
  if (normalized) return normalized;

  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next();
  }
  if (
    request.headers.get("rsc") ||
    request.headers.has("next-router-prefetch") ||
    request.headers.has("next-router-segment-prefetch")
  ) {
    return NextResponse.next();
  }

  const accept = request.headers.get("accept") ?? "";
  if (!accept.toLowerCase().includes("text/markdown")) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  if (pathname.endsWith(".md")) {
    return NextResponse.next();
  }

  const target = markdownTarget(pathname);
  if (!target) {
    return NextResponse.next();
  }

  // `nextUrl` follows `trailingSlash` and would turn `/index.md` into
  // `/index.md/`, which then 308s back to the file.
  const url = new URL(request.url);
  url.pathname = target;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:jpg|jpeg|png|webp|svg|ico|woff2|css|js)$).*)",
  ],
};
