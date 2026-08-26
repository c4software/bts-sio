---
description: "Série de TP sécurité OWASP niveau BTS SIO : quatre TP progressifs pour observer, tester et corriger les failles Web les plus courantes."
---

# TP Sécurité : la série OWASP

::: details Sommaire
[[toc]]
:::

Le meilleur moyen de comprendre la sécurisation d'une application Web, ce n'est ni la théorie seule, ni de tenter des intrusions au hasard : c'est de se mettre dans la peau du **développeur qui reçoit un rapport d'audit** et doit réparer son code.

Cette série de quatre TP suit les grandes catégories de failles de l'[OWASP](/cours/securite_applications), celles que vous devez savoir reconnaître et corriger pour l'examen. Le format est toujours le même, dans l'esprit d'une préparation à l'épreuve : **observer** du code, **le tester**, comprendre **pourquoi** il est vulnérable, puis **le corriger**.

## Les quatre TP

La difficulté augmente d'un TP à l'autre. Suivez-les dans l'ordre : chacun s'appuie sur le précédent.

1. **[Les injections SQL](./tp1_injection_sql.md)** : la faille la plus emblématique, très guidée pour bien démarrer.
2. **[Les failles XSS](./tp2_xss.md)** : quand le navigateur exécute la saisie de l'utilisateur (réfléchi et stocké).
3. **[Contrôle d'accès et journalisation](./tp3_controle_acces.md)** : IDOR, routes non protégées, lecture des logs (code Laravel).
4. **[Authentification et sessions](./tp4_authentification.md)** : mots de passe, bruteforce, CSRF, 2FA. Le plus complet, solutions détaillées.

## Pour réviser et aller plus loin

- **[Révisions examen](./exercice.md)** : une sélection d'extraits de code à analyser, dans le même esprit que l'épreuve.
- **[Exercices OWASP (banque de failles)](./failles.md)** : une quinzaine de failles à identifier et corriger, dans le rôle du développeur qui répond à un audit.
- **[Analyser une application](./reverse.md)** : un TP avancé de reverse engineering sur une vraie application Android (pour les plus rapides).

## Le cours et la synthèse

Avant ou pendant les TP, gardez sous la main :

- [Le cours (slides OWASP)](/cours/securite_applications)
- [La synthèse OWASP](/cheatsheets/owasp/)

## Pour s'entraîner en autonomie

Plusieurs pistes complètent ces TP, si vous voulez manipuler davantage :

- Les **épreuves d'injection SQL** du [TP 1](./tp1_injection_sql.md#a-vous-d-attaquer) : cinq attaques à réussir vous-même, directement dans le navigateur, sans rien à installer.
- [Hacksplaining](https://www.hacksplaining.com/exercises) : des tutoriels guidés faille par faille (injection SQL, XSS stockée…).
- WebGoat : l'application d'entraînement de l'OWASP, à lancer en local.

::: details Lancer WebGoat en local (Docker)
WebGoat est une application volontairement vulnérable, éditée par l'OWASP à des fins pédagogiques.

```sh
docker run -p 127.0.0.1:8080:8080 -p 127.0.0.1:9090:9090 -e TZ=Europe/Amsterdam webgoat/webgoat
```

Puis rendez-vous sur [http://127.0.0.1:8080/WebGoat](http://127.0.0.1:8080/WebGoat).

⚠️ Vous manipulez un outil truffé de failles : pour éviter tout risque, le mieux est de couper l'accès réseau de votre machine pendant l'exercice.

Quelques leçons intéressantes pour commencer : *Injection Flaws* (SQL Injection), *Cross-Site Scripting*, *Parameter Tampering*, *AJAX Security*.
:::

::: tip Un rappel important
Ces TP sont à but **éducatif**. On ne teste ces techniques que sur des applications prévues pour (WebGoat, Hacksplaining, les extraits fournis) ou que l'on possède. Tester une faille sur un site sans autorisation explicite est illégal.
:::
