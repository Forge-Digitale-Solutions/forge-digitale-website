# Forge Digitale Solutions - Guide de Collaboration

## 🎯 Vue d'ensemble du projet

**Forge Digitale Solutions** est un site vitrine + blog pour un artisan numérique en Gironde (Saint-Laurent-Médoc), spécialisé en:
- Création de sites web sur-mesure
- Montage & maintenance de PC (gamer, bureautique, Renaissance Linux)
- Services informatiques (dépannage, Linux, etc.)

**Stack technique**: Next.js 16 (static export), React 19, Tailwind CSS 4, TypeScript, Markdown blog.

---

## 🔍 Audit SEO/GEO - Résumé

### Scores
- **SEO: 7.5/10** → Bon, avec améliorations apportées
- **GEO: 8/10** → Excellent pour une entreprise locale française

### Infrastructure existante (bien configurée)
✅ `robots.txt` + `sitemap.xml` (auto-généré par Next.js)  
✅ `.htaccess` : redirections 301 (www, HTTP→HTTPS), anciennes routes supprimées  
✅ `LocalBusinessSchema` : adresse complète, géolocalisation (45.15, -0.8242), zone de service 50km  
✅ `FAQSchema` : 6 Q&A structurées  
✅ HTTPS + Analytics éthique (Umami auto-hébergé, sans cookies)  
✅ `OpenGraph` global complet  

### Améliorations déployées (v2.0 - Avril 2026)

#### Métadonnées pages légales
- `/cgv/page.tsx` → Title, Description, OpenGraph uniques
- `/mentions-legales/page.tsx` → Identifiants SIREN/APE, hébergeur, propriété IP
- `/confidentialite/page.tsx` → RGPD, Umami, Web3Forms, droits utilisateurs

#### Blog enrichi
- `ArticleSchema.tsx` → **BlogPosting** schema.org pour chaque article
  - Author: Anthony Marcelin
  - publishedTime/dateModified
  - keywords auto-générés (catégorie + blog + localisation)
  - image OG dynamique par article
  
- Métadonnées dynamiques améliorées:
  - Open Graph image: réutilise l'image de l'article si dispo
  - Twitter Card: summary_large_image
  - Keywords: title + category + blog + Forge Digitale + Médoc
  
- **RSS Feed** (`/feed` route): 
  - XML standard Atom/RSS 2.0
  - Tous les articles avec date, auteur, catégorie, image
  - Cache 1h, révalidation quotidienne
  - Headless feed pour agrégateurs (Feedly, etc.)

#### Navigation structurée
- `BreadcrumbSchema.tsx` → Breadcrumbs visuels + **BreadcrumbList** JSON-LD
  - Utilisable sur `/blog/[slug]` (nav: Accueil > Blog > Article)
  - Aide Google à comprendre la hiérarchie du site

#### Articles enrichis
- Excerpts plus détaillés & SEO-friendly:
  - Forfait Renaissance: mise en avant budget + Linux + durée
  - Croissance Web: chiffres clés + zones géographiques servies
  - PC Gamer: budget-range + avantages évolutivité

---

## 📂 Structure fichiers SEO

```
src/
├── app/
│   ├── layout.tsx                    # Métadonnées globales + RSS link
│   ├── cgv/page.tsx                  # CGV + generateMetadata
│   ├── mentions-legales/page.tsx     # Mentions légales + generateMetadata
│   ├── confidentialite/page.tsx      # Confidentialité + generateMetadata
│   ├── blog/
│   │   ├── page.tsx                  # Index blog
│   │   └── [slug]/page.tsx           # Post dynamique + ArticleSchema
│   └── feed/
│       └── route.ts                  # RSS feed XML generation
│
├── components/seo/
│   ├── LocalBusinessSchema.tsx       # Business info (existing)
│   ├── FAQSchema.tsx                 # FAQ (existing)
│   ├── ArticleSchema.tsx             # BlogPosting schema (NEW)
│   └── BreadcrumbSchema.tsx          # Breadcrumb nav (NEW)
│
├── lib/
│   └── posts.ts                      # Markdown blog parser
│
└── posts/
    ├── forfait-renaissance.md        # Hardware article (updated)
    ├── croissance-web.md             # Web article (updated)
    └── pc-gamer-budget.md            # Hardware article (updated)
```

---

## 🚀 Points clés pour futures améliorations

