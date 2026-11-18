# Forge Digitale Solutions - Guide de collaboration

Site vitrine + blog pour un artisan numérique à Saint-Laurent-Médoc (Gironde) :
- Création de sites web sur-mesure
- Montage et maintenance PC (gamer, bureautique, Renaissance Linux)
- Services informatiques (dépannage, Linux)

**Stack** : Next.js 16 (serveur `next start`, Dokploy), React 19, Tailwind CSS 4, TypeScript, blog dans Payload CMS 3 (Postgres, admin `/admin`, MCP `/api/mcp`).

**Branches** :
- `feat/*`, `fix/*`, `docs/*` : une branche par ticket, créée depuis un `dev` à jour (`git checkout dev && git pull`).
- `dev` : intégration. Chaque ticket y arrive par PR. `dev` ne déploie pas.
- `main` : prod. Merge de `dev` sur `main` → workflow Site GHCR → image `ghcr.io/forge-digitale-solutions/forge-digitale-website` → Dokploy pull (pas de build Docker sur le VPS). Seulement sur demande explicite d'Anthony.

---

## Workflow de dev

Chaîne : tech lead (Timoty) → sous-dev du repo → orchestrateur Orca → workers. Le sous-dev agit comme un humain devant Orca : il ne code pas lui-même, il pilote.

1. **Ticket prêt** : issue GitHub avec contexte, critères d'acceptation et étiquette `ready-for-agents`. Sinon, le tech lead complète avant de lancer.
2. **Branche** : depuis `dev` à jour, nommée `feat/<sujet>` ou `fix/<sujet>`.
3. **Orchestrateur** : le sous-dev ouvre une session Orca sur orca-serv (`~/orca/projects/forge-digitale-website`) avec Claude Opus 5.5, effort `medium`, et lui donne le ticket. Mode d'emploi Orca : `orca agent-context` et `orca skills get orchestration --full`.
4. **Plan puis délégation** : l'orchestrateur écrit un plan court, puis délègue le code aux workers Orca : DeepSeek V4.1 Flash via OpenCode (`opencode-go/deepseek-v4.1-flash`) par défaut ; Mistral (Codestral) ou Antigravity en renfort. Jamais DeepSeek V4 Pro. pstack (`$pstack-<nom>`) seulement si le ticket le demande.
5. **Vérification sur orca-serv** : `npx eslint` sur les fichiers touchés, `npx tsc --noEmit -p .`, `npm run build`. Pour une page : `npm run start` puis `curl` (code 200, `<title>`, canonical, pas de `noindex`).
6. **PR vers `dev`** : description = pourquoi, ce qui change, ce qui a été vérifié, ce qu'il reste à tester. La CI (`ci.yml` : lint, types, build) doit être verte.
7. **Compte rendu au tech lead** : lien de PR, résumé, liste de tests manuels. Le tech lead relit ; merge sur `dev` avec le go de Claire (SEO) ou de Margaux (COO). Prod uniquement sur demande d'Anthony.

Limites : 3 PR ouvertes en attente de relecture par repo au maximum. Commits avec l'email noreply GitHub (`181707761+AnthonyMarcelin@users.noreply.github.com`), sinon le push est refusé. Aucun secret dans le code, les commits ou les PR ; les variables vont dans Dokploy.


---

## SEO / GEO (état actuel)

Infrastructure en place :
- `robots.ts` + `sitemap.ts` (Next.js)
- `.htaccess` : 301 www / HTTP→HTTPS ; `/feed` en 404 (RSS retiré, pas de route `/feed`)
- `LocalBusinessSchema` : un seul LocalBusiness sitewide (`#business`), locality / region / `areaServed`, **sans** `streetAddress`, **sans** `geo` / GeoCircle (fiche GBP = zone de service), `sameAs` Facebook + LinkedIn (pas X)
- Pas d’`aggregateRating` ni de `review[]` dans le JSON-LD LocalBusiness (GSC : extraits d’avis invalides). Avis visibles en HTML (`Reviews` / GBP) uniquement
- NAP rue (`6 rue Saint-Julien`) : Footer + mentions légales, hors schema public
- `FAQSchema` sur la homepage ; breadcrumbs + `ArticleSchema` sur le blog
- HTTPS, Umami auto-hébergé (sans cookie)
- Open Graph : layout (accueil) + métadonnées dédiées sur pages services / légales / landing locales
- Blog : OG image d’article si dispo, sinon `/images/og-image.jpg` ; Twitter Card uniquement sur les articles

Pas de flux RSS. Ne pas le recréer ni le documenter comme existant.

---

## Fichiers utiles

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── cgv/ confidentialite/ mentions-legales/ faq/
│   ├── creation-site-web/ maintenance-site-web/ montage-pc/ installation-linux/
│   ├── creation-site-internet-medoc/ developpeur-medoc/
│   ├── site-internet-artisan-medoc/ creation-site-web-bassin-arcachon/
│   ├── rendez-vous-saint-laurent-medoc/
│   ├── (site)/        # pages publiques, blog/ page.tsx + [slug]/page.tsx, sitemap.ts
│   ├── (payload)/     # admin Payload et API
│   ├── api/           # newsletter, markdown, health, tiktok
│
├── components/seo/
│   ├── LocalBusinessSchema.tsx
│   ├── FAQSchema.tsx
│   ├── ArticleSchema.tsx
│   └── BreadcrumbSchema.tsx
│
├── collections/   # Payload : Posts (+ hooks/), Media, NewsletterIssues, Users
├── payload.config.ts
└── lib/posts.ts + google-reviews.ts   # lecture des articles depuis Payload
```

---

## Commandes

```bash
npm run dev
npm run build    # build Next.js (pas d'export out/)
npm run start    # serveur Node
npm run lint
```

Pas de `curl …/feed`. Vérifier le `<head>` : `npm run start`, puis `curl -s http://127.0.0.1:3000/ | head -n 40`.

---

## Patterns

**Métadonnées de page** : `title`, `description`, `alternates.canonical`, `openGraph` (title / description / url, image existante). Pas de promesse de classement.

**JSON-LD** : `LocalBusinessSchema`, `FAQSchema`, `ArticleSchema`, `BreadcrumbSchema`.

**Articles (Payload, collection `posts`)** : `title`, `h1`, `slug`, `publishedAt`, `excerpt`, `category`, `image`, `content` (Markdown), onglet SEO (`metaTitle`, `metaDescription`, `ogImage`, `faq`). Brouillons activés : un article n'est public qu'en `_status: published`. Images Unsplash uniquement, jamais d'image générée par IA.

---

## Analytics

Umami : https://stats.forgedigitalesolutions.com/ (anonyme, sans cookie).

---

## Local

Saint-Laurent-Médoc (33112). Zone ~50 km (Médoc, Bassin d’Arcachon, Bordeaux). FR uniquement.

Schema : `areaServed` (villes / zones), pas de `streetAddress` ni de coordonnées GPS dans le JSON-LD. Rue affichée en HTML (Footer, mentions légales) uniquement.

---

## Checklist SEO

1. `npm run build`
2. Sitemap : `/sitemap.xml` (servi par `next start`)
3. Pages touchées + JSON-LD (validator.schema.org)
4. OG title/url de la page, pas ceux de l’accueil
5. PR vers `dev` (CI verte), puis merge sur `main` sur demande d'Anthony pour déployer

---

**Dernière mise à jour** : 18 novembre 2026
