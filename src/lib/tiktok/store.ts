import { randomBytes } from "node:crypto";
import { chmod, mkdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  decryptString,
  encryptString,
  type EncryptedEnvelope,
} from "@/lib/tiktok/crypto";
import { TikTokApiError } from "@/lib/tiktok/errors";
import type { TikTokTokenRecord } from "@/lib/tiktok/oauth";

const TOKEN_AAD = "tiktok-token-v1";
const PENDING_AAD = "tiktok-pending-v1";
const TOKEN_FILE = "token.json";
const PENDING_FILE = "pending.json";

export type PendingOAuth = {
  state: string;
  codeVerifier: string;
  expiresAt: number;
};

let tail: Promise<unknown> = Promise.resolve();

export function withTokenLock<T>(task: () => Promise<T>): Promise<T> {
  const run = tail.then(task, task);
  tail = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function writeEncryptedFile(
  file: string,
  envelope: EncryptedEnvelope,
): Promise<void> {
  const dir = path.dirname(file);
  await mkdir(dir, { recursive: true, mode: 0o700 });
  await chmod(dir, 0o700).catch(() => undefined);
  const tmp = path.join(
    dir,
    `.${path.basename(file)}.${process.pid}.${randomBytes(4).toString("hex")}.tmp`,
  );
  try {
    await writeFile(tmp, JSON.stringify(envelope), { mode: 0o600 });
    await chmod(tmp, 0o600);
    await rename(tmp, file);
    await chmod(file, 0o600);
  } catch (error) {
    await unlink(tmp).catch(() => undefined);
    throw error;
  }
}

async function readEnvelope(file: string): Promise<EncryptedEnvelope | null> {
  try {
    const raw = await readFile(file, "utf8");
    return JSON.parse(raw) as EncryptedEnvelope;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw new TikTokApiError("Jeton chiffré illisible", "store", 500);
  }
}

function sealRecord(record: TikTokTokenRecord): TikTokTokenRecord {
  if (!record.accessToken || !record.refreshToken) {
    throw new TikTokApiError("Jeton incomplet", "store", 500);
  }
  return {
    accessToken: record.accessToken,
    refreshToken: record.refreshToken,
    scope: record.scope,
    tokenType: record.tokenType,
    accessExpiresAt: record.accessExpiresAt,
    refreshExpiresAt: record.refreshExpiresAt,
  };
}

export async function writeToken(
  dir: string,
  key: Buffer,
  record: TikTokTokenRecord,
): Promise<void> {
  const envelope = encryptString(
    JSON.stringify(sealRecord(record)),
    key,
    TOKEN_AAD,
  );
  await writeEncryptedFile(path.join(dir, TOKEN_FILE), envelope);
}

export async function readToken(
  dir: string,
  key: Buffer,
): Promise<TikTokTokenRecord | null> {
  const envelope = await readEnvelope(path.join(dir, TOKEN_FILE));
  if (!envelope) return null;
  const parsed = JSON.parse(decryptString(envelope, key, TOKEN_AAD)) as TikTokTokenRecord;
  return sealRecord(parsed);
}

export async function deleteToken(dir: string): Promise<void> {
  await unlink(path.join(dir, TOKEN_FILE)).catch((error: NodeJS.ErrnoException) => {
    if (error.code !== "ENOENT") throw error;
  });
}

export async function writePending(
  dir: string,
  key: Buffer,
  pending: PendingOAuth,
): Promise<void> {
  const envelope = encryptString(JSON.stringify(pending), key, PENDING_AAD);
  await writeEncryptedFile(path.join(dir, PENDING_FILE), envelope);
}

export async function readPending(
  dir: string,
  key: Buffer,
): Promise<PendingOAuth | null> {
  const envelope = await readEnvelope(path.join(dir, PENDING_FILE));
  if (!envelope) return null;
  return JSON.parse(decryptString(envelope, key, PENDING_AAD)) as PendingOAuth;
}

export async function clearPending(dir: string): Promise<void> {
  await unlink(path.join(dir, PENDING_FILE)).catch((error: NodeJS.ErrnoException) => {
    if (error.code !== "ENOENT") throw error;
  });
}
