---
description: Dans ce TP nous allons mettre en pratique l'écriture de composants avec Android Compose. De la logique à la réalisation, nous allons parcourir les bases de la réalisation de composants et de « la réactivité » en lien avec ceux-ci.
---

# Les composants avec Android et Jetpack Compose

::: details Sommaire
[[toc]]
:::

## Introduction

Dans ce TP nous allons mettre en pratique l'écriture de composants avec Android Compose. De la logique à la réalisation, nous allons parcourir les bases de la réalisation de composants et de « la réactivité » en lien avec ceux-ci.

## Aperçu du projet

L'application que nous allons réaliser ici est très simple. Il s'agit juste d'une liste et d'une vue de détail. Elle nous servira à comprendre le système de composant.

![Application](./res/application.jpg)

## Création du projet

Pour la création du projet, rien de spécial à prévoir. Il s'agit ici de suivre le processus de création d'une application comme habituellement. Pour ça nous allons utiliser « Android Studio » qui est l'IDE à utiliser pour créer une application Android.

Lors de la création, Android Studio va nous poser plusieurs questions, nous allons donc choisir :

- Template : Empty **Compose** Activity
- Language : Kotlin
- SDK Min. : SDK 26. (ou plus)

Je vous laisse suivre les étapes de création d'un nouveau projet.

