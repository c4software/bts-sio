---
description: Dans ce TP nous allons voir comment monter rapidement (et très simplement) un service avec Docker. Ici pas de Docker Compose ou autre… Il s'agit de voir que Docker va nous permettre de créer très simplement un « serveur » pour répondre à une problématique ponctuelle de développement.
---

# Créer des services très rapidement (et simplement)

Dans ce TP nous allons voir comment monter rapidement (et très simplement) un service avec Docker. Ici pas de Docker Compose ou autre… Il s'agit de voir que Docker va nous permettre de créer très simplement un « serveur » pour répondre à une problématique ponctuelle de développement.

::: danger Un point important
Le plus important dans ce genre d'usage c'est de se souvenir qu'un conteneur Docker est « stateless », c'est-à-dire que les données seront effacées à chaque redémarrage du conteneur — sauf si vous utilisez un volume. Donc attention !
:::

Vous avez oublié comment fonctionne la ligne de commande de Docker ? [Petit rappel ici](/cheatsheets/docker/)

## PHP

Même si PHP est relativement simple à installer sur différents environnements, il est quand même intéressant de le lancer directement via Docker. Pourquoi ? Car Docker va nous permettre de faire tourner plusieurs versions de PHP sur la même machine, sans conflit. Pratique pour tester la compatibilité d'un projet. De plus, grâce aux volumes, le serveur a accès à vos fichiers en quelques secondes.

### PHP 7

```sh
# Sous Linux / macOS
docker run --rm -p 8080:80 -v $(pwd):/var/www/html/ php:7-apache

# Sous Windows (PowerShell)
docker run --rm -p 8080:80 -v "${PWD}:/var/www/html/" php:7-apache
```

