# Introduction à Laravel

![Laravel](./ressources/logo.png)

Dans ce TP nous allons couvrir l’installation la configuration et la création d’un premier projet « démo » à base de Laravel

<!-- TOC -->

- [Introduction à Laravel](#introduction-à-laravel)
    - [Introduction](#introduction)
        - [Windows](#windows)
            - [Installer Composer](#installer-composer)
            - [Installer Laravel](#installer-laravel)
        - [Linux](#linux)
            - [Installer Laravel](#installer-laravel-1)
        - [Osx (High Sierra)](#osx-high-sierra)
            - [Installer Laravel](#installer-laravel-2)
    - [Créer le premier Projet](#créer-le-premier-projet)
    - [Lancer le projet d’exemple](#lancer-le-projet-dexemple)

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

#### Installer Composer

- [Télécharger Composer pour Windows](https://getcomposer.org/Composer-Setup.exe), lors de l’installation il vous sera demandé de séléctionner l’éxecutable PHP. ```ATTENTION:``` Bien séléctionner la version 7 de PHP dans le dossier ```C:\wamp\bin\php\php\7.X.X\bin\php.exe``` <= Attention à prendre la bonne version
- Vérifier que la commande est bien disponible en tappant ```composer``` dans un terminal

#### Installer Laravel

```shell
composer global require "laravel/installer"
```

✋ Vérifier que la commande laravel fonctionne

### Linux

Pour Linux c’est plus simple, il suffit d’installer PHP 7 sur votre machine (regarder la documentation de votre distribution). Une fois que PHP est installé il suffit de faire :

```shell
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
mv composer.phar /usr/local/bin/composer
```

Ajouter dans votre PATH la home de composer, exemple : 

```shell
export COMPOSER_HOME="$HOME/.composer/vendor/bin"
export PATH="$PATH:$COMPOSER_HOME:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools"
```

#### Installer Laravel

```shell
composer global require "laravel/installer"
```

✋ Vérifier que la commande laravel fonctionne

### Osx (High Sierra)

Sur les dernières version de MacOS PHP 7 est déjà disponible en version 7, Il suffit donc d’installer ```Composer```

```shell
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
mv composer.phar /usr/local/bin/composer
```

Ajouter dans votre PATH la home de composer, exemple : 

```shell
export COMPOSER_HOME="$HOME/.composer/vendor/bin"
export PATH="$PATH:$COMPOSER_HOME:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools"
```

#### Installer Laravel

```shell
composer global require "laravel/installer"
```

✋ Vérifier que la commande laravel fonctionne


## Créer le premier Projet

Votre poste est maintenant configuré pour Laravel, vous pouvez donc créer un nouveau projet grace à la commande :

✋ Attention, le projet sera créé dans le dossier courant.

```shell
laravel new mon-premier-projet
```

## Lancer le projet d’exemple

Laravel intègre un serveur de test permettant de valider son développement avec rien d’autre que PHP sur sa machine. Pour ça dans le dossier du projet (```cd mon-premier-projet```) vous pouvez faire la commande suivante :

```shell
php artisan serve
```

Rendez-vous maintenant dans [votre navigateur](http://localhost:8000) pour voir le site de démonstration fourni par Laravel.