# Android Compose

## Les écrans, les données et le MVVM

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Où en sommes-nous ?

Un écran, des composants, un état qui pilote l'affichage.

Question : et quand l'application a plusieurs écrans ?

---

## Plusieurs écrans

Un `NavHost`, et des `Screen`.

Chaque `Screen` est un composant comme les autres.

---

## Une pile

Chaque navigation **empile** un écran.

`popBackStack()` retire celui du dessus : c'est le bouton « retour ».

---

## Des callbacks partout

```kotlin
composable("screen1") {
    Screen1(goToScreen2 = { name -> navController.navigate("screen2/$name") })
}
```

L'écran ne sait pas où il va : il appelle l'action qu'on lui a donnée.

---

## Le Scaffold

La structure de base d'un écran :

- `TopAppBar` : la barre du haut.
- `FloatingActionButton` : le bouton flottant.
- `BottomAppBar`, `SnackbarHost`…

Chaque élément est optionnel.

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

## Un Flow

Une donnée qui peut être **modifiée**, et **observée**.

Le ViewModel écrit dedans avec `.value`.

---

## La vue observe

```kotlin
val list by viewModel.listFlow.collectAsStateWithLifecycle()
```

Le flow change, le composant est recomposé. Automatiquement.

---

## La liste

```kotlin
LazyColumn(modifier = Modifier.fillMaxSize()) {
    items(list) { item ->
        Text(item)
    }
}
```

Seuls les éléments visibles sont affichés : dix ou dix mille, peu importe.

---

## Question

Votre application veut utiliser le Bluetooth.

Qui décide ?

---

## L'utilisateur

- Les permissions sont **déclarées** dans l'`AndroidManifest.xml`.
- Puis **demandées** à l'utilisateur, pendant l'exécution.

Elles changent selon la version d'Android.

---

## Récapitulatif

- Un `NavHost` et une pile d'écrans.
- Le `Scaffold` pour structurer chaque écran.
- **MVVM** : la logique dans le ViewModel, l'affichage dans la vue.
- Un `Flow` modifié d'un côté, observé de l'autre.
- Des **permissions** déclarées, puis demandées.

---

## Des questions ?

Place au TP 🚀
