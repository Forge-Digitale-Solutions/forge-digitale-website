import { isInvalidGrant, TikTokApiError } from "@/lib/tiktok/errors";
import {
  disconnectStoredToken,
  ensureFreshAccessToken,
  type TikTokTokenRecord,
} from "@/lib/tiktok/oauth";
import {
  deleteToken,
  readToken,
  withTokenLock,
  writeToken,
} from "@/lib/tiktok/store";

type FetchLike = typeof fetch;

export async function loadFreshToken(input: {
  dir: string;
  key: Buffer;
  clientKey: string;
  clientSecret: string;
  fetchImpl?: FetchLike;
  now?: number;
}): Promise<TikTokTokenRecord | null> {
  return withTokenLock(async () => {
    const current = await readToken(input.dir, input.key);
    if (!current) return null;
    try {
      return await ensureFreshAccessToken({
        record: current,
        clientKey: input.clientKey,
        clientSecret: input.clientSecret,
        fetchImpl: input.fetchImpl,
        now: input.now,
        save: (next) => writeToken(input.dir, input.key, next),
      });
    } catch (error) {
      if (isInvalidGrant(error)) await deleteToken(input.dir);
      throw error;
    }
  });
}

export async function disconnectTikTok(input: {
  dir: string;
  key: Buffer;
  clientKey: string;
  clientSecret: string;
  fetchImpl?: FetchLike;
}): Promise<"revoked" | "absent"> {
  return withTokenLock(() =>
    disconnectStoredToken({
      read: () => readToken(input.dir, input.key),
      remove: () => deleteToken(input.dir),
      clientKey: input.clientKey,
      clientSecret: input.clientSecret,
      fetchImpl: input.fetchImpl,
    }),
  );
}

export function httpStatus(error: unknown): number {
  if (error instanceof TikTokApiError && error.status >= 400 && error.status < 500) {
    return error.status;
  }
  return 502;
}

export function publicMessage(error: unknown): string {
  if (error instanceof TikTokApiError && error.message) return error.message;
  return "Échec de l'opération";
}
