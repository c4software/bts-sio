# Explication structure « Android Boilerplate »

Ce document n'est pas un TP, mais une explication de la structure « Android Boilerplate » disponible à l'adresse suivante :

- [Android Boilerplate Koin - Rx - OkHttp](https://github.com/c4software/Android-Boilerplate-Koin-CoRoutines-OkHTTP)

Ce document vous donnera les clés afin de comprendre le fonctionnement et de vous l'approprier.

## But de code

Le but du code fourni sur Github est de simplifier la mise en place d'une base applicative Android « moderne ». Il ne contient aucun code (presque). Il est donc clonnable / téléchargeable et utilisable tel quel, l'idée étant vraiment d'avoir presque un template d'application réutilisable à volonté.

Ceci étant annoncé, passons au détail du fonctionnement.

## Récupérer le code

Pour récupérer le code source vous avez deux possibilités :

- Le fichier zip en provenance de Github : [À télécharger ici](https://github.com/c4software/Android-Boilerplate-Koin-CoRoutines-OkHTTP/archive/master.zip)
- En clonant le repository : `git clone git@github.com:c4software/Android-Boilerplate-Koin-CoRoutines-OkHTTP.git`

⚠️ Attention, si vous avez choisi de cloner le repository. Pensez bien à supprimer le dossier `.git` à la racine des sources afin de ne pas garder l'historique de mon projet. ⚠️

## Lancer le projet une première fois

Avant de d'effectuer des modifications dans le pojet nous allons le lancer une première fois. Pour ça il suffit d'ouvrire le projet avec Android Studio.

![Ouvrir le projet](./ressources/open_project.png)

Une fois l'indexation terminé, vous devez pouvoir lancer le projet sur un émulateur ou sur votre téléphone.

## La structure des dossiers

## MVVM ? Kézako !?

## DI ? Injection de dépendances, Koin un peu d'explication

## Modifier le package « sample »

## Changer le nom de l'application

## Changer la configuration de l'API

## LocalRepository ?

## RemoteRepository ?

## Ajouter une nouvelle route d'API distance

### Déclarer l'appel HTTP dans SampleRemoteDataSource

### Déclarer la méthode dans SampleRemoteRepository

### L'appeler depuis le code

## Ajouter une nouvelle méthode « locale »

### Déclarer la méthode dans SampleLocalRepository

## Ajouter une nouvelle Vue / Layout
