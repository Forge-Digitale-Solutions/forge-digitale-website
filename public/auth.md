# auth.md — Forge Digitale Solutions

## Audience

Agents et humains qui contactent une agence / artisan numérique local. Ce site est une vitrine : **pas de serveur OAuth**, **pas d'API protégée** pour des tiers.

## Registration

Il n'y a **pas** d'enregistrement d'agent automatisé (ni flux « agent verified », ni « user claimed »).

Pour un devis ou une intervention :

1. Formulaire : https://forgedigitalesolutions.com/#contact
2. E-mail : contact@forgedigitalesolutions.com
3. Téléphone : 06 45 65 96 96

## OAuth / tokens

Aucun endpoint d'autorisation, aucun Protected Resource Metadata, aucun jeton délivré aux agents.

## Capacités liées

- Contenu : HTML, `llms.txt`, négociation `Accept: text/markdown`
- Découverte : `/.well-known/api-catalog` (catalogue honnête, sans API REST)
- Pas de MCP Server Card, pas de carte A2A
