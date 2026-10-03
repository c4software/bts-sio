# Android Compose

## Créer une interface dynamique

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Le projet du jour

Une liste, et une vue de détail.

Simple, mais suffisant pour comprendre les **composants**.

---

## Question

Dix cartes identiques dans une liste.

Vous écrivez dix fois le même code ?

---

## Un composant

Un morceau d'interface, écrit **une fois**, réutilisé partout.

Le même principe que dans le développement web.

---

## Pas de classe !

```kotlin
@Composable
fun ElementList(
    title: String = "Mon titre",
    content: String = "Mon contenu",
    image: Int? = R.drawable.ic_launcher_foreground,
    onClick: () -> Unit = {}
) { … }
```

Un composant est une **fonction**. Ses paramètres le personnalisent.

---

## La preview

`@Preview` : voir le composant directement dans Android Studio.

Sans lancer l'application sur un téléphone.

---

## L'utiliser

```kotlin
LazyColumn {
    items(myData) { item ->
        ElementList(title = item) {
            // Code appelé lors du clic sur un élément de la liste.
        }
    }
}
```

Une liste : le composant est répété pour chaque élément.

---

## Question

L'utilisateur touche une carte.

Comment afficher le détail ?

---

## Une variable d'état

```kotlin
var selectedItem by remember { mutableStateOf<String?>(null) }
```

Elle change, l'interface se met à jour : c'est la **réactivité**.

---

## Une simple condition

```kotlin
if (selectedItem != null) {
    // Le détail
} else {
    // La liste
}
```

Pas d'écran à « rafraîchir » : vous décrivez quoi afficher, et quand.

---

## Des données structurées

```kotlin
data class CardContent(
    val title: String,
    val content: String,
    @DrawableRes val image: Int?
)
```

Une `data class` : une classe faite pour porter des données.

---

## Découper encore

Un paramètre peut être une valeur, une action… ou un **composant**.

La `TopAppBar` devient, elle aussi, votre composant.

---

## Récapitulatif

- Un composant = une fonction `@Composable`.
- Ses **paramètres** le rendent réutilisable.
- `LazyColumn` pour les listes.
- Un **état** (`mutableStateOf`) : il change, l'interface suit.
- Une `data class` pour structurer les données.

---

## Des questions ?

Place au TP 🚀
