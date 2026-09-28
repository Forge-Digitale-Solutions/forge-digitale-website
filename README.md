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

## Production (Dokploy)

The site runs as a Node server (`next start`), not a static `out/` export. Dokploy builds the `Dockerfile` from `main`.

- Port **3000** (`-H 0.0.0.0`)
- Healthcheck: `curl -f http://127.0.0.1:3000/` (homepage returns 200). Swarm FailureAction: rollback
- Build arg: `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (inlined at image build; a runtime env var is not enough)

The GitHub workflow `Mise en ligne OVH` is `workflow_dispatch` only. It does not FTP on push to `main`, so it cannot fight Dokploy after the DNS cutover. Secrets `FTP_*` and `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` stay in GitHub until OVH is switched off.
