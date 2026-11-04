import type { Metadata } from "next";
import { cookies } from "next/headers";
import { PlannerPanel } from "@/components/tiktok/PlannerPanel";
import { ADMIN_COOKIE, adminCookieValue, safeEqual } from "@/lib/tiktok/admin";

export const dynamic = "force-dynamic";

const SITE_URL = "https://forgedigitalesolutions.com";
const PATH = "/gameplaydev-planner/";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "GamePlayDev Planner",
  description:
    "Outil interne pour déposer une vidéo en brouillon sur le compte TikTok de Forge Digitale Solutions. Aucune publication automatique.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${SITE_URL}${PATH}`,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${SITE_URL}${PATH}`,
    title: "GamePlayDev Planner - Forge Digitale Solutions",
    description:
      "Connexion TikTok et envoi de brouillons pour le compte interne. Page non indexée.",
    siteName: "Forge Digitale Solutions",
  },
};

const NOTICES: Record<string, string> = {
  auth: "Secret refusé.",
  refus: "Autorisation TikTok interrompue.",
  jeton: "Échange du jeton impossible.",
  state: "Session de connexion invalide. Recommencez.",
  config: "Configuration TikTok incomplète.",
};

export default async function GamePlayDevPlannerPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; connected?: string }>;
}) {
  const query = await searchParams;
  const secret = process.env.TIKTOK_ADMIN_SECRET?.trim() ?? "";
  const jar = await cookies();
  const presented = jar.get(ADMIN_COOKIE)?.value ?? "";
  const allowed =
    secret !== "" && presented !== "" && safeEqual(presented, adminCookieValue(secret));
  const notice =
    query.connected === "1"
      ? "Compte TikTok connecté."
      : query.error
        ? (NOTICES[query.error] ?? null)
        : null;

  return (
    <div className="min-h-screen bg-bg pt-32 pb-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">GamePlayDev Planner</h1>
        <p className="text-lg text-soft mb-2">
          Dépôt de vidéos en brouillon sur le compte TikTok interne
          @gameplaydevhw. Aucune publication automatique.
        </p>
        <p className="text-sm text-soft mb-8">
          <a className="underline" href="/confidentialite/">
            Confidentialité
          </a>
          {" · "}
          <a className="underline" href="/gameplaydev-planner/conditions-utilisation/">
            Conditions d&apos;utilisation
          </a>
        </p>

        {secret === "" ? (
          <p role="alert">Configuration incomplète.</p>
        ) : allowed ? (
          <PlannerPanel notice={notice} />
        ) : (
          <form
            className="rounded-xl border border-default bg-surface-card p-6 space-y-4 max-w-md"
            method="post"
            action="/api/tiktok/session"
          >
            {query.error === "auth" ? (
              <p role="alert">Secret refusé.</p>
            ) : null}
            <label className="block">
              <span className="block mb-2">Secret admin</span>
              <input
                className="w-full rounded-md border border-default bg-bg px-3 py-2"
                type="password"
                name="secret"
                autoComplete="current-password"
                required
              />
            </label>
            <button className="btn-primary px-5 py-2.5" type="submit">
              Entrer
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
