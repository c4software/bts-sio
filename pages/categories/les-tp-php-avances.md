---
aside: false
description: La liste des TP « PHP avancés » (POO, MVC, Laravel) dans l'ordre dans lequel je vous conseille de les réaliser.
---

# Les TP PHP avancés

Vous trouverez ici la liste des TP « avancés » du PHP, dans l'ordre dans lequel je vous conseille de les réaliser. Ce parcours prend la suite [des TP PHP de base](/pages/categories/les-tp-php-de-base.md) : la structure, les formulaires, la session et la base de données doivent être acquis avant de commencer.

::: warning Les prérequis
Vous n'avez pas encore terminé [les TP PHP de base](/pages/categories/les-tp-php-de-base.md) ? Commencez par là, l'ensemble des TP de cette page s'appuie dessus.
:::

## Étape 1 : La POO et le MVC

Avant le framework, nous structurons le code autour d'objets et du design pattern MVC. Les TP s'appuient sur [le cours MVC](/cours/mvc.md) et [le support MVC](/tp/mvc/support.md).

1. [Structure de développement MVC](/tp/php/mvc/tp1.md)
2. [TP TODO List](/tp/php/mvc/tp1.1.md)
3. [Pratiquer la POO et le MVC](/tp/php/mvc/tp2.md)

::: tip Les supports associés
[Aide mémoire POO](/cheatsheets/poo/), [la modélisation objet](/cheatsheets/poo-uml/) et [l'aide mémoire Mini MVC Sample](/cheatsheets/mini-mvc-sample/).
:::

## Étape 2 : Les fondamentaux de Laravel

Le passage au framework. Les TP suivent [le cours Laravel](/cours/laravel.md) et [le support Laravel](/tp/laravel/support.md).

1. [TP 6 : Transition vers Laravel](/tp/php/tp6.md)
2. [Introduction à Laravel](/tp/laravel/introduction.md)
3. [Introduction base de données et ORM](/tp/laravel/base_de_donnees.md)
4. [Comprendre l'authentification](/tp/laravel/authentification_manuelle.md)
5. [La double authentification (2FA)](/tp/laravel/2fa.md)
6. [Le reset de mot de passe](/tp/laravel/reset_mot_de_passe.md)
7. [Aller plus loin avec Laravel](/tp/laravel/aller_plus_loin.md)

::: tip Les supports associés
[Aide mémoire Laravel](/cheatsheets/laravel/) et [la synthèse des commandes](/cheatsheets/laravel/quick.md).
:::

## Étape 3 : Laravel au quotidien

Les outils qui font gagner du temps en entreprise : le scaffolding, les modèles générés et les tests. Puis deux projets pour mettre en pratique.

1. [L'authentification avec Breeze](/tp/laravel/authentification.md)
2. [Eloquent, les modèles simplement](/tp/laravel/generation_model.md)
3. [Tester avec PHPUnit](/tp/laravel/tests.md)
4. [Projet Micro-Messages](/tp/laravel/x.md)
5. [Projet Larablog](/tp/laravel/larablog.md)
6. [Larablog 2.0 (Ajax & VueJS)](/tp/javascript/tp6.md)

## Étape 4 : Les API et le déploiement

Pour terminer, nous ouvrons l'application vers l'extérieur et nous la mettons en production.

1. [Des API avec Laravel](/tp/laravel/api_produit.md)
2. [Déployer un site Laravel](/tp/ops/deployer-laravel.md)

::: tip Et ensuite ?
Vous pouvez aller plus loin avec [l'intégration continue avec Laravel](/tp/ops/deployer-laravel-ci.md), [le déploiement avec Docker](/tp/ops/deployer-laravel-docker.md) ou l'ajout d'interactivité côté client avec [VueJS](/cours/vuejs.md).
:::
