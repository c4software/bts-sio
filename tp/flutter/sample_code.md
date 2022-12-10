# Projet d'exemple Flutter

Cet exemple montre comment utiliser Flutter pour créer une application récupérant des données via une API REST.

::: details Sommaire
[[toc]]
:::

## Présentation

L'application affiche une liste de films récupérés via une API REST. Lorsque l'on clique sur un élément de la liste, on accède à une page détaillée de l'élément (affichage d'une image).

<iframe width="560" height="315" src="https://www.youtube.com/embed/tqNIVVX0mMY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Prérequis

Pour pouvoir utiliser cet exemple, vous devez avoir installé Flutter sur votre machine.

## Installation

[Documentation officielle](https://flutter.dev/docs/get-started/install).

Vous pouvez utiliser la commande suivante pour vérifier que Flutter est bien installé :

```bash
flutter doctor
```

## Utilisation

Le code est disponible à l'adresse suivante : [Github](https://github.com/c4software/flutter-list-sample). Vous pouvez cloner le projet et lancer l'application via la commande suivante :

```bash
flutter run
```

## Organisation du code

Le code est organisé de la manière suivante :

- `lib/` : contient le code source de l'application
  - `main.dart` : point d'entrée de l'application.
  - `data/models/` : contient les modèles de données.
  - `data/services/` : contient les services de données (accès à l'API REST).
  - `ui/screens` : contient les pages de l'application.
  - `ui/widgets` : contient les widgets de l'application.