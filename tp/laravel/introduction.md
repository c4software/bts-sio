# Introduction à Laravel

![Laravel](./ressources/logo.png)

Dans ce TP nous allons couvrir l’installation, la configuration et la création d’un premier projet « démo » à base de Laravel.

## Introduction

Pour pouvoir utiliser Laravel nous allons avoir besoin de différents outils :

- PHP7
- Composer

Il y a bien plus de dépendances, mais celles-ci seront récupérées automatiquement par ```Composer```

### Windows

Pour « installer » Laravel sous Windows vous devez dans un premier temps installer PHP7 sur votre machine. Dans un premier temps installer Wamp + PHP7 :

- [Installation de Wamp.](http://www.wampserver.com/fr/#download-wrapper)
- Installer Wamp, et vérifier que celui-ci fonctionne correctement.
- Activer l’extension ```php_openssl.dll``` dans la liste des extensions PHP.

#### Installer Composer

- [Télécharger Composer pour Windows](https://getcomposer.org/Composer-Setup.exe), lors de l’installation il vous sera demandé de séléctionner l’éxecutable PHP. ```ATTENTION:``` Bien séléctionner la version 7 de PHP dans le dossier ```C:\wamp\bin\php\php\7.X.X\bin\php.exe``` <= Attention à prendre la bonne version
- Vérifier que la commande est bien disponible en tappant ```composer``` dans un terminal

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
export PATH="$PATH:$HOME/.config/composer/vendor/bin"
```

### MacOS (High Sierra)

Sur la dernière version de MacOS, PHP est déjà disponible en version 7. Il suffit donc d’installer ```Composer```, pour l’installer il suffit :

```shell
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
mv composer.phar /usr/local/bin/composer
```

Ajouter dans votre PATH la home de composer, exemple :

```shell
export PATH="$PATH:$HOME/.composer/vendor/bin"
```

Fermer et rouvrir le terminal.

## Installer Laravel

```shell
composer global require "laravel/installer"
```

✋ Vérifier que la commande laravel fonctionne. Comment faire ?
Pour vérifier que la commande ```laravel``` fonctionne il suffit de faire dans une console ```laravel -h```

![Laravel](./ressources/laravelcli.png)

## Créer le premier Projet

Votre poste est maintenant configuré pour Laravel, vous pouvez donc créer un nouveau projet grace à la commande :

✋ Attention, le projet sera créé dans le dossier courant.

```shell
laravel new mon-premier-projet
```

La commande va télécharger l'ensemble des dépendances nécéssaire et va créer un dossier ```mon-premier-projet``` avec les sources.

## Initialisation

Votre nouveau projet contient un fichier ```.env``` ouvrez le, et éditez par exemple le nom du projet.

Questions :

- Le fichier est plutôt complet, à quoi servent les différents paramètres ?
- Dans les cours je vous ai parlé de la APP_KEY, celle-ci est déjà remplis, à votre avis pourquoi ?

## Lancer le projet d’exemple

Laravel intègre un serveur de test permettant de valider son développement avec rien d’autre que PHP sur sa machine. Pour ça dans le dossier du projet (```cd mon-premier-projet```) vous pouvez faire la commande suivante :

```shell
php artisan serve
```

Rendez-vous maintenant dans [votre navigateur](http://localhost:8000) pour voir le site de démonstration fourni par Laravel.

![Sample Laravel](./ressources/sample_laravel.png)

## Modification du template par défaut

Éditer le fichier ```resources/views/welcome.blade.php```, ajouter la variable ```$titre```. La synthaxe « blade » est la suivante ```{{ $titre }}```. À la ligne 82 ajouter après Laravel « ```{{ $titre }}``` ». Vous avez défini votre première variable c'est bien ! Mais pour l'instant rien ne se passe… Pour que quelques choses s'affiche :

Éditer le fichier  ```routes/web.php```, transformer :

```php
return view('welcome');
```

en

```php
return view('welcome', ['titre' => 'Mon premier exemple.']);
```

💡 Vous pouvez également appeler des fonctions dans les templates, exemple ```{{ time() }}```. Tester cette fonction en ajoutant :

```html
<p>Le Timestamp est {{ time() }}</p>
```

Questions :

- À votre avis est-il possible d'appeler d'autre fonctions ?

## Ajouter une nouvelle Route

Pour tester le fonctionnement nous allons ajouter une nouvelle ```Route``` dans le projet de démonstration. Nous allons donc ```ajouter``` dans le fichier ```routes/web.php``` :

```php
Route::get('/ping', function () {
    return "pong";
});
```

Tester la modification en [accédant à votre site](http://localhost:8000/ping)

{% reveal text="Voir l’une des solutions possible" %}

```php
Route::get('/', function () {
    return view('welcome', ['titre' => 'Mon premier exemple.']);
});

Route::get('/ping', function () {
    return "pong";
});
```

{% endreveal %}

## Ajouter une nouvelle vue

Maintenant que nous avons déclaré une nouvelle route, nous allons revoir légèrement les templates pour :

- Déclarer un template principal (aussi appelé : layout).
- Modifier le welcome.blade.php pour y faire référence.
- Utiliser le layout pour répondre ```pong```.

Question :

- À votre avis pourquoi un tel découpage ?

### Créer le layout

Créer un nouveau fichier ```resources/views/layouts/base.blade.php``` avec le contenu suivant :

```html
<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel - @yield('title')</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                font-family: 'Raleway', sans-serif;
                font-weight: 100;
                height: 100vh;
                margin: 0;
            }
            .full-height {
                height: 100vh;
            }
            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }
            .position-ref {
                position: relative;
            }
            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }
            .content {
                text-align: center;
            }
            .title {
                font-size: 84px;
            }
            .links > a {
                color: #636b6f;
                padding: 0 25px;
                font-size: 12px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }
            .m-b-md {
                margin-bottom: 30px;
            }
        </style>
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            @if (Route::has('login'))
                <div class="top-right links">
                    @auth
                        <a href="{{ url('/home') }}">Home</a>
                    @else
                        <a href="{{ route('login') }}">Login</a>
                        <a href="{{ route('register') }}">Register</a>
                    @endauth
                </div>
            @endif

            <div class="content">
                @yield('content')
            </div>
        </div>
    </body>
