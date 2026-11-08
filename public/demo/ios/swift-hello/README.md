# Hello

Le projet du [TP Swift](https://cours.brosseau.ovh/tp/ios/swift.html) : un hello world en SwiftUI, décrit par `project.yml` ([XcodeGen](https://github.com/yonaskolb/XcodeGen)), construit et installé sur un iPhone depuis Linux, avec la [dev-box](https://github.com/c4software/dev-box).

- `Sources/` : le code Swift (`HelloApp.swift`, le point d'entrée, et `ContentView.swift`, l'écran).
- `project.yml` : la description de l'application (nom, bundle ID, version d'iOS).
- `devbox-build.sh` : le script qui demande à la dev-box de tout faire.

## Une fois, dans la dev-box

```bash
devbox dev-env ios       # l'environnement iOS
devbox ios               # le SDK depuis le .xip de Xcode, puis la connexion à votre compte Apple
devbox ios devices       # l'iPhone branché : répondez « Se fier » sur l'appareil, puis relancez
```

Un identifiant Apple gratuit suffit (mode `1` de la connexion), avec le câble. Tout est détaillé dans `devbox help ios` et dans le [support de préparation](https://cours.brosseau.ovh/tp/ios/introduction.html).

## À chaque fois, depuis votre machine

Le projet doit être dans le dossier des projets de la dev-box (`~/dev-box/data/projets` par défaut).

```bash
./devbox-build.sh            # compile, signe, installe et lance l'application
./devbox-build.sh build      # compile seulement
./devbox-build.sh logs       # les logs de l'application
./devbox-build.sh status     # l'état de la dev-box : SDK, connexion Apple, appareils
./devbox-build.sh --help     # toutes les étapes et options
```

Changez le bundle ID (`PRODUCT_BUNDLE_IDENTIFIER` dans `project.yml`) pour le vôtre : `fr.<prenom>.<nom>.hello`.
