# TodoList : Écrire les API du projet

<!-- TOC -->

- [TodoList : Écrire les API du projet](#todolist--écrire-les-api-du-projet)
    - [Introduction](#introduction)
    - [Création du projet](#création-du-projet)
    - [Initialisation](#initialisation)
    - [Tester le projet de base](#tester-le-projet-de-base)
    - [Déclarer les routes](#déclarer-les-routes)
    - [Créer les API](#créer-les-api)

<!-- /TOC -->

## Introduction

Dans ce TP nous allons voir la création d’API pour le projet « TodoList ». Nous allons donc créer un nouveau projet avec Laravel pour créer des API qui permettront de :

- Lister les éléments dans la TodoList.
- Créer un nouvel élément dans la TodoList.
- Marquer un élément comme ```terminer```.
- Supprimer un élément.

## Création du projet

Pour créer le projet, vous devez avoir un environnement Laravel fonctionnel ([voir le TP introduction](./introduction.md)).

La première étape est la création du projet grace à la commande Laravel :

```shell
laravel new todolist-api
```

✋ Attention: La commande créer un nouveau projet dans le dossier courant, ça sera votre future projet API.

## Initialisation

Votre nouveau projet contient un fichier ```.env``` ouvrez le et modifier le contenu pour y mettre la bonne configuration.

## Tester le projet de base

Pour rappel vous pouvez tester votre nouveau projet directement via :

```shell
php artisan serve
```

## Déclarer les routes

Pour commencer nous allons créer les différentes « routes » (c’est à dire les chemins d’accès à votre API).

## Créer les API