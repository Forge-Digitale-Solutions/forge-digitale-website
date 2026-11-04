import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { TikTokApiError } from "@/lib/tiktok/errors";

export type EncryptedEnvelope = {
  v: 1;
  alg: "A256GCM";
  iv: string;
  tag: string;
  data: string;
};

export function parseTokenKey(raw: string): Buffer {
  const trimmed = raw.trim();
  const key = Buffer.from(trimmed, "base64");
  if (key.length !== 32 || key.toString("base64") !== trimmed) {
    throw new TikTokApiError("Clé de chiffrement invalide", "config", 503);
  }
  return key;
}

export function encryptString(
  plaintext: string,
  key: Buffer,
  aad: string,
): EncryptedEnvelope {
  if (key.length !== 32) {
    throw new TikTokApiError("Clé de chiffrement invalide", "config", 503);
  }
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  cipher.setAAD(Buffer.from(aad, "utf8"));
  const data = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  return {
    v: 1,
    alg: "A256GCM",
    iv: iv.toString("base64"),
    tag: cipher.getAuthTag().toString("base64"),
    data: data.toString("base64"),
  };
}

export function decryptString(
  envelope: EncryptedEnvelope,
  key: Buffer,
  aad: string,
): string {
  if (key.length !== 32) {
    throw new TikTokApiError("Clé de chiffrement invalide", "config", 503);
  }
  if (envelope.v !== 1 || envelope.alg !== "A256GCM") {
    throw new TikTokApiError("Jeton chiffré illisible", "store", 500);
  }
  const iv = Buffer.from(envelope.iv, "base64");
  const tag = Buffer.from(envelope.tag, "base64");
  const data = Buffer.from(envelope.data, "base64");
  if (iv.length !== 12 || tag.length !== 16) {
    throw new TikTokApiError("Jeton chiffré illisible", "store", 500);
  }
  try {
    const decipher = createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAAD(Buffer.from(aad, "utf8"));
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(data), decipher.final()]).toString(
      "utf8",
    );
  } catch {
    throw new TikTokApiError("Jeton chiffré illisible", "store", 500);
  }
}
