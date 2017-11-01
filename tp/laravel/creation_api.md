# TodoList : (Ré-)écrire les API du projet

<!-- TOC -->

- [TodoList : (Ré-)écrire les API du projet](#todolist--ré-écrire-les-api-du-projet)
    - [Introduction](#introduction)
    - [Création du projet](#création-du-projet)
    - [Installer Lumen](#installer-lumen)
    - [Créer le nouveau Projet](#créer-le-nouveau-projet)
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

Pour créer des API Laravel est un peu « lourd » (dans notre cas, dans certains cas se choix est complètement justifié). Nous allons donc utiliser son petit frère Lumen. Lumen est un micro-framework reprenant les concepts de Laravel (et les même briques). Mais en beaucoup plus petit et donc plus adaptés à des micro-projets comme celui-ci.

## Installer Lumen

L’installation de Lumen est similaire à celle de Laravel

```shell
composer global require "laravel/lumen-installer"
```

## Créer le nouveau Projet

Maintenat que vous avez installer Lumen nous allons pouvoir utiliser la ligne de commande pour créer un nouveau projet :

```shell
lumen new api-todo
```

✋ Attention, le projet va être créé dans le dossier api-todo dans le dossier courant.

## Déclarer les routes

Pour commencer nous allons créer les différentes « routes » (c’est à dire les chemins d’accès à votre API).

## Créer les API