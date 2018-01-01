# Compiler une application Hybride avec Gitlab-CI

<!-- TOC -->

- [Compiler une application Hybride avec Gitlab-CI](#compiler-une-application-hybride-avec-gitlab-ci)
    - [Introduction](#introduction)
    - [Création du projet sur GitLab](#création-du-projet-sur-gitlab)
    - [Commiter et Pusher vos sources](#commiter-et-pusher-vos-sources)
    - [Activer GitLab-CI](#activer-gitlab-ci)
    - [Lancement d’un « Build »](#lancement-dun-«-build-»)

<!-- /TOC -->

## Introduction

Dans ce TP vous allez mettre en place l’intégration continue sur votre Projet d’application Hybride. Fini la prise de tête pour la compilation de votre application. Vous allez utiliser « une image Docker » au travers de GitLab-CI l’image docker en question est [https://hub.docker.com/r/c4software/cordova-light/](Cordova-Light).

Pourquoi Light ? Car l’image n’embarque pas Chrome Headless, et donc ne permet pas de faire de test unitaire de votre application.

## Création du projet sur GitLab

Avec votre compte GitLab vous pouvez créer un nombre illimités de projets. La première étape est donc de créer un projet sur votre (https://gitlab.com/projects/new)[compte Gitlab]

⚠️ Je vous conseil de mettre votre projet en mode « Private ».

## Commiter et Pusher vos sources

Si ce n’est pas déjà fait, commiter les sources de votre application Cordova. Attention à bien mettre un ```.gitignore``` pour ignorer le dossier ```nodes_modules/```.

Vous pouvez pusher vos sources.

## Activer GitLab-CI

Maintenant que votre projet est sur GitLab, nous allons activer Gitlab-CI. Pour ça créer un fichier ```.gitlab-ci.yml```, c’est le fichier qui va activer l’intégration continue sur votre projet. Voilà le contenu du fichier :

```yml
image: c4software/cordova-light

stages:
  - deploy

cache:
  untracked: true
  key: "$CI_PROJECT_ID"
  paths:
    - plugins/

android_debug:
  stage: deploy
  when: manual
  script:
    - cordova platform add android
    - cordova build android
  artifacts:
    paths:
      - platforms/android/build/outputs/apk/
```

Et c’est tout, avec se simple fichier votre application est prête et sera compilée en automatique.

Commiter et Pusher la modification.

- Regarder les fichier :
    - À quoi correspond le ```when: manual```?
    - À quoi sert le cache ?
    - À quoi correspond le ```artifacts``` ?

## Lancement d’un « Build »

Pour lancer un build rendez-vous dans la partie « CI/CD » de votre Projet GitLab.

![ci](./ressources/hybrid-ci.png)

Et lancer le build :

![ci](./ressources/run.png)

Au bout de quelques minutes votre application est prête :

![resultat](./ressources/resultat.png)

Bonus ! 

Grace à l’artifact votre application est même téléchargeable :

![dl](./ressources/telechargement.png)