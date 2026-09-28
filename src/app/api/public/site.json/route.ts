import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

// More specific than Payload's /api/[...slug], so the public catalog stays
// on its existing URL.
export function GET() {
  const body = fs.readFileSync(
    path.join(process.cwd(), "public/api/public/site.json"),
    "utf8",
  );
  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
