---
description: "Un hello world iPhone en Flutter, compilé et installé depuis la dev-box (Linux), sans Mac ni Xcode."
---

# iOS sans Mac : hello world en Flutter

::: details Sommaire
[[toc]]
:::

## Introduction

Après [le hello world en Swift](./swift.md), changeons d'approche : **Flutter**, le framework de Google, permet d'écrire **une seule application** pour Android, iOS et le Web, dans un seul langage, le **Dart**.

Sur un Mac, `flutter build ios` s'appuie sur Xcode. Ici, pas de Xcode : omarchy-apple-dev fournit des scripts qui font le même travail sous Linux. Il y a une étape de préparation un peu longue, mais une fois faite, compiler pour iOS ne prend qu'une minute.

Nous allons construire le même écran que dans le TP Swift : un titre, un sous-titre et un compteur.

## Prérequis

- La dev-box prête pour iOS (version 1.63 ou plus) : le [support de préparation](./introduction.md) doit être terminé (`devbox ios status` affiche `SDK registered` et `Apple signed in`).
- Idéalement, avoir fait [le hello world en Swift](./swift.md) : il vérifie que toute la chaîne fonctionne.
- Environ **10 Go** de libre en plus : Flutter, le SDK Android qu'il installe avec lui, et surtout le compilateur Dart pour iOS (7 Go).

## Objectifs

À la fin de ce TP vous saurez :

- installer Flutter dans la dev-box, et le préparer pour iOS ;
- créer un projet Flutter et lire sa structure ;
- écrire un écran avec un état (`StatefulWidget`) ;
- compiler l'application pour iOS sous Linux et l'installer sur votre iPhone, avec `devbox-build.sh`.

## Installer Flutter

### Flutter

```bash
devbox dev-env flutter
```

Flutter installe aussi le SDK Android (et son JDK) : vous pourrez donc, avec le même projet, viser Android, iOS et le Web.

### La préparation pour iOS

C'est l'étape longue, mais elle n'est à faire **qu'une fois** (puis à chaque nouvelle version de Flutter) :

```bash
devbox pkg add llvm
~/.local/share/omarchy-apple-dev/flutter/setup.sh
```

Comptez environ **15 minutes** et **7 Go** : lancez-la, et lisez la suite pendant ce temps.

::: tip Que se passe-t-il derrière ?
Pour iOS, Flutter compile votre code Dart en code machine ARM à l'avance (« AOT », *ahead of time*), avec un outil nommé `gen_snapshot`. Problème : Google ne fournit ce compilateur **que pour macOS**.

`setup.sh` télécharge donc le code source du Dart SDK, à la version exacte qu'utilise votre Flutter, et compile `gen_snapshot` pour Linux. Il le place ensuite là où Flutter le cherche (l'original est gardé à côté, sous le nom `gen_snapshot_arm64.macos`).

`devbox pkg add llvm` installe les outils LLVM (`llvm-strip`, `llvm-lipo`, etc.) qui remplacent ceux de Xcode pendant la construction. Avec `devbox pkg`, ils sont réinstallés automatiquement après chaque mise à jour de la dev-box.
:::

Voici ce que font les scripts d'omarchy-apple-dev, comparé à un Mac :

| Étape | Sur un Mac | Dans la dev-box |
|---|---|---|
| Dart vers code ARM | `gen_snapshot`, version macOS | Le même compilateur, construit pour Linux par `setup.sh` |
| Assets, moteur Flutter | `flutter assemble`, lancé par Xcode | Le même `flutter assemble`, sans modification |
| L'application iOS autour (Runner) | Xcode | Swift Package Manager |
| Icônes, écran de lancement | `actool`, `ibtool` (Xcode) | Les versions Linux d'omarchy-apple-dev |
| Signature, installation | Xcode | xtool |

## Créer le projet

```bash
cd ~/projets
flutter create --platforms=ios,android --org fr.prenom.nom hello_flutter
cd hello_flutter
```

