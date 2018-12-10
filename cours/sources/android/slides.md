# Android

Par [Valentin Brosseau](https://github.com/c4software) / [Playmoweb](https://www.playmoweb.com)

---

## Introduction à Android

---

- Développé par Google
- Créé en 2008
- Actuellement en version 9.0 (Android Pie)

---

## Pourquoi Android

- Multi marques (Google, Samsung, Xiaomi, HTC, …)
- Part de marché
- Ouvert
- Personnalisable
- Le prix

---

## Les défauts d'Android

- La fragmentation
- Un Android ? Non… des Android!

---

## L'architecture

![Architecture](./img/android_architecture.jpg)

---

![Linux ?](./img/linux.gif)

Linux ?

---

## Android is not Linux

Construit autour du noyau Linux mais … C'est tout

- Noyau Linux : Drivers, Batterie, Ram.
- Runtime Android : Fait tourner les applications Android.
- App Framework : Android Framework (Android API).

---

## La sécurité

- Chaque application a son propre utilisateur Linux
- Les applications sont sandboxé
- Chaque application tourne dans sa propre VM.
- Chaque application à son cycle de vie.

---

## Les API

Intégré dans Android.

- SDK Android : Évolue lors des mises à jour de système.
- Play Service : Évolue automatiquement indépendemment de la version de l'OS (presque).

---

## Android Studio

- Java (ou Kotlin)
- Version spécial de Intelij

---

## L'interface

![Interface](./img/interface.png)

---

## Toolbar

![Interface](./img/interface.png)

---

## Logcat

![Interface](./img/logcat.png)

---

## Créer un émulateur

- Intégrer dans Android Studio.
- Performance suffisante pour tester.
- BLE / Bluetooth non disponible.

---

# Première application

---

- File > New > New Project
- Configurer le projet
- Lancer l'application sans aucune modification (dans un émulateur)

---

## C'est à vous

---

## Structure du projet

TODO (détail dossier, image structure)

---

## Debugger

- Point d'arrêt possible.
- Log.
- Log affiché dans le Logcat.

---

## Gradle

- Open-source.
- Script de compilation de votre projet.
- Complètement intégré dans Android Studio (complétion, etc…)

---

## Votre première application

- Activity
- Création d'un Layout associé
- Déclaration dans le Manifest

---

## L'activity

- Représente un seul écran.
- Gère tout ce qu'il y a dans l'écran.
- Gère la logique des intéractions utilisateurs.
- Possède son propre **cycle de vie**.

---

![Lifecycle](./img/lifecycle.png)

---

![Lifecycle 2](./img/lifecycle2.png)

---

- L'ensemble de vos activity hérite d'une super **Activity**.
- Override des méthode de base (au début uniquement onCreate)

---

## Un détail qui compte… Les layout

TODO

---

## Le fichier Manifest

- Déclare le nom de l'application.
- Déclare les activités.
- Déclare le thème de l'application.
- L'icône de l'application.
- Configuration de l'application (package…).
- Déclare les permissions.

---

## Permissions ?

![Permissions](./img/permissions.gif)

---

TODO
