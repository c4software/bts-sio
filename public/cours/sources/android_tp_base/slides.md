# Introduction à Android

## Avec Compose

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Une application Android

Un écran, des boutons, une liste…

Question : comment décrit-on une interface ?

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

Taille, marge, couleur, clic : tout passe par le `Modifier`.

- Disponible sur tous les composants.
- **Chaînable** : on enchaîne les modifications.

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

## Les ressources

- Les textes dans `strings.xml`, jamais en dur dans le code.
- Les images dans `drawable`.
- Des ressources alternatives : langue, thème sombre, taille d'écran…

---

## Plusieurs écrans

Un `NavHost`, et des `Screen`.

La navigation est une **pile** : `popBackStack()` retire l'écran du dessus.

---

## Question

Où ranger les données et la logique d'un écran ?

Dans le composant ?

---

## MVVM

- **Model** : les données (`data class`).
- **View** : l'interface (nos composants).
- **ViewModel** : la logique, qui fait le lien entre les deux.

Le ViewModel ne connaît **pas** la vue.

---

## Le ViewModel

```kotlin
class Screen3ViewModel: ViewModel() {
    val listFlow = MutableStateFlow(listOf<String>())

    fun addElement(element: String) {
        listFlow.value += element
    }
}
```

---

## La vue observe

```kotlin
val list by viewModel.listFlow.collectAsStateWithLifecycle()
```

Le flow change, le composant est mis à jour. Automatiquement.

---

## Les permissions

Caméra, localisation, Bluetooth… : l'application doit **demander**.

- Dans l'`AndroidManifest.xml`.
- Puis à l'utilisateur, pendant l'exécution.

---

## Récapitulatif

- **Compose** : l'interface écrite en Kotlin, de façon déclarative.
- Des **composants** imbriqués, ajustés avec le `Modifier`.
- Un **état** observé : il change, l'interface suit.
- Un `NavHost` pour passer d'un écran à l'autre.
- **MVVM** : la logique dans le ViewModel, l'affichage dans la vue.

---

## Des questions ?

Place au TP 🚀