- `--platforms=ios,android` : les plateformes visées (ajoutez `web` si vous le souhaitez) ;
- `--org fr.prenom.nom` : le début du **bundle ID**. L'application s'appellera `fr.prenom.nom.helloFlutter` sur iOS. Pensez à mettre vos vrais prénom et nom (voir [le bundle ID](./introduction.md#le-bundle-id)).

::: warning Un nom en minuscules
Un projet Flutter (comme un paquet Dart) s'écrit en minuscules, avec des `_` : `hello_flutter`, pas `HelloFlutter` ni `hello-flutter`.
:::

### La structure du projet

```
hello_flutter/
├── pubspec.yaml       La description du projet et ses dépendances
├── lib/
│   └── main.dart      Votre code, commun à toutes les plateformes
├── android/           Le projet Android (Gradle), généré
├── ios/               Le projet iOS (Xcode), généré
└── test/              Les tests
```

Votre code est **entièrement** dans `lib/`. Les dossiers `android/` et `ios/` sont des coquilles qui accueillent l'application Flutter sur chaque plateforme : vous n'y toucherez que pour des réglages (nom de l'application, permissions, icône, etc.).

Question :

- Dans le TP Swift, le bundle ID était dans `project.yml` (`PRODUCT_BUNDLE_IDENTIFIER`). À votre avis, où est-il rangé dans un projet Flutter ?

::: details Réponse
Il est dans le projet Xcode généré, `ios/Runner.xcodeproj` (réglage `PRODUCT_BUNDLE_IDENTIFIER`), et pour Android dans `android/app/build.gradle.kts` (`applicationId`). `flutter create --org` les a remplis tous les deux.

Les scripts d'omarchy-apple-dev lisent le bundle ID, la version minimale d'iOS et le numéro de version directement dans ces fichiers et dans `pubspec.yaml`, comme le ferait Xcode.
:::

## Le code

Ouvrez `lib/main.dart` et remplacez **tout** son contenu par :

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const HelloApp());
}

class HelloApp extends StatelessWidget {
  const HelloApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Hello Flutter',
      theme: ThemeData(colorSchemeSeed: Colors.teal),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int compteur = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const FlutterLogo(size: 64),
            const SizedBox(height: 24),
            Text(
              'Bonjour BTS SIO 👋',
              style: Theme.of(context).textTheme.headlineLarge,
            ),
            const SizedBox(height: 24),
            const Text('Compilée sur Linux, dans la dev-box'),
            const SizedBox(height: 24),
            FilledButton(
              onPressed: () {
                setState(() {
                  compteur++;
                });
              },
              child: Text("J'ai été cliqué $compteur fois"),
            ),
          ],
        ),
      ),
    );
  }
}
```

En Flutter, **tout est widget** : l'application, la page, la colonne, le texte, l'espace entre deux éléments (`SizedBox`). Et encore une fois, vous allez retrouver vos marques :

| Flutter | SwiftUI | Compose |
|---|---|---|
| `Column(children: [ ])` | `VStack { }` | `Column { }` |
| `Text('…')` | `Text("…")` | `Text("…")` |
| `FilledButton(onPressed: …, child: …)` | `Button("…") { }` | `Button(onClick = …) { }` |
| `StatefulWidget` + `setState(() { … })` | `@State` | `remember { mutableStateOf() }` |
| `SizedBox(height: 24)` | `VStack(spacing: 24)` | `Spacer(Modifier.height(24.dp))` |
| `'$compteur'` | `"\(compteur)"` | `"$compteur"` |

Questions :

- Pourquoi `HelloApp` est-il un `StatelessWidget` alors que `HomePage` est un `StatefulWidget` ?
- Que se passe-t-il si vous écrivez `compteur++;` sans l'entourer de `setState` ?

::: details Réponse
`HelloApp` ne fait que décrire l'application (titre, thème, page d'accueil) : rien ne change, il n'a pas besoin d'état. `HomePage` contient le compteur, qui change à chaque clic : il lui faut un état, rangé dans la classe `_HomePageState`.

Sans `setState`, la variable `compteur` augmente bien… mais Flutter n'en sait rien et **ne redessine pas l'écran** : le bouton affiche toujours `0`. `setState` sert justement à prévenir Flutter que l'état a changé. C'est le rôle que joue `@State` en SwiftUI, et `mutableStateOf` en Compose.
:::

## Tester rapidement, sans iPhone

La compilation iOS se fait en mode « release » : pas de rechargement à chaud (*hot reload*). Pour mettre au point votre interface, le plus confortable est de la lancer dans le navigateur :

```bash
flutter create --platforms=web .
flutter run -d web-server --web-hostname 0.0.0.0 --web-port 8080
```

Ouvrez `http://localhost:8080` (pensez à ajouter le port `8080` dans votre `compose.override.yaml`, voir [Voir votre site depuis le navigateur](/cheatsheets/dev-box/#voir-votre-site-depuis-le-navigateur)), ou `http://dev-box:8080` avec Tailscale. Dans le terminal, `r` recharge l'application après une modification, `q` quitte.

Une fois satisfait, place à l'iPhone.

## Compiler pour iOS et installer

