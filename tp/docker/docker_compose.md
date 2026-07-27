---
description: Dans ce TP nous allons voir comment créer une vraie arborescence de service avec Docker. Dans une application réelle, il n'est pas rare d'avoir plusieurs technologies (ou plusieurs « services ») pour assurer le bon fonctionnement d'un système dans son ensemble.
---

# Docker Compose

::: details Sommaire
[[toc]]
:::

## Introduction

Dans ce TP nous allons voir comment créer une vraie arborescence de services avec Docker. Dans une application réelle, il n'est pas rare d'avoir plusieurs technologies (ou plusieurs « services ») pour assurer le bon fonctionnement d'un système dans son ensemble (exemple : pour faire fonctionner mon application j'ai besoin de MySQL, PHP, et d'un serveur Web pour l'interface client).

C'est dans des cas comme celui-ci que nous allons utiliser Docker Compose. Avec Docker Compose, nous allons créer une architecture multi-conteneurs que l'on peut appeler « stack ». Cette stack sera :

- **Autonome** : prête à être déployée partout, quelle que soit la plateforme cible.
- **Pré-paramétrée** : tout est décrit dans le fichier `docker-compose.yml`.
- **Isolée** : tous les services ne sont pas forcément accessibles depuis l'extérieur, mais peuvent communiquer entre eux.
- **Administrable simplement** grâce au CLI (`docker compose up/down/start/stop`).

## Docker Compose est déjà installé

Docker Compose est fourni directement par les développeurs de Docker. Depuis Docker Desktop (Windows, macOS) et depuis l'installation via les dépôts officiels sous Linux, il est **inclus par défaut** sous la forme du plugin `docker-compose-plugin`. Vous l'utilisez avec la commande `docker compose` (sans tiret).

::: tip `docker-compose` vs `docker compose`
L'ancienne commande `docker-compose` (avec tiret) correspondait à un outil séparé, aujourd'hui déprécié. Utilisez toujours `docker compose` (sans tiret), qui est le plugin intégré à Docker.
:::

## Structure d'un fichier docker-compose.yml

Un fichier `docker-compose.yml` utilise la syntaxe YAML. Pour rappel, YAML est un format de sérialisation de données conçu pour être lisible par des humains. Quelques règles essentielles :

- L'indentation (par des espaces, jamais des tabulations) définit la hiérarchie.
- Les listes sont dénotées par un tiret (`-`) suivi d'une espace.
- Les paires clé/valeur s'écrivent `clé: valeur`.
- Les commentaires commencent par `#`.

Voilà un exemple de fichier Docker Compose :

```yaml
services:
  web:
    build: .
    ports:
      - "5000:5000"
  redis:
    image: "redis:alpine"
```

Dans ce fichier, nous définissons 2 services.

Le premier, nommé `web`, fait référence à un fichier `Dockerfile` présent dans le même dossier que le `docker-compose.yml`. Il expose le port `5000` vers l'extérieur.

Le second, nommé `redis`, utilise une image disponible sur [Docker Hub](https://hub.docker.com). Il n'expose aucun port vers l'extérieur, mais est accessible par le service `web` via le réseau interne Docker (en utilisant simplement le nom `redis` comme hôte).

## Monter une application avec Docker Compose

Dans cet exemple, vous allez voir comment monter rapidement une application grâce à Docker Compose. En quelques lignes, nous allons déployer un blog WordPress ainsi que sa base de données.

Dans un nouveau dossier, créez le fichier `docker-compose.yml` avec le contenu suivant :

```yaml
services:
  db:
    image: mysql:8
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: somewordpress
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress

  wordpress:
    depends_on:
      - db
    image: wordpress:latest
    ports:
      - "8000:80"
    restart: always
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress

volumes:
  db_data: {}
```

Et voilà, c'est tout ! Lancez la stack avec :

```bash
docker compose up -d
```

Rendez-vous sur [http://localhost:8000](http://localhost:8000) pour admirer votre travail.

::: tip La différence avec un simple `docker run` ?
Ici nous avons WordPress, mais également une base de données associée, configurée et reliée automatiquement. Nous avons donc l'ensemble de la « stack applicative » nécessaire pour faire tourner WordPress, décrite en un seul fichier.
:::

::: danger Mots de passe par défaut
Les mots de passe ci-dessus sont fournis à titre d'exemple. Ne les laissez jamais tels quels sur un serveur accessible en réseau.
:::

### Questions

- Vous n'avez pas eu à rédiger le moindre Dockerfile, pourquoi ?
- Actuellement, que se passe-t-il si vous supprimez la stack avec `docker compose down` ? Les données sont-elles conservées ?

## Home Assistant

Docker Compose permet vraiment de tout faire. Vous souhaitez mettre en place un serveur de domotique ? Pas de problème, vous pouvez déployer Home Assistant très simplement :

```yaml
services:
  homeassistant:
    container_name: homeassistant
    image: ghcr.io/home-assistant/home-assistant:stable
    volumes:
      - ./config:/config
      - /etc/localtime:/etc/localtime:ro
    restart: unless-stopped
    network_mode: host
```

::: tip `network_mode: host`
Home Assistant utilise le mode réseau `host` pour pouvoir découvrir les appareils sur votre réseau local (Zigbee, mDNS, etc.). Cela signifie que le conteneur partage directement l'interface réseau de la machine hôte.
:::

Je vous laisse tester.

## Allons plus loin : construire sa propre image

Nous avons vu comment assembler des images existantes en une stack. Docker Compose permet également d'intégrer vos propres images construites à partir d'un `Dockerfile`.

Voici un exemple de stack complète : un serveur PHP/Apache maison, une base de données MariaDB, et Adminer pour l'administration.

**`docker-compose.yml`** :

```yaml
services:
  web-server:
    build:
      dockerfile: Dockerfile
      context: php/
    restart: unless-stopped
    volumes:
      - "./html/:/var/www/html/"
    ports:
      - 80:80

  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080

  db:
    image: mariadb
    environment:
      MYSQL_ROOT_PASSWORD: example
    restart: unless-stopped
    ports:
      - 3306:3306
    volumes:
      - mysql-data:/var/lib/mysql

volumes:
  mysql-data:
```

Dans un dossier `php/`, créez le fichier `Dockerfile` suivant :

```dockerfile
FROM php:8.2-apache
RUN docker-php-ext-install mysqli pdo pdo_mysql
RUN a2enmod rewrite
```

Et dans un dossier `html/`, le fichier `index.php` suivant :

```php
<?php
phpinfo();
?>
```

::: tip Comment tester ?
Une fois la stack lancée avec `docker compose up -d`, rendez-vous sur [http://localhost](http://localhost) pour voir la page `phpinfo()`, et sur [http://localhost:8080](http://localhost:8080) pour accéder à Adminer. Connectez-vous avec le serveur `db`, l'utilisateur `root` et le mot de passe `example`.
:::

Je vous laisse tester, puis essayez d'héberger votre propre projet PHP à la place du `phpinfo()`.