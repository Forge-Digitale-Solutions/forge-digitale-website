import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "tiktok_admin";
export const OAUTH_STATE_COOKIE = "tiktok_oauth_state";

export function safeEqual(left: string, right: string): boolean {
  const a = createHash("sha256").update(left).digest();
  const b = createHash("sha256").update(right).digest();
  return timingSafeEqual(a, b);
}

export function adminCookieValue(secret: string): string {
  return createHmac("sha256", secret).update("tiktok-admin-v1").digest("hex");
}

export function readCookie(request: Request, name: string): string {
  const header = request.headers.get("cookie") ?? "";
  for (const part of header.split(";")) {
    const separator = part.indexOf("=");
    if (separator === -1) continue;
    const key = part.slice(0, separator).trim();
    if (key !== name) continue;
    return decodeURIComponent(part.slice(separator + 1).trim());
  }
  return "";
}

export function cookieBase(): {
  httpOnly: true;
  sameSite: "lax";
  secure: boolean;
  path: string;
} {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  };
}