Comme pour les autres TP, la compilation se lance depuis **votre machine**, avec le script `devbox-build.sh` (voir [le support de préparation](./introduction.md#le-script-devbox-build-sh)). Placez-le à la racine du projet, à côté de `pubspec.yaml`. Dans un terminal de votre machine :

```bash
cd ~/dev-box/data/projets/hello_flutter
curl -fsSLO https://raw.githubusercontent.com/c4software/dev-box/main/scripts/devbox-build.sh
chmod +x devbox-build.sh
```

Rien à régler en tête du script : il reconnaît un projet Flutter à son `pubspec.yaml`, et appelle alors le script `flutter/build.sh` d'omarchy-apple-dev dans la dev-box (et non `devbox ios xcode`, qui ne sait pas construire un projet Flutter).

Branchez votre iPhone, déverrouillez-le, puis :

```bash
./devbox-build.sh
```

Le script compile le code Dart, assemble l'application iOS, puis l'installe sur l'appareil, par le câble. Avec `./devbox-build.sh build`, il s'arrête après la compilation et laisse l'application (non signée) dans `build/ios-linux/Runner.ipa`.

::: warning Pas de Wi-Fi pour Flutter
Pour un projet Flutter, le script ne connaît que `run`, `install` et `build`, et l'installation passe **uniquement par le câble** : `--wifi` n'est pas disponible.
:::

Avec un identifiant Apple gratuit, la première ouverture demande de faire confiance à votre compte : **Réglages, Général, VPN et gestion de l'appareil**, votre identifiant Apple, **Faire confiance**.

::: tip Point de contrôle
L'application « Hello Flutter » apparaît sur l'écran d'accueil de l'iPhone, s'ouvre, et le compteur augmente à chaque clic.
:::

::: details Ça ne fonctionne pas ?

- `missing: llvm-strip …` : `devbox pkg add llvm` n'a pas été fait.
- `not the Linux build` : Flutter a été mis à jour et a remis le compilateur macOS. Relancez `flutter/setup.sh`.
- `no darwin SDK bundle` : le SDK iOS n'est pas prêt, revoyez [le support de préparation](./introduction.md#le-sdk-ios).
- Aucun appareil trouvé : `devbox ios devices` doit lister votre iPhone (voir [Relier l'iPhone à la dev-box](./introduction.md#relier-l-iphone-a-la-dev-box)).

Le détail de chaque script est dans `flutter/README.md`, dans `~/.local/share/omarchy-apple-dev`.
:::

Et Android ? Le même code s'installe sur un téléphone Android avec `flutter build apk`, puis l'APK de `build/app/outputs/flutter-apk/`. C'est tout l'intérêt de Flutter : **un seul `main.dart`** pour les deux.

## À vous de jouer

C'est à vous de jouer ! Comme dans le TP Swift, modifiez l'application pour que :

1. un champ de texte demande le prénom de l'utilisateur ;
2. le titre affiche « Bonjour Léa 👋 » quand le prénom est saisi, « Bonjour BTS SIO 👋 » sinon ;
3. un bouton « Remettre à zéro » remette le compteur à `0`, et soit grisé quand le compteur vaut déjà `0`.

Quelques pistes :

- `TextField(onChanged: (valeur) { … })` appelle votre fonction à chaque lettre saisie ;
- un bouton dont `onPressed` vaut `null` est automatiquement grisé ;
- `OutlinedButton` est un bouton plus discret que `FilledButton`.

Testez d'abord dans le navigateur, puis sur l'iPhone.

::: details Voir l'une des solutions possibles

Seule la classe `_HomePageState` change :

```dart
class _HomePageState extends State<HomePage> {
  int compteur = 0;
  String prenom = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const FlutterLogo(size: 64),
              const SizedBox(height: 24),
              Text(
                prenom.isEmpty ? 'Bonjour BTS SIO 👋' : 'Bonjour $prenom 👋',
                style: Theme.of(context).textTheme.headlineLarge,
              ),
              const SizedBox(height: 24),
              TextField(
                decoration: const InputDecoration(
                  labelText: 'Votre prénom',
                  border: OutlineInputBorder(),
                ),
                onChanged: (valeur) {
                  setState(() {
                    prenom = valeur;
                  });
                },
              ),
              const SizedBox(height: 24),
              FilledButton(
                onPressed: () {
                  setState(() {
                    compteur++;
                  });
                },
                child: Text("J'ai été cliqué $compteur fois"),
              ),
              const SizedBox(height: 12),
              OutlinedButton(
                onPressed: compteur == 0
                    ? null
                    : () {
                        setState(() {
                          compteur = 0;
                        });
                      },
                child: const Text('Remettre à zéro'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

:::

## Conclusion

Dans ce TP, vous avez :

- installé Flutter, et compilé le compilateur Dart pour iOS sous Linux (une fois pour toutes) ;
- créé un projet Flutter qui vise Android et iOS ;
- découvert les widgets, `StatefulWidget` et `setState` ;
- mis au point l'interface dans le navigateur, puis compilé et installé l'application sur l'iPhone avec `./devbox-build.sh`, qui appelle `flutter/build.sh` dans la dev-box.

Pensez à versionner votre projet (`git init`, le `.gitignore` est fourni par `flutter create`).

La suite : le même hello world avec [Kotlin Multiplateforme](./kmp.md), où le code partagé est écrit en Kotlin.

👋 Si vous avez des questions, n'hésitez pas.
