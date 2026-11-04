import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { mkdtemp, rm } from "node:fs/promises";
import { access, constants } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import { REVOKE_URL, type TikTokTokenRecord } from "./oauth";
import { disconnectTikTok, loadFreshToken } from "./flow";
import { readToken, writeToken } from "./store";

function record(overrides: Partial<TikTokTokenRecord> = {}): TikTokTokenRecord {
  return {
    accessToken: "act.ACCESS",
    refreshToken: "rft.REFRESH",
    scope: "user.info.basic,video.upload",
    tokenType: "Bearer",
    accessExpiresAt: 1_700_000_000_000,
    refreshExpiresAt: 1_800_000_000_000,
    ...overrides,
  };
}

async function missing(file: string): Promise<boolean> {
  try {
    await access(file, constants.F_OK);
    return false;
  } catch {
    return true;
  }
}

describe("token deletion", () => {
  it("revokes the access token, then deletes the sealed file", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "tiktok-revoke-"));
    const key = randomBytes(32);
    const file = path.join(dir, "token.json");
    try {
      await writeToken(dir, key, record());
      let sawFileDuringRevoke = false;
      const fetchImpl: typeof fetch = async (input, init) => {
        assert.equal(String(input), REVOKE_URL);
        assert.equal(init?.method, "POST");
        assert.equal(
          new Headers(init?.headers).get("content-type"),
          "application/x-www-form-urlencoded",
        );
        const params = new URLSearchParams(String(init?.body));
        assert.equal(params.get("client_key"), "ck");
        assert.equal(params.get("client_secret"), "cs");
        assert.equal(params.get("token"), "act.ACCESS");
        assert.notEqual(params.get("token"), "rft.REFRESH");
        sawFileDuringRevoke = !(await missing(file));
        return new Response("", { status: 200 });
      };
      const result = await disconnectTikTok({
        dir,
        key,
        clientKey: "ck",
        clientSecret: "cs",
        fetchImpl,
      });
      assert.equal(result, "revoked");
      assert.equal(sawFileDuringRevoke, true);
      assert.equal(await missing(file), true);
      assert.equal(await readToken(dir, key), null);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("keeps the sealed tokens when revocation fails", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "tiktok-revoke-fail-"));
    const key = randomBytes(32);
    try {
      await writeToken(dir, key, record());
      const fetchImpl: typeof fetch = async () =>
        new Response(
          JSON.stringify({
            error: "invalid_request",
            error_description: "malformed",
          }),
          { status: 400 },
        );
      await assert.rejects(() =>
        disconnectTikTok({
          dir,
          key,
          clientKey: "ck",
          clientSecret: "cs",
          fetchImpl,
        }),
      );
      const loaded = await readToken(dir, key);
      assert.equal(loaded?.accessToken, "act.ACCESS");
      assert.equal(loaded?.refreshToken, "rft.REFRESH");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("does not call TikTok when nothing is stored", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "tiktok-revoke-empty-"));
    const key = randomBytes(32);
    try {
      const fetchImpl: typeof fetch = async () => {
        throw new Error("revoke should not run");
      };
      const result = await disconnectTikTok({
        dir,
        key,
        clientKey: "ck",
        clientSecret: "cs",
        fetchImpl,
      });
      assert.equal(result, "absent");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("deletes tokens when refresh reports invalid_grant", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "tiktok-grant-"));
    const key = randomBytes(32);
    const now = 1_700_000_000_000;
    try {
      await writeToken(
        dir,
        key,
        record({
          accessExpiresAt: now,
          refreshExpiresAt: now + 10_000,
        }),
      );
      const fetchImpl: typeof fetch = async () =>
        new Response(
          JSON.stringify({
            error: "invalid_grant",
            error_description: "expired",
          }),
          { status: 400 },
        );
      await assert.rejects(() =>
        loadFreshToken({
          dir,
          key,
          clientKey: "ck",
          clientSecret: "cs",
          now,
          fetchImpl,
        }),
      );
      assert.equal(await readToken(dir, key), null);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("deletes an expired refresh token without calling TikTok", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "tiktok-expired-"));
    const key = randomBytes(32);
    const now = 1_700_000_000_000;
    try {
      await writeToken(
        dir,
        key,
        record({
          accessExpiresAt: now + 60_000,
          refreshExpiresAt: now,
        }),
      );
      const fetchImpl: typeof fetch = async () => {
        throw new Error("refresh should not run");
      };
      await assert.rejects(() =>
        loadFreshToken({
          dir,
          key,
          clientKey: "ck",
          clientSecret: "cs",
          now,
          fetchImpl,
        }),
      );
      assert.equal(await readToken(dir, key), null);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("keeps tokens when refresh fails on the network", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "tiktok-net-"));
    const key = randomBytes(32);
    const now = 1_700_000_000_000;
    try {
      await writeToken(dir, key, record({ accessExpiresAt: now }));
      const fetchImpl: typeof fetch = async () => {
        throw new Error("network");
      };
      await assert.rejects(() =>
        loadFreshToken({
          dir,
          key,
          clientKey: "ck",
          clientSecret: "cs",
          now,
          fetchImpl,
        }),
      );
      const loaded = await readToken(dir, key);
      assert.equal(loaded?.refreshToken, "rft.REFRESH");
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});
