import { OAUTH_STATE_COOKIE, readCookie, safeEqual } from "@/lib/tiktok/admin";
import { defaultTokenDir } from "@/lib/tiktok/config";
import { TikTokApiError } from "@/lib/tiktok/errors";
import {
  clearOauthCookie,
  redirectPlanner,
  requireReady,
} from "@/lib/tiktok/http";
import { exchangeAuthorizationCode } from "@/lib/tiktok/oauth";
import { clearPending, readPending, writeToken } from "@/lib/tiktok/store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const ready = requireReady(request);
  if (ready instanceof Response) {
    return redirectPlanner(request, ready.status === 401 ? "error=auth" : "error=config");
  }
  const current = new URL(request.url);
  const oauthError = current.searchParams.get("error");
  if (oauthError) {
    console.error("TikTok OAuth", oauthError);
    return redirectPlanner(request, "error=refus");
  }
  const code = current.searchParams.get("code") ?? "";
  const state = current.searchParams.get("state") ?? "";
  const cookieState = readCookie(request, OAUTH_STATE_COOKIE);
  if (!code || !state || !cookieState || !safeEqual(state, cookieState)) {
    return clearOauthCookie(redirectPlanner(request, "error=state"));
  }

  const dir = defaultTokenDir();
  let pending;
  try {
    pending = await readPending(dir, ready.config.tokenKey);
  } catch (error) {
    console.error(
      "TikTok OAuth",
      error instanceof TikTokApiError ? error.code : "pending",
    );
    return clearOauthCookie(redirectPlanner(request, "error=jeton"));
  }
  if (!pending || pending.expiresAt < Date.now() || !safeEqual(pending.state, state)) {
    return clearOauthCookie(redirectPlanner(request, "error=state"));
  }

  try {
    const record = await exchangeAuthorizationCode({
      code,
      codeVerifier: pending.codeVerifier,
      clientKey: ready.config.clientKey,
      clientSecret: ready.config.clientSecret,
      redirectUri: ready.config.redirectUri,
    });
    await writeToken(dir, ready.config.tokenKey, record);
  } catch (error) {
    console.error(
      "TikTok OAuth",
      error instanceof TikTokApiError ? error.code : "exchange",
    );
    return clearOauthCookie(redirectPlanner(request, "error=jeton"));
  } finally {
    await clearPending(dir).catch(() => undefined);
  }
  return clearOauthCookie(redirectPlanner(request, "connected=1"));
}
