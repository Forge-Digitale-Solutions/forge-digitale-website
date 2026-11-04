import { TikTokApiError } from "@/lib/tiktok/errors";
import { assertCodeVerifier } from "@/lib/tiktok/pkce";

export const TOKEN_URL = "https://open.tiktokapis.com/v2/oauth/token/";
export const REVOKE_URL = "https://open.tiktokapis.com/v2/oauth/revoke/";
export const USER_INFO_URL = "https://open.tiktokapis.com/v2/user/info/";
export const ACCESS_REFRESH_SKEW_MS = 5 * 60 * 1000;

export type TikTokTokenRecord = {
  accessToken: string;
  refreshToken: string;
  scope: string;
  tokenType: string;
  accessExpiresAt: number;
  refreshExpiresAt: number;
};

export type TikTokProfile = {
  openId: string;
  displayName: string;
  avatarUrl: string;
};

type TokenResponse = {
  access_token?: string;
  expires_in?: number;
  open_id?: string;
  refresh_expires_in?: number;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
  error?: string;
  error_description?: string;
};

type FetchLike = typeof fetch;

export function hasScope(scope: string, name: string): boolean {
  return scope
    .split(",")
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
    .includes(name);
}

function formBody(fields: Record<string, string>): string {
  return new URLSearchParams(fields).toString();
}

async function postForm(
  url: string,
  fields: Record<string, string>,
  fetchImpl: FetchLike,
): Promise<TokenResponse> {
  const response = await fetchImpl(url, {
    method: "POST",
    redirect: "error",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
    },
    body: formBody(fields),
  });
  const text = await response.text();
  let body: TokenResponse = {};
  if (text.trim()) {
    try {
      body = JSON.parse(text) as TokenResponse;
    } catch {
      throw new TikTokApiError("Réponse TikTok illisible", "token", response.status);
    }
  }
  if (!response.ok || body.error) {
    throw new TikTokApiError(
      body.error_description || body.error || "Jeton refusé",
      body.error || "token",
      response.status || 502,
    );
  }
  return body;
}

function recordFromResponse(
  body: TokenResponse,
  now: number,
  previous?: TikTokTokenRecord,
): TikTokTokenRecord {
  if (
    !body.access_token ||
    !body.refresh_token ||
    typeof body.expires_in !== "number" ||
    typeof body.refresh_expires_in !== "number"
  ) {
    throw new TikTokApiError("Réponse de jeton incomplète", "token", 502);
  }
  return {
    accessToken: body.access_token,
    refreshToken: body.refresh_token,
    scope: body.scope ?? previous?.scope ?? "",
    tokenType: body.token_type ?? previous?.tokenType ?? "Bearer",
    accessExpiresAt: now + body.expires_in * 1000,
    refreshExpiresAt: now + body.refresh_expires_in * 1000,
  };
}

export async function exchangeAuthorizationCode(input: {
  code: string;
  codeVerifier: string;
  clientKey: string;
  clientSecret: string;
  redirectUri: string;
  fetchImpl?: FetchLike;
  now?: number;
}): Promise<TikTokTokenRecord> {
  assertCodeVerifier(input.codeVerifier);
  const fetchImpl = input.fetchImpl ?? fetch;
  const now = input.now ?? Date.now();
  const body = await postForm(
    TOKEN_URL,
    {
      client_key: input.clientKey,
      client_secret: input.clientSecret,
      code: input.code,
      grant_type: "authorization_code",
      redirect_uri: input.redirectUri,
      code_verifier: input.codeVerifier,
    },
    fetchImpl,
  );
  return recordFromResponse(body, now);
}

export async function refreshAccessToken(input: {
  record: TikTokTokenRecord;
  clientKey: string;
  clientSecret: string;
  fetchImpl?: FetchLike;
  now?: number;
}): Promise<TikTokTokenRecord> {
  const fetchImpl = input.fetchImpl ?? fetch;
  const now = input.now ?? Date.now();
  const body = await postForm(
    TOKEN_URL,
    {
      client_key: input.clientKey,
      client_secret: input.clientSecret,
      grant_type: "refresh_token",
      refresh_token: input.record.refreshToken,
    },
    fetchImpl,
  );
  return recordFromResponse(body, now, input.record);
}

