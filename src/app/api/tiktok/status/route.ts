import { defaultTokenDir } from "@/lib/tiktok/config";
import { httpStatus, loadFreshToken, publicMessage } from "@/lib/tiktok/flow";
import { jsonNoindex, requireReady } from "@/lib/tiktok/http";
import { fetchPublishStatus } from "@/lib/tiktok/inbox";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const PUBLISH_ID = /^[A-Za-z0-9._~-]{1,200}$/;

export async function POST(request: Request) {
  const ready = requireReady(request);
  if (ready instanceof Response) return ready;
  let publishId = "";
  try {
    const body = (await request.json()) as { publishId?: unknown };
    publishId = typeof body.publishId === "string" ? body.publishId : "";
  } catch {
    publishId = "";
  }
  if (!PUBLISH_ID.test(publishId)) {
    return jsonNoindex({ ok: false, message: "Identifiant d'envoi invalide" }, 400);
  }
  try {
    const record = await loadFreshToken({
      dir: defaultTokenDir(),
      key: ready.config.tokenKey,
      clientKey: ready.config.clientKey,
      clientSecret: ready.config.clientSecret,
    });
    if (!record) {
      return jsonNoindex({ ok: false, message: "Aucun compte TikTok connecté" }, 409);
    }
    const status = await fetchPublishStatus({
      accessToken: record.accessToken,
      publishId,
    });
    return jsonNoindex({
      ok: true,
      publishId,
      status: status.status,
      failReason: status.failReason,
    });
  } catch (error) {
    return jsonNoindex(
      { ok: false, message: publicMessage(error) },
      httpStatus(error),
    );
  }
}
