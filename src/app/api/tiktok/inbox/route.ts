import { defaultTokenDir } from "@/lib/tiktok/config";
import { loadFreshToken, publicMessage } from "@/lib/tiktok/flow";
import { jsonNoindex, requireReady } from "@/lib/tiktok/http";
import { fetchPublishStatus, uploadInboxDraft } from "@/lib/tiktok/inbox";
import { hasScope } from "@/lib/tiktok/oauth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_BYTES = 64 * 1024 * 1024;

function line(encoder: TextEncoder, value: string): Uint8Array {
  return encoder.encode(`${value}\n`);
}

export async function POST(request: Request) {
  const ready = requireReady(request);
  if (ready instanceof Response) return ready;
  let file: File;
  try {
    const form = await request.formData();
    const value = form.get("file");
    if (!(value instanceof File)) {
      return jsonNoindex({ ok: false, message: "Fichier mp4 manquant" }, 400);
    }
    file = value;
  } catch {
    return jsonNoindex({ ok: false, message: "Fichier mp4 manquant" }, 400);
  }
  const name = file.name.toLowerCase();
  const typeOk =
    file.type === "" ||
    file.type === "video/mp4" ||
    file.type === "application/octet-stream";
  if (!name.endsWith(".mp4") || !typeOk) {
    return jsonNoindex({ ok: false, message: "Le fichier doit être un mp4" }, 400);
  }
  if (file.size <= 0 || file.size > MAX_BYTES) {
    return jsonNoindex(
      { ok: false, message: "La vidéo doit faire entre 1 octet et 64 Mo" },
      413,
    );
  }

  const config = ready.config;
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (value: string) => controller.enqueue(line(encoder, value));
      try {
        const record = await loadFreshToken({
          dir: defaultTokenDir(),
          key: config.tokenKey,
          clientKey: config.clientKey,
          clientSecret: config.clientSecret,
        });
        if (!record) {
          send("error Aucun compte TikTok connecté");
          return;
        }
        if (!hasScope(record.scope, "video.upload")) {
          send("error L'autorisation video.upload manque");
          return;
        }
        const bytes = new Uint8Array(await file.arrayBuffer());
        const uploaded = await uploadInboxDraft({
          videoSize: bytes.byteLength,
          accessToken: record.accessToken,
          read: async (start, length) => bytes.subarray(start, start + length),
          onPhase: (phase) => send(`phase ${phase}`),
        });
        const status = await fetchPublishStatus({
          accessToken: record.accessToken,
          publishId: uploaded.publishId,
        });
        send(`publish ${uploaded.publishId}`);
        send(`status ${status.status}`);
        if (status.failReason) send(`fail ${status.failReason}`);
      } catch (error) {
        send(`error ${publicMessage(error)}`);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "no-store",
    },
  });
}
