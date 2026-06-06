---
title: "Mots de passe : pourquoi un gestionnaire vaut mieux que la mémoire"
date: "2026-06-05"
lastModified: "2026-06-05"
category: "Sécurité"
excerpt: "Le piratage de compte est la deuxième menace la plus signalée par les particuliers sur Cybermalveillance.gouv.fr, en hausse de 47 % en 2024. La cause la plus fréquente : des mots de passe réutilisés ou trop faibles. Ce qu'en dit la CNIL, comment fonctionne un gestionnaire de mots de passe, et comment s'y mettre en une heure, sous Windows comme sous Linux."
image: "/blog/gestionnaire-mots-de-passe.jpg"
---

Boîte mail, banque, impôts, Ameli, réseaux sociaux, sites marchands : un usage courant d'internet représente aujourd'hui plusieurs dizaines de comptes. Personne ne peut mémoriser autant de mots de passe distincts et robustes. La parade la plus répandue, réutiliser le même partout, est précisément ce que les attaquants exploitent.

Le constat est mesurable : dans le rapport d'activité 2024 de Cybermalveillance.gouv.fr, le **piratage de compte est la deuxième menace la plus signalée par les particuliers, en progression de 47 %** sur un an. Chez les professionnels, il représente environ un cinquième des demandes d'assistance.

*Source : [Cybermalveillance.gouv.fr – Rapport d'activité 2024](https://www.cybermalveillance.gouv.fr/tous-nos-contenus/actualites/rapport-activite-2024)*

## Pourquoi la réutilisation est le vrai problème

Quand un site se fait dérober sa base de comptes, les couples email + mot de passe qui fuitent sont testés automatiquement sur des centaines d'autres services : messageries, banques, réseaux sociaux. Cette technique, le *credential stuffing*, ne demande aucune compétence particulière, des outils l'automatisent entièrement.

Conséquence : un mot de passe, même long et complexe, ne protège plus rien s'il est utilisé sur plusieurs sites. La fuite peut venir d'un petit site marchand oublié depuis des années et ouvrir l'accès à la boîte mail, qui permet à son tour de réinitialiser tous les autres comptes.

Pour un professionnel, l'enjeu dépasse le compte personnel : un compte Google piraté, c'est une [fiche Google](/blog/fiche-google-artisans) modifiée ou détournée ; une page Facebook volée, c'est un canal de contact perdu et des clients exposés à des arnaques au nom de l'entreprise.

## Ce que recommande la CNIL

La CNIL a actualisé sa recommandation sur les mots de passe en 2022 (délibération n° 2022-100). Elle raisonne en « entropie », c'est-à-dire en imprédictibilité, et donne des équivalents concrets pour un mot de passe utilisé seul :

- **12 caractères** au minimum avec majuscules, minuscules, chiffres et caractères spéciaux ;
- ou **14 caractères** avec majuscules, minuscules et chiffres, sans caractère spécial ;
- ou une **phrase de passe d'au moins 7 mots**.

Et surtout : un mot de passe **différent pour chaque service**. C'est cette dernière exigence qui rend le gestionnaire indispensable, car elle est intenable de mémoire.

*Source : [CNIL – Mots de passe : recommandations pour maîtriser sa sécurité](https://www.cnil.fr/fr/mots-de-passe-recommandations-pour-maitriser-sa-securite)*

## Le gestionnaire de mots de passe : un coffre-fort chiffré

Le principe est simple : un logiciel conserve tous les mots de passe dans un coffre chiffré, protégé par un unique mot de passe « maître », le seul à retenir. Le gestionnaire génère lui-même des mots de passe longs et aléatoires pour chaque site, et les remplit automatiquement dans le navigateur, ce qui le rend au passage difficile à piéger par une fausse page d'hameçonnage : il ne propose le mot de passe que sur le vrai site.

Deux solutions gratuites et reconnues couvrent l'essentiel des besoins :

| Solution | Fonctionnement | Pour qui |
|---|---|---|
| **Bitwarden** | Coffre synchronisé en ligne, applications Windows, Linux, Android, iOS | Usage sur plusieurs appareils, simplicité |
| **KeePass / KeePassXC** | Coffre stocké localement dans un fichier, certifié par l'ANSSI (KeePass) | Maîtrise complète, pas de cloud, très à l'aise sous Linux |

Les deux sont des logiciels libres, fonctionnent aussi bien sous Windows que sous Linux, et n'imposent aucun abonnement pour l'usage courant. Le fichier KeePassXC se sauvegarde comme n'importe quel document, la [règle du 3-2-1](/blog/sauvegarde-donnees) s'y applique.

Reste le mot de passe maître : c'est le bon candidat pour une phrase de passe de 7 mots ou plus, facile à retenir, très difficile à casser.

## La double authentification, le deuxième verrou

Même volé, un mot de passe ne suffit plus si le compte exige une seconde preuve à la connexion : un code temporaire généré par une application (Aegis sous Android, 2FAS, ou le gestionnaire lui-même), une clé physique, ou à défaut un SMS. C'est la **double authentification** (2FA).

Elle est à activer en priorité sur les comptes qui commandent tout le reste : la boîte mail d'abord, puis la banque, le compte Google ou Apple, et les réseaux sociaux utilisés professionnellement. Les services récents proposent aussi de plus en plus les **passkeys** (clés d'accès), qui remplacent le mot de passe par une validation sur l'appareil, par exemple via l'empreinte digitale ; quand l'option existe, elle vaut la peine d'être activée.

## S'y mettre en trois étapes

1. **Installer un gestionnaire** (Bitwarden ou KeePassXC) et choisir une phrase de passe maître solide.
2. **Migrer les comptes critiques** : boîte mail, banque, impôts, compte Google, réseaux sociaux professionnels. Pour chacun, générer un nouveau mot de passe unique et activer la double authentification.
3. **Migrer le reste au fil de l'eau** : à chaque connexion sur un ancien compte, prendre trente secondes pour remplacer le mot de passe par un mot de passe généré.

La première étape demande une petite heure ; le reste se fait sans effort particulier. Le gain est immédiat : une fuite chez un site tiers ne compromet plus qu'un seul compte, au lieu de tous.

---

*En pratique :* installation du gestionnaire, migration des comptes sensibles et activation de la double authentification, je peux vous accompagner pas à pas dans la mise en place, pour les particuliers comme pour les professionnels du Médoc, sous Windows comme sous Linux. [Me contacter](/#contact).