</html>
```

✋ Mais d’où vient ce contenu ? C’est tout simplement un découpage en « layout » du template de base de démonstration.

Question :

- À votre avis, à quoi sert le mot clef ```@yield``` ?

### Utiliser le layout dans welcome.blade.php

Maintenant que nous avons notre template de base nous allons l’utiliser dans le template « Welcome ». Remplacer le contenu de ```resources/views/welcome.blade.php``` par :

```html
@extends('base')

@section('title', 'Bienvenue')

@section('content')
   <div class="title m-b-md">
        Laravel
    </div>

    <div class="links">
        <a href="https://laravel.com/docs">Documentation</a>
        <a href="https://laracasts.com">Laracasts</a>
        <a href="https://laravel-news.com">News</a>
        <a href="https://forge.laravel.com">Forge</a>
        <a href="https://github.com/laravel/laravel">GitHub</a>
    </div>
@endsection
```

### Utiliser le layout dans la route Pong

Bon, maintenant que nous avons déclaré un layout utilisons-le dans la 2nd route ([/ping](http://localhost:8000/ping)) que nous avons créé tout à l’heure. Pour cette dernière action je ne vous donne pas de code, mais uniquement les étapes :

- Créez une Vue par exemple ```ping.blade.php``` (Dans le dossiers ```layouts```)
- Utilisez ```@extends('base')``` pour « hériter » de votre layout principal.
- Modifiez ```web.php``` pour répondre avec la fonction ```view``` comme dans l’autre route.

Avec ces quelques expliquations vous allez pouvoir atteindre l’objectif. Bon courage.

{% reveal text="Voir l’une des solutions possible pour ping.blade.php" %}

```php
@extends('base')

@section('title', 'Bienvenue')

@section('content')
   <h1>PONG</h1>
@endsection
```

{% endreveal %}