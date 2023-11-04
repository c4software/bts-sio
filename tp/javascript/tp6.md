---
description: Nous avons vu ensemble que jQuery était un vrai gain te temps et de ligne en termes d'écriture de JavaScript. Même si celui-ci n'est plus « aussi obligatoire » / « courant » qu'il y a quelques années ; celui-ci reste quand même un incontournable que vous devez au moins connaitre.
---

# Ajouter de l'Ajax dans Larablog

Dans le [TP Larablog](../laravel/larablog.md), nous avons créé une plateforme de blog en utilisant uniquement Laravel (Blade, Eloquent, etc). Ça fonctionne, mais vous l'avez certainement remarqué, nous avons des pages qui se rechargent entièrement à chaque fois. Dans ce tp, nous allons voir comment ajouter du JavaScript afin d'améliorer l'expérience utilisateur.

::: details Sommaire
[[toc]]
:::

## Préparation

- Récupérer le code du [TP Larablog](../laravel/larablog.md).
- Installer les dépendances : `composer install`
- Lancer le serveur : `php artisan serve`

Pour rappel, la plateforme Larablog permet :

- Création de compte.
- Connexion / Déconnexion.
- CRUD des articles (création, modification, suppression).
- Consultation des articles.
- Like d'article (avec compte utilisateur).
- Système de commentaires (avec compte utilisateur).

## Introduction

Dans ce TP nous allons explorer la modernisation d'un site Web classique en ajoutant de la réactivité. Nous allons voir comment le JavaScript et plus particulièrement l'Ajax et VueJS peuvent nous aider à améliorer l'expérience d'un utilisateur.

En détail nous allons créer des API (Application Programming Interface) qui vont nous retourner des données au format JSON, puis nous allons les consommer dans notre site Web. Mais avant tout, **pourquoi faire ça ?** L'avantage de découper le traitement comme ça. C'est que nous pourrions très simplement créer un client « Mobile », et ça sans toucher au code de notre serveur. 

Pleins d'avantages :

- Code unique pour le Web et les autres plateformes
- Centralisation de la logique dans un code dédié à la récupération « du contenu » (les vidéos en l'occurrence).
- Approche microservices, nous pouvons donc héberger notre site Internet sur une autre plateforme que l'API.

::: danger Un INSTANT !
Une API ? What ? Alors, une API dans le fond c'est « comme une page web ». Mais, cette page web ne produit pas du HTML et n'a pas pour vocation d'être lue par un humain.

C'est donc du code (du PHP dans notre cas, mais ça pourrais être autre chose) qui va permettre de faire parler deux ordinateurs (le client et le serveur) dans un langage spécifique (XML, JSON …)
:::

## Identifier les pages à améliorer

Avant d'aller plus loin, réfléchissons ensemble sur les pages / éléments qui pourraient être améliorer et qui pourraient bénéficier d'un peu de réactivité.

::: tip Stop !  

Avant de continuer, à vos crayons, et sur une feuille, listez les pages / éléments qui pourraient être améliorer.

:::

## La réactivité

Rappel, Qu'est-ce que la réactivité ? La réactivité est le fait de ne pas recharger une page entière pour en changer le contenu. Ça aura pluieurs impacts dans notre code :

- Observer les intéractions de l'utilisateur (clic, etc)
- Obtention de données depuis le serveur (Ajax).
- Modification de la page / ou d'une partie de la page avec VueJS.

![Schéma de la réactivité](./res/data.png)

