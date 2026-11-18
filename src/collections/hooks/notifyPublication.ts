import type { CollectionAfterChangeHook } from "payload";

const SITE_URL = "https://forgedigitalesolutions.com";

// Prévient le workflow n8n « Contrôle de mise en ligne » quand un article
// passe en publié. Sans FDS_PUBLICATION_WEBHOOK_URL, ne fait rien.
// L'appel n'attend pas la réponse : une panne de n8n ne bloque pas la publication.
export const notifyPublication: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req,
}) => {
  const webhookUrl = process.env.FDS_PUBLICATION_WEBHOOK_URL;
  if (!webhookUrl || doc?._status !== "published") return doc;

  const justPublished =
    previousDoc?._status !== "published" || previousDoc?.slug !== doc.slug;
  if (!justPublished) return doc;

  const url = `${SITE_URL}/blog/${doc.slug}/`;
  void fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, run_id: `${doc.id}-${Date.now()}` }),
    signal: AbortSignal.timeout(10_000),
  }).catch((error: unknown) => {
    req.payload.logger.warn(
      `notifyPublication: échec de l'appel n8n pour ${url}: ${String(error)}`,
    );
  });

  return doc;
};
