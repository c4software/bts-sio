# Android Compose

## Une liste et une API Rest

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Jusqu'ici

Vos listes affichent des données écrites **en dur**.

Question : et si elles venaient d'un serveur ?

---

## Une API Rest

```text
Application  →  GET /todos  →  API
Application  ←     JSON     ←  API
```

L'application demande, le serveur répond avec de la donnée.

---

## Question

Ouvrir la connexion, envoyer la requête, décoder le JSON…

Vous écrivez tout ça à la main ?

---

## Retrofit

```kotlin
interface APIService {
    @GET("todos")
    suspend fun getTodos(): List<Todo>
}
```

Vous décrivez l'API, Retrofit génère le code.

Le JSON devient une liste de `Todo`.

---

## Trois dossiers

- `screens` : les écrans.
- `components` : les composants utilisés par les écrans.
- `data` : l'accès aux données (l'API).

---

## Question

Le réseau est lent.

Que voit l'utilisateur pendant ce temps ?

---

## Ne jamais bloquer l'interface

L'appel réseau part dans une **coroutine**, en parallèle.

L'interface, elle, reste fluide.

---

## Dans le ViewModel

1. « Les données sont en cours de chargement. »
2. Une coroutine appelle l'API.
3. La variable réactive reçoit les données.
4. « C'est chargé », ou « une erreur est survenue ».

---

## Trois états

```kotlin
when (loadingState.value) {
    LOADING_STATES.LOADING -> { Loader() }
    LOADING_STATES.LOADED -> { ListItems(items = items.value) { … } }
    LOADING_STATES.ERROR -> { Error() }
}
```

Un `enum` plutôt que des booléens : plus simple à lire.

---

## La vue écoute

```kotlin
val loadingState = viewModel.loadingState.collectAsState()
val items = viewModel.itemsList.collectAsState()
```

Le ViewModel met à jour, l'écran suit.

---

## Et les images ?

Elles aussi viennent du réseau.

**Coil** : le composant `AsyncImage` charge une image depuis son URL.

---

## Récapitulatif

- **Retrofit** : une interface décrit l'API, le code est généré.
- L'appel réseau dans une **coroutine**, jamais dans l'interface.
- Trois états : chargement, chargé, erreur.
- Le **ViewModel** charge, la vue observe (`collectAsState`).
- **Coil** pour les images distantes.

---

## Des questions ?

Place au code 🚀
