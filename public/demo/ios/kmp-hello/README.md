# Hello KMP

Le projet du [TP Kotlin Multiplateforme](https://cours.brosseau.ovh/tp/ios/kmp.html) : une application iOS dont l'écran est écrit en Kotlin avec Compose Multiplatform, construite et installée sur un iPhone depuis Linux, avec la [dev-box](https://github.com/c4software/dev-box).

- `shared/` : le code Kotlin partagé (`commonMain`), et la partie propre à iOS (`iosMain`).
- `iosApp/` : l'application iOS autour (le point d'entrée en Swift, le projet Xcode), et le script `devbox-build.sh`.

## Une fois, dans la dev-box

```bash
devbox dev-env ios       # l'environnement iOS
devbox dev-env java      # Gradle, pour la partie Kotlin
devbox ios               # le SDK depuis le .xip de Xcode, puis la connexion à votre compte Apple
devbox ios devices       # l'iPhone branché : répondez « Se fier » sur l'appareil, puis relancez
```

Un identifiant Apple gratuit suffit (mode `1` de la connexion), avec le câble. Tout est détaillé dans `devbox help ios` et dans le [support de préparation](https://cours.brosseau.ovh/tp/ios/introduction.html).

## À chaque fois, depuis votre machine

Le projet doit être dans le dossier des projets de la dev-box (`~/dev-box/data/projets` par défaut).

```bash
cd iosApp
./devbox-build.sh            # framework Kotlin, application, signature, installation et lancement
./devbox-build.sh build      # compile seulement
./devbox-build.sh logs       # les logs de l'application
./devbox-build.sh status     # l'état de la dev-box : SDK, connexion Apple, appareils
./devbox-build.sh --help     # toutes les étapes et options
```

Changez le bundle ID (`PRODUCT_BUNDLE_IDENTIFIER` dans `iosApp/Configuration/Config.xcconfig`) pour le vôtre : `fr.<prenom>.<nom>.HelloKmp`.
