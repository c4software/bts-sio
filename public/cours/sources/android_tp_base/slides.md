# Introduction à Android

## Avec Compose

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Android

Une plateforme mobile, développée par Google, qui repose sur un noyau **Linux**.

- **Kotlin** : le langage.
- **Gradle** : l'outil de build.
- **Android SDK**, **Jetpack**, **Compose** : les bibliothèques.

---

## Question

Vous installez une application inconnue.

Peut-elle lire les données des autres applications ?

---

## Non

- Chaque application est **isolée** (sandbox).
- L'accès aux ressources passe par des **permissions**.
- L'application est **signée** : elle n'a pas été modifiée depuis sa publication.

---

## Un projet Android

- `app` : le code source et les ressources.
- `res` : les images, les textes, les icônes.
- `gradle` : la configuration du build.

---

## L'AndroidManifest

La « carte d'identité » de l'application :

- son nom, son icône ;
- ses `activity` ;
- ses permissions.

---

## Question

Un écran, des boutons, une liste…

Comment décrit-on une interface ?

---

## Avant : du XML

Un fichier XML pour dessiner l'écran, du code pour le faire vivre.

Deux mondes à garder synchronisés.

---

## Maintenant : Compose

```kotlin
Column() {
    Text("Texte 1")
    Text("Texte 2")
    Text("Texte 3")
}
```

L'interface s'écrit **en Kotlin**. Vous décrivez ce que vous voulez voir.

---

## Trois principes

- **Déclaratif** : vous décrivez, Compose met à jour.
- **Composable** : une fonction qui produit un morceau d'interface.
- **Observation** : seuls les composants qui ont changé sont redessinés.

---

## Tout est composant

- `Text`, `Button`, `Image`… : ce qui s'affiche.
- `Column`, `Row`, `Box` : la disposition.
- Ils s'imbriquent les uns dans les autres.

---

## Un bouton

```kotlin
Button(onClick = { /* Code appelé lors du clic sur le bouton */ }) {
    Text("Mon bouton")
}
```

Une action, et un contenu… qui est lui-même un composant.

---

## Le Modifier

```kotlin
Text(
    text = "Hello World",
    modifier = Modifier.fillMaxWidth() // Remplit toute la largeur de l'écran
)
```

Taille, marge, couleur, clic : disponible partout, et **chaînable**.

---

## Le Material Design

Des composants prêts à l'emploi, qui intègrent les bonnes pratiques de Google.

Votre projet l'utilise déjà (version 3).

---

## Question

Votre application sort en Italie.

Combien de fichiers de code faut-il modifier ?

---

## Aucun

- Les textes vivent dans `strings.xml`, jamais en dur dans le code.
- Une **ressource alternative** par langue.
- Le même principe pour le thème sombre, la taille d'écran…

---

## Parler à l'utilisateur

- **Toast** : un message rapide, sans importance.
- **Snackbar** : un message en bas de l'écran, avec une action possible.
- **Dialog** : une fenêtre, pour confirmer ou saisir.

---

## Un Toast

```kotlin
// Récupération du context
val context = LocalContext.current

Toast.makeText(context, "Je suis un Toast", Toast.LENGTH_LONG).show();
```

Le `Context` : l'accès aux ressources et aux services du téléphone.

---

## Question

L'utilisateur clique.

Comment l'interface se met-elle à jour ?

---

## L'état

```kotlin
var showDialog by remember { mutableStateOf(false) }

if (showDialog) {
    // Afficher le Dialog
}
```

Compose **observe** la variable : quand elle change, l'interface est recomposée.

---

## Récapitulatif

- Android : des applications **isolées**, des permissions, un manifest.
- **Compose** : l'interface écrite en Kotlin, de façon déclarative.
- Des **composants** imbriqués, ajustés avec le `Modifier`.
- Les textes et les images dans les **ressources**.
- Un **état** observé : il change, l'interface suit.

---

## Des questions ?

Place au TP 🚀
