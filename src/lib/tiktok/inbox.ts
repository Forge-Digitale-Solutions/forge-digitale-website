import { contentRangeHeader, planFileUpload } from "@/lib/tiktok/chunking";
import { TikTokApiError } from "@/lib/tiktok/errors";

export const INBOX_INIT_URL =
  "https://open.tiktokapis.com/v2/post/publish/inbox/video/init/";
export const STATUS_URL =
  "https://open.tiktokapis.com/v2/post/publish/status/fetch/";

const TERMINAL = new Set(["SEND_TO_USER_INBOX", "FAILED", "PUBLISH_COMPLETE"]);

type FetchLike = typeof fetch;

type ApiBody = {
  data?: {
    publish_id?: string;
    upload_url?: string;
    status?: string;
    fail_reason?: string;
    uploaded_bytes?: number;
  };
  error?: { code?: string; message?: string };
};

export type PublishStatus = {
  status: string;
  failReason: string;
  uploadedBytes: number | null;
};

export function isTerminalStatus(status: string): boolean {
  return TERMINAL.has(status);
}

export function assertTikTokUploadUrl(value: string): void {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new TikTokApiError("URL d'envoi invalide", "upload_url", 502);
  }
  const host = url.hostname;
  const allowed = host === "tiktokapis.com" || host.endsWith(".tiktokapis.com");
  if (url.protocol !== "https:" || !allowed) {
    throw new TikTokApiError("URL d'envoi refusée", "upload_url", 502);
  }
}

async function readApiJson(response: Response): Promise<ApiBody> {
  const text = await response.text();
  let body: ApiBody;
  try {
    body = JSON.parse(text) as ApiBody;
  } catch {
    throw new TikTokApiError("Réponse TikTok illisible", "response", response.status);
  }
  if (!response.ok || (body.error?.code && body.error.code !== "ok")) {
    throw new TikTokApiError(
      body.error?.message || "Requête TikTok refusée",
      body.error?.code || "http",
      response.status || 502,
    );
  }
  return body;
}

async function putChunk(input: {
  fetchImpl: FetchLike;
  pause: (attempt: number) => Promise<void>;
  uploadUrl: string;
  bytes: Uint8Array;
  start: number;
  end: number;
  videoSize: number;
  mimeType: string;
  expected: number;
}): Promise<void> {
  const body = new Uint8Array(input.bytes);
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const response = await input.fetchImpl(input.uploadUrl, {
      method: "PUT",
      redirect: "error",
      headers: {
        "Content-Type": input.mimeType,
        "Content-Length": String(body.byteLength),
        "Content-Range": contentRangeHeader(input.start, input.end, input.videoSize),
      },
      body,
    });
    if (response.status === input.expected) return;
    if (response.status >= 500 && attempt < 3) {
      await input.pause(attempt);
      continue;
    }
    throw new TikTokApiError(
      "Envoi du segment refusé",
      "upload",
      response.status || 502,
    );
  }
}

export async function uploadInboxDraft(input: {
  videoSize: number;
  read: (start: number, length: number) => Promise<Uint8Array>;
  accessToken: string;
  fetchImpl?: FetchLike;
  pause?: (attempt: number) => Promise<void>;
  mimeType?: string;
  onPhase?: (phase: "init" | "upload") => void;
}): Promise<{ publishId: string }> {
  const fetchImpl = input.fetchImpl ?? fetch;
  const pause =
    input.pause ??
    ((attempt: number) => new Promise((resolve) => setTimeout(resolve, attempt * 500)));
  const plan = planFileUpload(input.videoSize);
  input.onPhase?.("init");
  const initResponse = await fetchImpl(INBOX_INIT_URL, {
    method: "POST",
    redirect: "error",
    headers: {
      Authorization: `Bearer ${input.accessToken}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      source_info: {
        source: "FILE_UPLOAD",
        video_size: plan.videoSize,
        chunk_size: plan.chunkSize,
        total_chunk_count: plan.totalChunkCount,
      },
    }),
  });
  const initJson = await readApiJson(initResponse);
  const publishId = initJson.data?.publish_id;
  const uploadUrl = initJson.data?.upload_url;
  if (!publishId || !uploadUrl) {
    throw new TikTokApiError("Initialisation incomplète", "init", 502);
  }
  assertTikTokUploadUrl(uploadUrl);
  input.onPhase?.("upload");
  for (let index = 0; index < plan.ranges.length; index += 1) {
    const range = plan.ranges[index];
    const bytes = await input.read(range.start, range.length);
    if (bytes.byteLength !== range.length) {
      throw new TikTokApiError("Lecture incomplète du fichier", "read", 400);
    }
    const expected = index === plan.ranges.length - 1 ? 201 : 206;
    await putChunk({
      fetchImpl,
      pause,
      uploadUrl,
      bytes,
      start: range.start,
      end: range.end,
      videoSize: plan.videoSize,
      mimeType: input.mimeType ?? "video/mp4",
      expected,
    });
  }
  return { publishId };
}

export async function fetchPublishStatus(input: {
  accessToken: string;
  publishId: string;
  fetchImpl?: FetchLike;
}): Promise<PublishStatus> {
  const fetchImpl = input.fetchImpl ?? fetch;
  const response = await fetchImpl(STATUS_URL, {
    method: "POST",
    redirect: "error",
    headers: {
      Authorization: `Bearer ${input.accessToken}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ publish_id: input.publishId }),
  });
  const body = await readApiJson(response);
  const status = body.data?.status;
  if (!status) {
    throw new TikTokApiError("Statut TikTok absent", "status", 502);
  }
  return {
    status,
    failReason: body.data?.fail_reason ?? "",
    uploadedBytes:
      typeof body.data?.uploaded_bytes === "number" ? body.data.uploaded_bytes : null,
  };
}
