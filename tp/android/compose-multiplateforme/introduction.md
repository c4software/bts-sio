# Compose Multiplateforme

Dans ce support, nous allons voir comment JetBrains avec son outil Compose Multiplatform permet de créer des applications multip-plateforme. Nous nous intéresserons notamment aux différences avec le développement d'applications natives et plus particulièrement l'état d'esprit à adopter pour développer des applications Multiplatforms de manière efficace.

::: details Sommaire
[[toc]]
:::

## Objectifs

- Comprendre les enjeux du développement multip-plateforme.
- Découvrir les outils de JetBrains pour le développement multip-plateforme.
- Comprendre les différences entre le développement multip-plateforme et le développement natif.

## Prérequis

Comprendre les principes du développement en Kotlin et l'approche composant.

## Le Multiplateforme ?

Compose Multiplateforme est « la suite » du **Kotlin** Multiplateforme. En effet, JetBrains a décidé de créer un outil spécifique pour le développement d'applications Multiplatforms. Cet outil est basé sur le framework Compose, lui-même basé sur le langage Kotlin.

Le Kotlin Multiplateforme permet de créer relativement simplement des couches communes à des applications Android, iOS, JVM, JS, WASM, etc. Cependant, il ne permet pas de créer des interfaces utilisateurs communes. C'est là que Compose Multiplatform intervient.

Compose est un framework de création d'interfaces utilisateurs développé par Google. Il est le renouveau du développement d'interfaces utilisateurs sur Android. C'est à partir de cette base et en lien avec Google que JetBrains a décidé de créer Compose Multiplatform, un outil permettant de créer des interfaces avec des composants similaires pour les différentes plateformes.

## Un peu de terminologie

Avant de rentrer dans le vif du sujet, il est important de comprendre la terminologie utilisée par Compose Multiplatform.

- **Composant** : Un composant est un élément graphique, par exemple un bouton, un texte, une liste, etc.
- **Koin** : Koin est un injecteur de dépendances pour Kotlin. Il permet de gérer les dépendances entre les composants d'une application.
- **Scaffold** : Un Scaffold est un composant de haut niveau qui permet de créer une structure de base pour une application. Il contient une barre de titre, un contenu, un menu, etc.
- **ViewModel** : Un ViewModel est un composant qui permet de gérer l'état d'une application. Il est souvent utilisé pour stocker des données et des états.
- **State** : Un State est un élément qui permet de stocker des données et des états. Il est souvent utilisé pour stocker des données qui peuvent être modifiées. Il est souvent utilisé avec un ViewModel.
- **Composable** : Un Composable est une fonction qui génère un composant graphique. Il est annoté avec `@Composable`.
- **PreCompose** : Librairie permettant de gérer la navigation et la gestion des états dans une application Compose Multiplatform.
- **Navigation** : Système déclaratif permettant de gérer la navigation de l'utilisateur entre différentes vues de l'application.
- **Ressources** : Les ressources sont des éléments externe au code, mais utilisé par l'application, par exemple des images, des textes, des couleurs, etc.
- **gradle** : Gradle est un système de build, il permet de gérer les dépendances, les tâches, les configurations, etc.
- **libs.versions.toml** : Fichier de configuration permettant de gérer les versions des dépendances d'un projet. Il est utilisé par Gradle.

::: tip Remarque

Il est important de comprendre que Compose Multiplatform est un outil en constante évolution, il est donc possible que certaines notions évoluent dans le temps.

Beaucoup d'éléments sont encore en cours de développement, notamment la partie ressource. Mais si vous avez déjà fait du développement Android, vous savez que la gestion des ressources est un élément important et qu'il ne vas aller qu'en s'améliorant.

:::

## Compose Multiplateforme

Avant de rentrer dans le détail du Multiplatform, arrêtons-nous un instant sur Compose, et notamment sur la manière dont il fonctionne. L'approche de compose est similaire à ce que nous pouvons trouver dans d'autres frameworks à base de composants, nous allons donc écrire des éléments d'interface utilisateur directement en Kotlin, mais avec une base de code commun fourni en grande partie par Google (Boutons, Textes, etc.).

```kotlin
@Composable
fun Greeting(name: String) {
    Text(text = "Bonjour, $name!")
}
```

Dans cet exemple, nous avons une fonction `Greeting` qui prend en paramètre un nom et qui affiche un texte. Cette fonction est annotée avec `@Composable` ce qui signifie que c'est une fonction qui va générer un composant graphique. La fonction `Text` est un composant de base de Compose qui permet d'afficher du texte.

Si nous voulons aller plus loin, nous pouvons créer des composants plus complexes, par exemple un composant qui affiche une liste de noms.

```kotlin
@Composable
fun NameList(names: List<String>) {
    LazyColumn {
        items(items = names) { name ->
            Greeting(name = name)
        }
    }
}
```

Ici nous assemblons deux composants, un `LazyColumn` qui est un composant de Compose permettant d'afficher une liste de manière optimisée, et un `Greeting` qui est un composant que nous avons créé précédemment. Le résultat est un nouveau composant qui affiche une liste de noms.

