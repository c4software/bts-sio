---
description: "Préparer son poste avant une formation Android et Kotlin : Git, JDK 21, Android Studio, téléphone en mode développeur, Docker, et un test de build pour tout valider."
---

# Préparer son poste : Android et Kotlin

Avant de commencer, votre poste doit être prêt. Les téléchargements sont volumineux (plusieurs gigaoctets) : je vous conseille vivement de suivre cette page **avant** le premier jour, pour ne pas perdre la matinée en installations.

Comptez environ une heure, l'essentiel étant du temps de téléchargement. Chaque étape se termine par un point de contrôle : si vous les validez tous, vous êtes prêt.

::: details Sommaire
[[toc]]
:::

## Ce dont vous avez besoin

- Un ordinateur (Windows, macOS ou Linux) avec **16 Go de mémoire** (8 Go est un minimum) et **30 Go d'espace disque libre**.
- Les droits administrateur pour installer des logiciels.
- Un **téléphone Android physique** et son câble USB (données, pas seulement charge).
- Une connexion Internet correcte.

::: tip Pourquoi un vrai téléphone ?
L'émulateur suffit pour la plupart des exercices, mais il ne gère pas le Bluetooth Low Energy (BLE). Pour dialoguer avec un périphérique, un vrai téléphone est indispensable.
:::

## Git

Git sert à récupérer le code source des projets.

1. Installez Git : [https://git-scm.com/downloads](https://git-scm.com/downloads).
2. Configurez votre identité :

```sh
git config --global user.name "Prénom Nom"
git config --global user.email "vous@exemple.com"
```

3. Si vous devez accéder à un dépôt privé, créez une clé SSH et ajoutez-la à votre compte : la procédure est détaillée dans l'[aide-mémoire sur la clé SSH](/cheatsheets/ssh-key/).

::: tip Point de contrôle
La commande `git --version` affiche un numéro de version.
:::

## Le JDK 21

Kotlin s'exécute sur la machine virtuelle Java : il faut donc un JDK (*Java Development Kit*). Nous utilisons la version **21**.

1. Téléchargez le JDK 21 **Temurin** : [https://adoptium.net/](https://adoptium.net/) (choisissez la version 21, LTS).
2. Pendant l'installation sous Windows, cochez l'option qui définit la variable `JAVA_HOME`.

::: tip Point de contrôle
Dans un **nouveau** terminal, la commande `java -version` affiche une version qui commence par `21`.
:::

::: details Plusieurs versions de Java installées ?
Si `java -version` affiche une autre version, c'est qu'un autre JDK passe en premier. Vérifiez la variable d'environnement `JAVA_HOME` : elle doit pointer vers le dossier du JDK 21. Sous macOS et Linux, la commande `echo $JAVA_HOME` vous l'indique ; sous Windows, `echo %JAVA_HOME%`.
:::

## Android Studio

Android Studio est l'IDE officiel pour développer des applications Android. Il installe aussi le SDK Android et l'émulateur.

1. Téléchargez la dernière version stable : [https://developer.android.com/studio](https://developer.android.com/studio).
2. Lancez l'installation et choisissez le mode **Standard** : Android Studio télécharge alors le SDK et les outils nécessaires.
3. Au premier lancement, laissez-le terminer ses téléchargements (cela peut prendre un moment).

### Créer un émulateur

Dans Android Studio, ouvrez **Tools > Device Manager**, puis créez un appareil virtuel (par exemple un Pixel récent) avec une image système **avec les Play Services**.

::: details L'émulateur ne démarre pas ?
L'émulateur a besoin de la virtualisation matérielle. Si elle est désactivée, il faut l'activer dans le BIOS de votre ordinateur (option souvent nommée « Intel VT-x », « AMD-V » ou « SVM »). Sous Windows, vérifiez aussi que l'« Hyperviseur Windows » est activé dans les fonctionnalités Windows.
:::

### Valider avec un premier projet

C'est à vous de jouer ! Créez un nouveau projet avec le modèle **Empty Activity**, puis lancez-le sur l'émulateur avec le bouton ▶️.

::: tip Point de contrôle
L'émulateur démarre et affiche « Hello Android! ».
:::

## Le téléphone en mode développeur

Par défaut, un téléphone Android refuse qu'on y installe une application depuis un ordinateur. Il faut activer le mode développeur.

1. Sur le téléphone, ouvrez **Paramètres > À propos du téléphone**.
2. Appuyez **7 fois** sur **Numéro de build** (sur certains modèles, il se trouve dans un sous-menu « Informations sur le logiciel »). Un message vous confirme que vous êtes développeur.
3. Dans **Paramètres > Système > Options pour les développeurs**, activez le **Débogage USB**.
4. Branchez le téléphone et acceptez la demande d'autorisation qui s'affiche sur son écran.

::: tip Point de contrôle
Le téléphone apparaît dans la liste des appareils d'Android Studio, et l'application créée précédemment s'y lance.
:::

::: details Le téléphone n'apparaît pas ?
- Vérifiez que le câble transfère bien les données (certains câbles ne font que charger).
- Débranchez et rebranchez le téléphone, puis regardez son écran : la demande d'autorisation est peut-être en attente.
- Sous Windows, certains fabricants demandent un pilote USB spécifique : cherchez « pilote USB » suivi de la marque du téléphone.
- La commande `adb devices` (disponible dans le dossier `platform-tools` du SDK) liste les appareils détectés.
:::

## Docker

Docker permet de lancer des services (base de données, etc.) sans les installer sur votre machine. Pas de panique si vous ne le connaissez pas : nous l'utiliserons simplement pour démarrer des services déjà configurés.

1. Installez Docker en suivant l'[aide-mémoire Docker](/cheatsheets/docker/) (Docker Desktop sous Windows et macOS).
2. Lancez Docker Desktop et attendez qu'il indique qu'il est démarré.

::: tip Point de contrôle
Les deux commandes suivantes fonctionnent :

```sh
docker run --rm hello-world
docker compose version
```

:::

## Le test final : le dépôt du projet

Si votre formateur vous a donné accès à un dépôt, c'est le moment de vérifier que tout fonctionne ensemble.

```sh
git clone <adresse du dépôt fournie>
cd <dossier du dépôt>
./gradlew build
```

Sous Windows, utilisez `gradlew.bat build` à la place de `./gradlew build`.

::: warning Le premier build est long
Le premier lancement télécharge Gradle et toutes les dépendances du projet : comptez plusieurs minutes. Les lancements suivants seront beaucoup plus rapides.
:::

::: tip Point de contrôle
La commande se termine par `BUILD SUCCESSFUL`.
:::

## Récapitulatif

Avant le premier jour, vérifiez que vous pouvez cocher chaque ligne :

- [ ] `git --version` affiche une version, et vous avez accès au dépôt si nécessaire.
- [ ] `java -version` affiche une version 21.
- [ ] Une application de test se lance sur l'émulateur.
- [ ] La même application se lance sur votre téléphone.
- [ ] `docker run --rm hello-world` fonctionne.
- [ ] Le build du dépôt se termine par `BUILD SUCCESSFUL`.

Une case ne se coche pas ? Notez le message d'erreur exact (une capture d'écran suffit) et transmettez-le avant la formation : c'est beaucoup plus simple à régler en amont que le jour même.

👋 Si vous avez des questions, n'hésitez pas.
