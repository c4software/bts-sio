---
aside: false
description: "Le parcours sécurité OWASP : le cours, les quatre TP progressifs dans l'ordre, les révisions format examen et les plateformes pour s'entraîner."
---

# Sécurité : le parcours OWASP

Vous trouverez ici le parcours sécurité des applications complet, construit autour des grandes catégories de failles de l'OWASP. L'objectif n'est pas de faire de vous des pirates, mais des développeurs capables de **reconnaître, tester et corriger** les failles les plus courantes, exactement ce qui vous est demandé à l'examen.

Le format est toujours le même : se mettre dans la peau du développeur qui reçoit un rapport d'audit, **observer** du code, **le tester**, comprendre **pourquoi** il est vulnérable, puis **le corriger**. La difficulté augmente d'un TP à l'autre, respecter l'ordre vous garantit d'avoir toujours les prérequis nécessaires.

::: warning Les prérequis
Les TP s'appuient sur du code PHP et Laravel : les bases doivent être acquises, c'est l'objet des parcours [Les TP PHP de base](/pages/categories/les-tp-php-de-base.md) et [Les TP PHP avancés](/pages/categories/les-tp-php-avances.md).
:::

::: tip Les supports du parcours
Gardez-les à portée de main pendant tous les TP, c'est important :

- [Le cours (slides OWASP)](/cours/securite_applications)
- [La synthèse OWASP](/cheatsheets/owasp/)
- [Les quiz d'entrainement](/moodle/) (Sécurité OWASP et PHP format examen)

:::

## Étape 1 : Comprendre les failles

Avant de corriger du code, il faut savoir ce que l'on cherche : le vocabulaire, les 10 grandes catégories de l'OWASP et les bons réflexes (hashage des mots de passe, validation des entrées, principe du moindre privilège).

1. [Le cours : sécurité des applications (OWASP)](/cours/securite_applications)
2. [La synthèse OWASP](/cheatsheets/owasp/) (à relire régulièrement, c'est votre aide-mémoire de révision)

## Étape 2 : Les quatre TP

Le cœur du parcours. Chaque TP s'appuie sur le précédent, suivez-les dans l'ordre.

1. [TP 1 : Les injections SQL](/tp/securite/tp1_injection_sql.md) : la faille la plus emblématique, très guidée pour bien démarrer.
2. [TP 2 : Les failles XSS](/tp/securite/tp2_xss.md) : quand le navigateur exécute la saisie de l'utilisateur (réfléchi et stocké).
3. [TP 3 : Contrôle d'accès et journalisation](/tp/securite/tp3_controle_acces.md) : IDOR, routes non protégées, lecture des logs (code Laravel).
4. [TP 4 : Authentification et sessions](/tp/securite/tp4_authentification.md) : mots de passe, bruteforce, CSRF, 2FA. Le plus complet, solutions détaillées.

## Étape 3 : Réviser pour l'examen

Une fois les quatre TP terminés, place à l'entrainement dans les conditions de l'épreuve : des extraits de code à analyser et corriger, sans pas-à-pas.

1. [Révisions examen](/tp/securite/exercice.md) : une sélection d'extraits de code à analyser, dans le même esprit que l'épreuve.
2. [Exercices OWASP (banque de failles)](/tp/securite/failles.md) : une quinzaine de failles à identifier et corriger, dans le rôle du développeur qui répond à un audit.
3. [Les quiz d'entrainement](/moodle/) : pour vérifier que le vocabulaire et les concepts sont acquis.

## Pour aller plus loin

Pour les plus rapides, ou si vous voulez manipuler davantage :

- [Analyser une application](/tp/securite/reverse.md) : un TP avancé de reverse engineering sur une vraie application Android.
- [Hacksplaining](https://www.hacksplaining.com/exercises) : des tutoriels guidés faille par faille (injection SQL, XSS stockée…).
- WebGoat : l'application d'entraînement de l'OWASP, à lancer en local ([les instructions sont dans la page de la série](/tp/securite/)).

::: tip Un rappel important
Ces TP sont à but **éducatif**. On ne teste ces techniques que sur des applications prévues pour (WebGoat, Hacksplaining, les extraits fournis) ou que l'on possède. Tester une faille sur un site sans autorisation explicite est illégal.
:::

## Et ensuite ?

La sécurité n'est pas un chapitre isolé : c'est un réflexe à garder dans tous vos développements. Vous retrouverez ces bonnes pratiques dans [les TP Laravel](/cours/laravel.md) (validation, CSRF, authentification) et côté serveur dans [les TP DevOps](/pages/categories/les-tp-devops.md).
