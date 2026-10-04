# Compose Multiplatform

## Une application, plusieurs plateformes

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Jusqu'ici

Vos applications Compose tournent sur Android.

Question : et sur iOS ? Sur un ordinateur ?

---

## Tout réécrire ?

- Une application Android en Kotlin.
- Une application iOS en Swift.
- Une application Desktop…

Trois fois le même travail 🚨

---

## Kotlin Multiplatform

Du code Kotlin **commun** à Android, iOS, Desktop, Web.

Mais uniquement la logique, pas l'interface.

---

## Compose Multiplatform

L'étape suivante, par JetBrains (en lien avec Google).

L'**interface** aussi devient commune.

---

## Vous connaissez déjà

```kotlin
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }

    Button(onClick = { count++ }) {
        Text("J'ai été cliqué $count fois")
    }
}
```

Même Kotlin, mêmes composants, même Material Design.

---

## Et Flutter ?

Même promesse, mais avec un autre langage (Dart).

Ici, nous restons en Kotlin.

---

## Un seul projet

```text
composeApp/src
├── commonMain   →  le code commun
├── androidMain  →  le spécifique Android
├── iosMain      →  le spécifique iOS
└── desktopMain  →  le spécifique Desktop (JVM)
```

---

## Question

Dans quel dossier doit se trouver la majorité de votre code ?

---

## commonMain

Le plus possible.

Les autres dossiers ne contiennent que ce qui ne peut pas être commun.

---

## Multiplateforme first

« Comment faire pour que mon code soit le plus commun possible ? »

Coder « comme avant » est l'erreur à ne pas commettre.

---

## Question

Vous devez afficher la caméra.

Elle fonctionne différemment sur chaque plateforme. Vous réécrivez tout l'écran trois fois ?

---

## Non, seulement la caméra

```kotlin
@Composable
expect fun CameraView()

@Composable
fun ScanScreen() {
    Box(modifier = Modifier.fillMaxSize()) {
        CameraView()
        // Le reste de l'écran est commun
    }
}
```

---

## expect et actual

- `expect` : « chaque plateforme **doit** fournir ceci » (dans `commonMain`).
- `actual` : l'implémentation, dans chaque plateforme.

Fonctions, classes, propriétés : tout y passe.

---

## À utiliser avec modération

D'abord le code commun, sans `expect`.

Ensuite seulement, ce qui doit vraiment être spécifique.

---

## Les ressources

```kotlin
val leDrawable = Res.drawable.NOM_DE_LA_RESSOURCE
val leTexte = stringResource(Res.string.app_name)
```

Communes elles aussi : `commonMain/composeResources`.

Les traductions suivent la langue de l'utilisateur.

---

## Les versions

`gradle/libs.versions.toml`

Toutes les versions des dépendances, au même endroit.

---

## Question

Jetpack Navigation n'existe que sur Android.

Comment naviguer entre nos écrans ?

---

## PreCompose

```kotlin
enum class Route(val path: String) {
    Default(getDefaultRoute()),
    Main("/"),
    Hello("/hello"),
    Scan("/scan")
}

expect fun getDefaultRoute(): String
```

Un `NavHost` et des routes, très proche de Jetpack.

---

## Koin

L'**injection de dépendances** : séparer la création d'un objet de son utilisation.

```kotlin
fun setupKoin() = startKoin {
    modules(platformSpecificModule())
    modules(networkModule)
}
```

---

## ktor

```kotlin
class NetworkOperation(private val client: HttpClient) {
    suspend fun getHello(): String? {
        return try {
            client.get("https://…/hello.md").body<String>()
        } catch (e: Exception) {
            null
        }
    }
}
```

Le client HTTP, fourni par Koin.

---

## Le ViewModel

```kotlin
class MainViewModel(private val networkOperation: NetworkOperation) : ViewModel(), IMainViewModel {
    override val isLoading: MutableStateFlow<Boolean> = MutableStateFlow(false)
}
```

L'état de l'écran, observé par la vue.

---

## Question

Pourquoi une interface `IMainViewModel` ?

---

## Pour les tests

Une interface se remplace facilement par un faux ViewModel.

Les tests aussi sont communs : `commonTest`.

---

## Et le stockage local ?

```kotlin
expect open class LocalStorage : ILocalStorage {
    override fun save(key: String, value: String)
    override fun get(key: String): String
}
```

Le contrat est commun, l'implémentation est par plateforme.

---

## Récapitulatif

- Un seul projet, un maximum de code dans `commonMain`.
- `expect` / `actual` pour ce qui diffère vraiment.
- **PreCompose** : navigation et ViewModel.
- **Koin** : injection de dépendances.
- **ktor** : appels réseau.
- Des tests communs, dans `commonTest`.

---

## Des questions ?

Place au TP 🚀
