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

Cependant, l'installation reste manuelle (`docker-compose up -d`) et peut être source d'erreur (oubli de paramètre, erreur de syntaxe, etc.). Pour pallier à ce problème, de nombreux outils existent (Kubernetes, Rancher, etc.). Cependant, ces outils sont souvent complexes à mettre en place et à maintenir.

Aujourd'hui, nous allons voir un outil simple et efficace pour automatiser le déploiement de nos applications Web : [Kamal](https://kamal-deploy.org/).

## Prérequis

Dans ce TP, je pars du principe que vous avez déjà un serveur distant (VPS, serveur dédié, etc.) avec Docker installé. Si ce n'est pas le cas, je vous invite à suivre le [TP sur l'installation de Docker](/tp/docker/introduction.md). Je pars également du principe que votre machine est correctement configurée (Docker installé, WSL si vous êtes sous Windows, ou alors mieux un MacOS ou une distribution Linux).

## Installation de Kamal

Kamal est un outil en ligne de commande, celui-ci peut-être installé de deux manières :

- Via un Gem (gestionnaire de paquets Ruby). Pour cela, il vous faudra installer Ruby sur votre machine.
- Via Docker. (Évite d'installer Ruby sur votre machine)

Dans ce TP, nous allons utiliser la deuxième méthode. Nous allons ajouter un alias dans Bash/Zsh, celui-ci donner l'impression que la commande `kamal` est installée sur notre machine.

```bash
alias kamal='docker run -it --rm -v "${PWD}:/workdir" -v "/run/host-services/ssh-auth.sock:/run/host-services/ssh-auth.sock" -e SSH_AUTH_SOCK="/run/host-services/ssh-auth.sock" -v /var/run/docker.sock:/var/run/docker.sock ghcr.io/basecamp/kamal:latest'
```

Pour l'instant vous pouvez juste copier/coller cette commande dans votre terminal. Comment lire cette commande ?

- `alias kamal=` : Crée un alias `kamal` (concrètement, cela veut dire que lorsque vous taperez `kamal` dans votre terminal, la commande après le `=` sera exécutée).
- `docker run -it --rm` : Lance un conteneur Docker en mode interactif et le supprime une fois la commande terminée.
- `-v "${PWD}:/workdir"` : Montre le répertoire courant (`$PWD`) dans le conteneur Docker sous le nom `workdir`.
- `-v "/run/host-services/ssh-auth.sock:/run/host-services/ssh-auth.sock"` : Montre le socket SSH de votre machine dans le conteneur Docker.
- `-e SSH_AUTH_SOCK="/run/host-services/ssh-auth.sock"` : Définit la variable d'environnement `SSH_AUTH_SOCK` dans le conteneur Docker.
- `-v /var/run/docker.sock:/var/run/docker.sock` : Montre le socket Docker de votre machine dans le conteneur Docker.
- `ghcr.io/basecamp/kamal:latest` : L'image Docker à utiliser pour lancer Kamal.

Pourquoi le SSH ? Kamal va se connecter à votre serveur distant pour déployer votre application. Pour cela, il va utiliser votre clé SSH pour se connecter à votre serveur. C'est pour cela que nous devons montrer le socket SSH de notre machine dans le conteneur Docker.

::: tip Vous souhaitez utiliser un gem ?
Si vous souhaitez utiliser un gem, vous pouvez suivre les instructions sur le [site officiel de Kamal](https://kamal-deploy.org/docs/installation/).
:::

::: danger Vous êtes sous macOS ?

Sur ma machine, j'ai rencontré un problème pour le Socket SSH. En effet, celui-ci n'était pas accessible. Pour pallier à ce problème, je dois  lancer Docker depuis le terminal (et non depuis Docker Desktop). Pour cela, je lance la commande suivante :

```bash
/Applications/Docker.app/Contents/MacOS/Docker\ Desktop.app/Contents/MacOS/Docker\ Desktop
```

Ensuite aucun changement n'est nécessaire pour l'alias Kamal.

:::

## Déployer depuis votre machine (en utilisant le Docker Hub)

### La logique

La logique ici va être de construire notre image Docker localement, de la pousser sur le Docker Hub, puis de la récupérer sur notre serveur distant pour la déployer.

La phase de récupération de l'image Docker sur notre serveur distant sera automatisée par Kamal ainsi que la configuration de notre serveur distant.

La logique sera donc la suivante :

1. On décrit/écrit notre application dans un fichier `Dockerfile`
2. On lance la bonne commande Kamal pour construire notre image Docker & la pousser sur le Docker Hub
3. Kamal se connecte à notre serveur distant, récupère l'image Docker et la déploie

### Choisir ce que l'on veut déployer

Dans ce TP, nous allons déployer un projet fictif. Pour tester, nous allons créer un simple PHP Info en PHP (évidemment, si vous avez un projet plus complexe, vous pouvez le déployer, exemple un projet Laravel, ou autre.

Créez un dossier `hello-world` et placez-vous dedans. Créez un fichier `index.php` avec le contenu suivant :

```php
<?php

phpinfo();
```

Créez un fichier `Dockerfile` avec le contenu suivant :

```dockerfile
FROM php:8.0-apache

COPY index.php /var/www/html/index.php

EXPOSE 80
```

Pas besoin de détailler le fichier PHP, il est très simple. Le `Dockerfile` par contre mérite quelques explications :

- `FROM php:8.0-apache` : Utilise l'image Docker `php:8.0-apache` comme base pour notre image.
- `COPY index.php /var/www/html/index.php` : Copie le fichier `index.php` dans le répertoire `/var/www/html` de notre conteneur.
- `EXPOSE 80` : Expose le port 80 de notre conteneur.

Pour que Kamal puisse déployer notre application, celle-ci doit être versionnée. Pour cela, nous allons initialiser un dépôt Git dans notre dossier `hello-world` :

```bash
git init
git add .
git commit -m "Initial commit"
```

::: tip Et voilà

Vous êtes maintenant prêt à déployer votre application ! 

:::

### Créer un projet Kamal

Dans un premier temps, nous allons initialiser un projet Kamal « vierge ». Ce projet contiendra l'ensemble de la configuration de base pour déployer notre application.

Dans le dossier de votre code source, lancez la commande suivante :

```bash
kamal init
```

Cette commande va créer différents fichiers dans votre dossier :

- `config/deploy.yml` : Le fichier de configuration de Kamal utilisé pour déployer votre application.
- `.env` : Les variables d'environnement qui seront utilisées par Kamal pour déployer votre application (Exemple : le token pour se connecter au Docker Hub).

::: danger Avant de continuer !

Il est important de ne pas versionner le fichier `.env` dans votre dépôt Git. En effet, celui-ci contient des informations sensibles (clés d'API, tokens, etc.). Pour cela créer un fichier `.gitignore` et ajoutez-y la ligne `.env`.

```text
.env
```

Puis commitez les modifications :

```bash
git add .
git commit -m "Ajout de Kamal"
```

:::

### Mettre en place l'environnement

Dans ce TP, nous allons commencer par déployer notre application sur le [Docker Hub](https://hub.docker.com/). Pour rappel le Docker Hub est un service de stockage d'images Docker, il est possible de stocker des images privées (payant) ou publiques (gratuit).

Nous allons donc devoir créer un compte sur le [Docker Hub](https://hub.docker.com/) (si ce n'est pas déjà fait) puis créer un token pour Kamal :

- Connectez-vous à votre compte Docker Hub
- Allez dans [`Account Settings` > `Security` > `New Access Token`](https://hub.docker.com/settings/security)

[Token](./ressources/token.png)

Créez un token avec les droits `read` et `write` sur le `Docker Registry`. Copiez le token et collez-le dans le fichier `.env` :

```text
DOCKER_HUB_TOKEN=le-token-que-vous-avez-copié
```

**Attention** : Ne partagez pas ce token, il est l'équivalent de votre mot de passe. Il permettrait à quelqu'un de pousser des images sur votre compte Docker Hub ou de les supprimer.

::: tip Prennons quelques secondes analyser

Utiliser le Docker Hub est intéressant pour tester, ou pour des projets publics. Cependant, pour des projets d'entreprise, on préférera utiliser un Registry Docker privé (GitLab, GitHub, etc.). Cela permet de garder le contrôle sur les images Docker et de ne pas les rendre publiques.

**Comprendre que tout ce que vous développez n'est pas forcément public est primordial.**

:::

::: danger Le .env

Un fichier `.env` aussi appelé Dot Env (ou fichier de variables d'environnement) est un fichier texte qui contient des variables d'environnement est un standard pour stocker des informations sensibles (clés d'API, tokens, etc.).

On retrouve ce genre de fichier dans de nombreux type de projets (Node.js, Laravel, etc.). Ces fichiers sont **ultra-sensibles** et ne doivent jamais être versionnés dans un dépôt Git. Car ils contiennent des informations souvent plus que critiques (mot de passe, token, hash de sécurité de session).
:::

#### La configuration de Kamal

### Mettre à jour notre application

### Et si nous avions besoin d'une base de données ?

Avec Kamal, il est possible de déployer des services supplémentaires (base de données, cache, etc.). Pour cela, nous allons devoir déclarer des `accessories` dans notre fichier `deploy.yml`.

Un accessory est un service, qui ne sera pas compilé / packagé par nous. Il sera directement déployé par Kamal lors de la phase de `setup`. Les accessories n'ont pas vocation à être mis à jour aussi fréquemment que notre application principale.

Pour tester nous allons déployer une base de données MySQL 8, dans votre fichier `deploy.yml` ajoutez le code suivant :

```yaml
accessories:
  db:
    service: mysql
    image: mysql:8
    host: ip_du_serveur
    env:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: kamal
      MYSQL_USER: kamal
      MYSQL_PASSWORD: kamal
```

::: tip Vous souhaitez exposer le port de votre base de données ?

Évidemment, ne l'exposez pas avec les identifiants par défaut (et de préférence, sur un port non standard). Pour exposer le port de votre base de données, ajoutez la ligne suivante après `image` dans la partie `db` :

```yaml
port: 3306
```

Cette ligne rendra le port 3306 de votre base de données accessible depuis l'extérieur. Vous pourrez alors vous connecter à votre base de données depuis votre machine locale (ou tout autre machine) en utilisant l'adresse IP de votre serveur et le port 3306.

:::

### Plusieurs projets sur un même serveur ?

Nous avons pour l'instant déployé qu'une seule application. Cependant, il est possible de déployer plusieurs applications sur un même serveur. Pour cela, il suffit de créer un fichier `deploy.yml` par application (Exemple un front et un back).

### Conclusion

## Déployer depuis une CI/CD (GitLab, GitHub, etc.)

### La logique

La logique ici va être d'utiliser un outil de CI/CD (GitLab CI, GitHub Actions, etc.) pour déployer automatiquement notre projet. Celui-ci va reprendre les opérations que nous avons faites manuellement dans la première partie, à la différence que nous utiliserons les secrets de notre CI/CD pour stocker les informations sensibles (clés SSH, etc.), mais également le Registry Docker intégré à notre CI/CD pour stocker les images Docker (et ainsi éviter de les stocker sur le Docker Hub).

La logique sera donc la suivante :

1. On pousse notre code sur notre dépôt Git
2. Notre CI/CD construit l'image Docker & la pousse l'image Docker sur le Registry Docker intégré
3. Avec Kamal, on se connecte à notre serveur distant, le configure, puis déploit notre application

### Créer notre .gitlab-ci.yml

### Les secrets

### Testons

### Conclusion