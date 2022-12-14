# Flutter, une liste et une API REST

Cet exemple montre comment utiliser Flutter pour créer une application récupérant des données via une API REST.

::: details Sommaire
[[toc]]
:::

## Présentation

L'application affiche une liste de films récupérés via une API REST. Lorsque l'on clique sur un élément de la liste, on accède à une page détaillée de l'élément (affichage d'une image).

<iframe width="560" height="315" src="https://www.youtube.com/embed/RgxA8u-oMBw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Prérequis

Pour pouvoir utiliser cet exemple, vous devez avoir installé Flutter sur votre machine.

## Installation de flutter

[Documentation officielle](https://flutter.dev/docs/get-started/install).

Vous pouvez utiliser la commande suivante pour vérifier que Flutter est bien installé :

```bash
flutter doctor
```

::: tip Pas de détail
Vous avez vu ces étapes lors des cours. Je ne vais donc pas entrer dans le détail de l'installation.
:::

## Récupération du code

Le code est disponible à l'adresse suivante : [c4software/flutter-list-sample](https://github.com/c4software/flutter-list-sample). 

- Je vous laisse cloner le projet. 

### Installation des dépendances

Pour installer les dépendances, vous devez lancer la commande suivante :

```bash
flutter pub get
```

### Lancement de l'application

Puis vous pouvez lancer l'application via la commande suivante :

```bash
flutter run
```

::: tip Être dans le bon répertoire
Évidemment, vous devez être dans le bon répertoire pour lancer l'application.
:::

## Le but du code

L'objectif de ce projet est de présenter une application simple Flutter qui implémente :

- Des tabs pour accéder au contenu.
- Une liste de « Image » en provenance d'une API.
- Une vue de détail.

## Organisation du code

Le code est organisé de la manière suivante :

- `lib/` : contient le code source de l'application
  - `main.dart` : point d'entrée de l'application.
  - `data/models/` : contient les modèles de données.
  - `data/services/` : contient les services de données (accès à l'API REST).
  - `ui/screens` : contient les pages de l'application.
  - `ui/widgets` : contient les widgets de l'application.

::: danger Attention

Tout comme l'approche MVC, l'organisation du code est très importante. il est important de séparer les différentes parties de l'application. Cela permet de mieux comprendre le code et de le maintenir plus facilement.

Le découpage en Widgets, Screens et Services est une approche très courante. C'est une approche que je **vous recommande** d'utiliser pour vos projets.

:::

## Le routeur

Le routeur permet de gérer les différentes pages de l'application. Il permet de définir les différentes routes de l'application et de gérer les transitions entre les pages.

Le routeur est utilisé dans le fichier `HomePageScreen.dart` :

```dart
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (context) => DetailsScreen(image: image),
  ),
);
```

Dans cet exemple, on utilise la méthode `push` pour ajouter une nouvelle page à la pile de navigation. La méthode `push` prend en paramètre un `MaterialPageRoute` qui permet de définir la page à ajouter à la pile de navigation. 

`DetailsScreen` est l'écran qui sera affiché. On lui passe en paramètre l'image à afficher. Il s'agit de l'élément sur lequel l'utilisateur a cliqué.