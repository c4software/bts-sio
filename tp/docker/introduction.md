# Introduction à Docker

Dans ce TP nous allons voir l’installation de Docker et les premiers test de votre nouvel environnement.

<!-- TOC -->

- [Introduction à Docker](#introduction-à-docker)
- [Installation de Docker sous Windows](#installation-de-docker-sous-windows)
- [Premier test](#premier-test)
- [Second test](#second-test)
- [Les sources de l’image hello world](#les-sources-de-limage-hello-world)
- [Pour aller plus loin](#pour-aller-plus-loin)
    - [Créer un fichier dans la machine](#créer-un-fichier-dans-la-machine)

<!-- /TOC -->

# Installation de Docker sous Windows

Pour installer Docker rien de plus simple, il suffit d’utiliser l’installeur officiel en le téléchargant sur ![le site de Docker](https://www.docker.com/docker-windows)

# Premier test

Maintenant qu’il est installé sur votre poste rien de plus simple. Dans une console entrer la commande suivante :

```
docker version
```

Vous devez voir la version de Docker.

- Que constatez-vous ?
- Pourquoi est-ce important d’utiliser une version récente ?

# Second test

Maintenant que nous savons que Docker est correctement installé, testons avec une « machine » fourni par Docker. L’image ce nomme ```hello-world``` et celle-ci ne fait qu’afficher un message de bienvenue. De nouveau dans la console entrer la commande suivante :

```
docker run hello-world
```

[Docker Hello World](./ressources/hello-world.png)

- Que constatez-vous ?
- Comment être certain que l’image n’a rien fait d’anormal sur notre machine ?

# Les sources de l’image hello world

Maintenant que nous avons lancé notre première « vrai » machine intéréssons nous à sont fonctionnement. Vous avez du constater le terme « Pulling From » c’est l’image ou les morceaux d’image utile au fonctionnement de votre service. Celui-ci est téléchargé directement depuis le « Docker Hub » (il est également possible d’avoir un Hub Privé). Il est possible de voir « les sources » de l’image en question : ![ici](https://github.com/docker-library/hello-world), comme beaucoup de projet libre l’image est disponible sur Github.

Surprise ! On retrouve des plateformes (amd64, i686, armXX). Et c’est normal, Docker est multiplateforme et dans le cas de notre exemple l’executable est du « hello » est codé en C il est donc logique de retrouver l’executable pour les différentes plateformes ou l’image doit fonctionner.

Maintenant que nous avons vu le projet, entrons plus en détail allons vour la définition de notre image le ![fichier Dockerfile](https://github.com/docker-library/hello-world/blob/master/i386/hello-world/Dockerfile)

[Hello World 2](./ressources/hello-world2.png)

Peu d’informations, 3 lignes :

- ```FROM scratch``` (Image de base, celle utilisée comme référence, elle aussi posséde un DockerFile).
- ```COPY hello /``` (Ajoute le fichier hello à la racine de votre « machine »).
- ```CMD ["/hello"]``` (Commande lancé au démarrage de votre image)

PS: Pas d’inquietude on créera un DockerFile dans le 2nd TP.

# Pour aller plus loin

Bon un texte à l’écran c’est bien… Mais si on lancais un système entier… Ubuntu par exemple. Pour ça rien de plus simple, dans la console lancé :

```
docker run -it ubuntu bash
```

![Ubuntu](./ressources/ubuntu.png)

Et voilà vous avez un Linux complètement opérationnel en quelques minutes sur votre poste Windows. Pas mal ? C’est pas vraiment le but premier de Docker mais c’est cool.

Utiliser un peu le shell de votre « nouveau Linux », exemple de commande :

- ```uname -a```
- ```whoami```
- ```top```
- ```ls /```

- D’ailleurs, pourquoi le top ne retourne que deux processus ?
- Aucune trace de vos fichiers… c’est normal, de base rien n’est accessible.

## Créer un fichier dans la machine

Créer un fichier vide avec la commande :

```
touch fichier_test
```

Vérifier avec un ```ls``` que le fichier est bien présent. Quitter maintenant votre l’image en tappant ```exit```. Relancer de nouveau l’image avec la commande :

```
docker run -it ubuntu bash
```

Faites à nouveau un ```ls```, que constatez-vous? Et bien oui, le fichier n’est plus présent… C’est normal tous les fichiers créé dans l’image sont non persistant (c’est à dire qu’ils sont supprimés à chaque fois que l’image s’arrête). 