export async function ensureFreshAccessToken(input: {
  record: TikTokTokenRecord;
  clientKey: string;
  clientSecret: string;
  save: (record: TikTokTokenRecord) => Promise<void>;
  fetchImpl?: FetchLike;
  now?: number;
  skewMs?: number;
}): Promise<TikTokTokenRecord> {
  const now = input.now ?? Date.now();
  const skew = input.skewMs ?? ACCESS_REFRESH_SKEW_MS;
  if (now >= input.record.refreshExpiresAt) {
    throw new TikTokApiError(
      "Jeton de renouvellement expiré",
      "invalid_grant",
      401,
    );
  }
  if (now < input.record.accessExpiresAt - skew) {
    return input.record;
  }
  const next = await refreshAccessToken({
    record: input.record,
    clientKey: input.clientKey,
    clientSecret: input.clientSecret,
    fetchImpl: input.fetchImpl,
    now,
  });
  await input.save(next);
  return next;
}

export async function revokeAccessToken(input: {
  accessToken: string;
  clientKey: string;
  clientSecret: string;
  fetchImpl?: FetchLike;
}): Promise<void> {
  const fetchImpl = input.fetchImpl ?? fetch;
  const response = await fetchImpl(REVOKE_URL, {
    method: "POST",
    redirect: "error",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
    },
    body: formBody({
      client_key: input.clientKey,
      client_secret: input.clientSecret,
      token: input.accessToken,
    }),
  });
  const text = await response.text();
  let error = "";
  let description = "";
  if (text.trim()) {
    try {
      const body = JSON.parse(text) as {
        error?: string;
        error_description?: string;
      };
      error = body.error ?? "";
      description = body.error_description ?? "";
    } catch {
      throw new TikTokApiError("Révocation illisible", "revoke", response.status);
    }
  }
  if (!response.ok || error) {
    throw new TikTokApiError(
      description || error || "Révocation refusée",
      error || "revoke",
      response.status || 502,
    );
  }
}

export async function disconnectStoredToken(input: {
  read: () => Promise<TikTokTokenRecord | null>;
  remove: () => Promise<void>;
  clientKey: string;
  clientSecret: string;
  fetchImpl?: FetchLike;
}): Promise<"revoked" | "absent"> {
  const record = await input.read();
  if (!record) return "absent";
  await revokeAccessToken({
    accessToken: record.accessToken,
    clientKey: input.clientKey,
    clientSecret: input.clientSecret,
    fetchImpl: input.fetchImpl,
  });
  await input.remove();
  return "revoked";
}

function httpsUrl(value: unknown): string {
  if (typeof value !== "string" || !value) return "";
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
}

export async function fetchUserInfo(input: {
  accessToken: string;
  fetchImpl?: FetchLike;
}): Promise<TikTokProfile> {
  const fetchImpl = input.fetchImpl ?? fetch;
  const url = new URL(USER_INFO_URL);
  url.searchParams.set("fields", "open_id,display_name,avatar_url");
  const response = await fetchImpl(url, {
    method: "GET",
    redirect: "error",
    headers: { Authorization: `Bearer ${input.accessToken}` },
  });
  const text = await response.text();
  let body: {
    data?: { user?: Record<string, unknown> };
    error?: { code?: string; message?: string };
  };
  try {
    body = JSON.parse(text) as typeof body;
  } catch {
    throw new TikTokApiError("Profil TikTok illisible", "profile", response.status);
  }
  if (!response.ok || (body.error?.code && body.error.code !== "ok")) {
    throw new TikTokApiError(
      body.error?.message || "Profil TikTok refusé",
      body.error?.code || "profile",
      response.status || 502,
    );
  }
  const user = body.data?.user ?? {};
  return {
    openId: typeof user.open_id === "string" ? user.open_id : "",
    displayName: typeof user.display_name === "string" ? user.display_name : "",
    avatarUrl: httpsUrl(user.avatar_url),
  };
}
