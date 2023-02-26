---
description: Dans ce TP nous allons voir comment créer un serveur de base de données (MySQL) et comment le configurer.
---

# TP3. Configurer un serveur de base de données

::: details Sommaire
[[toc]]
:::

## Pré-requis

Pour réaliser ce TP vous devez avoir connaître les éléments suivants :

- [TP1. Créer une VM sur la ferme.](/tp/devops/serveur/tp1.md)
- [Aide mémoire Linux](/cheatsheets/serveur/linux-debian-based.md)
- [Configurateur réseau Debian](/cheatsheets/serveur/debian-reseau.md)

## Objectifs

Ce TP / TD a pour objectif de vous faire découvrir comment configurer un serveur de base de données (MySQL) pour qu'il soit utilisable par un serveur Web (Apache) mais également par une application Client (C#, Java, PHP, etc.).

::: tip Application cliente ?

Une application cliente est une application qui se connecte à un serveur pour récupérer des données et les afficher à l'utilisateur. Le découpage entre serveur et client est une notion qui est très importante dans le développement d'applications.

En effet, cela permet de :

- Répartir les ressources entre plusieurs machines.
- Isoler les données de l'application.
- Sécuriser les données de l'application (accès à la base de données).

:::

Nous allons donc dans ce TP nous concentrer sur **la base de données** et uniquement sur celle-ci.

::: important Machine type examen

Comprendre le découpage multimachine est un élément important pour le passage de l'examen. Il est donc important de bien comprendre ce que nous faisons dans ce TP.

:::