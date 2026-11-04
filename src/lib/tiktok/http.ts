import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  OAUTH_STATE_COOKIE,
  adminCookieValue,
  cookieBase,
  readCookie,
  safeEqual,
} from "@/lib/tiktok/admin";
import { readTikTokConfig, type TikTokConfig } from "@/lib/tiktok/config";

export function jsonNoindex(body: unknown, status = 200): Response {
  return Response.json(body, {
    status,
    headers: {
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "no-store",
    },
  });
}

export function plannerUrl(request: Request, query = ""): URL {
  const url = new URL("/gameplaydev-planner/", request.url);
  if (query) url.search = query.startsWith("?") ? query.slice(1) : query;
  return url;
}

function bearerToken(request: Request): string {
  const value = request.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(\S+)$/i.exec(value);
  return match?.[1] ?? "";
}

export function adminSecret(): string {
  return process.env.TIKTOK_ADMIN_SECRET?.trim() ?? "";
}

export function isAdminRequest(request: Request, secret: string): boolean {
  if (!secret) return false;
  const header = request.headers.get("x-tiktok-admin-secret")?.trim() ?? "";
  const bearer = bearerToken(request);
  const cookie = readCookie(request, ADMIN_COOKIE);
  if (header && safeEqual(header, secret)) return true;
  if (bearer && safeEqual(bearer, secret)) return true;
  return cookie !== "" && safeEqual(cookie, adminCookieValue(secret));
}

export function requireAdmin(request: Request): { secret: string } | Response {
  const secret = adminSecret();
  if (!secret) return jsonNoindex({ ok: false, message: "Configuration incomplète" }, 503);
  if (!isAdminRequest(request, secret)) {
    return jsonNoindex({ ok: false, message: "Non autorisé" }, 401);
  }
  return { secret };
}

export function requireReady(
  request: Request,
): { config: TikTokConfig } | Response {
  const admin = requireAdmin(request);
  if (admin instanceof Response) return admin;
  const config = readTikTokConfig();
  if (!config) return jsonNoindex({ ok: false, message: "Configuration incomplète" }, 503);
  return { config };
}

export function redirectPlanner(request: Request, query = ""): NextResponse {
  return NextResponse.redirect(plannerUrl(request, query));
}

export function withAdminCookie(response: NextResponse, secret: string): NextResponse {
  response.cookies.set(ADMIN_COOKIE, adminCookieValue(secret), {
    ...cookieBase(),
    maxAge: 60 * 60 * 12,
  });
  return response;
}

export function clearOauthCookie(response: NextResponse): NextResponse {
  response.cookies.set(OAUTH_STATE_COOKIE, "", {
    ...cookieBase(),
    maxAge: 0,
  });
  return response;
}
