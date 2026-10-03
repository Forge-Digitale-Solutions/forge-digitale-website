import { NextResponse } from "next/server";
import { getPostMarkdown } from "@/lib/posts";

export const dynamic = "force-dynamic";

const markdownHeaders = {
  "Content-Type": "text/markdown; charset=utf-8",
  Vary: "Accept",
};

type Context = { params: Promise<{ slug: string }> };

async function respond(slug: string, head: boolean) {
  const body = await getPostMarkdown(slug);
  if (!body) {
    return new NextResponse(head ? null : "Not found\n", {
      status: 404,
      headers: markdownHeaders,
    });
  }
  return new NextResponse(head ? null : body, {
    status: 200,
    headers: markdownHeaders,
  });
}

export async function GET(_request: Request, context: Context) {
  const { slug } = await context.params;
  return respond(slug, false);
}

export async function HEAD(_request: Request, context: Context) {
  const { slug } = await context.params;
  return respond(slug, true);
}
