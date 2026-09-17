# auth.md — Forge Digitale Solutions

## Audience

Agents et humains. Ce domaine est une **vitrine** (site statique) pour Forge Digitale Solutions (Saint-Laurent-Médoc). Raison sociale : EI Anthony Marcelin. Nom commercial : Forge Digitale Solutions.

## Registration

**Pas d'enregistrement d'agent.**

- Aucun flux « agent verified »
- Aucun flux « user claimed »
- Aucun `register_uri`, aucun one-shot environment, aucun claim token

Les agents **ne doivent pas** tenter de provisionner un compte ou un credential sur ce domaine.

Contact humain pour devis / atelier :

1. Formulaire : https://forgedigitalesolutions.com/#contact
2. E-mail : contact@forgedigitalesolutions.com
3. Téléphone : 06 45 65 96 96

## OAuth / OpenID

**Pas d'OAuth public, pas d'OpenID Connect.**

- Pas de `/.well-known/openid-configuration`
- Pas de `/.well-known/oauth-authorization-server`
- Pas de `/.well-known/oauth-protected-resource`
- Aucun issuer, authorization_endpoint, token_endpoint ou jwks_uri publiés
- Aucun jeton d'accès délivré aux agents

## MCP / A2A / WebMCP

Pas de serveur MCP public, pas de carte A2A, pas d'outils WebMCP. Voir `/.well-known/api-catalog` et `/.well-known/ai-catalog.json` pour les ressources **lecture seule** (JSON, llms.txt, pages).

## Capacités liées (lecture seule)

- `GET /api/public/site.json` — faits site
- `GET /llms.txt` — index markdown
- `Accept: text/markdown` sur l'accueil (et pages avec `.md`)
- Skills découverte : `/.well-known/agent-skills/index.json`
- ARD : `/.well-known/ai-catalog.json`
