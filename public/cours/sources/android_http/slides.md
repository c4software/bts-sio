## Les appels réseau

---

## La permission

- `<uses-permission android:name="android.permission.INTERNET"/>`

---

### Mais avant…

## Les Threads

---

- Les appels ne doivent **pas** être faits dans le Thread UI.
- Le traitement de l'affichage doit être fait sur le Thread UI.

---

![what](./img/what2.gif)

---

## Les librairies

- OkHttp
- GSON
- Retrofit
- CoRoutines Kotlin

---

## Les CoRoutines Kotlin

- Quelques explications…
- Asynchrone, vous connaissez ?
- Un mot magique… `suspend`

```kotlin
implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.11.0")
implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.11.0")
```

---

## OkHttp

- RestClient
- Http2
- Gestion du cache
- Intercepteur de requête

---

```kotlin
implementation("com.squareup.okhttp3:okhttp:5.5.0")
implementation("com.squareup.okhttp3:logging-interceptor:5.5.0")
```

---

## GSON

- Sérialisation / Désérialisation automatique entre un JSON et un Objet Java / Kotlin

---

```kotlin
implementation("com.squareup.retrofit2:converter-gson:3.0.0")
```

---

## Retrofit

- Une API Http qui s'utilise comme une « Interface Java ».
- Conversion de données (mapping automatique des objets 🚀).
- Utilise des annotations (@GET, @POST, @PUT, @DELETE, @HEAD, …)
- Compatible CoRoutine (mais également sans)

---

```kotlin
implementation("com.squareup.retrofit2:retrofit:3.0.0")
```

---

## Les annotations

```kotlin
@GET("/status")
suspend fun readStatus(@Query("identifier") identifier: String): LedStatus

@POST("/status")
suspend fun writeStatus(@Body status: LedStatus): LedStatus
```

---

## Bon… Et maintenant !

---

## Deux fichiers

- Le `ApiService.kt` (l'interface et le builder pour la partie HTTP)
- La classe / un modèle `LedStatus`

---

## L'interface (et le builder)

### Deux méthodes

- ReadStatus
- WriteStatus

---

## L'objet de retour et d'action

`LedStatus`

---

## Le model : LedStatus

---

- Construit par vous pour interagir.
- Construit automatiquement par GSON pour avoir le Status.

---

[Télécharger le fichier LedStatus.java](https://gist.github.com/c4software/11c170fde7c1f93b0ae9e562856c56a8)
(À ranger dans le package `….data.modele`)

---

## Le ApiService

---

- Définition du « connecteur » HTTP.
- Définition des méthodes.

---

[Télécharger le fichier ApiService.kt](https://gist.github.com/c4software/b3eb79cc5649d12e497dbf6d35649dcd)
(À ranger dans le package `….data.service`)

---

BuildConfig.URI_REMOTE_SERVER ?

---

## Externaliser la conf c'est bien !

![Niiice](./img/nice.gif)

---

```kotlin
android {
    defaultConfig {
        buildConfigField("String", "URI_REMOTE_SERVER", "\"http://IP.DE.VOTRE.ESP\"")
        // …
    }

    buildFeatures {
        buildConfig = true
    }
}
```

---

## Une API en `http://` ?

Bloqué par défaut depuis Android 9.

`android:usesCleartextTraffic="true"` sur la balise `<application>` du Manifest.

---

## C'est à vous

### Configurer votre projet

---

## Faire un appel réseau

---

### 1 - Obtenir l'APIService

```kotlin
ApiService.instance
```

---

### 2 - L'appel réseau

```kotlin
CoroutineScope(Dispatchers.IO).launch {
    runCatching {
        val readStatus = ApiService.instance.readStatus(ledStatus.identifier)
        ledStatus.setStatus(readStatus.status)
        setVisualState()
    }
}
```

On en parle non ?

---

### 3 - Profit !
