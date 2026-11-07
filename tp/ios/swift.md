---
description: "Un hello world iPhone en Swift et SwiftUI, compilé et installé depuis la dev-box (Linux) avec xtool, sans Mac."
---

# iOS sans Mac : hello world en Swift

::: details Sommaire
[[toc]]
:::

## Introduction

Dans [le support précédent](./introduction.md), nous avons préparé la dev-box : SDK iOS, compte Apple, iPhone relié. Place à la première application !

Nous commençons par **Swift**, le langage d'Apple, avec **SwiftUI**, sa façon moderne de construire des interfaces. Vous connaissez Jetpack Compose ? Bonne nouvelle : SwiftUI repose exactement sur les mêmes idées. Vous allez retrouver vos marques très vite.

Voici ce que nous allons construire :

![L'application Swift sur l'iPhone, au lancement puis après trois clics](./res/swift_app.png)

## Prérequis

- La dev-box prête pour iOS : le [support précédent](./introduction.md) doit être terminé, `devbox ios status` doit afficher `SDK registered` et `Apple signed in`.
- Avoir déjà écrit une interface avec Compose (par exemple dans [Découverte des bases d'Android](/tp/android/compose/android-base.md)) : ce n'est pas obligatoire, mais les comparaisons vous parleront davantage.

## Objectifs

À la fin de ce TP vous saurez :

- créer un projet iOS avec xtool ;
- lire la structure d'un projet SwiftUI ;
- écrire une vue avec un état (`@State`) ;
- compiler, signer et installer l'application sur votre iPhone, depuis Linux.

## Créer le projet

Dans la dev-box, placez-vous dans votre dossier de projets, puis créez l'application :

```bash
cd ~/projets
xtool new Hello
```

```
Creating package: Hello
Creating Package.swift
Creating xtool.yml
Creating .gitignore
Creating Sources/Hello/HelloApp.swift
Creating Sources/Hello/ContentView.swift

Finished generating project Hello. Next steps:
- Enter the directory with `cd Hello`
- Build and run with `xtool dev`
```

Et voilà, le projet est créé. Ouvrez le dossier `~/dev-box/data/projets/Hello` dans VSCode (ou restez dans Neovim, dans la dev-box) : c'est le même dossier, vu des deux côtés.

### La structure du projet

```
Hello/
├── Package.swift          La description du projet (Swift Package Manager)
├── xtool.yml              Le bundle ID de l'application
└── Sources/
    └── Hello/
        ├── HelloApp.swift     Le point d'entrée de l'application
        └── ContentView.swift  Le premier (et seul) écran
```

Sur un Mac, Xcode aurait créé un dossier `Hello.xcodeproj` plein de fichiers illisibles. Ici, tout est en texte simple : un avantage énorme pour Git.

::: tip Que se passe-t-il derrière ?
`Package.swift` est l'équivalent du `build.gradle.kts` d'Android : il décrit le projet, la version minimale d'iOS (`.iOS(.v17)`) et les dépendances. C'est le format de **Swift Package Manager**, l'outil officiel de Swift, qui fonctionne aussi bien sur Mac que sous Linux.
:::

### Le bundle ID

Ouvrez `xtool.yml` :

```yaml
version: 1
bundleID: com.example.Hello
```

Comme expliqué dans [le support précédent](./introduction.md#le-bundle-id), `com.example.Hello` sera refusé par Apple dès qu'une deuxième personne l'utilisera. Remplacez-le par le vôtre :

```yaml
version: 1
bundleID: fr.prenom.nom.hello
```

## Le code

### Le point d'entrée

Ouvrez `Sources/Hello/HelloApp.swift` :

```swift
import SwiftUI

@main
struct HelloApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

- `@main` indique **où démarre l'application**, comme le `MainActivity` déclaré dans le `AndroidManifest.xml`.
- `WindowGroup` est la fenêtre de l'application ; elle affiche `ContentView`, notre écran.

Rien à modifier ici.

### L'écran

Ouvrez `Sources/Hello/ContentView.swift` et remplacez son contenu par :

```swift
import SwiftUI

struct ContentView: View {
    @State private var compteur = 0

    var body: some View {
        VStack(spacing: 24) {
            Image(systemName: "iphone")
                .font(.system(size: 64))
                .foregroundStyle(.tint)

            Text("Bonjour BTS SIO 👋")
                .font(.largeTitle)
                .bold()

            Text("Compilée sur Linux, dans la dev-box")
                .foregroundStyle(.secondary)

            Button("J'ai été cliqué \(compteur) fois") {
                compteur += 1
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
```

Prenez quelques minutes pour lire ce code. Si vous avez fait du Compose, la ressemblance est frappante :

| SwiftUI | Jetpack Compose | Rôle |
|---|---|---|
| `struct ContentView: View` | `@Composable fun ContentView()` | Un composant d'interface |
| `VStack { }` | `Column { }` | Empile les éléments verticalement |
| `HStack { }` | `Row { }` | Les aligne horizontalement |
| `Text("…")` | `Text("…")` | Affiche un texte |
| `Button("…") { action }` | `Button(onClick = { action }) { Text("…") }` | Un bouton |
| `@State private var compteur = 0` | `var compteur by remember { mutableStateOf(0) }` | Un état : quand il change, l'écran se redessine |
| `.padding()`, `.font(…)` | `Modifier.padding()`, `style = …` | La mise en forme |
| `"\(compteur)"` | `"$compteur"` | Insérer une variable dans un texte |

Questions :

- Que se passe-t-il, concrètement, quand vous cliquez sur le bouton ?
- Et si vous retiriez `@State` devant `compteur` ?

::: details Réponse
Au clic, `compteur += 1` modifie l'état. SwiftUI détecte le changement et **recalcule `body`** : le texte du bouton est redessiné avec la nouvelle valeur. C'est exactement la recomposition de Compose.

Sans `@State`, le code ne compile même pas : une `struct` SwiftUI ne peut pas modifier ses propres propriétés. `@State` demande à SwiftUI de stocker la valeur **en dehors** de la vue, et de redessiner l'écran à chaque modification.
:::

::: tip Les images « systemName »
`Image(systemName: "iphone")` utilise les **SF Symbols**, plus de 6 000 icônes fournies par iOS : rien à télécharger. La liste complète est dans l'application [SF Symbols](https://developer.apple.com/sf-symbols/) d'Apple (sur Mac).
:::

## Compiler

Avant d'envoyer l'application sur l'iPhone, vérifions qu'elle compile :

```bash
cd ~/projets/Hello
xtool dev build
```

```
[86 / 98] Hello
[94 / 98] Hello
[97 / 98] Hello-App-product
Build complete! (4.92 secs)
Wrote to /home/dev/projets/Hello/xtool/Hello.app
```

La première compilation prend quelques minutes (Swift compile tout ce dont l'application a besoin), les suivantes quelques secondes.

::: tip Point de contrôle
Vous devez obtenir `Build complete!` et un dossier `xtool/Hello.app`.

Une erreur ? Lisez-la attentivement : le compilateur Swift indique le fichier, la ligne, et souvent la correction à apporter.
:::

Question :

- `Hello.app` est un **dossier**, pas un fichier. À votre avis, que contient-il ?

::: details Réponse
Une application iOS est un « bundle » : un dossier qui contient le programme compilé (pour le processeur ARM de l'iPhone), le fichier `Info.plist` (le bundle ID, la version, le nom affiché, etc.) et les ressources (images, traductions). Allez voir avec `ls xtool/Hello.app` ou dans `yazi`.

Pour l'installer, ce dossier est signé puis compressé dans un fichier `.ipa`, l'équivalent du `.apk` d'Android.
:::

## Installer sur l'iPhone

Branchez votre iPhone, déverrouillez-le, puis :

```bash
xtool dev
```

Cette seule commande compile, **signe** l'application avec votre compte Apple, puis l'installe sur l'appareil. L'icône « Hello » apparaît sur l'écran d'accueil.

La première fois, l'iPhone refuse d'ouvrir l'application (« Développeur non approuvé ») : il ne connaît pas encore votre compte. Allez dans **Réglages, Général, VPN et gestion de l'appareil**, choisissez votre identifiant Apple, puis **Faire confiance**. Lancez l'application : votre hello world s'affiche 🎉

![L'application Swift sur l'iPhone, au lancement puis après trois clics](./res/swift_app.png)

::: tip Point de contrôle
L'application s'ouvre sur l'iPhone, et le compteur augmente à chaque clic.
:::

::: warning Une signature de 7 jours
Avec un identifiant Apple gratuit, la signature ne dure que **7 jours** : passé ce délai, l'application ne s'ouvre plus. Pas de panique, il suffit de relancer `xtool dev` pour la renouveler.
:::

::: details Voir les logs de l'application
`xtool dev` installe l'application, mais ne la lance pas. `device-run.sh` (fourni par omarchy-apple-dev) fait la même chose, puis lance l'application et affiche ses logs, comme le Logcat d'Android Studio :

```bash
device-run.sh
```

Un `print("Clic !")` dans l'action du bouton s'affichera ici à chaque clic.
:::

## À vous de jouer

C'est à vous de jouer ! Modifiez l'application pour que :

1. un champ de texte demande le prénom de l'utilisateur ;
2. le titre affiche « Bonjour Léa 👋 » quand le prénom est saisi, « Bonjour BTS SIO 👋 » sinon ;
3. un bouton « Remettre à zéro » remette le compteur à `0`, et soit grisé quand le compteur vaut déjà `0`.

Quelques pistes :

- un champ de texte s'écrit `TextField("Votre prénom", text: $prenom)`. Le `$` donne au champ un **lien** vers l'état `prenom`, pour qu'il puisse le modifier (c'est le `value` / `onValueChange` de Compose, en une seule fois) ;
- un bouton se grise avec `.disabled(condition)` ;
- `Button("…", role: .destructive) { }` affiche un bouton en rouge, pour une action « dangereuse ».

![La solution de l'exercice sur l'iPhone](./res/swift_exercice.png)

::: details Voir l'une des solutions possibles

```swift
import SwiftUI

struct ContentView: View {
    @State private var compteur = 0
    @State private var prenom = ""

    var body: some View {
        VStack(spacing: 24) {
            Image(systemName: "iphone")
                .font(.system(size: 64))
                .foregroundStyle(.tint)

            Text(prenom.isEmpty ? "Bonjour BTS SIO 👋" : "Bonjour \(prenom) 👋")
                .font(.largeTitle)
                .bold()

            TextField("Votre prénom", text: $prenom)
                .textFieldStyle(.roundedBorder)

            Button("J'ai été cliqué \(compteur) fois") {
                compteur += 1
            }
            .buttonStyle(.borderedProminent)

            Button("Remettre à zéro", role: .destructive) {
                compteur = 0
            }
            .disabled(compteur == 0)
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
```

:::

## Conclusion

Dans ce TP, vous avez :

- créé un projet iOS avec `xtool new`, sans Xcode ;
- découvert SwiftUI, et ses nombreux points communs avec Compose (`VStack`, `@State`, etc.) ;
- compilé l'application sous Linux avec `xtool dev build` ;
- signé et installé l'application sur votre iPhone avec `xtool dev`.

Pensez à versionner votre projet : `git init`, puis un premier commit (le `.gitignore` est déjà fourni par xtool).

La suite : le même hello world, cette fois avec [Flutter](./flutter.md), puis avec [Kotlin Multiplateforme](./kmp.md).

👋 Si vous avez des questions, n'hésitez pas.
