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

TODO : Réécrire à partir de là

---

## Votre première application

- Activity
- Un Layout associé
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

- L'ensemble de vos activity hérite d'une super **Activity**.
- « Override » surcharge des méthodes de base (au début uniquement onCreate).

---

## Un détail qui compte… les layouts

- Constraint Layout
- Linear Layout
- Relative Layout
- Grid Layout

---

## Constraint Layout

- Contraint par rapport au « TOP, BOTTOM, START, END » des autres éléments.
- La nouvelle façon de faire.

---

## Les éléments du Layout

- TextView
- Button
- RecyclerView
- ImageView
- …

---

## Comment les découvrir ?

- Via l'interface graphique.
- Via l'autocomplétion dans le XML de layout (oui, oui, oui)

---

<center>
    <iframe src="https://giphy.com/embed/xSTtrYhZOpDjYIGkYC" width="480" height="343" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</center>

---

## Exemple de Layout

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/btn"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

---

✋ Quelques points importants ✋

- Les Namespaces (Tools, App, Android)
- L'internationalisation (i18n)
- Les contraints
- Les dimensions

---

<center>
    <iframe src="https://giphy.com/embed/kRXnZwKrPTwVq" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</center>

---

## Comment procéder ?

Via Android Studio bien évidemment. Et de préférence via l'éditeur XML

---

## C'est à vous

Ajouter un bouton dans l'interface et une ImageView.

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

- **anim** : Définition des propriétés d'animation (`R.anim.…`)
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

```java
Toast.makeText(this, "Bonjour à tous", Toast.LENGTH_SHORT).show();
```

⚠️ Avec la complétion d'Android Studio

---

### Les Snackbars

![Snackbar avec action](./img/snackbar_action.jpg)

![Snackbar sans action](./img/snackbar_sans_action.jpg)

---

```kotlin
Snackbar.make(findViewById(android.R.id.content), "Je suis une Snackbar", Snackbar.LENGTH_LONG).show()
```

```kotlin
Snackbar.make(findViewById(android.R.id.content), "Je suis une Snackbar", Snackbar.LENGTH_LONG).setAction("Action") {
   // Votre action
}.show()
```

---

### Vous souhaitez changer la durée d'affichage ?

#### Plusieurs options s'offre à vous :

- `Snackbar.LENGTH_SHORT`
- `Snackbar.LENGTH_LONG`
- `Snackbar.LENGTH_INDEFINITE`

---

## C'est à vous

Remplacer le toast dans votre interface

⚠️ Avec la complétion d'Android Studio

---

## Interagir avec l'utilisateur

### 3 étapes

- Le layout (ajouter un `id`)
- La méthode `findViewById` (dans le code)
- Le `setOnClickListener(…)`

---

## Le listener

```java
findViewById<Button>(R.id.myButton).setOnClickListener {
    Toast.makeText(this, "Bonus Point", Toast.LENGTH_LONG).show();
};
```

---

## ViewBinding

La nouvelle façon de faire :

- Gère le typage.
- NullSafety.
- [La documentation](https://developer.android.com/topic/libraries/view-binding)

---

## Dans le Build.gradle

Activer le « ViewBinding », dans le block Android déjà présent ajouter :

```txt
android {
    [...]
    buildFeatures {
        viewBinding = true
    }
}
```

---

![Dans Mon Cas](./img/viewBinding.png)

---

Dans vos class, modifier le code pour :

```kotlin
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding // <-- Référence à notre ViewBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // --> Indique que l'on utilise le ViewBinding
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // L'ensemble de nos références sont disponibles directement dans « binding.LE_NOM_DE_L_ELEMENT »
        binding.button.setOnClickListener {
            // Click sur le Button nommé « Button » dans notre Layout.
        }
    }
}
```

---

[Voir dans le support](/tp/android/android-base-tp.html#rendre-un-element-clickable-2)

---

## Paramètre et le Scope `{ … }`

Petite subtilité du Kotlin. Dans un Scope :

```kotlin
binding.button.setOnClickListener {
    // ICI une variable « it » est accessible. Elle contient votre bouton.
}
```

Où encore :

```kotlin
listOf<Device>().forEach {
    // « it » dans le cas présent est la valeur _courante_ de l'itération
}
```

---

Ou de manière plus explicite :

```kotlin
binding.button.setOnClickListener { button ->
    // ICI une variable « button » est accessible. Elle contient votre bouton.
}
```

```kotlin
listOf<Device>().forEach { device ->
    // « device » dans le cas présent est la valeur _courante_ de l'itération
}
```

⚠️ Vous avez le choix.

---

### Les Dialog

Interaction « complexe » avec l'utilisateur (Choix…)

![dialog.png](./img/dialog.png)

---

## C'est à vous

Ajouter une Dialog dans votre interface.

Nous allons utiliser la librairie [Material Dialog](https://github.com/afollestad/material-dialogs)

---

## Sans librairie

Grâce à [`Material.io`](https://material.io/develop/android/docs/getting-started)

---

## Material ?

Ensemble « de règles » / de bonne pratique pour avoir des interfaces de qualités _ou_ cohérentes.

---

## Ajouter la librairie.

### C'est à vous !

---

## Créer une Dialog avec la proposition de Google

[La documentation](https://material.io/develop/android/components/dialogs)

---

## Créer une activity

- Intégré dans Android Studio
- Une activity (Kotlin), Un Layout (XML), Une entrée dans le Manifest (XML)

---

## Démarrer une autre `activity`

Une astuce…

---

### Dans l'activity à démarrer ajouter

```kotlin
companion object {
    fun getStartIntent(context: Context): Intent {
        return Intent(context, MaClass::class.java)
    }
}
```

---

### Et quand on souhaite afficher la vue

```java
startActivity(MaClass.getStartIntent(this));
```

---

![Create Activity](./img/create_activity.png)

---

![Create Activity suite](./img/create_activity2.png)

---

## Testons ensembles

- Création « d'un Splash ».
- Démarrage après un délai « simulant un petit chargement » la Home.

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