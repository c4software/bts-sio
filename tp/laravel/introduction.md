# Introduction à Laravel

![Laravel](./ressources/logo.png)

Dans ce TP nous allons couvrir l’installation la configuration et la création d’un premier projet « démo » à base de Laravel

<!-- TOC -->

- [Introduction à Laravel](#introduction-à-laravel)
    - [Introduction](#introduction)
        - [Windows](#windows)

<!-- /TOC -->

## Introduction

Pour pouvoir utiliser Laravel nous allons avoir besoin de différents outils :

- PHP7
- Composer

Il y a bien plus de dépendances, mais celle-ci seront récupérés automatiquement par ```Composer```

### Windows

Pour « installer » Laravel sous Windows vous devez dans un premier temps installer PHP7 sur votre machine. Dans un premier temps installer Wamp + PHP7 :

- [Installation de Wamp.](http://www.wampserver.com/fr/#download-wrapper)
- Installer Wamp, et vérifier que celui-ci fonctionne correctement.
- Activer l’extension ```php_openssl.dll``` dans la liste des extensions PHP.

Installer Composer :

- [Télécharger Composer pour Windows](https://getcomposer.org/Composer-Setup.exe), lors de l’installation il vous sera demandé de séléctionner l’éxecutable PHP. ```ATTENTION:``` Bien séléctionner la version 7 de PHP dans le dossier ```C:\wamp\bin\php\php\7.X.X\bin\php.exe``` <= Attention à prendre la bonne version
- Vérifier que la commande est bien disponible en tappant ```composer``` dans un terminal

Installer Laravel :

```$ composer global require "laravel/installer"```

✋ Vérifier que la commande laravel fonctionne

### Linux

### Osx (High Sierra)

## Créer le premier Projet