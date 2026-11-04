import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  AUTHORIZE_URL,
  TIKTOK_SCOPES,
  buildAuthorizeUrl,
  codeChallengeS256,
  generateCodeVerifier,
} from "./pkce";

const KNOWN_VERIFIER = "a".repeat(43);
const KNOWN_CHALLENGE =
  "66d34fba71f8f450f7e45598853e53bfc23bbd129027cbb131a2f4ffd7878cd0";

describe("pkce", () => {
  it("hashes the verifier with hex SHA-256", () => {
    assert.equal(codeChallengeS256(KNOWN_VERIFIER), KNOWN_CHALLENGE);
    assert.match(KNOWN_CHALLENGE, /^[0-9a-f]{64}$/);
  });

  it("rejects a verifier outside the PKCE length", () => {
    assert.throws(() => codeChallengeS256("a".repeat(42)));
    assert.throws(() => codeChallengeS256("a".repeat(129)));
    assert.throws(() => codeChallengeS256(`${KNOWN_VERIFIER}+`));
  });

  it("generates a 64 character unreserved verifier", () => {
    const seen = new Set<string>();
    for (let index = 0; index < 8; index += 1) {
      const verifier = generateCodeVerifier();
      assert.match(verifier, /^[A-Za-z0-9\-._~]{64}$/);
      seen.add(verifier);
    }
    assert.equal(seen.size, 8);
  });

  it("builds the v2 authorize URL with S256 and without secrets", () => {
    const raw = buildAuthorizeUrl({
      clientKey: "ck_test",
      redirectUri: "https://forgedigitalesolutions.com/api/tiktok/callback",
      state: "state123",
      codeChallenge: KNOWN_CHALLENGE,
    });
    const url = new URL(raw);
    assert.equal(`${url.origin}${url.pathname}`, AUTHORIZE_URL);
    assert.equal(url.searchParams.get("client_key"), "ck_test");
    assert.equal(url.searchParams.get("response_type"), "code");
    assert.equal(url.searchParams.get("scope"), TIKTOK_SCOPES);
    assert.equal(url.searchParams.get("scope"), "user.info.basic,video.upload");
    assert.equal(url.searchParams.get("scope")?.includes("video.publish"), false);
    assert.equal(
      url.searchParams.get("redirect_uri"),
      "https://forgedigitalesolutions.com/api/tiktok/callback",
    );
    assert.equal(url.searchParams.get("state"), "state123");
    assert.equal(url.searchParams.get("code_challenge"), KNOWN_CHALLENGE);
    assert.equal(url.searchParams.get("code_challenge_method"), "S256");
    assert.equal(url.searchParams.get("code_verifier"), null);
    assert.equal(url.searchParams.get("client_secret"), null);
    assert.equal(raw.includes(KNOWN_VERIFIER), false);
    assert.equal(raw.includes("client_secret"), false);
  });
});