### Tier 1 - À faire maintenant (si besoin)
- [ ] Ajouter lien RSS visible dans Footer/Header
- [ ] Tester RSS feed avec Feedly/Google Podcasts
- [ ] Vérifier images OG sur Facebook/LinkedIn
- [ ] Valider schema.org avec [schema.org validator](https://validator.schema.org/)

### Tier 2 - Nice-to-have
- [ ] Ajouter Review schema si avis clients
- [ ] Implémenter canonical tags explicites (déjà implicites)
- [ ] Ajouter AggregateRating quand 5+ avis
- [ ] Feed RSS pour le newsletter (si future)

### Tier 3 - Futur multi-langue
- Si expansion EN/DE/ES:
  - Ajouter `hreflang` dans layout.tsx
  - Implémenter i18n (next-intl ou similar)
  - Dupliquer ArticleSchema + BreadcrumbSchema en langues
  - Ajouter `/en/feed`, `/de/feed`, etc.

---

## 🛠️ Commandes utiles

```bash
# Dev
npm run dev                # Next.js dev server

# Build + Export statique
npm run build              # Build + export → out/

# Test locally
npm run start              # Serve l'export static

# Lint
npm run lint               # ESLint check

# Vérifier RSS feed
curl https://forgedigitalesolutions.com/feed

# Vérifier metadata
head -n 30 out/cgv/index.html  # Voir <head> compiled
```

---

## 🔧 Patterns utilisés

### Métadonnées dynamiques
```typescript
export async function generateMetadata() {
  return { title, description, openGraph, ... }
}
```
✓ Utiliser dans `/cgv`, `/mentions-legales`, `/confidentialite`, `/blog/[slug]`

### Schema.org JSON-LD
```typescript
<script type="application/ld+json" 
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} 
/>
```
✓ Composants: `LocalBusinessSchema`, `FAQSchema`, `ArticleSchema`, `BreadcrumbSchema`

### Blog Markdown + Frontmatter
```yaml
---
title: "..."
date: "YYYY-MM-DD"
category: "Web|Hardware"
excerpt: "..."
image: "/blog/filename.jpg"
---
```
✓ Parser: `gray-matter` + `remark` (HTML)

---

## 📊 Analytics & Monitoring

**Tool**: Umami Analytics (auto-hébergé)
- URL: https://stats.forgedigitalesolutions.com/
- Dashboard: Pas de cookie, données anonymes
- Scope: Pages visitées, appareils, géolocalisation approximative

**À monitorer**:
- CTR partages blog → Open Graph images
- Clicks depuis RSS → engagement lecteurs
- Breadcrumb clicks → UX navigation

---

## 🌍 Géolocalisation

**Focus principal**: Saint-Laurent-Médoc (33112), Gironde, France
- Adresse GPS: 45.15°N, 0.8242°W
- Zone service: Rayon 50km (Bordeaux, Bassin d'Arcachon, Médoc)
- Langue: FR uniquement (pas d'i18n actuellement)

**Mentions locales**:
- Keywords: Médoc, Gironde, Saint-Laurent-Médoc, Bordeaux, Bassin d'Arcachon
- Schémas: areaServed, GeoCircle
- Articles: excerpts mentionnent localisation

---

## ✅ Checklist pré-déploiement (après changements SEO)

1. [ ] Rebuild + test local: `npm run build && npm run start`
2. [ ] Vérifier sitemap.xml généré (via `out/sitemap.xml`)
3. [ ] Tester pages légales + blog dans navigateur
4. [ ] Valider Open Graph sur [ogp.me debugger](https://www.facebook.com/sharer/sharer_internals.php)
5. [ ] Vérifier schema.org JSON-LD sur [Google Schema Validator](https://validator.schema.org/)
6. [ ] Test RSS: `curl https://forgedigitalesolutions.com/feed`
7. [ ] Commit + push (si GH actions build auto-deploy)
8. [ ] Attendre Google crawl (24-48h) ou demander via Search Console

---

## 🎓 Ressources

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Schema.org Types](https://schema.org/): BlogPosting, BreadcrumbList, LocalBusiness, FAQPage
- [Open Graph Protocol](https://ogp.me/)
- [Google Search Console](https://search.google.com/search-console/) - monitorer indexation
- [Umami Analytics Docs](https://umami.is/)

---

**Dernière mise à jour**: 2 avril 2026  
**Mainteneur**: Claude Code
