import {
  NEWSLETTER_ERROR_MESSAGE,
  NEWSLETTER_INVALID_EMAIL_MESSAGE,
  NEWSLETTER_SUCCESS_MESSAGE,
  isValidEmail,
} from "@/lib/newsletter";

export const dynamic = "force-dynamic";

const SITE_URL = "https://forgedigitalesolutions.com";

type NewsletterBody = {
  email?: unknown;
  website?: unknown;
};

function successResponse() {
  return Response.json({ ok: true, message: NEWSLETTER_SUCCESS_MESSAGE });
}

function isDuplicateContact(status: number, body: string): boolean {
  if (status !== 400 && status !== 409) return false;
  const lower = body.toLowerCase();
  return (
    lower.includes("duplicate") ||
    lower.includes("already exist") ||
    lower.includes("already exists") ||
    lower.includes("contact already")
  );
}

export async function POST(request: Request) {
  let body: NewsletterBody;
  try {
    body = (await request.json()) as NewsletterBody;
  } catch {
    return Response.json(
      { ok: false, message: NEWSLETTER_INVALID_EMAIL_MESSAGE },
      { status: 400 },
    );
  }

  // Honeypot: filled by bots -> fake success, never call Brevo
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return successResponse();
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || !isValidEmail(email)) {
    return Response.json(
      { ok: false, message: NEWSLETTER_INVALID_EMAIL_MESSAGE },
      { status: 400 },
    );
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);
  const templateId = Number(process.env.BREVO_DOI_TEMPLATE_ID);
  const apiBase = (
    process.env.BREVO_API_BASE || "https://api.brevo.com"
  ).replace(/\/$/, "");

  if (
    !apiKey ||
    !Number.isFinite(listId) ||
    listId <= 0 ||
    !Number.isFinite(templateId) ||
    templateId <= 0
  ) {
    console.error("Newsletter: missing or invalid Brevo environment variables");
    return Response.json(
      { ok: false, message: NEWSLETTER_ERROR_MESSAGE },
      { status: 503 },
    );
  }

  const siteUrl = (
    process.env.PAYLOAD_PUBLIC_SERVER_URL || SITE_URL
  ).replace(/\/$/, "");
  const redirectionUrl = `${siteUrl}/newsletter/merci/`;

  try {
    const response = await fetch(
      `${apiBase}/v3/contacts/doubleOptinConfirmation`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({
          email,
          includeListIds: [listId],
          templateId,
          redirectionUrl,
        }),
      },
    );

    if (response.ok || response.status === 204) {
      return successResponse();
    }

    const responseText = await response.text();
    if (isDuplicateContact(response.status, responseText)) {
      return successResponse();
    }

    console.error("Newsletter: Brevo error", response.status, responseText);
    return Response.json(
      { ok: false, message: NEWSLETTER_ERROR_MESSAGE },
      { status: 503 },
    );
  } catch (error) {
    console.error("Newsletter: Brevo unavailable", error);
    return Response.json(
      { ok: false, message: NEWSLETTER_ERROR_MESSAGE },
      { status: 503 },
    );
  }
}
