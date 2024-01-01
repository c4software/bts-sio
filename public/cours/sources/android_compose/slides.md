# Introduction à Android Compose

Par [Valentin Brosseau](https://github.com/c4software) / [Playmoweb](https://www.playmoweb.com)

---

## Créé par Google

### En 2019

---

## Objectifs remplacer le XML

- Plus simple.
- Plus rapide.
- Plus lisible.
- Développer plus vite.
- Penser réutilisation.
- Animation plus simple.

---

## À quoi ça ressemble ?

---

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ifwPCfRttMQ?si=Y3m3mJB8u1QvMAlo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

```kotlin
@Composable
fun Greeting(name: String) {
    Text(text = "Hello $name!")
}
```

---

## Repose sur une approche composant

### Comme SwiftUI, Flutter… ou encore VueJS, React…

---

Le composant est un principe de base de la conception d'interface utilisateur en 2023.

---

## Un composant c'est quoi ?

### À votre avis ?

---

- Un morceau d'interface.
- Réutilisable.
- Interactif.
- Indépendant.
- Imbriquable.

---

![Composant](./res/components-1.png)

---

Des briques de base d'une interface.

---

## Compose

- Librairie Kotlin à part entière.
- Remplace le XML pour les interfaces.
- Utilise un moteur de rendu (Skia).

---

## Un moteur de rendu ?

---

<iframe src="https://giphy.com/embed/a5viI92PAF89q" width="480" height="331" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

---

## Utilisable sur :

- Android (Maintenu par Google).
- Desktop (Compose Multiplatform).
- iOS (Compose Multiplatform).
- Web (Compose Multiplatform, mais expérimental).

---

## Compose Multiplatform

- Maintenu par JetBrains.
- Fonctionne sur plusieurs plateformes.
- Intègre le fonctionnement natif de chaque plateforme.

[En savoir plus](https://www.jetbrains.com/lp/compose-multiplatform/)

---

## Revenons à Android

- Compose est la nouvelle façon de faire des interfaces.
- Poussé par Google.
- En cours de développement.
- En cours d'adoption par les entreprises.

---

Change la façon de faire des interfaces. Et **uniquement** ça.

(Nous avons toujours besoin de Kotlin, de Java, de Gradle, de l'Android SDK, etc.)

---

## Le fonctionnement

- Chaque composant est une fonction.
- Mis à jour en fonction de l'état de l'écran.
- Mise à jour automatique et temps réel.

---

## Un exemple

---

```kotlin
var counter by remember { mutableStateOf(0) }
Button(onClick = { counter++ }) {
    Text("Clique => ${counter}")
}
```

Qu'observez-vous ? Comment ça fonctionne ?

---

## Un autre exemple

---

```kotlin
var isLogin by remember { mutableStateOf(false) }
if (isLogin) {
    Text("Bienvenue")
} else {
    Button(onClick = { isLogin = true }) {
        Text("Se connecter")
    }
}
```

Qu'observez-vous ? Comment ça fonctionne ?

---

## Quelques composants de base

---

## La structure

- `Column` : Alignement vertical.
- `Row` : Alignement horizontal.
- `Box` : Alignement libre.

---

## Les interactions

- `Button` : Un bouton.
- `TextField` : Un champ de texte.
- `Checkbox` : Une case à cocher.
- `Switch` : Un interrupteur.
- `Text` : Un texte.
- …

---

Beaucoup de composants sont déjà disponibles.

[https://developer.android.com/jetpack/compose/components](https://developer.android.com/jetpack/compose/components)

---

Repose sur le material design

[https://m3.material.io/](https://m3.material.io/)

---

## Un exemple

```kotlin
Column {
    Text("Hello")
    Text("World")
}
```

---

## Un exemple

```kotlin
Row {
    Text("Hello")
    Text("World")
}
```

---

## Un exemple

```kotlin
Column {
    Row {
        Text("Hello")
        Text("World")
    }
    Row {
        Text("Hello")
        Text("World")
    }
}
```

---

## La réactivité

- Des variables d'état (Boolean, Int, String, etc.).
- Mais via des `Proxy` (MutableState, MutableStateFlow, etc.).

Ce sont des variables qui peuvent être modifiées et qui vont déclencher une mise à jour de l'interface.

---

```kotlin
var counter by remember { mutableStateOf(0) }
var items by remember { mutableStateOf(listOf("A", "B", "C")) }
// ...
```

S'utilise comme une variable normale.

---

## Les traductions

```kotlin
Text(stringResource(R.string.hello))
```

Comme sur Android classique. Le fichier `strings.xml` est toujours utilisé.

---

## Les animations

```kotlin
var counter by remember { mutableStateOf(0) }

Column {
    Button(onClick = { counter++ }) {
        Text("Action")
    }

    AnimatedVisibility(visible = counter > 0) {
        Text("Visible")
    }

    AnimatedContent(targetState = count) { targetState ->
        Text(text = "Count: $targetState")
    }
}
```

---

## L'organisation du code est différente (mais similaire).

- Similaire à Android (Par écran et package).
- Découpage de la logique et de l'interface (MVVM).

---

## Le ViewModel

- Le code qui gère la logique.
- Intéragit avec les données seulement.
- Ne gère pas l'interface.
- Peut-être testé ou remplacé sans toucher à l'interface.

---

<iframe src="https://giphy.com/embed/3s39mJ7zXU94mfAq4W" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

---

Ça fait beaucoup de choses à apprendre.

---

Nous allons pratiquer ensemble.

---

Une dernière chose…

---

Jetpack Compose c'est jeune.

Il faut donc accepter que ça évolue vite / change / sois instable.

---

Pour nous accompagner dans cette transition, Google a créé :

[Accompanist](https://github.com/google/accompanist)

---

Accompanist est voué à disparaître. Car les fonctionnalités seront intégrées à Compose.

---

## Les ressources

- [Compose](https://developer.android.com/jetpack/compose)
- [Accompanist](https://github.com/google/accompanist)
- [Compose Multiplatform](https://www.jetbrains.com/lp/compose-multiplatform/)
- [Les composants](https://developer.android.com/jetpack/compose/components)
- [Material Design](https://m3.material.io/)

---

## Place à la pratique

[Le TP d'introduction à Compose](https://cours.brosseau.ovh/tp/composants/android.html)

---