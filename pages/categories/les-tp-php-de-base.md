---
aside: false
description: La liste des TP PHP « de base » dans l'ordre dans lequel je vous conseille de les réaliser.
---

# Les TP PHP de base

Vous trouverez ici la liste des TP PHP « de base », dans l'ordre dans lequel je vous conseille de les réaliser. Chaque TP s'appuie sur les notions vues dans les précédents, respecter l'ordre vous garantit d'avoir toujours les prérequis nécessaires.

::: warning Les prérequis
Le HTML et la CSS doivent être acquis avant de commencer : c'est l'objet du parcours [Les fondamentaux du web](/pages/categories/les-fondamentaux-du-web.md). Si ce n'est pas encore fait, commencez par là.
:::

::: tip Les supports du parcours
Gardez-les à portée de main pendant tous les TP, c'est important :

- [Le cours sur le PHP](/cours/introduction_php.md)
- [Le complément de cours PHP](/tp/php/support.md)
- [Le cours PHP et la base de données](/cours/introduction_sql_php.md)
- [Le complément PHP et base de données](/tp/php/sql/support.md)
- [Les bases de la sécurité du web](/cours/securite_bases.md) et [le complément sécurité](/tp/php/securite/support.md)
- [Le cours PHP et POO](/cours/php_poo.md) et [le complément PHP et POO](/tp/php/poo/support.md)

:::

## Étape 1 : Les bases du PHP

Le passage au dynamique. Les TP suivent le [complément de cours PHP](/tp/php/support.md).

1. [TP 1 : Créer ma première page PHP](/tp/php/tp1.md)
2. [TP 1.1 : Le générateur de Bart (les boucles)](/tp/php/tp1.1.md)
3. [TP 1.2 : Utiliser des includes et une librairie](/tp/php/tp1.2.md)
4. [TP BTS TV : Le passage de paramètres](/tp/php/tp-param.md)

::: warning Point étape 1
[Évaluation 1 : Ma page profil dynamique](/tp/php/eval1.md). Un mini projet évalué pour valider les bases (variables, boucles, includes, paramètres).
:::

## Étape 2 : Formulaires, base de données et organisation

À partir d'ici, chaque TP ajoute une notion PHP et une notion d'accès à la base de données depuis PHP. Le SQL lui-même (modélisation, langage) est vu dans votre cours de base de données : ici, vous l'appliquez. Les TP suivent le [complément PHP et base de données](/tp/php/sql/support.md).

5. [TP 2 : Les formulaires et la première table](/tp/php/tp2.md)
6. [TP 3 : Structurer mon code (entry-point)](/tp/php/tp3.md)
7. [TP Tableaux : Le carnet de notes de Springfield](/tp/php/tp-tableaux.md)
8. [TP 4 : Utiliser la session](/tp/php/tp4.md)
9. [TP 5 : Protéger des pages, première partie](/tp/php/tp5.md)
10. [TP Authentification : les bonnes pratiques (seconde partie du TP 5)](/tp/php/sql/tp-authentification.md)
11. [TP Création : La TODO List](/tp/php/creation-todo.md)
12. [TP : (Ré)organiser mon code](/tp/organisation/introduction.md)

::: tip Les supports associés
Le TP 5 et le TP Authentification s'appuient sur [les slides des bases de la sécurité du web](/cours/securite_bases.md) et sur [le complément sécurité](/tp/php/securite/support.md). Le TP de réorganisation, étape clé du parcours, s'appuie sur les [Slides Organisation](/cours/organisations).
:::

::: tip Les TP de création
Les TP de création (la TODO List, puis la médiathèque) commencent en séance et se terminent à la maison. Ils ne sont pas notés comme les points étapes, mais ils donnent lieu à un rendu que je valide (validé / à revoir).
:::

::: warning Point étape 2
[Évaluation 2 : Le livre d'or](/tp/php/eval2.md). Un mini projet évalué pour valider les formulaires, la base de données, l'entry-point, la session et la protection de pages.
:::

## Étape 3 : Modéliser et relier

Vous savez lire et écrire dans une table. Place aux projets à plusieurs tables, où vous appliquez la modélisation vue en cours de base de données.

1. [TP 6 SQL : BTS TV administrable](/tp/php/sql/tp6.md)
2. [TP Création : La médiathèque](/tp/php/sql/creation-mediatheque.md)

::: warning Point étape 3
[Évaluation 3 : Le mini catalogue](/tp/php/eval3.md). La synthèse évaluée du parcours : structure, session, authentification et base de données.
:::

## Étape 4 : PHP et POO

Vous savez écrire un site en PHP « procédural ». Avant le framework, nous réécrivons ce que vous savez faire avec des classes et des objets. Les TP suivent [les slides PHP et POO](/cours/php_poo.md) et [le complément PHP et POO](/tp/php/poo/support.md).

1. [TP POO 1 : La boîte à idées](/tp/php/poo/tp1.md)
2. [TP POO 2 : Home et connexion en POO](/tp/php/poo/tp2.md)

::: tip Les supports associés
[L'aide mémoire POO](/cheatsheets/poo/) et, pour approfondir (héritage, interfaces), [le cours POO complet](/cours/poo.md).
:::

## Étape 5 : Vers le framework

Vous avez maintenant l'ensemble des bases, et vos premières classes. La suite logique est de passer sur un framework.

1. [TP 6 : Transition vers Laravel](/tp/php/tp6.md)

::: tip Et ensuite ?
La suite se trouve dans la partie [Laravel](/cours/laravel.md) et dans [l'approche MVC](/cours/mvc.md).
:::