![Création d'un projet Étape 1](./res/compose_step_1.jpg)
![Création d'un projet Étape 2](./res/compose_step_2.jpg)

::: warning Mais quelques petites remarques :

- Le choix du package est très important. Comme nous avons vu ensemble en cours, le « Package » doit être unique. En effet deux applications ne peuvent pas avoir le même.
- Choisir un min SDK qui correspond aux cibles des mobiles souhaités. (Si vous êtes en France ou dans un autre pays, il conviendra de faire le bon choix).
- Kotlin est maintenant le langage à choisir, Java et Kotlin cohabite sans problème vous n'aurez donc aucun problème de compatibilité.

:::

## Un premier lancement

Pour débuter (et avant de tout casser), je vous laisse compiler et lancer une première fois l'application proposée par Google. Le premier résultat va être incroyable, accrochez-vous…

![Première application](./res/compose_step_3.jpg)
> Dans mon cas l'application est sur la droite.

::: tip STOP ! Analysons ensemble ce que nous avons obtenu.

![Analyse code source](./res/analyse_code.jpg)

Nous allons donc retravailler tout ça pour organiser un minimum notre code source.

:::

## Un peu de structure !

Avant d'aller plus loin, nous allons ajouter un peu de structure dans le microprojet. L'idée étant de faire une application qui ressemble à quelque chose. Nous allons ajouter la structure d'une application basique à savoir une `TopAppBar`.

![TopAppBar](./res/app_avec_structure.jpg)

Je vous laisse modifier le code de la méthode `onCreate`, pour y mettre :

```kotlin
setContent {
    MyApplicationTheme {
        Scaffold(
            topBar = { TopAppBar(title = {Text("Top App Bar")}  },
        ) {
            Greeting(name = "Valentin")
        }
    }
}
```

::: tip L'importance de la sémantique

Il est important d'utiliser les bons termes. En développement mobile, nous avons une terminologie qu'il faut respecter. Ici la barre en haut ne se nomme pas « la barre en haut », mais une AppBar.

:::

_À faire :_

Je vous laisse tester votre application à nouveau.

::: tip Un peu de couleur

Votre top bar est blanche ? C'est normal, nous n'avons pas encore ajouté de thème. Je vous laisse ajouter le thème suivant :

```kotlin
topBar = { 
    TopAppBar(
        title = {Text("Top App Bar") }, // Titre de la barre
        colors = TopAppBarDefaults.smallTopAppBarColors(
            containerColor = MaterialTheme.colorScheme.primaryContainer,
            titleContentColor = MaterialTheme.colorScheme.primary,
        ), // Couleur de la barre
    ),
},
```

:::

## Votre premier composant

Avant de réaliser le code, nous allons dans un premier temps créer un nouveau package. Il nous servira à stocker nos composants.

Création du package, la procédure est intégrée dans Android Studio :
![Création package](./res/package_1.jpg)

Nommage du package, dans mon cas « composants » :
![Nommage](./res/package_2.jpg)

Maintenant que votre package est créé, je vous laisse créer le fichier Kotlin qui contiendra votre code :

![Création fichier composant](./res/create_composant_file.jpg)
![Création fichier composant suite](./res/create_composant_file_2.jpg)

Pour le nom du fichier, je vous laisse choisir. Moi dans mon cas je vais le nommer « `composant_list_item.kt` ».

::: tip Un instant !

Pas de classe !?

<iframe src="https://giphy.com/embed/l0HlKrB02QY0f1mbm" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

**Et non** avec Compose, les composants ne sont pas des classes. Ce sont des fonctions « Composable » qui seront appelées au bon moment suivant les bonnes conditions dans votre vue.

:::

### Le code de votre composant

L'idée ici est de vous faire constater le bon fonctionnement. Voilà le code de votre premier composant :

```kotlin
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Card
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.testcomposant.R
import com.example.testcomposant.ui.theme.MyApplicationTheme

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun ElementList(
    title: String = "Mon titre",
    content: String = "Mon contenu",
    image: Int? = R.drawable.ic_launcher_foreground,
    onClick: () -> Unit = {}
) {
    Card(modifier = Modifier.fillMaxWidth().padding(5.dp), onClick = onClick) {
        Row(modifier = Modifier.padding(5.dp), verticalAlignment = Alignment.CenterVertically) {
            image?.let {
                Image(modifier = Modifier.height(50.dp), painter = painterResource(id = it), contentDescription = content)
            }

            Column() {
                Text(text = title)
                Text(text = content, fontWeight = FontWeight.Light, fontSize = 10.sp)
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    MyApplicationTheme {
        ElementList()
    }
}
```

Arrêtons-nous un instant, que constatez-vous dans le code que vous avez copié-collé sans trop réfléchir 👀…

- `@Composable` au-dessus de la fonction, indique l'emplacement d'un composant.
- `@Preview(showBackground = true)` permet de réaliser une preview de votre composant sans la lancer sur un téléphone (pratique, testons).
- Les variables (`title`, `content`, `image`, `onClick`) seront le moyen de customiser notre composant.

Je vous laisse mettre en place le code. Et valider que celui-ci s'affiche correctement dans la partie preview.

![Preview composant](./res/card_component.jpg)

## Utiliser votre premier composant

Nous avons réalisé notre premier composant, nous allons maintenant utiliser le composant dans notre application.

Pour ça nous allons créer une liste (`LazyColumn` étant l'équivalent d'un `RecyclerView`, mais en beaucoup plus simple) Celui-ci contiendra le composant que vous avez créé.

```kotlin
val myData = listOf("Card 1","Card 2","Card 3","Card 4","Card 5","Card 6","Card 7","Card 8","Card 9","Card 10")

LazyColumn {
    items(myData) { item ->
        ElementList(title = item) {
            // Code appelé lors du clique sur un élément de la liste.
        }
    }
}
```

Je vous laisse mettre le code en question **à la place** du `Greeting` dans le composant `Scaffold`.

Vous devez obtenir :

![Vous allez obtenir](./res/liste_preview.jpg)

### Rendre votre liste interactive

Maintenant que notre liste s'affiche, nous allons la rendre interactive lors du touch / clique de l'utilisateur sur un élément de la liste. Nous allons avoir besoin de deux choses : 

- Une variable qui permettra de connaitre quel élément à été cliqué.
- Une condition (`if`) pour savoir si nous devons afficher la `LazyColumn` ou seulement un `ElementList`.

Pour la variable, la déclaration de celle-ci est un peu particulière :

```kotlin
var selectedItem by remember { mutableStateOf<String?>(null) }
```

Ajouter cette ligne après votre variable `myData`.

::: tip C'est à vous

Je vous laisse ajouter la condition pour :

- Afficher la `LazyColumn` ou `ElementList` en fonction de `selectedItem != null`.

:::

### Gestion du bouton retour

Si tout fonctionne comme prévu, vous devez avoir la possibilité de sélectionner un élément. Mais pour l'instant pas moyen de revenir sur la liste entière.

Pour ça nous allons ajouter un nouvel attribut dans notre `TopAppBar`

```kotlin
navigationIcon = {
    if (selectedItem != null) {
        IconButton(onClick = { selectedItem = null })
        { Icon(Icons.Default.ArrowBack, "Back") }
    }
},
```

Cet attribut va ajouter un bouton retour si un élément est sélectionné. Je vous laisse mettre en place ça dans votre code.

## Utiliser toute la puissance des composants

Vous l'avez peut-être remarqué, pour l'instant notre liste est très simple. Vous avez déclaré une liste de `string`, je vais vous demander d'allez un peu plus loin. Vous allez créer une liste `d'objet` (plutôt que `string`).

Évidemment, je vais vous demander d'organiser tout ça.

- Créer un package nommé models :

![Create Package](./res/create_package.jpg)

- Ajouter dans ce package une Classe (`data class` pour être précis) :

```kotlin
data class CardContent(val title: String, val content: String, @DrawableRes val image: Int?)
```

::: tip Data class ?

Étrange cette classe n'est-ce pas ? 

Nous créons fréquemment des classes dont le but principal est de conserver des données. Dans une telle classe, certaines fonctionnalités standard et fonctions utilitaires sont souvent dérivables mécaniquement à partir des données. Dans Kotlin, cela s'appelle une classe de données et est marqué comme `data`.

:::

C'est à vous, je vous laisse modifier votre liste (nommé `myData`) par une liste de `CardContent` (la classe que vous avez créée). Cette liste doit contenir 10 éléments avec des titres, des contenus et une image différente que celle par défaut (le logo de l'ESEO par exemple).

::: details Besoin d'aide ?

Avez-vous cherché ? Si oui, voilà un indice :

```kotlin
val myData = listOf(CardContent("Card 1", "Contenu de la card 1", R.drawable.logo), …)
```

:::

## Découper encore plus

Nous avons créé un composant, c'est bien, mais nous pouvons faire bien plus. En reprenant la logique du composant `ElementList`, je vous laisse créer un composant nommé `EseoTopAppBar` qui contiendra toute la logique de votre `TopAppBar` :

```kotlin
TopAppBar(
    navigationIcon = {
        if (selectedItem != null) {
            IconButton(onClick = { selectedItem = null })
            { Icon(Icons.Default.ArrowBack, "Back") }
        }
    },
    title = { Text("Top App Bar") },
)
```

Une fois ce composant créé (dans le bon dossier), je vous laisse l'utilisé directement dans votre `Scaffold`.

::: tip Rappel

![Paramètres](./res/parameters.jpg)

Les éléments encadrés en rouge sont les paramètres de chaque méthode. Certains sont des strings, d'autres des actions, mais un paramètre peut-être un composant. C'est le cas ici avec `topBar =`. 

:::

Je vous laisse tester que votre application fonctionne toujours.

## Ajouter des animations

Une liste c'est bien ! Mais une liste avec des animations c'est encore mieux !

```kotlin
AnimatedContent(label = "") (/* Votre Condition OU votre état */ ) { targetState ->
    when (targetState) {
        true -> { /* Composant affiché quand la condition est vrai */ }
        false -> { /* Composant affiché quand la condition est fausse */ }
    }
}
```

Je vous laisse intégrer ce code dans votre application afin d'animer le changement d'état. Après intégration vous devriez obtenir :

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/LrYjOWEid2A?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Aller plus loin avec les animations

[![Aide mémoire](./res/animation.jpg)](https://storage.googleapis.com/android-stories/compose/Compose_Animation_Cheat_Sheet.pdf)

_Source:_ [Twitter](https://twitter.com/JorgeCastilloPr/status/1579057096360079361)

## Utiliser les ressources textes

Avoir des composants ne veut pas dire oublier les bonnes pratiques bien au contraire ! Pour finaliser votre application, je vous laisse sortir les différents textes dans le fichier. `strings.xml`

Une fois vos textes externalisés, vous pouvez rendre visible via :

```kotlin
getString(R.string.id_de_votre_string_dans_le_xml)
```

Je vous laisse utiliser cette méthode aux différents endroits ou vous avez mis du texte « en dur ».

## Naviguer entre différents composants

Réaliser une interface avec Jetpack Compose c'est un peu comme assembler des Lego. Vos composants sont vos briques et vous allez devoir les assembler pour créer votre application.

Prenons les composants que nous avons créés :

- Une liste d'éléments.
- Une card représentant un élément.

Finalement, nous avons lié ces deux composants ensemble en utilisant un état. Lors de la sélection d'un élément, nous avons changé l'état de notre application pour afficher la card de l'élément sélectionné.

C'est un peu comme si nous avions une pièce dans laquelle nous pouvions entrer et sortir. Pour entrer et sortir, nous utilisons l'action onClick, le onClick nous permet de changer l'état de notre application.

Dans cet exemple, nous avons utilisé un état pour gérer l'affichage de notre card. Mais nous pouvons aussi utiliser un état pour gérer la sélection d'un élément :

**(C'est un exemple, à ne pas copier-coller)**

```kotlin
val selectedItem = remember { mutableStateOf(null) }

if (selectedItem.value == null) {
    // Nous n'avons pas d'élément sélectionné, nous affichons donc la liste.
    ElementList(selectedItem)
} else {
    // Nous avons un élément sélectionné, nous affichons donc la card.
    ElementCard(selectedItem.value!!)
}
```

Prenons un autre exemple, dans un cas simple de deux composants d'interface, nous pourrions écrire quelque chose comme :

```kotlin
Column(Modifier.padding(it)) {
    val isLoggedIn = remember { mutableStateOf(false) }

    if (isLoggedIn.value) {
        HomeScreen()
    } else {
        LoginScreen() {
            // L'action sera émise par le composant LoginScreen. Via un bouton par exemple.
            isLoggedIn.value = true
        }
    }
}
```

Ici nous avons un état qui nous permet de savoir si l'utilisateur est connecté ou non. Il faut donc comprendre que le code permet de :

- Si l'utilisateur est connecté, afficher l'écran d'accueil.
- Si l'utilisateur n'est pas connecté, afficher l'écran de connexion.

Évidemment, il est possible de faire plus complexe, mais pour l'instant nous allons nous concentrer sur ces deux exemples.

### Exemple de code pour nos deux composants et de leur utilisation

Les deux composants :

```kotlin
@Composable
fun HomeScreen() {
    Text("Bienvenue sur votre application")
    // À compléter avec votre liste d'éléments précédemment créée.
}

@Composable
fun LoginScreen(onLogin: () -> Unit) {
    Button(onClick = onLogin) {
        Text("Se connecter")
    }
}
```

Un peu de détail sur le composant LoginScreen :

- `onLogin` est une action qui sera émise par le composant. Cette action sera émise lors du clique sur le bouton (par l'utilisateur). C'est ce que nous appelons un callback, il permet de faire remonter une action dans le composant parent.

L'utilisation de ces deux composants, dans un Scaffold :

```kotlin
@Composable
fun MyApp() {
    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text("Mon application")
                }
            )
        }
    ) {
        Column(Modifier.padding(it)) {
            val isLoggedIn = remember { mutableStateOf(false) }

            if (isLoggedIn.value) {
                HomeScreen()
            } else {
                LoginScreen() {
                    isLoggedIn.value = true
                }
            }
        }
    }
}
```

Je vous laisse tester le code. Évidemment, dans le composant `HomeScreen` je vous laisse remettre votre liste d'éléments (que vous avez créée précédemment).

Votre fichier `MainActivity.kt` doit ressembler à ça :

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyApplicationTheme {
                MyApp()
            }
        }
    }
}
```

