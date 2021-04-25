# Créer des services très rapidement (et simplement)

Dans ce TP nous allons voir comment monter rapidement (et très simplement) un service avec Docker. Ici pas de Docker-Composes ou autre… Il s'agit de voir que Docker vous nous permettre de créer très simplement un « Serveur » pour répondre à une problématique ponctuelle de developpement.

::: danger Un détail
Le plus important dans ce genre de « stack » c'est de se souvenir qu'un conteneur Docker est « Stateless », c'est à dire que les données seront éffacés à chaque redémarrage de celui-ci. Donc attention !
:::

Vous avez oubliez comment fonctionne la ligne de commande de Docker ? [Petit rappel ici sur son utilisation](/cheatsheets/docker/)

## PHP

Même si PHP est relativement et très simplement disponible sur différents environnements il est quand même intéressant de voir comment le lancer directement via Docker. Pourquoi ? Et bien, car Docker va nous permettre de lancer plusieurs versions du PHP sur la même machine. Pratique par exemple si vous souhaitez tester rapidement un développement. De plus nous allons voir qu'avec le système de volume, il sera possible de le faire en quelques secondes.

### PHP 7

```sh
# Pour *Nix
docker run --rm -p 8080:80 -v $(pwd):/var/www/html/ php:7-apache

# Pour Windows
docker run --rm -p 8080:80 -v %cd%:/var/www/html/ php:7-apache
```

Tester la commande (et comprendre pourquoi ça ne fonctionne pas).

### PHP 8

```sh
# Pour *Nix
docker run --rm -p 8080:80 -v $(pwd):/var/www/html/ php:8-apache

# Pour Windows
docker run --rm -p 8080:80 -v %cd%:/var/www/html/ php:8-apache
```

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

## Wordpress

Nous avons vu PHP, une base de données (MySQL et PostgreSQL), pourquoi ne pas aller plus loin ? En effet Docker ne se limite pas à PHP / Python / MySQL nous pouvons packager ce que nous souhaitons. C'est le cas de plein de solutions Wordpress en fait parti ; vous avez sur le [DockerHub une image toute prête avec la dernière version de Wordpress](https://hub.docker.com/_/wordpress)

```sh
docker run -e WORDPRESS_DB_USER=root -e WORDPRESS_DB_PASSWORD=<password> --name wordpress -p 8080:80 -v $(pwd)/html:/var/www/html -d wordpress
```

::: danger vous voyez le problème ?
Et oui… Wordpress seul est pas très utile ! Il nous faut une base de données pour sauvegarder les données du container. C'est à partir d'ici que nous allons voir [la force de Docker Compose](/tp/docker/docker_compose.md).

Bien évidemment Docker Compose n'est pas obligatoire… Je vous laisse tester et regarder comment il est possible de faire **sans**.
:::
