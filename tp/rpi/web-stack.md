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

Pour le choix de la version du système, je vous propose de partir sur celui le plus light possible à savoir « Raspberry Pi OS Lite ».

::: tip Pas de bureau
La version Lite ne contient aucun environnement de bureau. Il faudra donc activer le SSH (accès distant) avant de démarrer le Raspberry Pi. Cet accès SSH nous permettra d'effectuer les quelques commandes nécessaires au démarrage de notre future LAMP.
:::

### Activer le SSH

## Installer Docker

## Installer la stack LAMP

## Fonctionnement

## Fonctionnement du FTP intégré

## Accéder au site web