Vous commencez à comprendre le fonctionnement ? Nous avons un composant `MyApp` qui contient un `Scaffold` qui contient un `Column` qui contient un état qui permet de savoir si l'utilisateur est connecté ou non. En fonction de cet état, nous affichons un composant ou un autre.

Ça semble compliqué ? C'est en effet un peu différent de ce que vous avez l'habitude de faire. Mais c'est très puissant, car vous pouvez créer des composants qui sont réutilisables et qui peuvent être utilisés dans plusieurs endroits de votre application.

On découpe notre code en plein de petits morceaux, et on assemble le tout pour créer notre application.

## Les permissions

Nous avons vu dans notre introduction Android que nous avions besoin de demander des permissions à l'utilisateur pour accéder à certaines fonctionnalités de son téléphone. Nous allons voir comment faire avec Compose. Pour ça nous allons devoir utiliser une librairie développée par Google : [Accompanist](https://google.github.io/accompanist/)

::: tip Accompanist

Accompanist est une librairie de transition, elle existe le temps que Compose évolue, mûrisse et que les fonctionnalités soient intégrées dans Compose (ou pas, mais c'est un autre débat).

:::

Pour rester dans le thème du Bluetooth, nous allons regarder comment demander les permissions en lien avec le BLE.

### Ajouter la librairie

Pour ajouter la librairie, nous allons devoir modifier notre fichier `build.gradle` (celui dans `app` du projet). Nous allons ajouter la dépendance suivante :

```groovy
    implementation("com.google.accompanist:accompanist-permissions:0.30.1")
```

Il faut ensuite synchroniser le projet avec les modifications (bandeau bleu en haut).

### Le fichier AndroidManifest.xml

Avant de demander les permissions, nous allons devoir les déclarer pour que l'application puisse les demander. Pour ça nous allons modifier le fichier `AndroidManifest.xml`. Nous allons ajouter les permissions suivantes :

```xml
<!-- Permissions pour le BLE Android 12 et plus -->
<uses-permission android:name="android.permission.BLUETOOTH_SCAN"
    android:usesPermissionFlags="neverForLocation"
    tools:targetApi="s" />
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />

<!-- Ancienne permission pour permettre l'usage du BLE  Android avant 11 inclus -->
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />

<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### Utiliser la librairie

Cette librarie va nous permettre de demander les permissions à l'utilisateur et de gérer l'état de la demande (acceptée, refusée, etc.). Si vous avez compris ce que nous avons vus précédemment, vous vous doutez que tout va être géré par un état.

```kotlin
val toCheckPermissions = if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) {
    listOf(android.Manifest.permission.ACCESS_FINE_LOCATION)
} else {
    listOf(android.Manifest.permission.BLUETOOTH_CONNECT, android.Manifest.permission.BLUETOOTH_SCAN)
}

