---
name: fds-site-facts
description: Use this when you need Forge Digitale Solutions identity, contact, service area, or entry pricing — fetch the public read-only JSON.
---

# FDS site facts (lecture seule)

## When to use

Besoin des faits stables du site Forge Digitale Solutions (identité, SIREN, contact, zone, ticket d'entrée 500 € HT, URLs clés).

## How

1. `GET https://forgedigitalesolutions.com/api/public/site.json` (pas d'auth, JSON).
2. Ne pas inventer de tarifs ni de coordonnées hors de ce fichier / du site.
3. Pour le contexte éditorial long : `https://forgedigitalesolutions.com/llms.txt`.
4. Contact humain uniquement pour devis : formulaire `#contact`, e-mail ou téléphone indiqués dans le JSON.

## Out of scope

Pas d'MCP, pas d'OAuth, pas de mutation, pas de classement SEO promis.
