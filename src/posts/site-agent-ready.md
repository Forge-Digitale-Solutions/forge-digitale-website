---
title: "Votre site est-il prêt pour les agents IA ?"
h1: "Votre site est-il prêt pour les agents IA ?"
excerpt: "Quand quelqu’un demande à ChatGPT un artisan près de chez lui, l’assistant doit pouvoir trouver et lire votre site. Ce qu’une vitrine peut exposer sans promesse de classement."
date: "2026-10-02"
lastModified: "2026-10-02"
category: "Web"
image: "/blog/site-agent-ready.jpg"
---

# Votre site est-il prêt pour les agents IA ?

Quelqu’un ouvre ChatGPT (ou un autre assistant) et demande « un couvreur près de chez moi » ou « les horaires de la boulangerie du coin ». L’outil cherche des sources sur le web. Si votre site est flou, inaccessible aux robots ou sans fiche claire sur ce que vous faites, il a moins de matière fiable pour répondre.

Ce n’est pas une promesse que ChatGPT citera votre entreprise. C’est un constat technique : les assistants et les agents IA s’appuient de plus en plus sur des fichiers et des règles lisibles par machine, en plus des pages HTML destinées aux humains.

Je m’appelle Anthony Marcelin. Je crée des sites depuis Saint-Laurent-Médoc. Sur forgedigitalesolutions.com, on a branché ce qu’une vitrine peut brancher sans inventer de services fantômes. Les sources sont liées au fil du texte. D’abord le point de vue métier, puis le détail pour qui gère le site.

## Ce que ça change pour un artisan, un commerçant ou une asso

Un assistant qui doit parler de votre activité a trois besoins concrets :

1. **Trouver** le bon domaine et les pages utiles.
2. **Lire** l’offre, la zone, le contact, sans se noyer dans un HTML inutilement lourd.
3. **Savoir** comment vous joindre ou ce que vous proposez (téléphone, formulaire, devis, adhésion).

Le site pour les visiteurs humains reste la priorité. Un accueil confus donne une lecture confuse aussi bien à un client qu’à un agent. Pour le socle indexation et pages introuvables, voir [Mon site est en ligne. Personne ne le trouve.](/blog/site-en-ligne-introuvable-google/).

### Ce que vous pouvez demander à votre prestataire ou à votre hébergeur

