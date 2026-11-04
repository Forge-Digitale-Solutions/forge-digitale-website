import { open, stat } from "node:fs/promises";
import { parseArgs } from "node:util";
import { defaultTokenDir, readTikTokConfig } from "../src/lib/tiktok/config";
import { loadFreshToken } from "../src/lib/tiktok/flow";
import {
  fetchPublishStatus,
  isTerminalStatus,
  uploadInboxDraft,
} from "../src/lib/tiktok/inbox";
import { hasScope } from "../src/lib/tiktok/oauth";

const MAX_VIDEO = 4 * 1024 * 1024 * 1024;

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

async function main(): Promise<void> {
  const { values } = parseArgs({
    options: { file: { type: "string" } },
    strict: true,
  });
  const file = values.file;
  if (!file || !file.toLowerCase().endsWith(".mp4")) {
    fail("Indiquez un fichier mp4 : npm run tiktok:inbox -- --file video.mp4");
  }
  const config = readTikTokConfig();
  if (!config) fail("Configuration TikTok incomplète");
  const info = await stat(file);
  if (!info.isFile() || info.size <= 0 || info.size > MAX_VIDEO) {
    fail("Fichier vidéo illisible ou trop volumineux");
  }
  const record = await loadFreshToken({
    dir: defaultTokenDir(),
    key: config.tokenKey,
    clientKey: config.clientKey,
    clientSecret: config.clientSecret,
  });
  if (!record) fail("Aucun compte TikTok connecté");
  if (!hasScope(record.scope, "video.upload")) {
    fail("L'autorisation video.upload manque");
  }

  const handle = await open(file, "r");
  let publishId = "";
  try {
    const uploaded = await uploadInboxDraft({
      videoSize: info.size,
      accessToken: record.accessToken,
      read: async (start, length) => {
        const buffer = Buffer.alloc(length);
        const { bytesRead } = await handle.read(buffer, 0, length, start);
        if (bytesRead !== length) throw new Error("Lecture incomplète");
        return buffer;
      },
    });
    publishId = uploaded.publishId;
  } finally {
    await handle.close();
  }

  let status = await fetchPublishStatus({
    accessToken: record.accessToken,
    publishId,
  });
  const deadline = Date.now() + 120_000;
  while (!isTerminalStatus(status.status) && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    status = await fetchPublishStatus({
      accessToken: record.accessToken,
      publishId,
    });
  }
  console.log(
    JSON.stringify({
      publishId,
      status: status.status,
      failReason: status.failReason,
    }),
  );
  if (status.status !== "SEND_TO_USER_INBOX") process.exit(1);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Échec de l'envoi";
  fail(message);
});
