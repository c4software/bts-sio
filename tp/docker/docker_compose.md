---
description: Dans ce TP nous allons voir comment créer une vraie arborescence de service avec Docker. Dans une application réelle, il n’est pas rare d’avoir plusieurs technologies (ou plusieurs « services ») pour assurer le bon fonctionnement d’un système dans son ensemble (Exemple pour faire fonctionner mon application j’ai besoin de MySQL, PHP, et d’un serveur Web pour l’interface client).
---

# Le Docker Compose

## Introduction

Dans ce TP nous allons voir comment créer une vraie arborescence de service avec Docker. Dans une application réelle, il n’est pas rare d’avoir plusieurs technologies (ou plusieurs « services ») pour assurer le bon fonctionnement d’un système dans son ensemble (Exemple pour faire fonctionner mon application j’ai besoin de MySQL, PHP, et d’un serveur Web pour l’interface client).

C’est dans des cas comme celui-ci que nous allons utiliser Docker-Compose. Avec Docker compose-nous allons créer une architecture multiconteneur que l’on peut appeler « stack ». Cette Stack sera :

- Autonome (car prête à être « mise en place » partout, quelle que soit la plateforme cible).
- Pré-paramètrée (tout est dans le fichier `docker-compose.yml`).
- Isolé (tous les services ne sont pas forcément accessibles du public, mais sont accessibles par vos autres applications).
- Administrable simplement grâce au cli (`docker-compose up/down/start/stop`).

## Installer Docker Compose

Docker Compose est fourni directement par les développeurs de Docker, cependant sous Linux il n’est pas inclus dans l’installation de base des paquets. Pour l’installer, rendez-vous sur la [documentation de Docker](https://docs.docker.com/compose/install/#install-compose).

Sous Windows et OSX pas de soucis, Docker Compose est **inclus** dans l’installation de base.

## Structure d’un Docker Compose

Un fichier `docker-compose.yml` utilise la syntaxe yaml. Pour rappel un fichier Yaml c’est :

> La syntaxe du flux YAML est relativement simple, efficiente, moins verbeuse que du XML, moins compacte cependant que du CSV. Elle a été établie pour être le plus lisible possible par des humains, tout en pouvant être mise en correspondance facilement avec les types de données précités, communs dans les langages de haut niveau. À ces langages il emprunte certaines notations.
> – Les commentaires sont signalés par le signe dièse (#) et se prolongent sur toute la ligne. Si par contre le dièse apparaît dans une chaîne, il signifie alors un nombre littéral.
> – Une valeur nulle s’écrit avec le caractère tilde (~)
> Il est possible d’inclure une syntaxe JSON dans une syntaxe YAML.
> – Les éléments de listes sont dénotés par le tiret (-), suivi d’une espace, à raison d’un élément par ligne.
> Les tableaux sont de la forme clé : valeur, à raison d’un couple par ligne.
> – Les scalaires peuvent être entourés de guillemets doubles ("), ou simples ('), sachant qu’un guillemet s’échappe avec un antislash (\), alors qu’un apostrophe s’échappe avec un autre apostrophe4. Ils peuvent de plus être représentés par un bloc indenté avec des modificateurs facultatifs pour conserver (|) ou éliminer (>) les retours à la ligne.
>
> - Plusieurs documents rassemblés dans un seul fichier sont séparés par trois traits d'union (---) ; trois points (…) optionnels marquent la fin d’un document dans un fichier.
>   – Les nœuds répétés sont initialement signalés par une esperluette (&) puis sont référencés avec un astérisque (\*) ; JSON, un langage concurrent de YAML, est compatible avec la syntaxe de JavaScript, mais ne supporte pas cette notion de référence.
>   – L’indentation, par des espaces, manifeste une arborescence.

Source : Wikipedia

Voilà un exemple de Docker Compose :

```
version : '3'
services :
  web :
    build: .
    ports :
     - "5000:5000"
  redis :
    image : "redis:alpine"
```

Dans ce fichier, nous définissons 2 services.

Le premier nommé Web fait référence à un fichier DockerFile présent dans le même dossier que le `docker-compose.yml`. Le service en question expose au client final le port `5000`.

Le second service est un service nommé Redis, il fait référence à une image disponible sur https://hub.docker.com. Cette image n’expose aucun port au public, mais sera accessible pour `web`.

## Monter une application grâce Docker Compose

Dans cet exemple, vous allez voir comment il est possible de monter rapidement une application grâce à Docker. Nous allons en quelques lignes monter un blog (Wordpress) ainsi que la base de données.

Pour ça, dans un nouveau dossier, créez le fichier `docker-compose.yml` avec le contenu suivant :

```yaml
version: "3.9"

services:
  db:
    image: mysql:5.7
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

Et voilà, c’est tout ! Votre stack Wordpress est prêt, il vous suffit de la lancer avec la commande suivante :

```bash
docker-compose up
```

Rendez-vous sur [localhost:8080](http://localhost:8080) pour admirer votre travail.

::: tip La différence avec un simple Docker ?
Ici nous avons Wordpress oui, mais également une base de données associées, nous avons donc l'ensemble de la « stack applicative » permettant de faire tourner Wordpress.
:::

### Remarques

- Vous n’avez pas eu à rédiger le moindre Dockerfile, pourquoi ?
- Vous n’avez aucune persistance de données.

## HomeAssistant ?

Docker-Compose permet vraiment de tout faire, vous souhaitez mettre en place un petit serveur pour de la Domotique ? Pas de problème ! Vous pouvez monter très simplement un HomeAssistant :

```yml
version: "3"
services:
  homeassistant:
    container_name: homeassistant
    image: homeassistant/home-assistant:stable
    volumes:
      - ./config:/config
      - /etc/localtime:/etc/localtime:ro
    restart: unless-stopped
    network_mode: host
```

Je vous laisse tester.

## Allons plus loin ?

Nous avons vu ici que nous pouvions montrer rapidement un ensemble d'images de Docker pour créer une Stack Applicative. Docker-Compose permet également d'utiliser des images « local » (des Dockerfile comme vus précédemment) pour les intégrer dans votre projet.

Je vous propose que nous réfléchissions ensemble à une « Stack » que nous pourrions dockerisé, un exemple avant de démarrer voilà mon Dockerfile

```yml
version: "3.7"
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

Voilà les autres fichiers nécessaires, dans un dossier, `php/` le fichier Dockerfile suivant :

```dockerfile
FROM php:7.4.14-apache
RUN docker-php-ext-install mysqli pdo pdo_mysql
RUN a2enmod userdir
RUN a2enmod rewrite
```
