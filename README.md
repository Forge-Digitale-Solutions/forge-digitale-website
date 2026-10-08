Website de La Forge Digitale Solutions

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Production (Dokploy + GHCR)

The site runs as a Node server (`next start`), not a static `out/` export.

Git flow: `feat/<name>` → `dev` → merge onto `main` (prod). Updates to `dev` or feature branches do **not** deploy production.

On every update to `main` (and via `workflow_dispatch`), the **Site GHCR** workflow:

1. Builds the [`Dockerfile`](Dockerfile) on GitHub Actions
2. Pushes `ghcr.io/forge-digitale-solutions/forge-digitale-website:latest` (and a short SHA tag)
3. Calls the Dokploy deploy webhook so the VPS **pulls** the image (no Docker build on the server)

- Port **3000** (`-H 0.0.0.0`)
- Healthcheck: `curl -f http://127.0.0.1:3000/` (homepage returns 200). Swarm FailureAction: rollback
- Build arg (GitHub Actions): `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (inlined at image build; a runtime env var is not enough)
- Runtime env (Dokploy → Environment): `DATABASE_URI`, `PAYLOAD_SECRET`, `PAYLOAD_PUBLIC_SERVER_URL`, etc.

GitHub secrets:

- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` — required at image build
- `DOKPLOY_DEPLOY_WEBHOOK` — Dokploy application webhook URL (Deployments tab)

Dokploy Docker provider: image `ghcr.io/forge-digitale-solutions/forge-digitale-website:latest`, registry `ghcr.io`. For a private GHCR package, set username + PAT (`read:packages`). If the package is public, pull works without a PAT.

Copy the application webhook URL from Dokploy → Deployments into `DOKPLOY_DEPLOY_WEBHOOK` so Actions can notify Dokploy after each image push.
