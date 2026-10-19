# Événements Umami

Le script Umami est déjà celui du site (`stats.forgedigitalesolutions.com`). Il se charge en production seulement, après l'hydratation (`next/script`, `afterInteractive`). Pas de cookie, pas de bandeau.

Umami rattache chaque événement à l'URL de la page. La propriété `place` dit quel contrôle a été utilisé, pas sur quelle page.

Aucun événement ne contient de nom, d'e-mail, de téléphone, de message, ni d'URL avec jeton.

## Configuration

Variables lues au **build** de l'image Docker. Une variable posée seulement au runtime sur Dokploy n'est pas vue par le script.

| Variable | Contenu |
| --- | --- |
| `NEXT_PUBLIC_UMAMI_URL` | Origine Umami, par exemple `https://stats.forgedigitalesolutions.com`. Si la valeur finit déjà par `/script.js`, elle est prise telle quelle. |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Identifiant du site dans Umami (`data-website-id`). |

Secrets GitHub Actions du workflow Site GHCR, passés en build-args. Valeurs déjà publiques dans le HTML actuel :

- `NEXT_PUBLIC_UMAMI_URL` = `https://stats.forgedigitalesolutions.com`
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID` = `e45a87dd-4a11-425c-9ff7-779a722575ba`

Sans ces secrets, le prochain build de prod n'inclut plus le script.

Le script est absent si `NODE_ENV` n'est pas `production`, ou si une des deux variables est vide. Le helper `track()` ne fait alors rien.

## Où c'est branché

- Clics sur un lien ou un bouton posé dans le code : attribut `data-umami-event` (et `data-umami-event-<propriété>`). Umami les lit tout seul.
- Liens `tel:`, `mailto:` et `/#contact` écrits dans le Markdown d'un article : un seul écouteur de clic (`UmamiAutoLinks`) appelle `track()` avec `place` = `content`. Les liens déjà marqués sont ignorés, donc pas de double compte.
- Succès après une réponse serveur : `track()` dans `src/lib/track.ts`.

Il n'y a pas de lien Tally sur ce site. Le rendez-vous passe par le bouton Calendly (`appointment-click`).

## Événements

### `contact-submit`

Formulaire de contact, succès seulement. Deux chemins : envoi par le visiteur, et envoi par l'outil assistant du navigateur.

- `service` : sujet, seulement s'il fait partie de la liste fixe. Sinon la propriété est absente.
  - `Demande de Devis Web`
  - `Pack Agent Ready`
  - `Montage PC`
  - `Dépannage / Maintenance`
  - `Autre demande`

### `phone-click`

Tous les liens `tel:`.

- `place`
  - `contact` : bloc téléphone de la section contact
  - `footer`
  - `inline` : numéro dans le texte (FAQ, landings, page rendez-vous)
  - `content` : numéro dans le corps d'un article
  - `cta` : numéro à côté du bouton de bas de page (FAQ, rendez-vous)

### `email-click`

Tous les liens `mailto:`.

- `place`
  - `contact` : bloc e-mail de la section contact
  - `footer`
  - `inline` : adresse dans le texte
  - `content` : adresse dans le corps d'un article
  - `legal` : mentions légales et politique de confidentialité

### `quote-click`

Liens vers `/#contact` (devis, contact, diagnostic).

- `place`
  - `header` : « Demander un devis » (desktop)
  - `header-mobile` : « Me contacter » du menu
  - `hero` : « Lancer mon projet »
  - `footer` : « Demander un Devis »
  - `inline` : lien dans le texte (« le formulaire », « me contacter », « Contact et devis »)
  - `content` : lien vers le formulaire dans le corps d'un article
  - `cta` : bouton de bas de page (pages services, landings, FAQ, rendez-vous, fin d'article)

### `appointment-click`

Bouton Calendly de la section contact. L'URL Calendly n'est pas envoyée.

- `place` : `contact`

### `whatsapp-click`

- `place`
  - `floating` : bouton rond
  - `assistant` : ouverture par l'outil assistant. Le texte du message n'est pas envoyé.

### `newsletter-submit`

Inscription newsletter, succès seulement. L'e-mail n'est pas envoyé.

- `place` : `footer`, `article` ou `page`

### `tool-click`

Lien « Découvrir » d'une carte sur `/outils/`. L'URL du produit (et ses paramètres UTM) n'est pas envoyée.

- `product` : identifiant, aujourd'hui `grilla`

### `article-read`

Une fois par chargement de page, quand un repère placé à 75 % du corps de l'article entre dans l'écran. Le titre et l'image d'en-tête ne comptent pas dans ces 75 %. L'observateur se débranche ensuite. Pas d'écouteur de scroll.

- `slug` : identifiant de l'article, par exemple `croissance-web`

## Vues à créer dans Umami

Filtrer par nom d'événement. Pour le détail, découper sur la propriété ou sur l'URL de la page.

- Demandes reçues : `contact-submit`, découpage `service`
- Appels : `phone-click`, découpage `place` et URL
- E-mails : `email-click`, découpage `place` et URL
- Intention de devis : `quote-click`, découpage `place` et URL
- Rendez-vous : `appointment-click`
- WhatsApp : `whatsapp-click`, découpage `place`
- Newsletter : `newsletter-submit`, découpage `place`
- Outils : `tool-click`, découpage `product`
- Lectures : `article-read`, découpage `slug`

## Poids

Un script, chargé après l'hydratation. Les liens marqués n'ajoutent pas de JavaScript. Un écouteur de clic couvre les liens des articles. Sur un article, un `IntersectionObserver` s'arrête au premier signal.