- Un **fichier de consignes pour les robots** (`robots.txt`) à jour, avec le lien vers le plan du site.
- Un **plan du site** (`sitemap.xml`) qui liste les vraies pages importantes.
- Une **fiche texte à la racine** (souvent appelée `llms.txt`) : pages utiles, contact, offre, liens légaux, pour qu’un agent ait une carte du site.
- Des **règles explicites** sur ce que les bots IA peuvent faire après accès : recherche, usage par un agent, entraînement d’un modèle. Le projet [Content Signals](https://contentsignals.org/) formalise ces préférences ; elles doivent coller à votre politique réelle.
- Si l’hébergeur le permet : une **version texte/Markdown** des pages clés, plus légère à digérer qu’une page HTML complète. Cloudflare documente cette négociation sous [Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/).

Vous n’avez pas besoin d’un serveur d’agents le premier jour. Vous avez besoin d’un site propre et de quelques fichiers honnêtes.

### Checklist métier

1. HTTPS et pages importantes accessibles.
2. Plan du site et fichier robots à jour.
3. Fiche texte machines avec pages utiles, contact, offre.
4. Règles bots écrites noir sur blanc (ce que vous autorisez, ce que vous refusez).
5. Accueil et pages service lisibles par un humain.

Si le HTTPS est bancal, s’il reste des pages orphelines, ou si la fiche Google pointe vers un site absent, réparez d’abord le socle. Voir [Après la fiche Google : vitrine, landing ou back-office](/blog/fiche-google-vitrine-landing-back-office/) et [Référencement : vérifier avant de payer](/blog/referencement-verifier-avant-de-payer/).

Google ne documente pas « publiez une fiche texte machines pour monter en position ». Les bases restent le [guide SEO de démarrage](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=fr) : contenu utile, technique saine.

## Pour qui gère le site (technique)

Cloudflare propose un scanner public, [Is it Agent Ready?](https://isitagentready.com/). Il vérifie si le site est trouvable, lisible par les bots, capable de servir du Markdown, et s’il expose des catalogues machine. Il regarde aussi des couches plus avancées (connexion agent, serveur d’outils, commerce agentique). C’est une grille technique, pas un classement dans Google.

### Trois couches sur une vitrine

**Trouvable.** Fichier robots valide avec le lien sitemap. Plan du site à jour. En-têtes HTTP qui pointent vers des ressources utiles (mécanisme décrit dans la [RFC 8288](https://www.rfc-editor.org/rfc/rfc8288) : liens structurés vers le plan du site, la fiche texte machines, le catalogue d’API). Au niveau DNS, un brouillon IETF baptisé [DNS for AI Discovery](https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/) (présentation [dns-aid.org](https://www.dns-aid.org/)) prévoit un enregistrement du type `_index._agents.votredomaine` pour signaler où commence la découverte agents, sans inventer un serveur d’outils fantôme.

**Lisible.** Répondre en Markdown quand le client le demande (négociation `Accept`, ou [Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/) chez Cloudflare). Aligner les préférences [Content Signals](https://contentsignals.org/) entre le fichier robots et l’en-tête HTTP. Écrire des règles Allow / Disallow pour les bots IA connus, plutôt qu’un silence ambigu. Sur FDS on utilise aujourd’hui : recherche et usage agent autorisés, entraînement refusé (`search=yes, ai-input=yes, ai-train=no`). À adapter à votre choix.

**Découvrable par les machines.** Fiche texte à la racine (`/llms.txt`). Catalogue d’API au chemin standard `/.well-known/api-catalog` ([RFC 9727](https://www.rfc-editor.org/rfc/rfc9727)) : on n’y liste que des ressources réelles ; une vitrine sans API publique peut publier un linkset honnête plutôt qu’un 404. Index de compétences agents en lecture seule et catalogue de ressources : utiles seulement s’il y a quelque chose à exposer. Les protocoles de connexion agent, de serveur d’outils interactifs dans la page ou de commerce agentique ciblent d’autres profils de site. Les coller sur une vitrine sans backend agent gonfle un scan sans servir le client.

### Labo forgedigitalesolutions.com

Au scan [isitagentready.com](https://isitagentready.com/) du 28 septembre 2026, le domaine sort au **niveau 4 (Agent-Integrated)** : trouvabilité, lisibilité et une partie de la découverte machine passent, sans inventer d’authentification agent ni de serveur d’outils.

En place : fichier robots avec Content Signals et règles bots IA ; en-tête HTTP aligné ; liens HTTP vers le catalogue d’API, la fiche texte, le sitemap, une page d’auth explicite (pas d’enregistrement agent public), l’index de compétences et le catalogue de ressources ; négociation Markdown sur l’accueil ; `/llms.txt` à jour ; catalogue d’API en linkset honnête (**aucune API REST publique inventée**) ; index [agent-skills](https://forgedigitalesolutions.com/.well-known/agent-skills/index.json) ; enregistrement DNS de découverte agents sur `_index._agents.forgedigitalesolutions.com` (sans enregistrements fantômes de serveur d’outils ou d’agent-à-agent).

**Plafond.** Le scanner marque en échec (ou neutre) ce qu’on n’a pas branché : découverte OAuth agent, carte de serveur d’outils (MCP), protocole agent-à-agent (A2A), outils interactifs dans la page (WebMCP), protocoles de paiement agent. Pour une vitrine TPE qui prend rendez-vous avec un humain, c’est le plafond honnête. On préfère un niveau 4 réel à un niveau 5 maquillé.

Vous pouvez relancer le scan vous-même sur [isitagentready.com](https://isitagentready.com/) avec `forgedigitalesolutions.com`. Les cases du produit Cloudflare évoluent : notez la date avant de comparer deux captures.

### Ordre de branchement

1. Plan du site + fichier robots
2. Content Signals (fichier robots, puis en-tête HTTP si vous le maîtrisez)
3. Règles bots IA explicites
4. Fiche texte `/llms.txt`
5. En-têtes de liens HTTP vers ces ressources
6. Markdown (fichiers `.md` miroir ou négociation côté hébergeur / CDN)
7. Catalogue d’API seulement s’il y a quelque chose de vrai à lister
8. Enregistrement DNS de découverte agents si vous gérez le DNS (brouillon IETF, expérimental)
9. Compétences agents, outils dans la page, serveur d’outils, OAuth agent : plus tard, usage réel seulement

Les scanners et les brouillons DNS bougent. Un niveau 4 aujourd’hui peut changer demain si Cloudflare ajoute une case. Des fichiers vides ou des endpoints morts pour gonfler un scan se voient au prochain audit.

## En pratique

Vous voulez une vitrine claire pour vos clients, et propre pour les machines qui la lisent ? Les étapes ci-dessus restent le fond : pages lisibles, hébergement, en-têtes, fichiers d’index. Si vous préférez qu’on branche ça sur un site existant (ou en option sur un site neuf), le détail du périmètre est sur la page [Pack Agent Ready](/services/agent-ready/).

Question précise sur robots, Markdown ou catalogue ? [Contact](/#contact).
