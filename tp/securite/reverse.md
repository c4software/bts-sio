# Analyse de sécurité : Reverse Engineering

Le reverse engineering, ou ingénierie inverse, est le processus d'analyse d'un système pour en comprendre le fonctionnement interne, souvent dans le but de reproduire ou d'améliorer ce système. Dans le contexte de la sécurité informatique, le reverse engineering est couramment utilisé pour analyser des logiciels malveillants, évaluer la sécurité des applications, et découvrir des vulnérabilités.

## Objectifs du Reverse Engineering en Sécurité

1. **Analyse des logiciels malveillants** : Comprendre le comportement des malwares pour développer des solutions de détection et de prévention.
2. **Évaluation de la sécurité des applications** : Identifier les failles de sécurité dans les logiciels afin de les corriger avant qu'elles ne soient exploitées.
3. **Récupération de données** : Extraire des informations d'un système ou d'un logiciel lorsque l'accès direct n'est pas possible.
4. **Compatibilité et interopérabilité** : Permettre à des systèmes ou logiciels de fonctionner ensemble en comprenant leurs mécanismes internes.

## Objectifs du TP

Dans ce TP, nous allons nous concentrer sur l'analyse d'une application Android simple. Avec comme objectif de dévérouiller certaines fonctionnalités normalement accessibles uniquement après un achats in-app.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/pnUSgpbpTJM?si=i5X-XwcC3a0f9Nbl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Étapes du TP

- Tester l'application pour comprendre son fonctionnement normal.
- En fonction des observations, formuler des hypothèses sur la manière dont l'application gère les achats in-app.
- Utiliser des outils de reverse engineering pour analyser le code de l'application.
- Modifier le code de l'application pour contourner les restrictions d'achat in-app.
- Tester la version modifiée de l'application pour vérifier si les fonctionnalités restreintes sont désormais accessibles.

## Télécharger l'application

L'application est disponible sur le playstore via le lien suivant : [https://play.google.com/store/apps/details?id=com.vbrosseau.stackgame](https://play.google.com/store/apps/details?id=com.vbrosseau.stackgame)

Je vous laisse le soin de l'installer pour la tester. Pas d'accès au playstore ? Vous pouvez télécharger l'APK directement ici : [stackgame.apk](https://github.com/c4software/StackGameApp/raw/refs/heads/main/app-release.apk)

## Compte de tests

L'application possède 3 comptes de test pour les différents niveaux d'abonnement :

- NORMAL : `normal@gmail.com`
- PREMIUM : `premium@gmail.com`
- ULTRA : `ultra@gmail.com`
