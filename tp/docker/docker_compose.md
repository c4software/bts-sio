# Le Docker Compose

<!-- TOC -->

- [Le Docker Compose](#le-docker-compose)
    - [Introduction](#introduction)
    - [Installer Docker Compose](#installer-docker-compose)
    - [Structure d’un Docker Compose](#structure-dun-docker-compose)
    - [Monter une application grace Docker Compose](#monter-une-application-grace-docker-compose)
        - [Remarques](#remarques)

<!-- /TOC -->

## Introduction

Dans ce TP nous allons voir comment créer une vrai arborescence de service avec Docker. Dans une application réel il n’est pas rare d’avoir plusieurs technologie (ou plusieurs « services ») pour assurer le bon fonctionnement d’un sytème dans son ensemble (Exemple pour faire fonctionner mon application j’ai besoin de MySQL, PHP, et d’un serveur Web pour l’interface client)

C’est dans des cas comme celui-ci que nous allons utiliser Docker-Compose. Avec Docker compose nous allons créer une architecture multi-conteneur que l’on peu appeler « stack ». Cette Stack sera :

- Autonome (car prête à être « mise en place » partout, quelques soit la plateforme cible).
- Pré-paramètré (tout est dans le fichier ```docker-compose.yml```).
- Isolé (tout les services ne sont pas forcément accessible du public, mais sont accessibles par vos autres applications).
- Administrable simplement grace au cli (```docker-compose up/down/start/stop```)

## Installer Docker Compose

Docker Compose est fourni directement par les developpeur de Docker, cependant sous Linux il n’est pas inclus dans l’installation de base des paquets. Pour l’installer rendez-vous sur la [documentation de Docker](https://docs.docker.com/compose/install/#install-compose)

Sous Windows et OSX pas de soucis Docker Compose est **inclus** dans l’installation de base.

## Structure d’un Docker Compose

Un fichier ```docker-compose.yml``` utilise la synthaxe yaml. Pour rappel un fichier Yaml c’est :

> La syntaxe du flux YAML est relativement simple, efficace, moins verbeuse que du XML, moins compacte cependant que du CSV. Elle a été établie pour être le plus lisible possible par des humains, tout en pouvant être mise en correspondance facilement avec les types de données précités, communs dans les langages de haut niveau. À ces langages il emprunte certaines notations.
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

Dans ce fichier nous définisons 2 services.

Le premier nommé Web fait référence à un fichier DockerFile présent dans le même dossier que le ```docker-compose.yml```. Le service en question expose au client final le port ```5000```.

Le second service est un service nommé redis, il fait référence au une image disponible sur https://hub.docker.com. Cette image n’expose aucun port au public mais sera accessible pour ```web```

## Monter une application grace Docker Compose

Dans cet exemple vous allez voir comment il est possible de monter rapidement une application grace à Docker. Nous allons en quelques ligne monté un blog (Wordpress) ainsi que la base de données.

Pour ça dans un nouveau dossier créer le fichier ```docker-compose.yml``` avec le contenu suivant :

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

Et voilà, c’est tout! votre stack Wordpress est prête il vous suffit de la lancer avec la commande suivante :

```shell
docker-compose up
```

Rendez-vous sur [localhost:8080](http://localhost:8080) pour admirer votre travail.

### Remarques

- Vous n'avez pas eu à rédiger le moindre Dockerfile, pourquoi ?
- Vous n'avez aucune persistance de donnée