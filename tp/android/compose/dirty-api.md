---
description: Dans cette page vous trouverez un exemple d'application Android utilisant Jetpack Compose.
tags: [Android, Compose, API, Rest, Retrofit]
---

# Android Compose, une liste et une API Rest

Dans cette page vous trouverez un exemple d'application Android utilisant Jetpack Compose et appellant une API Rest.

::: details Table des matières
[[toc]]
:::

::: warning Application d'apprentissage

Cette application est un exemple d'application Android utilisant Jetpack Compose et appelant une API Rest. Elle est destinée à être utilisée comme support de cours.

Dans un vrai projet, il est fortement recommandé d'utiliser une architecture MVVM, et de séparer les composants de l'application en plusieurs modules. Et surtout d'utiliser Jetpack Navigation pour la navigation entre les écrans.

:::

## Présentation

Cette application contient les éléments suivants :

- Une page d'accueil.
- Une page de liste, les données sont récupérées depuis une API (fichier `ApiService.kt`).
- Une page de détail affiche les données de l'élément sélectionné dans la liste.
- Une liste de photos, les données sont récupérées depuis une API (fichier `ApiService.kt`). Les photos sont affichées en utilisant la librairie Coil.
- Une page à propos affiche des informations sur l'application.

<iframe width="560" height="315" src="https://www.youtube.com/embed/hWCIqjsTJiw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Prérequis

Pour comprendre cette application, vous devez avoir des notions de :

