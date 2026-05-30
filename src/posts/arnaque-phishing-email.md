---
title: "Hameçonnage : reconnaître un email frauduleux et réagir au bon moment"
date: "2026-05-29"
category: "Sécurité"
excerpt: "L'hameçonnage figure chaque année en tête des menaces recensées par Cybermalveillance.gouv.fr, le dispositif public d'assistance aux victimes. Comment fonctionne un email frauduleux, à quels signaux le repérer et que faire en cas de clic — pour les particuliers comme pour les professionnels, sous Windows comme sous Linux."
image: "/blog/arnaque-phishing.jpg"
---

L'hameçonnage — *phishing* en anglais — consiste à usurper l'identité d'un organisme de confiance pour obtenir des informations sensibles ou faire installer un logiciel malveillant. La technique est ancienne, mais elle reste la menace n° 1 en France : selon le rapport d'activité 2024 de la plateforme publique Cybermalveillance.gouv.fr, elle représente à elle seule **33,7 % des demandes d'assistance des particuliers**, et demeure la première menace tous publics confondus.

Sa force ne tient pas à la sophistication, souvent rudimentaire, mais à la mise en scène : un logo officiel, un ton administratif et un motif crédible suffisent à faire baisser la garde.

*Source : [Cybermalveillance.gouv.fr – Rapport d'activité 2024](https://www.cybermalveillance.gouv.fr/tous-nos-contenus/actualites/rapport-activite-2024)*

## Comment fonctionne une attaque

Le scénario varie peu. La victime reçoit un message — email, SMS (on parle alors de *smishing*), parfois appel — imitant une organisation connue : banque, administration fiscale, Assurance maladie, La Poste, opérateur télécom, plateforme de commerce. Ce message l'invite à agir vite :

- cliquer sur un lien menant à un faux site, copie fidèle du site officiel ;
- y saisir des identifiants, des coordonnées bancaires ou des données personnelles ;
- ou ouvrir une pièce jointe qui installe un logiciel malveillant.

Les informations récoltées sont ensuite utilisées pour vider un compte, souscrire un crédit, ou revendues pour alimenter d'autres attaques.

## Cinq signaux qui doivent alerter

Aucun de ces indices ne constitue une preuve à lui seul, mais leur présence appelle la prudence.

**L'adresse réelle de l'expéditeur.** Le nom affiché peut être falsifié ; l'adresse, plus difficilement. Une adresse du type `support@amaz0n-service.com` ou `impots@no-reply-france.net` est frauduleuse. L'administration fiscale, par exemple, n'écrit que depuis des adresses en `@dgfip.finances.gouv.fr` ou `@impots.gouv.fr`.

**L'urgence.** « Compte suspendu sous 24 h », « colis bloqué », « remboursement à valider avant ce soir » : la pression temporelle sert à court-circuiter la réflexion.

**La destination réelle des liens.** En survolant un lien sans cliquer, son adresse apparaît. Si elle ne correspond pas au domaine officiel de l'organisme, il ne faut pas la suivre.

**Une demande d'informations déjà connues.** Une banque ne réclame jamais un code de carte par message ; l'administration ne demande pas de mot de passe ni de RIB par email. Ces organismes disposent déjà de ces données.

**Des formulations approximatives.** Fautes, tournures maladroites, formules génériques (« Cher client ») restent fréquentes, même si la qualité des messages progresse.

## Les campagnes les plus répandues

Les mêmes familles d'arnaques reviennent régulièrement dans les alertes de Cybermalveillance.gouv.fr et de la DGCCRF :

- **Le faux remboursement** (impôts, Assurance maladie, fournisseur d'énergie). Un remboursement réel est versé automatiquement sur un compte déjà connu de l'organisme ; il n'est jamais « à confirmer » par email.
- **La fausse facture**, qui vise particulièrement les professionnels : un message imite un fournisseur ou un client et joint un document piégé.
- **Le colis en attente** (La Poste, Chronopost, transporteurs), qui réclame quelques euros de « frais » pour capter une carte bancaire.
- **Le faux support technique** (Microsoft, Apple) : ni l'un ni l'autre ne contacte spontanément un particulier par téléphone ou par fenêtre surgissante.

## Le cas de Linux

Sous Linux — notamment Linux Mint, que je déploie dans le cadre du forfait Renaissance — les fichiers exécutables conçus pour Windows (`.exe`, `.msi`) ne s'exécutent pas. Une pièce jointe malveillante prévue pour Windows y est donc inopérante.

Cela ne protège pas de l'hameçonnage lui-même : si l'utilisateur saisit ses identifiants bancaires sur un faux site, le système d'exploitation n'a aucun rôle. La vigilance reste la principale protection, quel que soit l'appareil.

## Que faire après un clic

En cas de doute ou d'erreur, l'ordre des priorités compte.

1. **Ne rien saisir** et fermer la page si rien n'a encore été communiqué.
2. **Changer le mot de passe** du service concerné, en passant par le site officiel et non par le lien reçu.
3. **Contacter sa banque** si des données bancaires ont été transmises, pour faire opposition.
4. **Signaler** le message : sur [signal-spam.fr](https://www.signal-spam.fr), [phishing-initiative.fr](https://www.phishing-initiative.fr) ou via Cybermalveillance.gouv.fr. Les SMS frauduleux se transfèrent au **33700**.
5. **Si une pièce jointe a été ouverte**, déconnecter la machine du réseau et la faire examiner avant de poursuivre.

## Une mesure de fond : un mot de passe unique par service

Beaucoup d'attaques réussissent parce qu'un même mot de passe est réutilisé partout : une fuite sur un site permet alors d'ouvrir les autres comptes. Cette technique, le *credential stuffing*, est largement automatisée.

Un gestionnaire de mots de passe — Bitwarden et KeePass sont gratuits et reconnus — génère et mémorise un mot de passe distinct par service. Activer la double authentification, lorsqu'elle est proposée, ajoute une protection même si le mot de passe est compromis.

---

*En pratique :* un doute sur un message, une fenêtre suspecte ou un clic regretté ? Je réalise des diagnostics à domicile ou en atelier à Saint-Laurent-Médoc et dans le Médoc — [me contacter](/#contact).
