---
description: "Docker est un outil qui permet de déployer des applications dans des conteneurs, dans ce TP nous allons voir comment déployer une application dans un conteneur Docker sur un serveur."
---

# Déployer Docker sur un serveur

::: details Sommaire
[[toc]]
:::

## Objectifs

Dans ce TP nous allons voir comment utiliser Docker sur un serveur pour rendre une application disponible sur le réseau.

Il est possible de travailler de plusieurs façons différentes avec Docker :

- Utiliser une image Docker disponible sur le Docker Hub (exemple Mysql).
- Créer une image Docker à partir d'un Dockerfile.
- Utiliser une image générique (type PHP), et la personnaliser grâce à un volume.
- Construire une image Docker via l'intégration continue (CI/CD), avec Gitlab par exemple pour la déployer sur un serveur.

::: tip Et en entreprise ?
Ici il s'agit d'une introduction à Docker, nous allons donc rester simples. Mais dans la vraie vie, nous réalisons le plus souvent la construction d'une image Docker via l'intégration continue (CI/CD), avec Gitlab par exemple pour la déployer sur un serveur.
:::

## Préparer votre serveur

Prochainement...

## Installer Docker

Prochainement...

## Configurer Docker

Prochainement...

## Lancer un serveur MySQL / MariaDB

Prochainement...

### Choisir une version

### Exposer le port 3306

## Lancer un serveur Apache + PHP

Prochainement...

### Choisir une version

### Exposer le port 80

## Créer un docker compose pour lancer les deux serveurs

Prochainement...

## C'est à vous, le cas de WordPress

Prochainement...

## C'est à vous, le cas de Redmine

Prochainement...

## Conclusion

Dans ce TP nous avons vu comment Docker facilite la mise en place d'un serveur sur une machine. Nous avons vu comment Docker permet de créer rapidement des infrastructures répétables, et ce quelques soit la version, la configuration, ou l'OS de la machine.

Nous avons vu également comment Docker Compose permet de lancer plusieurs conteneurs en même temps, et de les lier entre eux (exemple : un serveur MySQL et un serveur PHP).