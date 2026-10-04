# Android

## Appeler une API simplement

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Jusqu'ici

Votre application vit seule, avec ses propres données.

Question : et si elles venaient d'un serveur ?

---

## Internet, une variable incontrôlable

- L'utilisateur a-t-il du réseau ?
- Est-il rapide ?
- Le serveur répond-il ? Rapidement ?

---

## Question

Le serveur met 10 secondes à répondre.

Que devient votre interface pendant ce temps ?

---

## Deux règles imposées par Android

- Pas d'appel réseau depuis le `UIThread`.
- Pas de manipulation de l'interface depuis le `IOThread`.

Sinon ? L'application plante 🚨

---

## Deux threads

```text
UIThread  →  l'interface, les clics
IOThread  →  le réseau, les traitements longs
```

Chacun son travail.

---

## Question

Ouvrir la connexion, envoyer la requête, décoder le JSON, changer de thread…

Vous écrivez tout ça à la main ?

---

## Quatre librairies

- **OkHttp** : le client HTTP.
- **GSON** : JSON ↔ objet Kotlin.
- **Retrofit** : l'API décrite par une interface.
- **Coroutines** : la gestion des threads.

---

## Avant tout, la permission

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

Aucune confirmation n'est demandée à l'utilisateur.

---

## D'abord, le modèle

```json
[{ "id": 22, "name": "Valentin Brosseau", "content": "…", "done": true }]
```

```kotlin
data class SampleObject(var id: Int, var name: String, var content: String, var done: Boolean)
```

Un objet JSON = une `data class`.

---

## Ensuite, l'interface

```kotlin
interface ApiService {
    @GET("/status")
    suspend fun readStatus(@Query("identifier") identifier: String): Array<SampleObject>

    @POST("/status")
    suspend fun writeStatus(@Body status: SampleObject): Array<SampleObject>
}
```

Vous décrivez l'API, Retrofit génère le code.

---

## Les annotations

- `@GET`, `@POST`, `@PUT`, `@DELETE` : le type d'appel et son lien.
- `@Query` : un paramètre dans l'URL.
- `@Body` : un objet envoyé en JSON.

---

## Question

`suspend`, à votre avis ?

---

## suspend

La fonction peut se mettre **en pause**, puis reprendre.

Elle attend la réponse du serveur, sans bloquer le thread.

---

## Le builder

```text
OkHttp (timeout, logs, en-têtes)
   +  GSON (conversion)
   →  Retrofit  →  ApiService
```

Écrit une fois, dans un `companion object`.

---

## L'appel

```kotlin
CoroutineScope(Dispatchers.IO).launch {
    runCatching {
        val arrStatus = ApiService.instance.readStatus(identifier)

        runOnUiThread {
            dataSource.addAll(arrStatus)
        }
    }
}
```

---

## Dans l'ordre

1. `Dispatchers.IO` : nous partons sur le thread réseau.
2. `readStatus(…)` : l'appel, mis en pause jusqu'à la réponse.
3. `runOnUiThread` : retour sur l'interface pour afficher.

---

## Question

Et si vous oubliez le `runOnUiThread` ?

---

## L'application plante

Vous manipulez la vue depuis le mauvais thread.

C'est la seconde règle d'Android 😉

---

## Rangez votre code

- Les modèles dans un package.
- L'`ApiService` dans un autre (`remote.http` par exemple).
- L'adresse du serveur dans la configuration, pas en dur.

---

## Récapitulatif

- Le réseau, **jamais** sur le `UIThread`.
- Une `data class` par structure JSON.
- **Retrofit** : une interface décrit l'API.
- Une **coroutine** sur `Dispatchers.IO` pour l'appel.
- `runOnUiThread` pour mettre à jour la vue.

---

## Des questions ?

Place au TP 🚀