- [Kotlin](https://kotlinlang.org/)
- [Android](https://developer.android.com/)
- [Jetpack Compose](https://developer.android.com/jetpack/compose)
- Suivi le TP [Android Compose, Une liste](/tp/composants/android.md)

## Récupération du code source

Vous pouvez récupérer le code source de cette application depuis le dépôt GitHub suivant :

- [Code source](https://github.com/c4software/project-compose-api-sample)

## Organisation du code source

Le code source de cette application est organisé de la manière suivante :

- `MainActivity.kt` : Activité principale de l'application.
- `screens/` : Contient les écrans de l'application.
- `screens/HomeScreen.kt` : Écran d'accueil.
- `screens/AboutScreen.kt` : Écran à propos.
- `screens/list/ListScreen.kt` : Écran de liste.
- `screens/list/ListViewModel.kt` : Logique métier de l'écran de liste, ici nous appelons l'API et gérons l'état de la liste (chargement, erreur, données).
- `screens/photos/PhotosScreen.kt` : Écran de liste de photos.
- `screens/photos/PhotosViewModel.kt` : Logique métier de l'écran de liste de photos, ici nous appelons l'API et gérons l'état de la liste (chargement, erreur, données).
- `data/ApiService.kt` : Service d'appel à l'API.
- `data/Enums.kt` : Énums utilisés dans l'application (état de la liste, état de la requête).
- `components/` : Contient les composants utilisés dans l'application.

Ce qu'il faut retenir c'est que nous découpons notre application en 3 parties :

- `screens` : Ce sont les écrans de l'application.
- `components` : Ce sont les composants utilisés dans les différents écrans
- `data` : C'est le code d'accès aux données (API, base de données, etc.)

## Le fichier `build.gradle`

Pour que notre application puisse fonctionner correctement, nous avons besoin des dépendances suivantes dans le fichier `build.gradle` :

```groovy
// ViewModel
implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:2.5.1"
implementation "androidx.lifecycle:lifecycle-viewmodel-compose:2.5.1"

// Appel API
implementation "com.squareup.retrofit2:retrofit:2.9.0"
implementation "com.squareup.retrofit2:converter-gson:2.9.0"

// Chargement des images via le réseau (coil)
implementation("io.coil-kt:coil-compose:2.2.2")
```

- Les dépendances `lifecycle-viewmodel-ktx` et `lifecycle-viewmodel-compose` sont nécessaires pour utiliser le ViewModel dans notre application. 
- Les dépendances `retrofit` et `converter-gson` sont nécessaires pour appeler l'API.

## Le `ApiService.kt`

Le fichier `ApiService.kt` contient le service d'appel à l'API. Il utilise la librairie [Retrofit](https://square.github.io/retrofit/) pour appeler l'API.

```kotlin
interface ApiService {
    @GET("todos")
    suspend fun getTodos(): List<Todo>

    @GET("photos")
    suspend fun getPhotos(): List<Photo>
}
```

Ici nous utilisons l'annotation `@GET` pour indiquer que nous faisons un appel `GET` sur l'URL `/todos`. Nous indiquons également que la méthode retourne une liste de `Todo`.

::: tip Pas de code ?

Et oui, c'est là tout l'intérêt de Retrofit, il génère le code pour nous. Nous n'avons pas à écrire le code pour appeler l'API, il suffit de définir l'interface et de l'utiliser. Magique !

:::

L'autre partie du code est la création de l'instance de `ApiService` :

```kotlin
companion object {
    var apiService: APIService? = null
    fun getInstance(): APIService {
        if (apiService == null) {
            apiService = Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build().create(APIService::class.java)
        }
        return apiService!!
    }
}
```

Nous utilisons le pattern `Singleton` pour créer une seule instance de `ApiService`. Nous utilisons également le pattern `Builder` pour créer l'instance de `Retrofit`.

Dans le code ci-dessus nous avons défini une constante `BASE_URL` qui contient l'URL de base de l'API. Nous utilisons cette constante pour définir l'URL de base de l'API. Nous indiquons également que nous utilisons `Gson` pour convertir les données reçues en `Todo`.

C'est ce morceau de code qui nous permet d'appeler l'API **et surtout** qui décodera les données reçues en JSON pour les transformer en `Todo` (dans notre cas).

Par la suite pour récupérer les données de l'API il suffit d'appeler la méthode `getTodos()` :

```kotlin
val todos = ApiService.getInstance().getTodos()
```

::: tip Compliqué ?

Pas tant que ça ! Avec l'habitude, cette gymnastique de créer un service d'appel à une API sera un jeu d'enfant pour vous.

:::

## La réactivité

En Kotlin les composants sont réactifs. Cela signifie que si une variable change, tous les composants qui utilisent cette variable seront mis à jour. Nous utilisons cette fonctionnalité pour mettre à jour l'écran de liste lorsque les données sont chargées depuis Internet.

Prenons l'exemple de la `Liste`. Premier point important, pour rendre le code lisible, celui-ci est découpé en deux fichiers :

- `ListScreen.kt` : Écran de liste
- `ListViewModel.kt` : Logique métier de l'écran de liste

Le fichier `ListScreen.kt` contient uniquement la partie graphique de l'écran de liste. Le fichier `ListViewModel.kt` contient la logique métier de l'écran de liste. Nous allons voir comment ces deux fichiers communiquent entre eux.

### Avant-propos : Le ViewModel

Le `ViewModel` est un découpage de l'application qui permet de séparer la logique métier de l'application de la partie graphique. Chaque écran de l'application aura son `ViewModel` qui contiendra la logique métier de l'écran. L'objectif ? Découper l'application en plusieurs parties et ainsi rendre le code plus lisible.

### Le fichier `ListViewModel.kt`

Le ViewModel contient donc la logique d'accès aux données, nous avons donc ici :

```kotlin
// Variables qui vont changer d'état lors du chargement des données
val itemsList = MutableStateFlow<List<Todo>>(emptyList())
val loadingState = MutableStateFlow<LOADING_STATES>(LOADING_STATES.LOADING)

// Récupération des éléments.
// On utilise un CoroutineScope pour pouvoir faire des appels réseaux
// sans bloquer le thread principal (c'est à dire l'interface)
fun getItems() {
    // On indique que les données sont en cours de chargement (chargement)
    loadingState.value = LOADING_STATES.LOADING

    // On lance une coroutine pour récupérer les données
    // Une coroutine est un thread qui va s'exécuter en parallèle du thread principal
    CoroutineScope(Dispatchers.IO).launch {
        try {
            // On récupère les données depuis l'API, c'est ici que l'on fait appel à l'API
            // Le résultat est stocké dans la variable itemsList, cette variable est réactive la vue sera mise à jour
            itemsList.value = APIService.getInstance().getTodos()

            // On indique que les données sont chargées (terminé)
            loadingState.value =LOADING_STATES.LOADED
        } catch (e: Throwable) {
            // En cas d'erreur
            // On indique qu'une erreur est survenue (erreur)
            loadingState.value = LOADING_STATES.ERROR
        }
    }
}
```

::: tip C'est presque générique !

Le code d'accès à la donnée est presque générique, il suffit de changer la méthode `getTodos()` pour récupérer les données depuis une autre source (préalablement créé dans l'APIService).

La gestion des états est toujours là même :

- J'indique que les données sont en cours de chargement.
- Je lance une coroutine pour récupérer les données.
- Je mets à jour une variable qui est réactive avec les données obtenues.
- J'indique que les données sont chargées.
- En cas d'erreur, j'indique qu'une erreur est survenue.

Nous avons une base réutilisable pour accéder à des données.

:::

### Le fichier `ListScreen.kt`

Nous avons ici la partie graphique. Les éléments qui seront affichés, nous avons cependant des éléments qui vont faire référence aux données à savoir :

```kotlin
fun ListScreen(viewModel: ListViewModel = viewModel()) {
    // ...
}
```

Le paramètre de la fonction `ListScreen` est un `ListViewModel`, il s'agit du `ViewModel` de l'écran de liste. Il nous permettra d'accéder à la logique métier de l'écran de liste.

#### L'écoute des données

Notre vue écoute des données, pour ça nous avons besoin de deux variables :

```kotlin
// Variable qui changeront d'état lors du chargement des données
val loadingState = viewModel.loadingState.collectAsState()
val items = viewModel.itemsList.collectAsState()
```

Ces deux variables sont « réactives », c'est-à-dire qu'elles seront mises à jour lorsqu'une donnée change. Nous utilisons la fonction `collectAsState()`. CollectAsState est une méthode qui nous permettra d'écouter les changements des données directement dans notre interface.

- loadingState : État du chargement des données (chargement, erreur, terminée).
- items : Liste des données (l'ensemble des données retournées par l'API).

Puis nous avons la demande de chargement des données :

```kotlin
// Récupération des éléments à afficher via le ViewModel
viewModel.getItems()
```

Ici nous appelons la méthode `getItems()` du `ViewModel` de l'écran de liste. Cette méthode va déclencher le chargement des données depuis l'API. Chargement qui permettra de mettre à jour les variables `loadingState` et `items`.

#### L'affichage des données

Une fois les données obtenues, nous allons les afficher dans l'interface :

```kotlin
when (loadingState.value) {
    LOADING_STATES.LOADING -> {
        // Affichage d'un loader
        Loader()
    }
    LOADING_STATES.LOADED -> {
        // Affichage de la liste
        ListItems(items = items.value) { selectedItem.value = it }
    }
    LOADING_STATES.ERROR -> {
        // Affichage d'un message d'erreur
        Error()
    }
    else -> {
        // Affichage d'un message d'erreur
        Error()
    }
}
```

Vous pouvez voir que nous avons 3 états possibles :

- `LOADING_STATES.LOADING`: Les données sont en cours de chargement.
- `LOADING_STATES.LOADED`: Les données ont été chargées avec succès.
- `LOADING_STATES.ERROR`: Une erreur est survenue lors du chargement des données.

Nous affichons donc un loader, la liste des données ou un message d'erreur en fonction de l'état. Grâce au découpage de l'interface en composants, notre code reste lisible et compréhensible, et est finalement très générique.

## Les énumérations (enums)

Écrire des énums est une bonne pratique pour définir des états. Nous pouvons ensuite utiliser ces énums pour définir l'état de notre application. C'est plus simple à lire et à comprendre que des `Boolean` ou des `Int`.

Dans ce projet nous avons défini 2 énums :

L'enum `LOADING_STATE` est utilisé pour définir l'état du chargement des données :

- `LOADING`: Les données sont en cours de chargement.
- `ERROR`: Une erreur est survenue lors du chargement des données.
- `SUCCESS`: Les données ont été chargées avec succès.

L'enum `STATES` est utilisé pour définir quel écran est actuellement affiché en fonction de la NavBar en bas de l'écran :

- `HOME`: Écran d'accueil.
- `LIST`: Écran de liste.
- `PHOTO`: Écran qui liste les photos.
- `ABOUT`: Écran d'informations sur l'application.

## Rappel sur les callbacks

En Kotlin un composant peut définir un paramètre de type `() -> Unit` pour définir un callback. Ce callback sera appelé au moment de l'utilisation par l'utilisateur. 

Par exemple, dans le composant, `ListItems` nous avons défini un callback `onItemClicked` :

```kotlin
@Composable
fun ListItem(item: String, onClick: () -> Unit) {
    Row(
        Modifier
            .fillMaxWidth()
            .clickable { onClick() }, verticalAlignment = Alignment.CenterVertically
    ) {
        Text(item, modifier = Modifier.padding(16.dp))
        Spacer(modifier = Modifier.weight(1f))
    }
}
```

Notre paramètre `onClick` est de type `() -> Unit`. Cela signifie que nous pouvons passer une fonction à ce paramètre. Ce qui nous permet de définir une action à effectuer lors du clic sur l'item.

```kotlin
ListItem(item = todo.title) {
    // Action à effectuer lors du clic sur l'item
}
```

::: tip Point syntaxe

Dans l'exemple ci-dessus, nous avons défini une fonction anonyme. Celle-ci est sortie de la liste des paramètres de la fonction `ListItem`. Nous pouvons également définir la fonction anonyme dans la liste des paramètres :

```kotlin
ListItem(item = todo.title, onClick = {
    // Action à effectuer lors du clic sur l'item
})
```

Les deux syntaxes sont correctes. En Kotlin il est préférable d'écrire la première syntaxe. Car elle est plus concise et plus lisible.

:::

## Les images (res, drawable)

Sur Android les ressources de type images sont stockées dans le dossier `res/drawable`. Nativement, Compose permet de charger les images depuis ce dossier. Pour charger des images depuis une ressource distante (par exemple une image stockée sur un serveur), nous allons utiliser une librairie tierce (Coil).

Voilà la procédure pour charger des images (locales et distantes).

### Les images locales

Android Compose permet de charger des images depuis un fichier localement présent dans votre applicaton (res/drawable). Pour charger une image depuis un fichier local, nous utilisons le composant `Image` :

```kotlin
Image(
    painter = painterResource(id = R.drawable.ic_launcher_foreground),
    contentDescription = "Logo",
)
```

::: tip Vous avez un exemple
Si vous voulez un exemple dans l'application de démo, vous pouvez regarder le fichier [`Home.kt`](https://github.com/c4software/project-compose-api-sample/blob/main/app/src/main/java/com/example/exemplecomposelisteapi/screens/HomeScreen.kt) dans le dossier `screens`.
:::

### Les images distantes

Pour charger une ressource distante, nous allons utiliser une librairie tierce. Nous allons utiliser la librairie [Coil](https://github.com/coil-kt/coil#jetpack-compose).

Pour ajouter la librairie, il suffit d'ajouter la dépendance suivante dans le fichier `build.gradle` :

```groovy
implementation("io.coil-kt:coil-compose:2.2.2")
```

::: danger Attention
Après avoir ajouté la dépendance, il faut synchroniser le projet pour que la librairie soit ajoutée (un bandeau en haut de l'IDE vous indique que le projet doit être synchronisé).
:::

Pour charger une image distante, nous utilisons le composant `Image` :

```kotlin
AsyncImage(
    data = "https://picsum.photos/200/200",
    contentDescription = "Image",
    modifier = Modifier
        .size(200.dp)
        .padding(16.dp)
)
```

Le composant `AsyncImage` est un composant de la librairie Coil. Il permet de charger une image distante de manière asynchrone, c'est-à-dire que le chargement de l'image ne bloque pas le thread principal et donc ne ralentit pas l'application.

::: tip Un exemple ?
Si vous voulez un exemple dans l'application de démo, vous pouvez regarder le fichier [`PhotoItem.kt`](https://github.com/c4software/project-compose-api-sample/blob/main/app/src/main/java/com/example/exemplecomposelisteapi/components/PhotoItem.kt) dans le dossier `components`.

Dans le cas du code de démo, nous utilisons une image dont le lien est retourné par l'API (lien de type `String`), exemple :

```kotlin
// PhotoItemMini.kt
// L'objet Photo correspond à un objet retourné par l'API.
@Composable
fun PhotoItem(photo: Photo) {
    AsyncImage(
        model = photo.thumbnailUrl, // Lien de l'image retourné par l'API
        contentDescription = "Image", // Description de l'image (pour les malvoyants)
        modifier = Modifier.size(200.dp) // Taille de l'image (200x200)
    )
}
```

:::

## Les tabs (La NavBar)

Dans cette application nous utilisons des tabs (NavBar) pour naviguer entre les écrans. Pour cela nous utilisons le composant `BottomNavigation` de Jetpack Compose.

Ce Composant contient une liste de `BottomNavigationItem` qui correspondent aux différents différents éléments de la NavBar. Chaque élément est associé à un écran. Écrans qui seront affichés lors du clic sur l'élément via le callback `onClick`.

![Tabs](./tabs.jpg)

Dans le fichier `MainActivity.kt` nous avons défini une liste d'écrans :

- `STATES`: Correspond à la liste des différents écrans.
- `currentScreen`: Écran actuellement affiché.

Pour afficher le bon écran :

![choix écran](./choix_ecran.jpg)

Nous avons donc un `when` qui va afficher le bon écran en fonction de la valeur de `currentScreen`. La valeur de `currentScreen` est modifiée lors du clic sur un élément de la NavBar.

Pour les interactions avec les tabs :

![interactions tabs](./tabs_selection.jpg)

- Le `OnClick` de chaque `BottomNavigationItem` permet de changer l'écran actuellement affiché.
- Le `Selected` de chaque `BottomNavigationItem` permet d'indiquer quel écran est actuellement affiché, et donc de changer l'icône (couleur).

## Conclusion

Dans ce support nous avons vu comment l'architecture d'une application Android avec Jetpack Compose et qui appelle une API. Comme dans le TP précédent, nous nous sommes efforcés de découper notre application en plusieurs parties :

- `screens` : Ce sont les écrans de l'application.
- `components` : Ce sont les composants utilisés dans les différents écrans
- `data` : C'est le code d'accès aux données (API, base de données, etc.)

Cette organisation est vraiment le niveau 0 si vous souhaitez développer des applications maintenables. C'est la base de tout bon développeur Android.

::: tip Et pour la suite ?

Il est bien évidemment possible de découper encore plus notre application. Par exemple, nous pourrions créer un dossier `utils` pour y mettre des fonctions utilitaires. Nous pourrions également créer un dossier `models` pour y mettre les modèles de données utilisés dans l'application.

Il serait également intéressant d'utiliser JetPack Navigation pour gérer les écrans de l'application. Cela permettrait de gérer les transitions entre les écrans : [Jetpack Navigation](https://developer.android.com/guide/navigation/navigation-getting-started)

:::

## Ressources

- <https://developer.android.com/jetpack/compose/architecture>
- [Retrofit](https://square.github.io/retrofit/)
- [Gson](https://github.com/google/gson)
- [Jetpack Navigation](https://developer.android.com/guide/navigation/navigation-getting-started)
- [Le code source de l'application](https://github.com/c4software/project-compose-api-sample)
- [Kotlin](https://kotlinlang.org/)
- [Android](https://developer.android.com/)
- [Jetpack Compose](https://developer.android.com/jetpack/compose)
- [Coil](https://github.com/coil-kt/coil#jetpack-compose)