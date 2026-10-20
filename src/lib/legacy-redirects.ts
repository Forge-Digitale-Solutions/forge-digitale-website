export const legacyRedirects: Record<string, string> = {
  "/services": "/",
  "/pack-agent-ready": "/services/agent-ready/",
  "/about": "/",
  "/contact": "/",
  "/realisations": "/",
  "/atelier-saint-laurent-medoc": "/rendez-vous-saint-laurent-medoc/",
  "/atelier-saint-laurent-medoc.html": "/rendez-vous-saint-laurent-medoc/",
  "/atelier-saint-laurent-medoc/index.html":
    "/rendez-vous-saint-laurent-medoc/",
};

export function legacyRedirectRules() {
  return Object.entries(legacyRedirects).map(([source, destination]) => ({
    source: source.includes(".") ? source : `${source}/`,
    destination,
    permanent: true as const,
  }));
}
