import { getPayload } from "payload";
import config from "@payload-config";

export const dynamic = "force-dynamic";

// Docker HEALTHCHECK target (see Dockerfile). The homepage is prerendered, so
// it stays 200 even when Postgres or Payload is down. This route boots
// Payload and runs one cheap count, and answers 503 on any failure or after
// the deadline. The body never carries error details.
const DEADLINE_MS = 3000;

const headers = { "Cache-Control": "no-store" };

async function checkPayload(): Promise<void> {
  const payload = await getPayload({ config });
  await payload.count({ collection: "posts" });
}

function withDeadline(task: Promise<void>, ms: number): Promise<void> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error("health check timed out")), ms);
  });
  return Promise.race([task, deadline]).finally(() => clearTimeout(timer));
}

async function healthy(): Promise<boolean> {
  try {
    await withDeadline(checkPayload(), DEADLINE_MS);
    return true;
  } catch {
    return false;
  }
}

export async function GET() {
  const ok = await healthy();
  return Response.json(
    { status: ok ? "ok" : "unavailable" },
    { status: ok ? 200 : 503, headers },
  );
}

export async function HEAD() {
  const ok = await healthy();
  return new Response(null, { status: ok ? 200 : 503, headers });
}
