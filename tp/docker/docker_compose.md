# Le Docker Compose

<!-- TOC -->

- [Le Docker Compose](#le-docker-compose)
    - [Introduction](#introduction)
    - [Installer Docker Compose](#installer-docker-compose)
    - [Structure d’un Docker Compose](#structure-dun-docker-compose)
    - [Créer un Docker Compose pour l’application Todo](#créer-un-docker-compose-pour-lapplication-todo)
    - [Monter une application grace Docker Compose](#monter-une-application-grace-docker-compose)

<!-- /TOC -->

## Introduction

Dans ce TP nous allons voir comment créer une vrai arborescence de service avec Docker. Dans une application réel il n’est pas rare d’avoir plusieurs technologie (ou plusieurs « services ») pour assurer le bon fonctionnement d’un sytème dans son ensemble (Exemple pour faire fonctionner mon application j’ai besoin de MySQL, PHP, et d’un serveur Web pour l’interface client)

C’est dans des cas comme celui-ci que nous allons utiliser Docker-Compose. Avec Docker compose nous allons créer une architecture multi-conteneur que l’on peu appeler « stack ». Cette Stack sera :

- Autonome (car prête à être « mise en place » partout, quelques soit la plateforme cible).
- Pré-paramètré (tout est dans le fichier ```docker-compose.yml```).
- Isolé (tout les services ne sont pas forcément accessible du public, mais sont accessibles par vos autres applications).
- Administrable simplement grace au cli (```docker-compose up/down/start/stop```)

## Installer Docker Compose

Docker Compose est fourni directement par les developpeur de Docker, cependant sous Linux il n’est pas inclus dans l’installation de base des paquets. Pour l’installer rendez-vous sur la [documentation de Docker](https://docs.docker.com/compose/install/#install-compose)

Sous Windows et OSX pas de soucis Docker Compose est **inclus** dans l’installation de base.

## Structure d’un Docker Compose

## Créer un Docker Compose pour l’application Todo

## Monter une application grace Docker Compose