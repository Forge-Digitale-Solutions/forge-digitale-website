import path from "node:path";
import { parseTokenKey } from "@/lib/tiktok/crypto";
import { TikTokApiError } from "@/lib/tiktok/errors";

export type TikTokConfig = {
  clientKey: string;
  clientSecret: string;
  redirectUri: string;
  tokenKey: Buffer;
};

export function defaultTokenDir(): string {
  return path.join(process.cwd(), "media", ".tiktok");
}

export function assertRedirectUri(value: string): void {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new TikTokApiError("URI de redirection invalide", "config", 503);
  }
  const loopback = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  const protocolOk =
    url.protocol === "https:" || (url.protocol === "http:" && loopback);
  if (!protocolOk || url.username || url.password || url.search || url.hash) {
    throw new TikTokApiError("URI de redirection invalide", "config", 503);
  }
}

export function readTikTokConfig(
  env: NodeJS.ProcessEnv = process.env,
): TikTokConfig | null {
  const clientKey = env.TIKTOK_CLIENT_KEY?.trim() ?? "";
  const clientSecret = env.TIKTOK_CLIENT_SECRET?.trim() ?? "";
  const redirectUri = env.TIKTOK_REDIRECT_URI?.trim() ?? "";
  const tokenKeyRaw = env.TIKTOK_TOKEN_ENC_KEY?.trim() ?? "";
  if (!clientKey || !clientSecret || !redirectUri || !tokenKeyRaw) return null;
  try {
    assertRedirectUri(redirectUri);
    return {
      clientKey,
      clientSecret,
      redirectUri,
      tokenKey: parseTokenKey(tokenKeyRaw),
    };
  } catch {
    return null;
  }
}