Et si nous souhaitons rendre notre application interactive, rien de plus simple :

```kotlin
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }

    Button(onClick = { count++ }) {
        Text("J'ai été cliqué $count fois")
    }
}
```

Dans cet exemple, nous avons un composant `Counter` qui affiche un bouton et un texte. Le texte affiche le nombre de fois que le bouton a été cliqué. Le nombre de clics est stocké dans une variable `count` qui est un état mutable. Lorsque le bouton est cliqué, la variable `count` est incrémentée.

Il est bien évidemment possible de créer des composants bien plus complexes, mais ces exemples permettent de comprendre la manière dont Compose fonctionne. Vous en voulez plus ? 

```kotlin
@Composable
fun Exemple() {
    var text by remember { mutableStateOf("Cliquez sur le bouton") }

    Column {
        
        Button(onClick = { text = "Bouton cliqué" }) {
            Text("Cliquez ici")
        }

        Text(text)
    }
}
```

Dans cet exemple, nous avons un composant `Exemple` qui affiche un bouton et un texte. Lorsque le bouton est cliqué, le texte est modifié. Le texte est stocké dans une variable `text` qui est un état mutable. Lorsque le bouton est cliqué, la variable `text` est modifiée.

## Material Design

Compose est basé sur Material Design, un ensemble de règles et de composants graphiques créés par Google. Ces règles sont utilisées pour créer des applications sur Android, mais aussi globalement le Web. Je vois déjà les développeurs iOS se dire que ce n'est pas pour eux, mais détrompez-vous, Material Design est aussi utilisé sur iOS, notamment dans les applications Google.

Cependant, Compose n'est pas limité à Material Design, il est possible de créer des composants personnalisés, mais il est important de comprendre que Material Design est la base de Compose.

C'est d'ailleurs ce que nous avons fait dans des développements précédents comme par exemple « Vivre à Angers » où nous avons utilisé Compose pour créer une application Android identique à l'application iOS.

Mais vous allez me dire… Nous aurions pu utiliser Compose Multiplatform pour créer l'application ? Et bien oui… très certainement…

## Un petit parallèle avec les autres frameworks

Précédemment nous avons fait des applications en Flutter, ces applications sont également compatibles avec iOS, Android et le Web. Cependant, la manière de faire est différente, Flutter utilise un langage spécifique, le Dart, et une manière de faire spécifique (Widgets, approche très similaire à React). Compose Multiplateforme, lui, utilise le Kotlin, un langage que nous connaissons déjà.

L'autre gros avantage Compose, est le Kotlin, en effet écrire du code en Kotlin nous permet de déjà de créer du code commun à plusieurs plateformes, nous l'avons déjà fait, nous savons que c'est très efficaces et relativement simple à mettre en place.

Avec Compose Multilplateforme, nous passons un cran au-dessus… Faire l'intégralité d'une application !

Suffisant de blabla, rentrons dans le dur !

<center>
    <iframe src="https://giphy.com/embed/xUA7aVcq56dQ4YueZO" width="480" height="262" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</center>

## L'architecture

Vue que nous avons tous des bases différentes sur Compose, je me permets de vous faire un petit rappel sur les bénéfices de Compose et d'un développement à base de composants réutilisable. Dans un premier temps, intéressons-nous à un composant très important le `Scaffold`. 

```kotlin
@Composable
fun ScaffoldExample() {
    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(text = "Titre")
                }
            )
        },
        content = {
            Text("Contenu")
        }
    )
}
```

Le Scaffold est un élément qui va nous permettre de créer une structure de base pour notre application. Il va nous permettre de définir une barre de titre, un contenu, un menu, etc. C'est un élément très important dans la création d'une application.

Un Scaffold est donc une structure, elle est souvent la racine de notre application :

![Scaffold](./res/scaffold.png)

Dans cette image, nous voyons que le Scaffold est la racine de notre application, il contient une barre de titre, un contenu, et un menu.

Le Scaffold est un exemple de composant de haut niveau, c'est-à-dire un composant qui va contenir d'autres composants.

## Créer notre première application

Le plus simple pour créer une structure de base pour notre application est d'utiliser le site fourni dans la documentation de Compose Multiplatform. Ce site permet de générer une structure de base dans laquelle nous pouvons choisir les plateformes que nous souhaitons (Web, Android, iOS, etc.).

::: danger Attention

Le système est pour l'instant très jeune, tous n'est pas encore vraiment compatibl. Exemple si vous activé WASM, beaucoup de librairie rendront votre application non compilable (car non compatible avec WASM).

Ceci étant, les librairies sont en constant évolution, et il est certain que très rapidement cet avertissement ne sera plus d'actualité.

Pour information, j'ai échangé à ce sujet sur plusieurs librairies :

