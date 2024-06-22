---
description: Dans ce TP/TD nous allons voir comment il est possible d'automatiser l'installation (déploiement) d'un projet Web sur un serveur distant avec Kamal.
---

# Déployer simplement et automatiquement un projet avec Kamal

Dans ce TP/TD nous allons voir comment il est possible d'automatiser l'installation (déploiement) d'un projet Web sur un serveur distant avec Kamal.

::: details Sommaire
[[toc]]
:::

## Introduction

Nous avons vu via les différents TP qu'il était relativement simple de conteneuriser une application Web. Nous avons également vu qu'il était possible de créer une stack complète avec Docker Compose ([voir aide mémoire](/cheatsheets/serveur/debian-docker.md)).

Cependant, l'installation reste manuelle (`docker-compose up -d`) et peut être source d'erreur (oubli de paramètre, erreur de syntaxe, etc.). Pour palier à ce problème, de nombreux outils existent (Kubernetes, Rancher, etc.). Cependant, ces outils sont souvent complexes à mettre en place et à maintenir.

Aujourd'hui, nous allons voir un outil simple et efficace pour automatiser le déploiement de nos applications Web : [Kamal](https://kamal-deploy.org/).

## Prérequis

Dans ce TP, je pars du principe que vous avez déjà un serveur distant (VPS, serveur dédié, etc.) avec Docker installé. Si ce n'est pas le cas, je vous invite à suivre le [TP sur l'installation de Docker](/tp/docker/introduction.md). Je pars également du principe que votre machine est correctement configurée (Docker installé, WSL si vous êtes sous Windows, ou alors mieux un MacOS ou une distribution Linux).

## Installation de Kamal

## Déployer depuis votre machine (en utilisant le Docker Hub)

### La logique

La logique ici va être de construire notre image Docker localement, de la pousser sur le Docker Hub, puis de la récupérer sur notre serveur distant pour la déployer.

La phase de récupération de l'image Docker sur notre serveur distant sera automatisée par Kamal ainsi que la configuration de notre serveur distant.

La logique sera donc la suivante :

1. On décrit/écrit notre application dans un fichier `Dockerfile`
2. On lance la bonne commande Kamal pour construire notre image Docker & la pousser sur le Docker Hub
3. Kamal se connecte à notre serveur distant, récupère l'image Docker et la déploie


### Créer un projet Kamal

### Mettre en place l'environnement

### Déployer le projet

### Conclusion

## Déployer depuis une CI/CD (GitLab, GitHub, etc.)

### La logique

La logique ici va être d'utiliser un outil de CI/CD (GitLab CI, GitHub Actions, etc.) pour déployer automatiquement notre projet. Celui-ci va reprendre les opérations que nous avons faites manuellement dans la première partie, à la différence que nous utiliserons les secrets de notre CI/CD pour stocker les informations sensibles (clés SSH, etc.), mais également le Registry Docker intégré à notre CI/CD pour stocker les images Docker (et ainsi éviter de les stocker sur le Docker Hub).

La logique sera donc la suivante :

1. On pousse notre code sur notre dépôt Git
2. Notre CI/CD construit l'image Docker & la pousse l'image Docker sur le Registry Docker intégré
3. Avec Kamal, on se connecte à notre serveur distant, le configure, puis déploit notre application