::: tip Pourquoi ça ne fonctionne pas ?
L'image `php:7-apache` n'existe plus sur Docker Hub — PHP 7 est en fin de vie depuis décembre 2022. Essayez de chercher sur [hub.docker.com](https://hub.docker.com/_/php/tags) quelle est la dernière image `php:7.x-apache` encore disponible, ou passez directement à PHP 8 ci-dessous.
:::

### PHP 8

```sh
# Sous Linux / macOS
docker run --rm -p 8080:80 -v $(pwd):/var/www/html/ php:8.2-apache

# Sous Windows (PowerShell)
docker run --rm -p 8080:80 -v "${PWD}:/var/www/html/" php:8.2-apache
```

Créez un fichier `index.php` dans votre dossier courant avec le contenu suivant pour tester :

```php
<?php
phpinfo();
```

Rendez-vous ensuite sur [http://localhost:8080](http://localhost:8080).

### La force de Docker

Ici nous voyons que Docker nous permet de lancer très rapidement un serveur PHP, sans rien installer sur notre machine. Mais ce n'est pas tout : il est possible de faire tourner simultanément PHP 7 et PHP 8 sur des ports différents. Il suffit de changer le numéro de version dans la commande et d'utiliser un port différent.

C'est très pratique pour tester rapidement un projet, une idée, ou pour faire des tests de compatibilité.

## PostgreSQL (ou autre BDD)

Créer temporairement un serveur de base de données peut être intéressant pour tester un projet. Vous utilisez peut-être XAMPP ou WAMP pour ce genre de choses, mais vous êtes limité à une version précise — avec Docker, vous avez l'embarras du choix.

```sh
docker run -p 5432:5432 --name fixy-postgres \
  -v ./pgData:/var/lib/postgresql/data \
  -e POSTGRES_USER=myUser \
  -e POSTGRES_PASSWORD=myPassword \
  -d postgres
```

Pour tester la connexion à votre base de données, plusieurs clients sont disponibles :

- [HeidiSQL](https://www.heidisql.com/) (gratuit, Windows)
- [DBeaver](https://dbeaver.io/) (gratuit, multiplateforme)
- DataGrip / WebStorm / PHPStorm / IntelliJ de JetBrains

::: tip Vous ne savez pas comment faire ?
Appelez-moi, nous allons le faire ensemble.
:::

### Une autre BDD ?

Vous utilisez MySQL plutôt que PostgreSQL ? Aucun problème, il y a également une image officielle sur Docker Hub : [https://hub.docker.com/_/mysql](https://hub.docker.com/_/mysql).

En regardant la documentation, je vous laisse faire la même chose que pour PostgreSQL.

::: tip Aide
Le port par défaut de MySQL est le `3306`.
:::

::: details Solution

```sh
docker run -p 3306:3306 --name fixy-mysql \
  -v ./mysqlData:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=myPassword \
  -d mysql
```

:::

## WordPress

Nous avons vu PHP et des bases de données — pourquoi ne pas aller plus loin ? Docker ne se limite pas à des briques techniques, on peut packager des applications complètes. C'est le cas de WordPress : une [image officielle est disponible sur Docker Hub](https://hub.docker.com/_/wordpress).

```sh
# Sous Linux / macOS
docker run \
  -e WORDPRESS_DB_USER=root \
  -e WORDPRESS_DB_PASSWORD=<password> \
  --name wordpress \
  -p 8080:80 \
  -v $(pwd)/html:/var/www/html \
  -d wordpress
```

::: danger Vous voyez le problème ?
WordPress seul n'est pas très utile ! Il lui faut une base de données pour fonctionner. C'est à partir d'ici que Docker Compose prend tout son sens : [voir le TP Docker Compose](/tp/docker/docker_compose.md).

Bien évidemment Docker Compose n'est pas obligatoire — je vous laisse chercher comment relier les deux conteneurs sans lui.
:::

## Créer un serveur local multi-services

Jusqu'à présent nous avons lancé plusieurs services, mais un par un, indépendants les uns des autres. Dans la vraie vie, nous avons souvent besoin de plusieurs services qui communiquent entre eux : un serveur Web avec une base de données, par exemple.

Avec Docker on appelle cela une **stack**. Une stack est un ensemble de services définis dans un fichier `docker-compose.yml`.

Si nous voulons WordPress + MySQL + PHPMyAdmin, voici le fichier à créer :

```yaml
services:
  wordpress:
    image: wordpress:6.7.1
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: exampleuser
      WORDPRESS_DB_PASSWORD: examplepass
      WORDPRESS_DB_NAME: exampledb
    volumes:
      - wordpress_data:/var/www/html

  db:
    image: mysql:8
    environment:
      MYSQL_DATABASE: exampledb
      MYSQL_USER: exampleuser
      MYSQL_PASSWORD: examplepass
      MYSQL_ROOT_PASSWORD: rootpass
    volumes:
      - db_data:/var/lib/mysql

  phpmyadmin:
    image: phpmyadmin:5.2.1
    ports:
      - "8081:80"
    environment:
      PMA_HOST: db
      PMA_USER: exampleuser
      PMA_PASSWORD: examplepass
      PMA_ARBITRARY: 1
    depends_on:
      - db

volumes:
  wordpress_data:
  db_data:
```

Nous avons ici défini trois services :

- `wordpress` : le serveur Web qui sert le site WordPress.
- `db` : la base de données MySQL.
- `phpmyadmin` : l'interface Web pour gérer la base de données.

Pour lancer la stack, placez-vous dans le dossier contenant le fichier `docker-compose.yml` et lancez :

```sh
docker compose up -d
```

Vous pouvez ensuite accéder à votre site WordPress sur [http://localhost:8080](http://localhost:8080) et à PHPMyAdmin sur [http://localhost:8081](http://localhost:8081).

::: tip Versions épinglées
Ici nous utilisons des versions précises pour chaque service (ex. `wordpress:6.7.1`). Cela rend le TP reproductible dans le temps. Dans un projet réel, il est recommandé de suivre les mises à jour régulièrement pour bénéficier des correctifs de sécurité.
:::

## Aller plus loin

Pour finaliser votre découverte, je vous propose de monter un serveur Redmine :

- [https://hub.docker.com/_/redmine](https://hub.docker.com/_/redmine)

Redmine est un outil de gestion de projet open source, très complet. Vous pouvez l'utiliser pour gérer vos projets, vos tâches, vos tickets de bugs, etc.

Une fois démarré, je vous laisse découvrir l'outil.

## Conclusion

Dans ce TP nous avons vu comment lancer des conteneurs Docker de façon unitaire pour créer rapidement des environnements de développement. Nous avons vu qu'il est possible de lancer plusieurs versions de PHP sur la même machine, de créer une base de données temporaire, et même de déployer une application complète comme WordPress.

## Continuer l'exploration

Je vous propose de continuer avec la création d'une stack applicative plus complète. Nous allons voir comment structurer un environnement de développement avec Docker Compose : [voir ici](./docker_compose.md).