- [PreCompose](https://github.com/Tlaster/PreCompose/pull/251)
- [Koin](https://github.com/InsertKoinIO/koin/issues/1634#issuecomment-1960959984)
- [Repo officiel de Compose Multiplateforme](https://github.com/JetBrains/compose-multiplatform/issues/4277#issuecomment-1945922199)

Bref, ça bouge, et ça bouge vite !

:::

Le site de Jetbrains est une bonne base pour commencer la découverte [https://www.jetbrains.com/lp/compose-multiplatform/](https://www.jetbrains.com/lp/compose-multiplatform/). Il est une vitrine assez représentative de ce que nous allons pouvoir faire, dans la documentation, nous y trouvons le fameux outil qui va nous permettre de créer notre application :

- [https://kmp.jetbrains.com/](https://kmp.jetbrains.com/)

![KMP INIT](./res/kmp-init.png)

Pour commencer nous allons créer une application « simple » :

- Android
- iOS
- Desktop (JVM)

## L'IDE

Pour ce support, nous allons utiliser Android Studio, mais Fleet (le nouvel IDE de JetBrains) est également compatible avec Compose Multiplateforme. Il semble que Fleet soit bien adapté, mais si comme moi vous n'avez pas les outils de build de Xcode, Android Studio est un bon choix.

::: tip Vous êtes sous Android ?

Si vous êtes sous Android Sudio, il est possible de faire l'ensemble des compilations (Android, iOS, Desktop) pour peu que vous ayez les outils de Build de Xcode et le [plugin officiel](https://plugins.jetbrains.com/plugin/14936-kotlin-multiplatform-mobile)

![Plugin](./res/kotlin-plugin.png)

:::

## L'architecture des dossiers

Contrairement à une application Android classique, une application Compose (MP) va contenir l'ensemble des plateformes dans un seul projet. Nous allons donc retrouver des dossiers spécifiques à chaque plateforme, mais aussi des dossiers communs.

![Dossiers](./res/folders.png)

Entrons un peu dans le détail de ces dossiers de code :

- `composeApp` : Ce dossier va contenir notre code Compose / Kotlin. C'est ici que nous allons écrire notre application.
- `composeApp/src/commonMain` : Ce dossier va contenir le code commun à toutes les plateformes. Dans un monde idéal, nous allons essayer de mettre le maximum de code ici.
- `composeApp/src/androidMain` : Ce dossier va contenir le code spécifique à Android. Nous y retrouvons une structure classique d'application Android (Manifest, etc.). C'est dans ce dossier que nous intégrerons les composants et le code spécifique à Android.
- `composeApp/src/iosMain` : Vous l'avez compris, ce dossier va contenir le code spécifique à iOS. Nous y retrouvons une structure classique d'application iOS (Info.plist, etc.). **Cependant**, Compose Multiplateforme propose un bridge vers les fonctionnalités natives d'iOS, nous n'écrirons donc pas de code en Swift ici, mais du Kotlin qui a comme spécificité d'être en mesure d'importer des librairies iOS (Network, Camera, etc.).
- `composeApp/src/desktopMain` : Ici nous écrirons du code qui a pour vocation de fonctionner sur un ordinateur (Linux, Windows, Mac). Le code fonctionnera sur la JVM, ce qui signifie que nous pourrons utiliser des librairies Java.

Nous avons également quelques éléments de configuration :

- `settings.gradle.kts` : Peu d'éléments ici, mais c'est ici que nous allons déclarer nos repositories.
- `/build.gradle.kts` : Configuration de base de notre projet, nous déclarons ici les plugins communs à toutes les plateformes.
- `/composeApp/build.gradle.kts` : Configuration spécifique à notre application Compose. Configuration de la partie Android, iOS, Desktop, **mais aussi** de la partie commune (common).

::: tip Remarque

Nous allons principalement travailler dans le dossier `composeApp`, mais il est important de comprendre que nous allons certainement avoir à configurer nos plateformes et surtout ajouter des dépendances (Koin, PreCompose, etc.).

:::

## Lancer notre application

Avant de rentrer dans le détail des fichiers de configuration, nous allons lancer notre application.

![Run](./res/gradle-run.png)

Dans cette fenêtre, nous voyons que nous avons plusieurs tâches disponibles :

Lancement de l'application de bureau :

```sh
gradle :composeApp:run
```

Pour les autres plateformes, pas besoin de lancer une tâche spécifique :

![Run](./res/run.png)

::: tip Le résultat

![Résultat](./res/resultat-lancement.png)

:::

## Les fichiers de configuration

### settings.gradle.kts

### build.gradle.kts

### composeApp/build.gradle.kts

### gradle/libs.versions.toml

### La différence entre `compose.` et `libs.`

## L'approche multiplateforme first

## Les mots clés `expect` et `actual`

## `precompose`

### Définir nos routes

### Définir un point d'entrée différent par plateforme

## Découper pour mieux régner

### Les composants communs

### Les composants par plateforme

## Koin

### Une configuration centralisée

### Des spécificités par plateforme

## ktor

### Penser centralisé

### Le cas du Bearer

## Les tests

## Les ressources

## L'intégation continue