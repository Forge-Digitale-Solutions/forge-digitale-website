import crypto from "crypto";
import path from "path";
import type { PayloadRequest } from "payload";
import { z } from "zod/v3";

const MAX_BYTES = 15 * 1024 * 1024;
const FETCH_TIMEOUT_MS = 15_000;

export const uploadMediaFromUrlParameters = {
  url: z
    .string()
    .url()
    .optional()
    .describe("HTTPS URL of the image to upload"),
  alt: z.string().min(1).describe("Alt text for the image (required)"),
  creditName: z.string().optional().describe("Photographer or credit name"),
  creditUrl: z.string().optional().describe("URL of the photographer profile"),
  sourceUrl: z.string().optional().describe("URL of the source page"),
  filename: z.string().optional().describe("Override filename for the upload"),
  base64: z
    .string()
    .optional()
    .describe("Base64 image data (alternative to url)"),
  mimeType: z
    .string()
    .optional()
    .describe("MIME type when using base64 (e.g. image/jpeg)"),
};

type UploadArgs = {
  url?: string;
  alt: string;
  creditName?: string;
  creditUrl?: string;
  sourceUrl?: string;
  filename?: string;
  base64?: string;
  mimeType?: string;
};

type ResolvedFile = {
  data: Buffer;
  mimetype: string;
  name: string;
  size: number;
};

function textResult(text: string) {
  return { content: [{ type: "text" as const, text }] };
}

function sanitizeFilename(name: string): string {
  const base = path.basename(name).replace(/[^\w.\-]+/g, "_");
  return base || "upload.bin";
}

function filenameFromMime(mime: string): string {
  const subtype = mime.split("/")[1]?.split("+")[0] || "bin";
  return `upload.${subtype}`;
}

function parseMime(header: string | null): string | null {
  if (!header) return null;
  const mime = header.split(";")[0]?.trim().toLowerCase() ?? "";
  return mime.startsWith("image/") ? mime : null;
}

async function keyAllowsMediaCreate(req: PayloadRequest): Promise<boolean> {
  const authorization = req.headers.get("Authorization");
  const apiKey = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length).trim()
    : null;
  if (!apiKey) return false;

  const apiKeyIndex = crypto
    .createHmac("sha256", req.payload.secret)
    .update(apiKey)
    .digest("hex");

  const { docs } = await req.payload.find({
    collection: "payload-mcp-api-keys",
    depth: 0,
    limit: 1,
    overrideAccess: true,
    pagination: false,
    where: { apiKeyIndex: { equals: apiKeyIndex } },
  });

  return Boolean(docs[0]?.media?.create);
}

async function resolveFromUrl(
  url: string,
  filename?: string,
): Promise<ResolvedFile> {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error("Invalid url");
  }
  if (parsed.protocol !== "https:") {
    throw new Error("url must use https");
  }

  const res = await fetch(url, {
    redirect: "follow",
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!res.ok) {
    throw new Error(`Fetch failed with status ${res.status}`);
  }

  const mimetype = parseMime(res.headers.get("content-type"));
  if (!mimetype) {
    throw new Error("Response Content-Type must be image/*");
  }

  const contentLength = Number(res.headers.get("content-length") || 0);
  if (contentLength > MAX_BYTES) {
    throw new Error("Image exceeds 15 MB limit");
  }

  const data = Buffer.from(await res.arrayBuffer());
  if (data.byteLength > MAX_BYTES) {
    throw new Error("Image exceeds 15 MB limit");
  }

  const fromPath = path.basename(parsed.pathname);
  const name = sanitizeFilename(
    filename ||
      (fromPath.includes(".") ? fromPath : filenameFromMime(mimetype)),
  );

  return { data, mimetype, name, size: data.byteLength };
}

function resolveFromBase64(
  base64: string,
  mimeType: string | undefined,
  filename?: string,
): ResolvedFile {
  const mimetype = parseMime(mimeType ?? null);
  if (!mimetype) {
    throw new Error("mimeType must be image/* when using base64");
  }

  const raw = base64.replace(/^data:[^;]+;base64,/, "");
  const data = Buffer.from(raw, "base64");
  if (!data.byteLength) {
    throw new Error("Invalid base64 data");
  }
  if (data.byteLength > MAX_BYTES) {
    throw new Error("Image exceeds 15 MB limit");
  }

  const name = sanitizeFilename(filename || filenameFromMime(mimetype));
  return { data, mimetype, name, size: data.byteLength };
}

export async function uploadMediaFromUrlHandler(
  rawArgs: Record<string, unknown>,
  req: PayloadRequest,
  _extra: unknown,
): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  void _extra;
  try {
    const args = rawArgs as UploadArgs;
    if (!args.alt?.trim()) {
      return textResult("Error: alt is required");
    }
    const hasUrl = Boolean(args.url);
    const hasBase64 = Boolean(args.base64);
    if (hasUrl === hasBase64) {
      return textResult("Error: provide exactly one of url or base64");
    }

    const canCreate = await keyAllowsMediaCreate(req);
    if (!canCreate) {
      return textResult(
        "Error: MCP API key does not have media create enabled",
      );
    }

    const file = hasUrl
      ? await resolveFromUrl(args.url!, args.filename)
      : resolveFromBase64(args.base64!, args.mimeType, args.filename);

    const doc = await req.payload.create({
      collection: "media",
      data: {
        alt: args.alt,
        ...(args.creditName ? { creditName: args.creditName } : {}),
        ...(args.creditUrl ? { creditUrl: args.creditUrl } : {}),
        ...(args.sourceUrl ? { sourceUrl: args.sourceUrl } : {}),
      },
      file,
      overrideAccess: true,
      req,
    });

    return textResult(
      JSON.stringify({
        id: doc.id,
        url: doc.url ?? null,
        filename: doc.filename ?? file.name,
      }),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return textResult(`Error: ${message}`);
  }
}
