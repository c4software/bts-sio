---
description: Aide mémoire Cordova
---

# Aide mémoire Cordova

::: warning Projet en sommeil
Le projet Apache Cordova est en activité très réduite. Pour un nouveau projet, privilégiez [Capacitor](https://capacitorjs.com/). Cette fiche est conservée pour référence.
:::

::: details Table des matières
[[toc]]
:::

## Installation

Installer Cordova de manière « globale » sur l’ordinateur :

```
$ npm install -g cordova
```

## Créer

Créer un nouveau projet

```
$ cordova create demo com.vbrosseau.demo Demo
```

> Créer un nouveau projet dans le dossier « demo » avec comme namespace « com.vbrosseau.demo ». Le namespace doit être unique sur le périphérique de destination.

## Les plateformes

Lister les plateformes actuellement installées pour le projet

```
$ cordova platform ls
```

Ajouter une plateforme

```
$ cordova platform add android
```

Mettre à jour une plateforme

```
$ cordova platform update android
```

## Les plugins

Lister les plugins actuellement installés

```
$ cordova plugin ls
```

Rechercher un plugin (ouvre une recherche npm dans votre navigateur)

```
$ cordova plugin search device
```

Ajouter un plugin

```
$ cordova plugin add cordova-plugin-device
```

Supprimer un plugin

```
$ cordova plugin rm cordova-plugin-device
```

## Compilation

Création de l’APK Android

```
$ cordova build android
```

Lancement de l’application en mode « debug ». Une fois lancée, l’application est visible dans Chrome Inspect (saisissez `chrome://inspect/#devices` dans la barre d’adresse de Chrome)

```
$ cordova run android
```

## Tester dans son navigateur

```
$ cordova platform add browser
$ cordova run browser
```
