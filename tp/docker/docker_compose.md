# Le Docker Compose

## Introduction

Dans ce TP nous allons voir comment créer une vraie arborescence de service avec Docker. Dans une application réelle, il n’est pas rare d’avoir plusieurs technologies (ou plusieurs « services ») pour assurer le bon fonctionnement d’un système dans son ensemble (Exemple pour faire fonctionner mon application j’ai besoin de MySQL, PHP, et d’un serveur Web pour l’interface client).

C’est dans des cas comme celui-ci que nous allons utiliser Docker-Compose. Avec Docker compose-nous allons créer une architecture multiconteneur que l’on peut appeler « stack ». Cette Stack sera :

- Autonome (car prête à être « mise en place » partout, quelle que soit la plateforme cible).
- Pré-paramètrée (tout est dans le fichier ```docker-compose.yml```).
- Isolé (tous les services ne sont pas forcément accessibles du public, mais sont accessibles par vos autres applications).
- Administrable simplement grâce au cli (```docker-compose up/down/start/stop```).

## Installer Docker Compose

Docker Compose est fourni directement par les développeurs de Docker, cependant sous Linux il n’est pas inclus dans l’installation de base des paquets. Pour l’installer, rendez-vous sur la [documentation de Docker](https://docs.docker.com/compose/install/#install-compose).

Sous Windows et OSX pas de soucis Docker Compose est **inclus** dans l’installation de base.

## Structure d’un Docker Compose

Un fichier ```docker-compose.yml``` utilise la syntaxe yaml. Pour rappel un fichier Yaml c’est :

> La syntaxe du flux YAML est relativement simple, efficiente, moins verbeuse que du XML, moins compacte cependant que du CSV. Elle a été établie pour être le plus lisible possible par des humains, tout en pouvant être mise en correspondance facilement avec les types de données précités, communs dans les langages de haut niveau. À ces langages il emprunte certaines notations.
> - Les commentaires sont signalés par le signe dièse (#) et se prolongent sur toute la ligne. Si par contre le dièse apparait dans une chaine, il signifie alors un nombre littéral.
> - Une valeur nulle s'écrit avec le caractère tilde (~)
Il est possible d'inclure une syntaxe JSON dans une syntaxe YAML.
> - Les éléments de listes sont dénotés par le tiret (-), suivi d'une espace, à raison d'un élément par ligne.
Les tableaux sont de la forme clé: valeur, à raison d'un couple par ligne.
> - Les scalaires peuvent être entourés de guillemets doubles ("), ou simples ('), sachant qu'un guillemet s'échappe avec un antislash (\), alors qu'un apostrophe s'échappe avec un autre apostrophe4. Ils peuvent de plus être représentés par un bloc indenté avec des modificateurs facultatifs pour conserver (|) ou éliminer (>) les retours à la ligne.
> - Plusieurs documents rassemblés dans un seul fichier sont séparés par trois traits d'union (---) ; trois points (...) optionnels marquent la fin d'un document dans un fichier.
> - Les nœuds répétés sont initialement signalés par une esperluette (&) puis sont référencés avec un astérisque (*) ; JSON, un langage concurrent de YAML, est compatible avec la syntaxe de JavaScript mais ne supporte pas cette notion de référence.
> - L'indentation, par des espaces, manifeste une arborescence.

Source: Wikipedia

Voilà un exemple de Docker Compose :

```
version: '3'
services:
  web:
    build: .
    ports:
     - "5000:5000"
  redis:
    image: "redis:alpine"
```

Dans ce fichier, nous définissons 2 services.

Le premier nommé Web fait référence à un fichier DockerFile présent dans le même dossier que le ```docker-compose.yml```. Le service en question expose au client final le port ```5000```.

Le second service est un service nommé Redis, il fait référence à une image disponible sur https://hub.docker.com. Cette image n’expose aucun port au public mais sera accessible pour ```web```.

## Monter une application grâce Docker Compose

Dans cet exemple, vous allez voir comment il est possible de monter rapidement une application grâce à Docker. Nous allons en quelques lignes monter un blog (Wordpress) ainsi que la base de données.

Pour ça, dans un nouveau dossier, créez le fichier ```docker-compose.yml``` avec le contenu suivant :

```yaml
version: '3.1'

services:
    wordpress:
        image: wordpress
        ports:
            - 8080:80
        environment:
            WORDPRESS_DB_PASSWORD: example

    mysql:
        image: mysql:5.7
        environment:
            MYSQL_ROOT_PASSWORD: example
```

Et voilà, c’est tout ! Votre stack Wordpress est prête il vous suffit de la lancer avec la commande suivante :

```bash
docker-compose up
```

Rendez-vous sur [localhost:8080](http://localhost:8080) pour admirer votre travail.

### Remarques

- Vous n'avez pas eu à rédiger le moindre Dockerfile, pourquoi ?
- Vous n'avez aucune persistance de données.

## Aller plus loin

Pour aller plus loin, vous pouvez regarder les vidéos sur le site [Play-With-Docker](http://training.play-with-docker.com/dev-landing/).
