import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  TOKEN_URL,
  ensureFreshAccessToken,
  exchangeAuthorizationCode,
  hasScope,
  type TikTokTokenRecord,
} from "./oauth";

const NOW = 1_700_000_000_000;
const FIVE_MINUTES = 5 * 60 * 1000;

function record(overrides: Partial<TikTokTokenRecord> = {}): TikTokTokenRecord {
  return {
    accessToken: "act.OLD",
    refreshToken: "rft.OLD",
    scope: "user.info.basic,video.upload",
    tokenType: "Bearer",
    accessExpiresAt: NOW,
    refreshExpiresAt: NOW + 86_400_000,
    ...overrides,
  };
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status });
}

describe("oauth refresh", () => {
  it("rotates the refresh token and uses the returned lifetimes", async () => {
    const saved: TikTokTokenRecord[] = [];
    const fetchImpl: typeof fetch = async (input, init) => {
      assert.equal(String(input), TOKEN_URL);
      const params = new URLSearchParams(String(init?.body));
      assert.equal(params.get("grant_type"), "refresh_token");
      assert.equal(params.get("refresh_token"), "rft.OLD");
      assert.equal(params.get("client_key"), "ck");
      assert.equal(params.get("client_secret"), "cs");
      assert.equal(params.get("code_verifier"), null);
      assert.equal(
        new Headers(init?.headers).get("content-type"),
        "application/x-www-form-urlencoded",
      );
      return jsonResponse({
        access_token: "act.NEW",
        refresh_token: "rft.NEW",
        expires_in: 7200,
        refresh_expires_in: 15_552_000,
        scope: "user.info.basic,video.upload",
        token_type: "Bearer",
        open_id: "OPEN_ID_UNIQUE_VALUE",
      });
    };

    const next = await ensureFreshAccessToken({
      record: record({ accessExpiresAt: NOW + FIVE_MINUTES }),
      clientKey: "ck",
      clientSecret: "cs",
      now: NOW,
      fetchImpl,
      save: async (value) => {
        saved.push(value);
      },
    });

    assert.equal(next.accessToken, "act.NEW");
    assert.equal(next.refreshToken, "rft.NEW");
    assert.notEqual(next.refreshToken, "rft.OLD");
    assert.equal(next.accessExpiresAt, NOW + 7200 * 1000);
    assert.equal(next.refreshExpiresAt, NOW + 15_552_000 * 1000);
    assert.equal(saved[0]?.refreshToken, "rft.NEW");
    assert.equal(JSON.stringify(next).includes("OPEN_ID_UNIQUE_VALUE"), false);
    assert.equal(Object.hasOwn(next, "openId"), false);
  });

  it("does not refresh when more than five minutes remain", async () => {
    const fetchImpl: typeof fetch = async () => {
      throw new Error("refresh should not run");
    };
    const current = record({ accessExpiresAt: NOW + FIVE_MINUTES + 1 });
    const next = await ensureFreshAccessToken({
      record: current,
      clientKey: "ck",
      clientSecret: "cs",
      now: NOW,
      fetchImpl,
      save: async () => {
        throw new Error("save should not run");
      },
    });
    assert.equal(next.accessToken, "act.OLD");
    assert.equal(next.refreshToken, "rft.OLD");
  });

  it("does not save a refresh response that omits lifetimes", async () => {
    let saved = false;
    const fetchImpl: typeof fetch = async () =>
      jsonResponse({
        access_token: "act.NEW",
        refresh_token: "rft.NEW",
        open_id: "OPEN_ID_UNIQUE_VALUE",
      });
    await assert.rejects(() =>
      ensureFreshAccessToken({
        record: record({ accessExpiresAt: NOW }),
        clientKey: "ck",
        clientSecret: "cs",
        now: NOW,
        fetchImpl,
        save: async () => {
          saved = true;
        },
      }),
    );
    assert.equal(saved, false);
  });
});

describe("oauth code exchange", () => {
  it("sends the PKCE verifier and drops open_id", async () => {
    const fetchImpl: typeof fetch = async (input, init) => {
      assert.equal(String(input), TOKEN_URL);
      const params = new URLSearchParams(String(init?.body));
      assert.equal(params.get("grant_type"), "authorization_code");
      assert.equal(params.get("code"), "auth-code");
      assert.equal(params.get("code_verifier"), "a".repeat(43));
      assert.equal(params.get("redirect_uri"), "https://forgedigitalesolutions.com/api/tiktok/callback");
      assert.equal(params.get("client_secret"), "cs");
      return jsonResponse({
        access_token: "act.NEW",
        refresh_token: "rft.NEW",
        expires_in: 7200,
        refresh_expires_in: 15_552_000,
        scope: "user.info.basic,video.upload",
        token_type: "Bearer",
        open_id: "OPEN_ID_UNIQUE_VALUE",
      });
    };
    const next = await exchangeAuthorizationCode({
      code: "auth-code",
      codeVerifier: "a".repeat(43),
      clientKey: "ck",
      clientSecret: "cs",
      redirectUri: "https://forgedigitalesolutions.com/api/tiktok/callback",
      now: NOW,
      fetchImpl,
    });
    assert.equal(next.accessExpiresAt, NOW + 7200 * 1000);
    assert.equal(JSON.stringify(next).includes("OPEN_ID_UNIQUE_VALUE"), false);
    assert.equal(hasScope(next.scope, "video.upload"), true);
    assert.equal(hasScope(next.scope, "video.publish"), false);
  });
});
