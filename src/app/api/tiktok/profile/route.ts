import { defaultTokenDir } from "@/lib/tiktok/config";
import { httpStatus, loadFreshToken, publicMessage } from "@/lib/tiktok/flow";
import { jsonNoindex, requireReady } from "@/lib/tiktok/http";
import { fetchUserInfo, hasScope } from "@/lib/tiktok/oauth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function scopesOf(scope: string): string[] {
  return scope
    .split(",")
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
}

export async function GET(request: Request) {
  const ready = requireReady(request);
  if (ready instanceof Response) return ready;
  try {
    const record = await loadFreshToken({
      dir: defaultTokenDir(),
      key: ready.config.tokenKey,
      clientKey: ready.config.clientKey,
      clientSecret: ready.config.clientSecret,
    });
    if (!record) return jsonNoindex({ connected: false });
    const scopes = scopesOf(record.scope);
    const canUpload = hasScope(record.scope, "video.upload");
    if (!hasScope(record.scope, "user.info.basic")) {
      return jsonNoindex({
        connected: true,
        openId: "",
        displayName: "",
        avatarUrl: "",
        scopes,
        canUpload,
      });
    }
    const profile = await fetchUserInfo({ accessToken: record.accessToken });
    return jsonNoindex({
      connected: true,
      openId: profile.openId,
      displayName: profile.displayName,
      avatarUrl: profile.avatarUrl,
      scopes,
      canUpload,
    });
  } catch (error) {
    return jsonNoindex(
      { ok: false, message: publicMessage(error) },
      httpStatus(error),
    );
  }
}
