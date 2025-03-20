---
description: Dans ce TP nous allons voir comment monter rapidement (et très simplement) un service avec Docker. Ici pas de Docker-Composes ou autre… Il s'agit de voir que Docker vous nous permettre de créer très simplement un « Serveur » pour répondre à une problématique ponctuelle de developpement.
---

# Créer des services très rapidement (et simplement)

Dans ce TP nous allons voir comment monter rapidement (et très simplement) un service avec Docker. Ici pas de Docker-Composes ou autre… Il s'agit de voir que Docker vous nous permettre de créer très simplement un « Serveur » pour répondre à une problématique ponctuelle de développement.

::: danger Un détail
Le plus important dans ce genre de « stack » c'est de se souvenir qu'un conteneur Docker est « Stateless », c'est-à-dire que les données seront effacées à chaque redémarrage de celui-ci. Donc attention !
:::

Vous avez oublié comment fonctionne la ligne de commande de Docker ? [Petit rappel ici sur son utilisation](/cheatsheets/docker/)

## PHP

Même si PHP est relativement et très simplement disponible sur différents environnements, il est quand même intéressant de voir comment le lancer directement via Docker. Pourquoi ? Et bien, car Docker va nous permettre de lancer plusieurs versions du PHP sur la même machine. Pratique par exemple si vous souhaitez tester rapidement un développement. De plus nous allons voir qu'avec le système de volume, il sera possible de le faire en quelques secondes.

### PHP 7

```sh
# Pour *Nix
docker run --rm -p 8080:80 -v $(pwd):/var/www/html/ php:7-apache

# Pour Windows
docker run --rm -p 8080:80 -v %cd%:/var/www/html/ php:7-apache
```

Tester la commande (et chercher pourquoi ça ne fonctionne pas).

### PHP 8

```sh
# Pour *Nix
docker run --rm -p 8080:80 -v $(pwd):/var/www/html/ php:8.4-apache

# Pour Windows
docker run --rm -p 8080:80 -v %cd%:/var/www/html/ php:8.4-apache
```

### La force de Docker

Ici nous voyons que Docker nous permet de lancer très rapidement un serveur PHP. Mais ce n'est pas tout, nous allons voir que nous pouvons également lancer plusieurs versions de PHP sur la même machine. Pour cela, il suffit de changer le numéro de version dans la commande.

C'est vraiment très pratique pour tester rapidement un projet, une idée, ou même pour faire des tests de compatibilité.

## PostgreSQL (ou autre BDD)

Créer temporairement un serveur de base de données peut-être intéressant pour tester un projet ou une idée. Vous utilisez actuellement peut-être XAMPP ou WAMP pour faire ce genre de choses, mais vous êtes limité à une version précise de Postgres (ou MySQL) ; avec Docker pas de limite ! Vous avez l'embarras du choix pour la version.

```sh
docker run -p 5432:5432 --name fixy-postgres  -v ./pgData:/var/lib/postgresql/data -e POSTGRES_USER=myUser -e POSTGRES_PASSWORD=myPassword -d postgres
```

C'est à vous, je vous laisse tester le container. Pour tester la connexion à votre base de données, je vous propose plusieurs solutions :

- [https://wiki.postgresql.org/wiki/PostgreSQL_Clients#HeidiSQL](HeidiSQL gratuit)
- Datagrip de JetBrains
- WebStorm / PHPStorm / InteliJ

::: tip Vous ne savez pas comment faire ?
Appeler moi, nous allons le faire ensemble.
:::

### Une autre BDD ?

Vous n'utilisez pas PostgreSQL, mais MySQL !? Aucun problème sur le DockerHub il y a également une image officielle pour MySQL ; [disponible ici](https://hub.docker.com/_/mysql)

En regardant la documentation, je vous laisse faire la même chose que pour [PostgreSQL](https://hub.docker.com/_/postgres)

::: tip Ici pas de commande je vous laisse chercher
Juste une petite aide, le port de MySQL est le `3306`.
:::

::: details Solution

```sh
docker run -p 3306:3306 --name fixy-mysql -v ./mysqlData:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=myPassword -d mysql
```

:::

## Wordpress

Nous avons vu PHP, une base de données (MySQL et PostgreSQL), pourquoi ne pas aller plus loin ? En effet Docker ne se limite pas à PHP / Python / MySQL nous pouvons packager ce que nous souhaitons. C'est le cas de plein de solutions Wordpress en fait parti ; vous avez sur le [DockerHub une image toute prête avec la dernière version de Wordpress](https://hub.docker.com/_/wordpress)

```sh
docker run -e WORDPRESS_DB_USER=root -e WORDPRESS_DB_PASSWORD=<password> --name wordpress -p 8080:80 -v $(pwd)/html:/var/www/html -d wordpress
```

::: danger vous voyez le problème ?
Et oui… Wordpress seul n'est pas très utile ! Il nous faut une base de données pour sauvegarder les données du container. C'est à partir d'ici que nous allons voir [la force de Docker Compose](/tp/docker/docker_compose.md).

Bien évidemment Docker Compose n'est pas obligatoire… Je vous laisse tester et regarder comment il est possible de faire **sans**.
:::

## Aller plus loin

Pour finaliser votre découverte, je vous propose de monter un serveur Redmine :

- [https://hub.docker.com/_/redmine](https://hub.docker.com/_/redmine)

Redmine est un outil de gestion de projet, il est très simple à utiliser et très complet. Vous pouvez l'utiliser pour gérer vos projets, vos tâches, vos bugs, etc.

Une fois démarré, je vous laisse découvrir l'outil.

## Conclusion

Dans ce TP nous avons vu comment lancer un container Docker. Nous avons vu que Docker est très simple à utiliser et que nous pouvons lancer plusieurs versions de PHP sur la même machine. 

Nous avons également vu que nous pouvons lancer une base de données (MySQL ou PostgreSQL) et même un serveur Web contenant le site Wordpress.

Ici l'idée c'était de vous montrer que Docker était très simple à utiliser et qu'il pouvait nous servir comme un environnement de développement.