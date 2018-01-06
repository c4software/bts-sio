# Compiler une application Hybride avec Gitlab-CI

## Introduction

Dans ce TP vous allez mettre en place l’intégration continue sur votre Projet d’application Hybride. Fini la prise de tête pour la compilation de votre application. Vous allez utiliser « une image Docker » au travers de GitLab-CI l’image docker en question est [Cordova light](https://hub.docker.com/r/c4software/cordova-light/).

Pourquoi Light ? Car l’image n’embarque pas Chrome Headless, et donc ne permet pas de faire de test unitaire de votre application.

## Création du projet sur GitLab

Avec votre compte GitLab vous pouvez créer un nombre illimités de projets. La première étape est donc de créer un projet sur votre  [compte Gitlab](https://gitlab.com/projects/new).

⚠️ Je vous conseille de mettre votre projet en mode « Private ».

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

Et c’est tout, avec ce simple fichier votre application est prête et sera compilée en automatique.

Commiter et Pusher la modification.

- Regarder les fichiers :
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

## Test et analyse

Désactiver le « cache » dans le fichier Gitlab-ci. Tester de compiler plusieurs fois votre application. À votre avis le cache est-il utile ?

## Déclarer un runner GitLab

Comme nous l’avons vu tout repose sur les runners, de base Gitlab fourni des runners partagés. C’est runners sont pratique car ils sont instantanément disponible dans vos projets, cependant vu qu’ils sont partagés avec d’autre utilisateurs il peu rapidement y avoir des questions de sécurités et surtout de performances. 

Pour être plus autonome (et plus performant) même dans la version cloud il est possible de déclarer un runners « à nous ». Ce runner va être dédié à votre compte car il sera déclaré sur votre machine.

### Installation

Pour déclarer un runner c’est très simple, il faut juste le lancer / l’installer sur votre machine. La documentation de GitLab étant très bien fait rendez vous [ici pour Windows](https://docs.gitlab.com/runner/install/windows.html) et [la pour Linux](https://docs.gitlab.com/runner/install/linux-repository.html)

## Enregistrer le runner

Maintenant que le runner est installé sur votre machine, nous allons devoir l’enregistrer. L’enregistrement consiste à déclarer à Gitlab.com que votre machine est prête à éxécuter des tâches. Vous dédiez en quelques sortes un peu de vos ressources à GitLab au travers de votre Runner.

L’enregistrement du runners est relativement simple, il faut dans un premier temps allez dans « les Paramètres CI/CD du projet que vous avez créé » exemple ```https://gitlab.com/bts-sio-chevrollier/slam5/settings/ci_cd``` cliquez sur « Expand » de la catégorie « Runners settings ». Vous devez avoir quelques chose comme :

![Register Runner](./ressources/runner.png)

Dans une console administrateur :

```sh
./gitlab-runner.exe register
```

✋ STOP ! Une fois rendu à cette étape appeler moi ! Nous allons terminer la procédure ensemble. Pour les plus téméraire vous pouvez suivre [la documentation](https://docs.gitlab.com/runner/register/index.html#windows) (Attention à bien choisir Docker)

## Signer l’application

Faire du Debug c’est bien ! Mais si on faisait une application prête pour le Store ? C’est possible et tout aussi simplement.

⚠️ Je vous déconseille fortement de le faire sur un « runner » public de Gitlab-CI. Pourquoi ? Simplement car nous allons mettre une clef de signature sur votre APK, clef qui doit rester **PRIVÉE** ! C’est ce qui garantie la sécurité de votre application, si celle-ci se retrouve en ligne le jeu est fini pour vous n’importe qui peux usurper votre identitée.

Ajouter dans le fichier ```.gitlab-ci.yml```

```yml
android:
  stage: deploy
  when: manual
  script:
    - cordova platform add android
    - cordova build android --release -- --keystore="keystore/keyfile" --keystoreType jks --password="MOT_DE_PASSE" --storePassword="MOT_DE_PASSE" --alias="demo"
  artifacts:
    paths:
      - platforms/android/build/outputs/apk/
```

Comme vous pouvez le constater la partie script fait référence à un nouveau fichier le ```keystore/keyfile```. Pour que la commande fonctionne nous allons donc devoir « le créer ».

### Création du keystore

Le Keystore est une notion d’Android, rien à voir avec Cordova. Il faut donc utiliser Android-Studio (pour les intéréssés il est également possible de le faire avec la ligne de commande).

Avec Android Studio :

![store](./ressources/SjcOa.png)

Une fois créé :

```sh
git add -A
git commit -am "Ajout signature"
git push
```

### Lancement d’un build

Relancer un build, mais en séléctionnant le stage « android ». Au bout de quelques minutes vous devez obtenir une application signée.