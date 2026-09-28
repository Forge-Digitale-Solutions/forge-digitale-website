import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_DIR = path.join(process.cwd(), "public");

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

  const url = request.nextUrl.clone();
  url.pathname = target;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:jpg|jpeg|png|webp|svg|ico|woff2|css|js)$).*)",
  ],
};
