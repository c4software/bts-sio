# Transformer un Raspberry Pi en server Web

::: details Sommaire
[[toc]]
:::

## Introduction

Dans cette page nous allons détailler la mise en place d'un serveur web « Multi-utilisateur » / « Multi-Projets ». Ce serveur reposera sur une plateforme connue du type Raspberry Pi et sur le système de container Docker.

La solution final pourra ressembler à :

| ![Version 1](./res/version1.jpg) | ![Version 2](./res/version2.jpg) |
| -------------------------------- | -------------------------------- |

![Dashboard](https://github.com/c4software/rpi-docker-lamp-stack/blob/main/home.png?raw=true)

::: warning Un détail qui compte
Ce que nous allons installer n'est pas conçu pour héberger des sites publics. Pourquoi ? La configuration du serveur Apache est trop permissive et ne convient que pour du développement.

L'autre raison est le FTP, celui-ci est volontairement ouvert à toutes les connexions. Ce fonctionnement nous sera très utile pour la phase de création d'un site, mais **c'est bien évidemment à proscrire** pour une machine ouverte sur Internet.
:::

Ce que nous allons installé s'appelle une stack LAMP (Linux, Apache, MySQL, PHP) elle ne diffère pas de celle que vous pouvez installer sur votre ordinateur avec des logiciels tels que (XAMPP ou WAMP ou autres). La seule différence c'est que nous allons dédier une machine pour ça.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/y7HzFidjKjs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Flasher / installer le Raspberry Pi

La première étape va être d'installer le système d'exploitation de votre Raspberry Pi. Pour cette étape, il n'y a pas vraiment de règle. Personnellement j'utilise l'outil fourni par la fondation :

- [Raspberry Pi Imager](https://www.raspberrypi.org/software/)

![Rpi imager](./res/rpi-imager.png)

Pour le choix de la version du système, je vous propose de partir sur celui le plus light possible à savoir « Raspberry Pi OS Lite ».

::: tip Pas de bureau
La version Lite ne contient aucun environnement de bureau. Il faudra donc activer le SSH (accès distant) avant de démarrer le Raspberry Pi. Cet accès SSH nous permettra d'effectuer les quelques commandes nécessaires au démarrage de notre future LAMP.
:::

### Activer le SSH

Avant de redémarrer le Raspberry Pi avec la carte SD inséré, nous allons activer le SSH sur le « mini-ordinateur ». Pour ça rien de bien compliqué il suffit de créer un fichier nommé `ssh` sur la partition de boot de la carte SD.

```sh
# Exemple sous mac
touch /Volumes/boot/ssh
```

Une fois le fichier créé vous pouvez retirer la Carte SD et l'insérer dans votre Raspberry Pi

## Installer Docker

Docker n'est pas disponible de base sur l'OS fourni par la fondation. Par contre il est très simple de l'installer grace au système de paquet intégré à Raspbian (pardon Raspberry Pi OS).

```sh
# Étape 1 : Mettre à jour l'OS
sudo apt-get update && sudo apt-get upgrade

# Étape 2 : Télécharger et lancer le script d'installation de Docker
curl -fsSL https://get.docker.com -o get-docker.sh && sudo sh get-docker.sh

# Étape 3 : Autoriser l'utilisateur pi (celui par defaut) à lancer la commande docker
sudo usermod -aG docker Pi
```

::: warning Attention danger
De manière générale lancer **en root** un script téléchargé depuis Internet est une **très mauvaise pratique**.
:::

## Installer Docker-Compose

Docker compose est un ajout intéressant à Docker, il va nous permettre de définir des « stacks applicatives » à base de différent container Docker. Dans notre cas, ça va être très intéressant en effet un serveur LAMP est en réalité constitué de différents logiciels :

- Apache + PHP.
- MySQL.
- Un serveur FTP.

Pour l'installer, il suffit de faire :

```sh
sudo apt-get -y install libffi-dev libssl-dev python3-dev python3 python3-pip
sudo pip3 -v install docker-compose
```

::: tip
À partir de maintenant vous avez l'ensemble des outils permettant de lancer notre serveur LAMP. D'ailleurs ce que nous avons installé nous permettra de faire bien plus. Il sera possible de lancer n'importe quelle image Docker (pratique ;))
:::

## Installer la stack LAMP

## Fonctionnement

## Fonctionnement du FTP intégré

## Accéder au site web
