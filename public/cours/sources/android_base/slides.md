# Les bases d'Android

Par [Valentin Brosseau](https://github.com/c4software) / [Playmoweb](https://www.playmoweb.com)

---

Point statistique :

- Combien d'entre vous ont un téléphone Android ?
- Combien d'entre vous ont un iPhone ?

---

## Introduction à Android

---

- Développé par Google
- Créé en 2008 (16 ans)
- Actuellement en version 15
- Android 16 (TBA)

---

À la base un OS pour appareil photo.

---

## Pourquoi Android ?

- Multi marques (Google, Samsung, Xiaomi, Microsoft, …)
- Part de marché
- Ouvert
- Personnalisable
- Le prix

---

## Le problème d'Android ?

- La fragmentation

---

- Un Android ? Non… des Android!

---

- [Répartition des versions](https://gs.statcounter.com/android-version-market-share/mobile-tablet/worldwide)
- [Répartition des caractéristiques](https://developer.android.com/about/dashboards)
- [API Level VS utilisation](https://apilevels.com/)

---

## L'architecture

![Architecture](./img/android_architecture.jpg)

---

Linux ?

<center>
    <iframe src="https://giphy.com/embed/3og0ICG4WxdKSRzE3K" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</center>

---

## Android is not Linux

Construis autour du noyau Linux mais … c'est tout

- Noyau Linux : Drivers, Batterie, Ram.
- Runtime Android (ART, Dalvik) : Fais tourner les applications Android.
- App Framework : Android Framework (Android API).

---

## La sécurité

---

L'isolation avant tout

---

- Chaque application a son propre utilisateur Linux.
- Les applications sont sandboxées.
- Chaque application tourne dans sa propre « VM ».
- Chaque application a son cycle de vie.

---

## Les API

Deux types :

- SDK Android : Évolue lors des mises à **jour de système**. (Intégré)
- Play Service : Évolue automatiquement indépendamment de la version de l'OS. (Distribué par Google, mais…)

---

## Les langages

---

### Le Code

- Java (Historique)
- Kotlin (à privilégier maintenant)
- Flutter (Dart ? Quoi ?)

---

### Les Ressources

- XML (Drawables, Layout, Settings, Color, String)
- png / jpeg / SVG (presque)

---

### Android est une plateforme ouverte, qui évolue rapidement.

Trop pour certains… Mais le reflet de la réalité (foldable, 5G, Bluetooth LE, Bluetooth Mesh, NFC,…)

---

### Bon… Et comment on fait une application ?

<center>
<iframe src="https://giphy.com/embed/Ot4U0KHw2fdvxJZ4jh" width="480" height="480" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</center>

---

## 1. L'interface

---

## Nous sommes en transition

### Dommage pour vous ? Pas certains…

#### Cette année, nous utiliserons Compose + Kotlin

---

- [Compose (Code)](https://developer.android.com/compose)
- [View (XML)](https://developer.android.com/guide/topics/ui/declaring-layout)

---

### Layout « View »

- Fichier XML
- Représente l'interface graphique
- Déclaratif

---

![Layout](./img/building-your-android-UI-views.webp)

---

### Évolutions permanentes

- AndroidX
- Jetpack
- Compose

---

### Compose ?

- Passer d'une Interface déclarative (XML).
- À une Interface « Composable » écrite en **code** (Kotlin)

---

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

Qu'observez-vous ? À votre avis, comment ça fonctionne ?

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

Qu'observez-vous ? À votre avis, comment ça fonctionne ?

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

Repose sur le material design (nous y reviendrons)

[https://m3.material.io/](https://m3.material.io/)

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

- [Présentation](https://developer.android.com/jetpack/compose)
- [Documentation](https://developer.android.com/jetpack/compose/documentation)
- [Quelques cours et tutoriaux](https://developer.android.com/courses/jetpack-compose/course)

---

Le renouveau du développement Android

[Exemple les animations](https://developer.android.com/jetpack/compose/animation)

---

- Plus simple
- Permets de faire des animations simplement
- Écriture plus moderne
- Repose sur des Composants (comme React, Vue, Flutter…)
- Pensez réutilisation
- Est multiplateforme (Desktop, Web…)

---

## Multiplateforme ?

Arrêtons-nous un instant…

---

- Google développe Compose pour Android.
- JetBrains développe Compose pour iOS, Desktop (Linux, MacOS, Windows), Web.

---

Jetbrains a développé Kotlin, Google l'a adopté. Les deux travaillent ensemble. Activement. 

Le tout est Open Source.

---

Trois termes à retenir :

- **Compose** : La librairie de Google pour Android => Interface déclarative.
- **KMM** : Kotlin Multiplatform (Jetbrains) => Logique métier partagée.
- **CMP** : Compose Multiplatform (Jetbrains) => Interface partagée.

---

Compose multiplateforme vous permettra donc de créer du code partagé entre vos applications Android, iOS, Desktop et Web.

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

## 2. L'outillage

---

## Android Studio

- l'IDE
- Java + Kotlin
- Version spéciale de Intellij

---

![Interface](./img/interface.jpg)

---

## Toolbar

![Interface](./img/toolbar.jpg)

---

Deux façons de travailler :

- Téléphone connecté en USB.
- Émulateur (et non simulateur).

---

## L'émulateur

- Intégré dans Android Studio (🙌).
- Performances suffisantes pour tester.
- Consomme de la RAM (car c'est un VM).
- BLE / Bluetooth partiellement disponible (**très limité**).

---

## Première application

---

- File > New > New Project
- Configurer le projet
- Lancer l'application sans aucune modification (dans un émulateur)

---

## C'est à vous

---

## Structure du projet

---

![Structure dossiers](./img/folders_projects.png)

---

- **src** : Vos sources Kotlin (ou Java).
- **res** : XML, fichiers de configurations, images
  - layout
  - strings
  - drawable…

---

### **R.java.class**

- Généré automatiquement.
- Contiens les références de tous les id.
- Permets l'accès aux ressources depuis votre code :
  - `stringResource(R.string.hello)`
  - `imageResource(R.drawable.image)`
  - …

---

### Pourquoi est-ce important ?

- Accessibilité.
- Une plateforme pensée internationalement.
- Une adaptation à l'utilisateur (taille, couleur, etc.)

---

## Débugger

- Points d'arrêts.
  - Avec arrêt.
  - Sans arrêt.
  - Conditionnés
- Logs.
- Logs affichés dans le Logcat.

---

## Logcat

![Interface](./img/logcat.png)

---

![V2](./img/new_logcat.jpg)

![Interface V2](./img/logcat-formatter.png)

---

## Que se passe-t-il lors de la compilation ?

### Avez-vous regardé ?

---

## Un logiciel a été lancé « Gradle »

- Compilation
- Test
- Packaging
- Configurable via un fichier

---

## Gradle

- Open source.
- Règles / scripts de compilation de votre projet.
- Complètement intégré dans Android Studio (complétion, etc.)

---

## Votre première application

- Activity
- Un layout (Composant ou XML)
- Déclaré dans le « Manifest »

---

## L'activity

- Représente un seul écran.
- Gère tout ce qu'il y a dans l'écran.
- Gère la logique des interactions utilisateurs.
- Possède son propre **cycle de vie**.

---

![Lifecycle](./img/lifecycle.png)

---

![Lifecycle 2](./img/lifecycle2.png)

---

- L'ensemble de vos activity hérite d'une super **ComponentActivity**.
- « Override » surcharge des méthodes de base (au début uniquement onCreate).

---

## Un détail qui compte… les composants

- Découpage de l'interface.
- Réutilisation.
- Indépendance.
- Paramétrable (car réutilisable).

---

![Composant](./img/composants-base.png)

Qu'observez-vous ?

---

## 3. Définir un Layout

---

- Des colonnes.
- Des lignes.
- Des boîtes (box)

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

## Un exemple

```kotlin
Box {
    Text("Hello")
    Text("World")
}
```

---

Nous construisons donc des grilles de composants.

![Layout](./img/compose-layout.png)

---

## C'est à vous

Modifier pour réaliser ceci :

![Layout](./img/compose-layout-refactor.png)

---

## Il vous manques queques choses ?

… quelques composants, et un peu de style.

---

Pour le style c'est plutôt automatique :

- Material Design.

---

Pour le reste quelques éléments :

- `Button` : Un bouton.
- `Spacer` : Un espace (vertical ou horizontal ou les deux).
- `Text` : Un texte.

---

Exemple :

```kotlin
Column {
    Button(onClick = { /* Action */ }) {
        Text("Cliquez ici")
    }
    Spacer(modifier = Modifier.weight(1f))
    Text("Un texte")
}
```

---

<center>
    <iframe src="https://giphy.com/embed/xSTtrYhZOpDjYIGkYC" width="480" height="343" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</center>

---

## En vrai… c'est hard non ?

Un peu d'explication… avant de continuer…

---

## Un bouton

```kotlin
Button(onClick = { /* Action */ }) {
    Text("Cliquez ici")
}
```

Ici, nous avons un bouton qui affiche un texte. Lorsque l'on clique dessus, une action est déclenchée.

---

## Spacer

```kotlin
Spacer(modifier = Modifier.weight(1f))
```

Un espace qui prend tout l'espace disponible. `weight` est un pourcentage. Ici nous avons un poids de 1, donc il prend tout l'espace disponible.

---

```kotlin
Column {
    Spacer(modifier = Modifier.weight(1f))
    Text("Un texte")
}
```

À votre avis, que va-t-il se passer ?

---

![Compose layout guess 1](./img/compose-layout-guess-1.png)

---

Comment faire pour que le texte soit centré ?

Deux solutions :

- `horizontalAlignment = Alignment.CenterHorizontally` sur la `Column`.
- `textAlign = TextAlign.Center` sur le `Text`. ⚠️ Attention, cela ne fonctionne que si votre `Text` fait la largeur de l'écran.

---

```kotlin
Column(
    horizontalAlignment = Alignment.CenterHorizontally
) {
    Spacer(modifier = Modifier.weight(1f))
    Text("Un texte")
}
```

---

![Compose layout guess 2](./img/compose-layout-guess-2.png)

---

## C'est à vous…

Comment faire pour que le texte soit centré verticalement ?

(PS : Il y a plusieurs solutions)

---

## Une solution

```kotlin
Column(horizontalAlignment = Alignment.CenterHorizontally) {
    Spacer(modifier = Modifier.weight(1f))
    Text("Un texte")
    Spacer(modifier = Modifier.weight(1f))
}
```

---

## Une autre solution

```kotlin
Column(
    verticalArrangement = Arrangement.Center, 
    horizontalAlignment = Alignment.CenterHorizontally) 
{
    Text("Un texte")
}
```

À votre avis, dans quels cas utiliser l'une ou l'autre des solutions ?

---

## Compose c'est beaucoup de pratique et « de référence »

Pss : N'hésitez pas à consulter la documentation (mais également StackOverflow, ChatGPT, Claude, etc)

---

## C'est à vous

Modifier pour réaliser ceci :

![Layout](./img/compose-layout-refactor.png)

- [https://developer.android.com/develop/ui/compose/layouts/basics]

---

## Exemple de Layout

```kotlin
Column(
    modifier = Modifier.padding(innerPadding)
) {
    Spacer(modifier = Modifier.weight(1f))

    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.Center,
        verticalAlignment = Alignment.CenterVertically
    )
    {
        Greeting(
            name = "Android",
        )
    }

    Spacer(modifier = Modifier.weight(1f))

    Row {
        Button(onClick = { /*TODO*/ }) {
            Text("Button 1")
        }

        Spacer(modifier = Modifier.weight(1f))

        Button(onClick = { /*TODO*/ }) {
            Text("Button 2")
        }
    }
}
```

---

<center>
    <iframe src="https://giphy.com/embed/kRXnZwKrPTwVq" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</center>

---

Avant de continuer, une petite pause…

Nous allons en profiter pour créer un composant (vous allez voir c'est simple).

---

## Créer un composant

```kotlin
@Composable
fun VotreComposant(content: String) {
    Text(text = content)
}
```

Et c'est tout… Je vous laisse essayer en créant un composant `MyUI` qui représente votre petite interface.

---

## À votre avis, où ranger ce composant ?

---

## 4. Les ressources

---

### L'internationalisation

- `res/values/strings.xml`

Accessible via `stringResourcestringResource(R.string.un_texte)`.

---

## C'est à vous, je vous laisse extraire le texte dans le fichier `strings.xml`

👋 Pour la première fois, faisons le ensemble


---

## Comment procéder ?

Via Android Studio bien évidemment. Et de préférence via l'éditeur XML

![Astuce Extraction](./img/astuce_extract.png)

---

## Les images

- `res/drawable/`
- Un nom sans espace, sans accent, sans caractère spéciaux.
- Importable directement dans le code (`R.drawable.nom_image`).

---

## Ajoutons le logo de l'ESEO :

```kotlin
Image(
    painter = painterResource(R.drawable.nom_image),
    contentDescription = "Une image",
    modifier = Modifier.size(128.dp)
)
```

Placer l'image dans le dossier `res/drawable/`. Puis ajouter le au dessus de votre `Text` qui est actuellement au centre de votre `Column`.

---

## Et maintenant ?

---

## Le fichier Manifest

- Déclare le nom de l'application.
- Déclare les activités.
- Déclare le thème de l'application.
- L'icône de l'application.
- Configuration de l'application (package…).
- Déclare les permissions.

---

## « Exemple » contenu d'un Manifest

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.playmoweb.demo.dmocourseseo">

    <!-- Nouvelles permissions permettant de scanner en BLE Android après 11 -->    
    <uses-permission android:name="android.permission.BLUETOOTH_SCAN"
        android:usesPermissionFlags="neverForLocation"
        tools:targetApi="s" />
    <uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />

    <!-- Ancienne permission pour permettre l'usage du BLE  Android avant 11 inclus -->
    <uses-permission android:name="android.permission.BLUETOOTH" />
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />

    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

    </application>

</manifest>
```

---

## Le dossier `res` en détail

- **drawable** : Vos images (png, xml, 9.png…) (`R.drawable.…`)
- **layout** : Vos interfaces un fichier par vue (`R.layout.…`)
- **menu** : Contenu de vos menus (Options Menu, Sub Menu…)
- **values** : « Constantes » de votre application (String, Int, Color, etc.)
- **mipmap** : Icônes de votre application.

---

## Le dossier `res` en détail 2

### AKA les ressources alternative

Chaque dossier peut être redéfini en fonction de la résolution. (`-hdpi`, `-mdpi`, `-xxhdpi`…)

---

## Dingue, non ?

- Vous connaissez un équivalent dans d'autre environnement ?

---

## Mais ce n’est pas tout !

Chaque dossier peut être redéfini en fonction… De la langue (`values-fr/strings.xml`), de la configuration du « mobile », du thème sombre…

---

![Wow 2](./img/wow2.gif)

---

![New Resources](./img/resources.png)

---

![Resources Langue](./img/resources_langue.png)

---

[Pratiquons ensemble](/tp/android/android-base-tp.html#les-ressources-alternatives)

---

## Afficher un message à l'utilisateur

Plusieurs solutions (Toast, Snackbar, Dialog)

---

### Les toasts

![Toast](./img/toast.png)

---

## C'est à vous

Ajouter un Toast dans votre interface

```kotlin
// Récupération du context
val context = LocalContext.current

Toast.makeText(context, "Je suis un Toast", Toast.LENGTH_LONG).show();
```

⚠️ Avec la complétion d'Android Studio.

---

### Les Snackbars

![Snackbar avec action](./img/snackbar_action.jpg)

![Snackbar sans action](./img/snackbar_sans_action.jpg)

---

[https://developer.android.com/develop/ui/compose/components/snackbar]

---

### Vous souhaitez changer la durée d'affichage ?

#### Plusieurs options s'offre à vous :

- `Snackbar.LENGTH_SHORT`
- `Snackbar.LENGTH_LONG`
- `Snackbar.LENGTH_INDEFINITE`

---

## 6. Les interactions

---

## Très simple avec compose

- `onClick` : Clic sur un composant de type `Button`.
- `Modifier.clickable` : Clic sur tous les composants.

---

## Exemple

```kotlin
Button(onClick = { /* Action */ }) {
    Text("Cliquez ici")
}
```

L'action est déclenchée lors du clic sur le bouton. Simple, non ?

---

Si vous souhaitez par exemple afficher un Toast lors du clic sur un bouton :

```kotlin
val context = LocalContext.current

Button(onClick = {
    Toast.makeText(context, "Clic sur le bouton", Toast.LENGTH_LONG).show()
}) {
    Text("Cliquez ici")
}
```

---

Où sur une `Image` :

```kotlin
val context = LocalContext.current

Image(
    painter = painterResource(R.drawable.nom_image),
    contentDescription = "Une image",
    modifier = Modifier.size(128.dp).clickable {
        Toast.makeText(context, "Clic sur l'image", Toast.LENGTH_LONG).show()
    }
)
```

---

## C'est à vous

Ajouter une interaction sur votre bouton pour afficher un Toast.

---

[Voir dans le support](/tp/android/android-base-tp.html#rendre-un-element-clickable-2)

---

### Les Dialog

Interaction « complexe » avec l'utilisateur (Choix…)

![dialog.png](./img/dialog.png)

---

```kotlin
val context = LocalContext.current

AlertDialog(
    onDismissRequest = { /* Action */ },
    title = { Text("Titre") },
    text = { Text("Contenu") },
    confirmButton = {
        Button(
            onClick = {
                Toast.makeText(context, "Clic sur le bouton", Toast.LENGTH_LONG).show()
            }
        ) {
            Text("Confirmer")
        }
    },
    dismissButton = {
        Button(
            onClick = {
                Toast.makeText(context, "Clic sur le bouton", Toast.LENGTH_LONG).show()
            }
        ) {
            Text("Annuler")
        }
    }
)
```

---

## C'est à vous, je vous laisse ajouter un Dialog

---

Ok mais… mais comment « déclencher » ce Dialog ?

---

## En compose, il faut penser Code et État

---

```kotlin
var showDialog by remember { mutableStateOf(false) }

if (showDialog) {
    // Afficher le Dialog
}

Button(onClick = { showDialog = true }) {
    Text("Afficher le Dialog")
}
```

---

showDialog est un état qui permet de savoir si le Dialog doit être affiché ou non. Il est **mutable**, car il peut changer.

---

## On s'arrête un instant…

### Ça fait beaucoup là non ?

---

## Material ?

Ensemble « de règles » / de bonne pratique pour avoir des interfaces de qualités _ou_ cohérentes.

---

## Créer une Dialog avec la proposition de Google

[La documentation](https://material.io/develop/android/components/dialogs)

---

## Créer plusieurs « Pages »

Principe du Router en Web.

---

```kotlin
val navController = rememberNavController()

NavHost(
    modifier = Modifier.padding(innerPadding),
    navController = navController,
    startDestination = "screen1"
) {
    // Une page simple sans paramètre
    composable("screen1") { Screen1(navController) }

    // Une page avec un paramètre (ici un nom)
    composable(
        route = "screen2/{name}",
        arguments = listOf(navArgument("name") { type = NavType.StringType })
    ) { backStackEntry -> Screen2(
            navController,
            name = backStackEntry.arguments?.getString("name") ?: ""
        )
    }
}
```

---

## Ajouter la dépendance dans le `build.gradle`

```groovy
implementation("androidx.navigation:navigation-compose:2.7.7")
```

⚠️ N'oubliez pas de `Sync` votre projet.

---

## Exemple de page simple

```kotlin
@Composable
fun Screen1(navController: NavController) {
    Column {
        Button(onClick = { navController.navigate("screen2/Valentin") }) {
            Text("Bonjour Valentin")
        }
    }
}
```

---

## Exemple de page avec paramètre

```kotlin
@Composable
fun Screen2(navController: NavController, name: String) {
    Column {
        Text("Bonjour $name")
        Button(onClick = { navController.popBackStack() }) {
            Text("Retour")
        }
    }
}
```

---

- Où ranger ces pages ?
- Où mettre le Router ?

---

## C'est à vous

- Faire évoluer votre code pour y ajouter un Router.
- Découper votre code en :
  - `ui/` : Les pages.
    - `home.kt` : La page d'accueil, logo + deux boutons.
    - `screen1.kt` : La première page.
    - `screen2.kt` : La seconde page.

Screen 2 doit afficher le nom passé en paramètre.

---

## Testons ensembles

- Rendre dynamique le nom saisie dans la le Screen 1.

---

TODO : CONTINUER ICI

---

[Mettre en pratique avec la création d'un SplashScreen](/tp/android/android-base-tp.html#creer-une-autre-activity)

---

## Bon et les permissions ?

---

![Flow Permissions](./img/flow_permissions.png)

---

[La théorie c'est bien… La pratique c'est mieux](/tp/android/android-base-tp.html#les-permissions)

---

## Les RecyclerView (AdapterView)

---

![Adater](./img/adapter.jpg)

---

- **adapter** : gère les données pour les afficher dans la vue.
- L'adapter est associé à la liste.
- Un Datasource est attaché à l'Adapter.
- Les données sont ajoutées dans la Datasource.

---

- [En 3 fichiers version Java](https://gist.github.com/c4software/6687dc4bb1d858bb81a79313f0e81fd9)
- [En 3 fichiers version Kotlin](https://gist.github.com/c4software/95e51417890c68078c14555b2f1d9a03)

---

- [Guide complet](https://guides.codepath.com/android/Using-an-ArrayAdapter-with-ListView)

---

## C'est à vous !

### Ajoutons une RecyclerView « Simple de type String »

---

## C'est complexe… mais des librairies existent

- [FlexibleAdapter](https://github.com/davideas/FlexibleAdapter)
- [Recyclical](https://github.com/afollestad/recyclical) (Kotlin)

---

## C'est à vous !

### Utilisons ensemble la librairie Recyclical

---

## Réorganisons notre code

---

## Organisation du code

- MVP
- ViewModel

---

## Plus simplement pour commencer…

### Au minimum quelques packages

---

Android c'est très ouvert… Il faut s'imposer une organisation

---

## Quelques packages

- `ui/` (pour l'interface)
- `data/` (pour les données)
- `remote/` (pour la partie accès au API http)

---

Bien évidemment c'est un exemple

(Vous pouvez faire autrement…)

---

### Zoom sur le package ui

- Organisation par « vue » / « activity ».
- On regroupe les fonctionnalités par « vue » (exemple les `Adapters`)

---

### C'est à vous

Réorganisation de votre projet initial.

---

![Package](./img/packages.png)

---

## Pourquoi est-ce important

- Partage de code
- Reprise du code
- Maintenance
- …

---

## Sauvegarder des paramètres

- SharedPreferences
- SQLite (via `Room` par exemple)

---

## SharedPreferences

- Simple
- Type natif **exclusivement**(`int`, `string`, …)
- Persistant
- Supprimé à chaque réinstallation

---

[Voir dans le support un exemple](/tp/android/android-base-tp.html)

---

Des questions ?

---