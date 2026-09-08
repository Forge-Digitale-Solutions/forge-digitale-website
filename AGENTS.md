# Forge Digitale Solutions - Guide de collaboration

Site vitrine + blog pour un artisan numérique à Saint-Laurent-Médoc (Gironde) :
- Création de sites web sur-mesure
- Montage et maintenance PC (gamer, bureautique, Renaissance Linux)
- Services informatiques (dépannage, Linux)

**Stack** : Next.js 16 (static export), React 19, Tailwind CSS 4, TypeScript, blog Markdown.

---

## SEO / GEO (état actuel)

Infrastructure en place :
- `robots.ts` + `sitemap.ts` (Next.js)
- `.htaccess` : 301 www / HTTP→HTTPS ; `/feed` en 404 (RSS retiré, pas de route `/feed`)
- `LocalBusinessSchema` : NAP (`streetAddress` 6 rue Saint-Julien), **sans** `geo` / GeoCircle (fiche GBP = zone de service), `sameAs` Facebook + LinkedIn (pas X)
- `aggregateRating.reviewCount` et `review[]` alignés sur **6** avis GBP
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
│   ├── blog/ page.tsx + [slug]/page.tsx
│   ├── robots.ts sitemap.ts
│
├── components/seo/
│   ├── LocalBusinessSchema.tsx
│   ├── FAQSchema.tsx
│   ├── ArticleSchema.tsx
│   └── BreadcrumbSchema.tsx
│
├── lib/posts.ts + google-reviews.ts
└── posts/   # Markdown (frontmatter + image dans public/blog/)
```

---

## Commandes

```bash
npm run dev
npm run build    # export → out/
npm run start
npm run lint
```

Pas de `curl …/feed`. Vérifier le `<head>` compilé : `head -n 40 out/index.html`.

---

## Patterns

**Métadonnées de page** : `title`, `description`, `alternates.canonical`, `openGraph` (title / description / url, image existante). Pas de promesse de classement.

**JSON-LD** : `LocalBusinessSchema`, `FAQSchema`, `ArticleSchema`, `BreadcrumbSchema`.

**Blog frontmatter** :
```yaml
---
title: "..."
date: "YYYY-MM-DD"
category: "Web|Hardware"
excerpt: "..."
image: "/blog/filename.jpg"
---
```
Toujours une image réelle dans `public/blog/` pour le champ `image`.

---

## Analytics

Umami : https://stats.forgedigitalesolutions.com/ (anonyme, sans cookie).

---

## Local

Saint-Laurent-Médoc (33112). Zone ~50 km (Médoc, Bassin d’Arcachon, Bordeaux). FR uniquement.

Schema : `areaServed` (villes / zones), pas de coordonnées GPS dans le JSON-LD.

---

## Checklist SEO

1. `npm run build`
2. Sitemap : `out/sitemap.xml`
3. Pages touchées + JSON-LD (validator.schema.org)
4. OG title/url de la page, pas ceux de l’accueil
5. Commit + push (deploy via CI)

---

**Dernière mise à jour** : 8 septembre 2026