val permissionState = rememberMultiplePermissionsState(toCheckPermissions)
```

Quelques explications :

- `toCheckPermissions` est une liste de permissions à vérifier. Dans notre cas, nous allons vérifier les permissions pour le Bluetooth. En fonction de la version d'Android, nous n'allons pas vérifier les mêmes permissions. C'est pour ça que nous avons une condition qui permet de vérifier la version d'Android.
- `rememberMultiplePermissionsState` est un état qui va contenir l'état de la demande de permission. Cet état va nous permettre de savoir si les permissions sont accordés ou non.

Maintenant que nous avons notre état, nous allons pouvoir l'utiliser pour demander les permissions à l'utilisateur. Pour ça nous allons utiliser un composant nommé `PermissionRequired` :

```kotlin
if (!permissionState.allPermissionsGranted) {
    Button(onClick = { permissionState.launchMultiplePermissionRequest() }) {
        Text(text = "Demander la permission")
    }
else {
    Text(text = "Permission accordée")
}
```

Que fait ce code ?

- Si l'utilisateur n'a pas accordé les permissions, nous affichons un bouton qui permet de demander les permissions.
- Si l'utilisateur a accordé les permissions, nous affichons un texte qui indique que les permissions sont accordées.

## Scannez les périphériques BLE

TODO Exemple simple

## Arrêtons-nous un instant

Ici l'idée était de vous montrer les bases de la création de composants. Il est évident que dans une vrai application, nous aurions un peu plus que ça.

Notamment :

- Une architecture (MVI, MVVM, etc.) qui permet de gérer la logique de l'application. Dans Compose nous appelons ça un ViewModel.
- Une Navigation basée sur un Routeur, sur android il se nomme Jetpack Compose Navigation.
- Une gestion des erreurs, des exceptions, etc.

Mais pour l'instant, nous allons nous arrêter là. Nous avons vu les bases, nous avons vu comment créer des composants, comment les utiliser, comment les animer, comment les rendre interactifs, etc.

## Aller plus loin dans la navigation

Vous souhaitez aller plus loin ? Là c'est un exemple très simple, pour découvrir. Dans une application plus complexe, nous aurions besoin de Compose Navigation pour gérer les transitions entre les composants. Vous pouvez retrouver un exemple d'utilisation de Compose Navigation dans la documentation officielle : [Compose Navigation](https://developer.android.com/jetpack/compose/navigation).

Compose Navigation est un composant qui permet de gérer les transitions entre les composants. Il permet de gérer les animations, les transitions, les arguments, etc. C'est l'équivalent d'un routeur dans une application web (react-router, vue-router, etc.)

## Bonus : Adapter la TopAppBar

Actuellement votre TopAppBar est statique, elle contient toujours la même chose à savoir « Top App Bar ». Je vous propose de réfléchir à comment faire pour que celle-ci s'adapte et change en fonction de l'élément choisi, en fonctionnant en suivant la logique :

- Aucun élément = « Nom de votre application ».
- Un élément choisi = « Titre de l'élément choisi ».

::: tip Et les animations

N'oubliez pas, les animations sont le détail qui change tout. Je vous laisse regarder pour faire en sorte d'animer le changement de titre.

:::

![Le résultat de la TopAppBar](./res/animation_bar.gif)