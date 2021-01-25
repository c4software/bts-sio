# Transformer un Raspberry Pi en server Web

::: details sommaire
[[toc]]
:::

## Introduction

Dans cette page nous allons détailler la mise en place d'un serveur web « Multi-utilisateur » / « Multi-Projets ». Ce serveur reposera sur une plateforme connue du type Raspberry Pi et sur le système de container Docker. La solution final ressemblera à :

![Version 1](./res/version1.jpg)

![Version 2](./res/version2.jpg)

![Dashboard](https://github.com/c4software/rpi-docker-lamp-stack/blob/main/home.png?raw=true)

::: warning Un détail qui compte
Ce que nous allons installer n'est pas conçu pour héberger des sites publics. Pourquoi ? La configuration du serveur Apache est trop permissive et ne convient que pour du développement.

L'autre raison est le FTP, celui-ci est volontairement ouvert à toutes les connexions. Ce fonctionnement nous sera très utile pour la phase de création d'un site, mais **c'est bien évidemment à proscrire** pour une machine ouverte sur Internet.
:::

Ce que nous allons installé s'appelle une stack LAMP (Linux, Apache, MySQL, PHP) elle ne diffère pas de celle que vous pouvez installer sur votre ordinateur avec des logiciels tels que (XAMPP ou WAMP ou autres). La seule différence c'est que nous allons dédier une machine pour ça.

[![Vidéo](https://github.com/c4software/rpi-docker-lamp-stack/blob/main/preview.jpg?raw=true)](https://www.youtube.com/watch?v=y7HzFidjKjs)

## Flasher / installer le Raspberry Pi

## Installer Docker

## Installer la stack LAMP

## Fonctionnement

## Fonctionnement du FTP intégré

## Accéder au site web
