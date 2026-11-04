import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { OAUTH_STATE_COOKIE, cookieBase } from "@/lib/tiktok/admin";
import { defaultTokenDir } from "@/lib/tiktok/config";
import { redirectPlanner, requireReady } from "@/lib/tiktok/http";
import {
  buildAuthorizeUrl,
  codeChallengeS256,
  generateCodeVerifier,
} from "@/lib/tiktok/pkce";
import { writePending } from "@/lib/tiktok/store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const ready = requireReady(request);
  if (ready instanceof Response) {
    return redirectPlanner(request, ready.status === 401 ? "error=auth" : "error=config");
  }
  const state = randomBytes(16).toString("hex");
  const codeVerifier = generateCodeVerifier();
  await writePending(defaultTokenDir(), ready.config.tokenKey, {
    state,
    codeVerifier,
    expiresAt: Date.now() + 10 * 60 * 1000,
  });
  const response = NextResponse.redirect(
    buildAuthorizeUrl({
      clientKey: ready.config.clientKey,
      redirectUri: ready.config.redirectUri,
      state,
      codeChallenge: codeChallengeS256(codeVerifier),
    }),
  );
  response.cookies.set(OAUTH_STATE_COOKIE, state, {
    ...cookieBase(),
    maxAge: 600,
  });
  return response;
}
