import {
  NEWSLETTER_ERROR_MESSAGE,
  NEWSLETTER_INVALID_EMAIL_MESSAGE,
  NEWSLETTER_SUCCESS_MESSAGE,
  isValidEmail,
} from "@/lib/newsletter";

export const dynamic = "force-dynamic";

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

async function sendWelcomeEmail(
  apiBase: string,
  apiKey: string,
  email: string,
  templateId: number,
): Promise<void> {
  const response = await fetch(`${apiBase}/v3/smtp/email`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      templateId,
      to: [{ email }],
    }),
  });

  if (!response.ok) {
    const responseText = await response.text();
    console.error(
      "Newsletter: welcome email failed",
      response.status,
      responseText,
    );
  }
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
  const welcomeTemplateRaw = process.env.BREVO_WELCOME_TEMPLATE_ID;
  const welcomeTemplateId = welcomeTemplateRaw
    ? Number(welcomeTemplateRaw)
    : NaN;
  const apiBase = (
    process.env.BREVO_API_BASE || "https://api.brevo.com"
  ).replace(/\/$/, "");

  if (!apiKey || !Number.isFinite(listId) || listId <= 0) {
    console.error("Newsletter: missing or invalid Brevo environment variables");
    return Response.json(
      { ok: false, message: NEWSLETTER_ERROR_MESSAGE },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(`${apiBase}/v3/contacts`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    const contactOk =
      response.ok ||
      response.status === 201 ||
      response.status === 204;

    if (!contactOk) {
      const responseText = await response.text();
      if (!isDuplicateContact(response.status, responseText)) {
        console.error("Newsletter: Brevo error", response.status, responseText);
        return Response.json(
          { ok: false, message: NEWSLETTER_ERROR_MESSAGE },
          { status: 503 },
        );
      }
    }

    if (
      welcomeTemplateRaw &&
      Number.isFinite(welcomeTemplateId) &&
      welcomeTemplateId > 0
    ) {
      try {
        await sendWelcomeEmail(apiBase, apiKey, email, welcomeTemplateId);
      } catch (error) {
        console.error("Newsletter: welcome email unavailable", error);
      }
    } else if (welcomeTemplateRaw) {
      console.warn(
        "Newsletter: BREVO_WELCOME_TEMPLATE_ID is invalid; skipping welcome email",
      );
    } else {
      console.warn(
        "Newsletter: BREVO_WELCOME_TEMPLATE_ID missing; skipping welcome email",
      );
    }

    return successResponse();
  } catch (error) {
    console.error("Newsletter: Brevo unavailable", error);
    return Response.json(
      { ok: false, message: NEWSLETTER_ERROR_MESSAGE },
      { status: 503 },
    );
  }
}
