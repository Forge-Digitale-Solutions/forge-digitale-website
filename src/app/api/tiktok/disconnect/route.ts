import { defaultTokenDir } from "@/lib/tiktok/config";
import {
  disconnectTikTok,
  httpStatus,
  publicMessage,
} from "@/lib/tiktok/flow";
import { jsonNoindex, requireReady } from "@/lib/tiktok/http";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  const ready = requireReady(request);
  if (ready instanceof Response) return ready;
  try {
    const result = await disconnectTikTok({
      dir: defaultTokenDir(),
      key: ready.config.tokenKey,
      clientKey: ready.config.clientKey,
      clientSecret: ready.config.clientSecret,
    });
    return jsonNoindex({ ok: true, disconnected: result });
  } catch (error) {
    return jsonNoindex(
      { ok: false, message: publicMessage(error) },
      httpStatus(error),
    );
  }
}
