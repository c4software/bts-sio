# Les Dockerfile’s

<!-- TOC -->

- [Les Dockerfile’s](#les-dockerfiles)
    - [Introduction](#introduction)
    - [Pourquoi faire des Dockerfile](#pourquoi-faire-des-dockerfile)
    - [Créer un Dockerfile](#créer-un-dockerfile)
    - [Image Docker pour l’application TODO](#image-docker-pour-lapplication-todo)

<!-- /TOC -->

## Introduction

Comme nous l’avons vu dans le premier TP chaque image Docker repose sur un fichier Docerfile. Pour l’instant nous n’avons pas écrit le notre, nous avons juste utilisé ceux fourni sur le DockerHub. Dans ce TP nous allons voir la structure d’un fichier Dockerfile et vous allez écrire votre premier Dockerfile il aurra pour but de définir l’ensemble de la « stack applicative » nécéssaire au bon fonctionnement de l’application TODO.

## Pourquoi faire des Dockerfile

Comme vous avez pu le voir sur le DockerHub il existe énormément d’image déjà prête, elles nous seront bien évidement utiles dans nos images Docker, mais tels qu’elles elle n’ont que « peu d’intérêts ». Nous allons donc écrire un fichier Dockefile qui va permettre de créer toutes la définition pour le bon fonctionnement de l’application Todo que vous avez écrit dans un autre TP.

Une fois le fichier Dockerfile écrit votre applications sera fonctionnelle sur toutes les plateforme supportées par Docker (Windows, Linux, OSX, Raspberry Pi…), fonctionelle oui, mais surtout fonctionnelle en quelques secondes !

## Créer un Dockerfile

## Image Docker pour l’application TODO