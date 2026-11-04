"use client";

import { useEffect, useState, type FormEvent } from "react";

type Profile =
  | { connected: false }
  | {
      connected: true;
      openId: string;
      displayName: string;
      avatarUrl: string;
      scopes: string[];
      canUpload: boolean;
    };

const TERMINAL = new Set(["SEND_TO_USER_INBOX", "FAILED", "PUBLISH_COMPLETE"]);

function phaseLabel(phase: string): string {
  if (phase === "init") return "Initialisation";
  if (phase === "upload") return "Envoi du fichier";
  if (phase === "revoke") return "Révocation";
  return phase;
}

export function PlannerPanel({ notice }: { notice: string | null }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [phase, setPhase] = useState<string>(notice ?? "");
  const [tiktokStatus, setTiktokStatus] = useState<string>("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/tiktok/profile")
      .then(async (response) => {
        const body = (await response.json()) as Profile & { message?: string };
        if (!response.ok) throw new Error(body.message || "Profil indisponible");
        return body;
      })
      .then((body) => {
        if (!cancelled) setProfile(body);
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setProfileError(
            error instanceof Error ? error.message : "Profil indisponible",
          );
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function poll(publishId: string) {
    for (let attempt = 0; attempt < 30; attempt += 1) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await fetch("/api/tiktok/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publishId }),
      });
      const body = (await response.json()) as {
        status?: string;
        failReason?: string;
        message?: string;
      };
      if (!response.ok) {
        setPhase(body.message || "Statut indisponible");
        return;
      }
      setTiktokStatus(body.status ?? "");
      setPhase(body.failReason ? `${body.status} : ${body.failReason}` : body.status ?? "");
      if (body.status && TERMINAL.has(body.status)) return;
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const file = data.get("file");
    if (!(file instanceof File) || file.size === 0) {
      setPhase("Choisissez un fichier mp4");
      return;
    }
    setBusy(true);
    setTiktokStatus("");
    setPhase("init");
    try {
      const response = await fetch("/api/tiktok/inbox", { method: "POST", body: data });
      if (!response.ok || !response.body) {
        const body = (await response.json()) as { message?: string };
        setPhase(body.message || "Envoi refusé");
        return;
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let publishId = "";
      let finalStatus = "";
      while (true) {
        const chunk = await reader.read();
        if (chunk.done) break;
        buffer += decoder.decode(chunk.value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const raw of lines) {
          const line = raw.trim();
          if (line.startsWith("phase ")) setPhase(line.slice(6));
          if (line.startsWith("publish ")) publishId = line.slice(8).trim();
          if (line.startsWith("status ")) {
            finalStatus = line.slice(7).trim();
            setTiktokStatus(finalStatus);
            setPhase(finalStatus);
          }
          if (line.startsWith("fail ") && line.slice(5).trim()) {
            setPhase(`${finalStatus} : ${line.slice(5).trim()}`);
          }
          if (line.startsWith("error ")) setPhase(line.slice(6));
        }
      }
      if (publishId && finalStatus && !TERMINAL.has(finalStatus)) {
        await poll(publishId);
      }
    } catch {
      setPhase("Envoi interrompu");
    } finally {
      setBusy(false);
    }
  }

  async function disconnect() {
    setBusy(true);
    setPhase("revoke");
    try {
      const response = await fetch("/api/tiktok/disconnect", { method: "POST" });
      const body = (await response.json()) as { message?: string };
      if (!response.ok) {
        setPhase(body.message || "Déconnexion impossible");
        return;
      }
      setProfile({ connected: false });
      setTiktokStatus("");
      setPhase("Déconnecté. Jetons révoqués et supprimés.");
    } catch {
      setPhase("Déconnexion interrompue");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8">
      {phase ? (
        <p className="text-soft" role="status" aria-live="polite">
          {phaseLabel(phase)}
          {tiktokStatus && phase !== tiktokStatus ? ` : ${tiktokStatus}` : ""}
        </p>
      ) : null}

      <section className="rounded-xl border border-default bg-surface-card p-6">
        <h2 className="text-xl font-bold mb-4">Compte TikTok</h2>
        {profileError ? <p className="text-soft mb-4">{profileError}</p> : null}
        {profile?.connected ? (
          <div className="flex items-center gap-4 mb-4">
            {profile.avatarUrl ? (
              <span
                className="h-16 w-16 shrink-0 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url(${JSON.stringify(profile.avatarUrl)})` }}
                role="img"
                aria-hidden="true"
              />
            ) : null}
            <div>
              <p className="font-semibold">
                {profile.displayName || "Nom non renvoyé"}
              </p>
              <p className="text-sm text-soft break-all">
                {profile.openId || "Identifiant non renvoyé"}
              </p>
              <p className="text-sm text-soft">
                Autorisations : {profile.scopes.join(", ") || "aucune"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-soft mb-4">
            Aucun compte connecté. La connexion confirme le profil
            (user.info.basic) puis permet le dépôt en brouillon (video.upload).
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          <form action="/api/tiktok/login" method="get">
            <button className="btn-primary px-5 py-2.5" type="submit">
              Connecter TikTok
            </button>
          </form>
          {profile?.connected ? (
            <button
              type="button"
              className="px-5 py-2.5 rounded-md border border-default"
              onClick={disconnect}
              disabled={busy}
            >
              Déconnecter
            </button>
          ) : null}
        </div>
      </section>

      <section className="rounded-xl border border-default bg-surface-card p-6">
        <h2 className="text-xl font-bold mb-4">Brouillon</h2>
        <p className="text-soft mb-4">
          Le fichier part dans la boîte de réception TikTok. La légende et la
          publication se font ensuite à la main dans l&apos;application.
        </p>
        <form className="space-y-4" onSubmit={onSubmit}>
          <label className="block">
            <span className="block mb-2">Vidéo mp4</span>
            <input
              className="block w-full text-sm"
              type="file"
              name="file"
              accept="video/mp4,.mp4"
              required
            />
          </label>
          <button
            className="btn-primary px-5 py-2.5 disabled:opacity-50"
            type="submit"
            disabled={busy || !profile?.connected || profile.canUpload === false}
          >
            Envoyer en brouillon
          </button>
        </form>
      </section>
    </div>
  );
}
