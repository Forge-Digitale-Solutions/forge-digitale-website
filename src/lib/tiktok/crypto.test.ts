import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import {
  decryptString,
  encryptString,
  parseTokenKey,
  type EncryptedEnvelope,
} from "./crypto";
import type { TikTokTokenRecord } from "./oauth";
import { readToken, writeToken } from "./store";

const AAD = "tiktok-token-v1";

function sample(): TikTokTokenRecord {
  return {
    accessToken: "act.UNIQUE_ACCESS_VALUE_zz",
    refreshToken: "rft.UNIQUE_REFRESH_VALUE_zz",
    scope: "user.info.basic,video.upload",
    tokenType: "Bearer",
    accessExpiresAt: 10,
    refreshExpiresAt: 20,
  };
}

describe("token encryption", () => {
  it("accepts only a canonical 32-byte base64 key", () => {
    const key = randomBytes(32);
    const encoded = key.toString("base64");
    assert.deepEqual(parseTokenKey(encoded), key);
    assert.deepEqual(parseTokenKey(`\n${encoded}\n`), key);
    assert.throws(() => parseTokenKey("abcd"));
    assert.throws(() => parseTokenKey(""));
    assert.throws(() => parseTokenKey(randomBytes(16).toString("base64")));
  });

  it("round-trips AES-256-GCM and hides the plaintext", () => {
    const key = randomBytes(32);
    const plain = JSON.stringify(sample());
    const first = encryptString(plain, key, AAD);
    const second = encryptString(plain, key, AAD);
    assert.equal(first.alg, "A256GCM");
    assert.equal(first.v, 1);
    assert.equal(Buffer.from(first.iv, "base64").length, 12);
    assert.equal(Buffer.from(first.tag, "base64").length, 16);
    assert.equal(Buffer.from(first.data, "base64").length, Buffer.byteLength(plain));
    assert.notEqual(first.iv, second.iv);
    assert.equal(decryptString(first, key, AAD), plain);
    assert.equal(JSON.stringify(first).includes("act.UNIQUE_ACCESS_VALUE_zz"), false);
    assert.equal(JSON.stringify(first).includes("rft.UNIQUE_REFRESH_VALUE_zz"), false);
  });

  it("rejects the wrong key, the wrong AAD, and tampered bytes", () => {
    const key = randomBytes(32);
    const envelope = encryptString("secret-token", key, AAD);
    assert.throws(() => decryptString(envelope, randomBytes(32), AAD));
    assert.throws(() => decryptString(envelope, key, "tiktok-pending-v1"));
    const flip = (value: string) => {
      const bytes = Buffer.from(value, "base64");
      bytes[0] ^= 0xff;
      return bytes.toString("base64");
    };
    const flippedData: EncryptedEnvelope = { ...envelope, data: flip(envelope.data) };
    const flippedTag: EncryptedEnvelope = { ...envelope, tag: flip(envelope.tag) };
    assert.throws(() => decryptString(flippedData, key, AAD));
    assert.throws(() => decryptString(flippedTag, key, AAD));
  });

  it("seals tokens on disk without profile fields or plaintext secrets", async () => {
    const dir = await mkdtemp(path.join(tmpdir(), "tiktok-seal-"));
    try {
      const key = randomBytes(32);
      const record = sample();
      const wide = {
        ...record,
        openId: "OPEN_ID_UNIQUE_VALUE",
        displayName: "DISPLAY_UNIQUE",
        avatarUrl: "AVATAR_UNIQUE",
      };
      await writeToken(dir, key, wide);
      const file = path.join(dir, "token.json");
      const raw = await readFile(file, "utf8");
      const mode = (await stat(file)).mode & 0o777;
      assert.equal(mode, 0o600);
      assert.equal(raw.includes("act.UNIQUE_ACCESS_VALUE_zz"), false);
      assert.equal(raw.includes("rft.UNIQUE_REFRESH_VALUE_zz"), false);
      assert.equal(raw.includes("OPEN_ID_UNIQUE_VALUE"), false);
      assert.equal(raw.includes("DISPLAY_UNIQUE"), false);
      assert.equal(raw.includes("AVATAR_UNIQUE"), false);
      const loaded = await readToken(dir, key);
      assert.deepEqual(loaded, record);
      assert.equal(Object.hasOwn(loaded ?? {}, "openId"), false);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});
