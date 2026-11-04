import { createHash, randomBytes } from "node:crypto";

const VERIFIER_ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
const VERIFIER_PATTERN = /^[A-Za-z0-9\-._~]{43,128}$/;

export const AUTHORIZE_URL = "https://www.tiktok.com/v2/auth/authorize/";
export const TIKTOK_SCOPES = "user.info.basic,video.upload";

export function assertCodeVerifier(verifier: string): void {
  if (!VERIFIER_PATTERN.test(verifier)) {
    throw new Error("Code verifier invalide");
  }
}

export function generateCodeVerifier(length = 64): string {
  if (length < 43 || length > 128) {
    throw new Error("Longueur du code verifier invalide");
  }
  const limit = VERIFIER_ALPHABET.length * 3;
  const chars: string[] = [];
  while (chars.length < length) {
    const bytes = randomBytes(length);
    for (const value of bytes) {
      if (value < limit) {
        chars.push(VERIFIER_ALPHABET[value % VERIFIER_ALPHABET.length]);
        if (chars.length === length) break;
      }
    }
  }
  return chars.join("");
}

export function codeChallengeS256(verifier: string): string {
  assertCodeVerifier(verifier);
  return createHash("sha256").update(verifier).digest("hex");
}

export function buildAuthorizeUrl(input: {
  clientKey: string;
  redirectUri: string;
  state: string;
  codeChallenge: string;
}): string {
  const url = new URL(AUTHORIZE_URL);
  url.searchParams.set("client_key", input.clientKey);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", TIKTOK_SCOPES);
  url.searchParams.set("redirect_uri", input.redirectUri);
  url.searchParams.set("state", input.state);
  url.searchParams.set("code_challenge", input.codeChallenge);
  url.searchParams.set("code_challenge_method", "S256");
  return url.toString();
}
