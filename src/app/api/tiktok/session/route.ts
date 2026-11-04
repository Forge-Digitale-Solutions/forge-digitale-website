import { NextResponse } from "next/server";
import { safeEqual } from "@/lib/tiktok/admin";
import {
  adminSecret,
  jsonNoindex,
  plannerUrl,
  redirectPlanner,
  withAdminCookie,
} from "@/lib/tiktok/http";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function wantsHtml(request: Request): boolean {
  const type = request.headers.get("content-type") ?? "";
  return !type.includes("application/json");
}

async function presentedSecret(request: Request): Promise<string> {
  const type = request.headers.get("content-type") ?? "";
  if (type.includes("application/json")) {
    try {
      const body = (await request.json()) as { secret?: unknown };
      return typeof body.secret === "string" ? body.secret : "";
    } catch {
      return "";
    }
  }
  const form = await request.formData();
  const value = form.get("secret");
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  const secret = adminSecret();
  const html = wantsHtml(request);
  if (!secret) {
    return html
      ? redirectPlanner(request, "error=config")
      : jsonNoindex({ ok: false, message: "Configuration incomplète" }, 503);
  }
  const presented = await presentedSecret(request);
  if (!presented || !safeEqual(presented, secret)) {
    return html
      ? redirectPlanner(request, "error=auth")
      : jsonNoindex({ ok: false, message: "Non autorisé" }, 401);
  }
  const response = html
    ? NextResponse.redirect(plannerUrl(request))
    : NextResponse.json(
        { ok: true },
        {
          headers: {
            "X-Robots-Tag": "noindex, nofollow",
            "Cache-Control": "no-store",
          },
        },
      );
  return withAdminCookie(response, secret);
}
