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

::: danger Machine type examen

Comprendre le découpage multimachine est un élément important pour le passage de l'examen. Il est donc important de bien comprendre ce que nous faisons dans ce TP.

:::

## Avant-propos : Les environnements

Rappel, en informatique, il est important de différencier les différents environnements :

- **Production** : C'est l'environnement qui est utilisé par les utilisateurs finaux. Il est donc important qu'il soit stable et sécurisé.
- **Test** / **Staging** : C'est l'environnement qui est utilisé pour tester les nouvelles fonctionnalités.
- **Développement** : C'est l'environnement qui est utilisé par les développeurs pour tester leur code.

Chaque environnement à un rôle bien précis, il convient donc de travailler différemment sur chacun d'eux.

- Votre machine est votre environnement de **développement**.
- La machine que nous allons créer aujourd'hui peut-être votre environnement distant de base de données (**test** ou **staging**).
- La machine sur laquelle vous allez déployer votre site web de l'AP sera votre environnement de **production**.

::: tip Gare au nommage
Nous allons créer dans ce TP / TD une machine qui pourra vous servir de base de données pour vos différents projets. Je vous invite donc à être vigilant sur le nommage de cette machine, pour que celle-ci soit un nom qui va permettre son identification.
:::

<center><iframe src="https://giphy.com/embed/si4P9VBMEIhq40i6tT" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></center>

## La machine

Pour réaliser ce TP, je vous propose que l'on réfléchisse ensemble sur la machine que nous allons créer.

### Les besoins

Les besoins de cette machine sont les suivants :

- Elle doit être accessible uniquement depuis le réseau du lycée.
- Elle doit permettre de stocker plusieurs bases de données.
- Elle doit avoir un accès SSH sécurisé.
- Elle doit permettre de conserver vos bases de données pour les deux prochaines années.
- Elle doit être administrable à distance.

### Les choix

Voilà la liste des choix que nous allons devoir faire pour créer cette machine :

- Espace disque :
- Mémoire vive :
- Processeur :
- OS :
- Logiciels :

Avant de créer votre machine, je vous invite à réfléchir sur ces choix. Une fois votre réflexion terminée, nous allons débriefer ensemble.

::: details Une réponse possible

- Espace disque : 10 Go.
- Mémoire vive : 1 Go.
- Processeur : 1 vCPU.
- OS : Debian 11.5.
- Logiciels : MySQL, SSH, Apache, PHP.
- Accès SSH : Sans mot de passe, uniquement avec une clé SSH.
- Votre machine **ne dois pas avoir de bureau graphique** (inutile pour un serveur).

Pourquoi cette configuration ? Apache et PHP sont installés, car, nous allons mettre sur votre serveur PHPMyAdmin. Si vous ne souhaitez pas installer PHPMyAdmin, vous pouvez supprimer Apache et PHP.

:::

## Création de la machine

Maintenant que notre besoin est défini, nous allons pouvoir créer notre machine. Je vous laisse suivre la procédure suivante :

- [TP1. Créer une VM sur la ferme.](/tp/devops/serveur/tp1.md)
- [TP2. Configurer une machine.](/tp/devops/serveur/tp2.md)

::: tip Des points à vérifier

- Votre machine doit posséder une IP fixe (à générer via le configurateur réseau, en prenant soint de ne pas utiliser une IP déjà utilisée).
- Votre machine doit être à jour (`apt update && apt upgrade`).
- Votre machine doit avoir un accès SSH sécurisé (via échange de clé).

:::

::: danger Je veux une fiche serveur
Je vous rappelle que vous **devez** avoir une fiche serveur pour chaque machine que vous créez. Cette fiche doit être complète et doit contenir les informations de connexion à votre machine (les IP, Login, Mot de passe, etc.).
:::

## Configuration de la base de la machine

Si vous avez correctement suivi les TP précédents, vous devriez avoir une machine qui ressemble à ça :

- Logiciels installés : SSH, Apache, PHP, MySQL, vim.
- **VMWare Tools installé**. (`apt install open-vm-tools`).
- Accès SSH : Via échange de clé.
- Accès Web fonctionnel (via le port 80).

::: tip VMWare Tools
Les VMWare Tools sont des logiciels qui permettent d'optimiser l'utilisation de la machine virtuelle. Ils sont **très** importants pour la performance de votre machine, vous **devez** donc les installer (sinon Bruno ne vous aime plus).
:::

## La base de données

TODO