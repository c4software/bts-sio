---
description: Dans ce TP nous allons mettre en pratique l'Ajax au travers de deux exemples, puis nous allons voir comment utiliser une API.
---

# Larablog 2.0 (Ajax & VueJS)

Dans le [TP Larablog](../laravel/larablog.md), nous avons créé une plateforme de blog en utilisant uniquement Laravel (Blade, Eloquent, etc). Ça fonctionne, mais vous l'avez certainement remarqué, nous avons des pages qui se rechargent entièrement à chaque fois que nous effectuons une opération. Dans ce tp, nous allons voir comment ajouter du JavaScript afin d'améliorer l'expérience utilisateur.

::: details Sommaires
[[toc]]
:::

## Préparation

- Récupérer le code du [TP Larablog](../laravel/larablog.md).
- Installer les dépendances : `composer install`
- Lancer le serveur : `php artisan serve`

Pour rappel, la plateforme Larablog permet :

- Création de comptes.
- Connexion / Déconnexion.
- CRUD des articles (création, modification, suppression).
- Consultation des articles.
- Like d'article (avec compte utilisateur).
- Système de commentaires (avec compte utilisateur).

<center>
<iframe width="100%" height="700px" src="https://www.youtube-nocookie.com/embed/fevKbHEFDzk?si=EdcDYdQh5SqKNkSO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</center>


## Introduction

Dans ce TP nous allons explorer la modernisation d'un site Web classique en ajoutant de la réactivité. Nous allons voir comment le JavaScript et plus particulièrement l'Ajax et VueJS peuvent nous aider à améliorer l'expérience d'un utilisateur.

L'une des forces de VueJS est sa simplicité et sa facilité d'intégration dans un projet existant. Ici nous allons l'utiliser pour améliorer le projet Larablog afin de lui donner le comportement des sites type X, Youtube, etc.

En détail nous allons créer des API (Application Programming Interface) qui vont nous retourner des données au format JSON, puis nous allons les consommer dans notre site Web. Mais avant tout, **pourquoi faire ça ?** L'avantage de découper le traitement comme ça. C'est que nous pourrions très simplement créer un client « Mobile », et ça sans toucher au code de notre serveur.

Pleins d'avantages :

- Code unique pour le Web et les autres plateformes
- Centralisation de la logique dans un code dédié à la récupération « du contenu » (les vidéos en l'occurrence).
- Approche microservices, nous pouvons donc héberger notre site Internet sur une autre plateforme que l'API.

::: danger Un INSTANT !
Une API ? What ? Alors, une API dans le fond c'est « comme une page web ». Mais, cette page web ne produit pas du HTML et n'a pas pour vocation d'être lue par un humain.

C'est donc du code (du PHP dans notre cas, mais ça pourrais être autre chose) qui va permettre de faire parler deux ordinateurs (le client et le serveur) dans un langage spécifique (XML, JSON …)
:::

## Identifier les pages à améliorer

Avant d'aller plus loin, réfléchissons ensemble sur les pages / éléments qui pourraient être améliorer et qui pourraient bénéficier d'un peu de réactivité.

::: tip Stop !  

Avant de continuer, à vos crayons, et sur une feuille, listez les pages / éléments qui pourraient être améliorer.

:::

## La réactivité

Rappel, qu'est-ce que la réactivité ? La réactivité est le fait de ne pas recharger une page entière pour en changer le contenu. Ça aura plusieurs impacts dans notre code :

- Observer les interactions de l'utilisateur (clic, etc)
- Obtention de données depuis le serveur (Ajax).
- Modification de la page / ou d'une partie de la page avec VueJS.

![Schéma de la réactivité](./res/data.png)

## Ajax pure ou Ajax avec VueJS ?

Nous avons plusieurs écoles, certains préfèrent faire du VanillaJS (JavaScript pur) et d'autres préfèrent utiliser des librairies / frameworks. Dans ce TP, nous allons utiliser VueJS, car celui-ci est très simple à mettre en place et à utiliser. Mais, sachez que vous pouvez très bien faire la même chose avec du JavaScript pur.

L'avantage de VueJS est que celui-ci va nous simplifier la manipulation du DOM (c'est-à-dire la page HTML). En effet, VueJS va nous permettre de créer des boucles, des conditions, etc. Mais, surtout, il va nous permettre de mettre à jour le DOM de manière automatique. C'est-à-dire que si nous modifions une variable, alors le DOM sera mis à jour automatiquement.

## Mettre en place une méthodologie

Avant de commencer nos évolutions, nous allons mettre en place une méthodologie de travail. En effet pour ne pas se retrouver submergé par les modifications, il est important de découper notre travail en plusieurs étapes.

- Étape 1 : Les données, quelles données allons-nous avoir besoin ? Comment les obtenir ?
- Étape 2 : Quelle partie du code va être ajoutée ? Les contrôleurs, les vues, les routes ?
- Étape 3 : Quelle partie du code va être modifiée ? Les contrôleurs, les vues, les routes ?
- Étape 4 : Quelle partie du code va être supprimée ? Les contrôleurs, les vues, les routes ?

Cette étape est importante, car si vous ne la réalisez pas, vous serez vite perdu et dépasser par les évolutions que vous allez mettre en place.

Dans notre projet, nous avons identifié les fonctionnalités suivantes à faire évoluer :

- Le système de like.
  - Liker un article.
- Le système de commentaires.
  - Lister les commentaires d'un article.
  - Ajouter un commentaire à un article.

Nous allons maintenant commencer à proprement parler notre travail. Nous allons commencer par le système de like.

## Évolution du système de like

Rappel du fonctionnement actuel, actuellement vous pouvez en tant qu'utilisateur liker un article. Lors de l'appui sur le bouton « like » la page se recharge et le compteur de like est mis à jour.

Lors du chargement de la page « /like/{id} » le contrôleur récupère l'article, puis ajoute +1 au compteur de like, puis sauvegarde l'article. Ensuite, la page est rechargée et l'utilisateur est redirigé vers la page de l'article. La page article affiche alors le nouveau compteur de like.

Nous allons donc modifier le comportement de la page article, afin que celle-ci ne se recharge pas entièrement, mais que seul le compteur de like soit mis à jour lors de l'appui sur le bouton « like » (fonctionnement très similaire à celui de X par exemple).

### Étape 1 : Les données

Nous allons maintenant chercher dans notre code existant, le code que nous devons reprendre / modifier. Nous avons dans notre code deux parties qui sont intéressantes :

- L'obtention de la valeur du compteur de like.
- L'incrémentation de la valeur du compteur de like.

Notre code actuel ressemble à quelque chose comme ça :

```php
// Récupération de l'article, et affichage de celui-ci.
function Article(Article $id)
{
    return view('article', ['article' => $article]);
}

// Incrémentation du compteur de like puis redirection vers la page de l'article.
function AjoutLike(Article $id)
{
    $article->like = $article->like + 1;
    $article->save();

    return redirect()->route('article', ['id' => $id]);
}
```

Ce que nous souhaitons faire, c'est obtenir les données au format « brut », dans un JSON (JavaScript Object Notation). Pour cela, nous allons avoir besoin de nouvelles routes de type API. Laravel intègre un système de route dédié à ce type de besoin. Nous allons donc créer une nouvelle route dans le fichier « routes/api.php » :

```php
Route::get('/article/{article}/like', [ApiController::class, 'getLike']);
Route::post('/article/{article}/like', [ApiController::class, 'addLike']);
```

::: tip Quel sont les différences entre `web.php` et `api.php` ?

La différence entre les deux fichiers de route est simple. Le fichier « web.php » est dédié aux routes de type « page web ». C'est-à-dire que les routes de ce fichier vont retourner du HTML. Le fichier « api.php » est dédié aux routes de type « API ». C'est-à-dire que les routes de ce fichier vont retourner du JSON.

Les routes de type « API » sont généralement utilisées pour des applications mobiles, ou des applications web qui utilisent du JavaScript pour récupérer les données. Elles sont automatiquement préfixées par « /api » suivi de la route. Par exemple, la route « /article/{id}/like » sera accessible via l'URL « /api/article/{id}/like ».

:::

Nous avons donc deux routes, une pour obtenir le nombre de like, et une pour ajouter un like. Vous l'avez remarqué, nous avons utilisé un nouveau contrôleur « ApiController ». Nous allons donc créer ce contrôleur :

```bash
php artisan make:controller ApiController
```

Nous avons maintenant un nouveau contrôleur, nous allons donc pouvoir commencer à coder nos méthodes.

### Étape 2 : Ajout des méthodes

Pour retourner du JSON, nous allons utiliser la méthode « json » de Laravel. Nous allons donc ajouter cette méthode dans notre contrôleur :

```php
public function getLike(Article $article)
{
    return response()->json(['like' => 666]);
}
```

Je vous laisse réfléchir au code que nous pourrions mettre dans ces deux méthodes. Vous l'avez déjà fait dans le projet Larablog, mais je vous laisse réfléchir à la logique que nous allons mettre en place.

Une fois réfléchi je vous laisse le mettre en place dans votre projet.

::: details Besoin d'aide ?

Nous allons maintenant ajouter les méthodes dans notre contrôleur. Nous allons commencer par la méthode « getLike » :

```php
public function getLike(Article $article)
{
    return response()->json(['like' => $article->like]);
}
```

Un peu de détail sur cette méthode :

- Nous utilisons la méthode « response » afin de créer une réponse au format JSON.
- Nous utilisons la méthode « json » afin de créer un JSON à partir d'un tableau associatif.
- Nous utilisons le type `Article` afin de récupérer l'article depuis la base de données en fonction de l'id passé dans l'URL.

Nous allons maintenant ajouter la méthode « addLike » :

```php
public function addLike(Article $article)
{
    $article->like = $article->like + 1;
    $article->save();

    return response()->json(['like' => $article->like]);
}
```

Cette méthode est très similaire à la précédente, nous avons juste ajouté l'incrémentation du compteur de like.

:::

::: tip Que doivent retourner les méthodes ?

Nous allons observer le résultat avec PostMan, mais en attendant, voilà ce que retournent les méthodes :

```json
// Méthode getLike
{
    "like": 0
}

// Méthode addLike
{
    "like": 1
}
```

Nous avons donc dans les deux cas un JSON avec une clé « like » et une valeur qui correspond au nombre de like.

:::

Ici, vous observerez que nous avons du code très similaire au code d'origine. Nous avons juste extrait la partie « récupération de l'article » et « sauvegarde de l'article » dans le contrôleur. En effet, quand nous travaillons avec des API, « nous oublions » la partie « affichage » afin de nous concentrer sur la données brute.

#### Tester notre code

Pour l'instant nous n'avons pas de consommateur de notre API. Nous allons donc devoir utiliser un outil externe dédier à ce genre d'usage. Il en existe plusieurs, mais PostMan est celui qui est actuellement le plus utilisé. 

- Télécharger PostMan : [https://www.postman.com/downloads/]

::: tip Pas besoin de compte

Vous n'avez pas l'obligation de créer un compte pour utiliser PostMan. Il suffit de cliquer sur « Skip signing in and take me straight to the app ». 

:::

Vous n'avez jamais utilisé PostMan, nous allons le faire ensemble. Mais voilà un petit résumé de ce que nous allons faire en photo :

![PostMan en GET](./res/larablog_api_get.jpg)
![PostMan en POST](./res/larablog_api_post.jpg)

Votre code fonctionne ? Vous avez bien un retour au format JSON ? Si oui, nous pouvons passer à l'étape suivante.

### Étape 3 : Modification du code

Maintenant que nous avons nos API, nous allons modifier notre code afin de consommer ces API. Nous allons commencer par la page « article.blade.php ». Nous allons modifier le code de la page afin de mettre en place le système de like avec VueJS.

#### Ajouter VueJS

Avant de créer notre consommateur, nous allons ajouter VueJS. Pour ajouter VueJS, nous avons deux solutions :

- Utiliser un CDN (Content Delivery Network).
- Utiliser un package manager (npm, yarn, etc).

Dans notre cas, pour simplifier le TP, nous allons utiliser un CDN de type ESM (ECMAScript Module). Nous allons inclure ce CDN directement dans notre code JavaScript au moment de l'écriture de celui-ci.

#### Créer un consommateur

Nous allons maintenant créer un consommateur pour notre API. Nous allons créer un fichier « like.js » dans le dossier « public/ ». 

::: tip Pourquoi dans le dossier « public » ?

Dans Laravel, nous avons deux dossiers qui semblent se ressembler, mais qui sont très différents. Le dossier « public » est le dossier qui est accessible depuis Internet. C'est-à-dire que si vous mettez un fichier dans ce dossier, alors celui-ci sera accessible depuis Internet. Le dossier « resources » est le dossier qui servira à la compilation de vos fichiers (soit par vite, soit par Blade). 

Le dossier « public » est donc le dossier qui contient les fichiers qui seront envoyés à l'utilisateur. Le dossier « resources » est le dossier qui contient les fichiers qui seront utilisés par le serveur pour générer les fichiers du dossier « public ».

Les ressources placées dans le dossier public sont accessibles via la syntaxe suivante <span v-pre>`{{ asset('chemin/vers/le/fichier') }}`</span>. Par exemple, si vous avez un fichier « like.js », alors vous pourrez l'inclure dans votre page avec la syntaxe suivante :

```html
<script type="module" src="{{ asset('like.js') }}"></script>
```

Que veux dire `type="module"` ? Cela signifie que le fichier est un module JavaScript. C'est-à-dire que le fichier peut être importé dans un autre fichier JavaScript. C'est la nouvelle norme JavaScript, et c'est pour cela que nous utilisons un CDN de type ESM.

:::

Pour le code de notre consommateur, pour l'instant nous allons juste mettre un code de test :

```js
import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
    setup() {
        console.log("Démarrage du système de like en Vue.js")
    }
}).mount('#like')
```

Un peu de détail sur ce code :

- Nous utilisons la méthode `createApp` afin de créer une application VueJS.
- Nous utilisons la méthode `setup` afin de créer une fonction qui sera exécutée au démarrage de l'application.
- Nous utilisons la méthode `mount` afin de lier notre application à un élément HTML. Dans notre cas, nous allons lier notre application à l'élément HTML qui a pour id « like » (c'est-à-dire `<div id="like"></div>`).
- En haut du fichier, nous utilisons la méthode `import` afin d'importer des fonctions depuis un autre fichier. Dans notre cas, nous importons la fonction `createApp` et `ref` depuis le fichier « vue.esm-browser.js ».

##### Modifier la page de l'article

Pour que notre code fonctionne, nous allons évidemment devoir modifier la page de l'article. Nous allons donc modifier le code de la page de l'article afin d'ajouter un élément HTML qui aura pour id « like », celle-ci englobera le bouton « like » et le compteur de like.

![Schéma de la page de l'article](./res/larablog_div_like.jpg)

::: details Dans **mon cas**, j'ai modifié mon code HTML comme ceci :

```html
@auth
<div id="like">
    <a href="{{ route('article.like', $article->id) }}" class="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61" clip-rule="evenodd" />
        </svg>
        <span>{{$article->like}}</span>
    </a>
</div>
<script type="module" src="{{ asset('like.js') }}"></script>
@endauth
```

Un peu de détail sur ce code :

- Nous utilisons la directive `@auth` afin de vérifier si l'utilisateur est connecté.
- J'ai ajouté un élément HTML `<div id="like">` qui englobe le bouton « like » et le compteur de like.
- J'ai ajouté un élément HTML <span v-pre>`<script type="module" src="{{ asset('like.js') }}"></script>`</span> qui permet d'inclure le fichier « like.js » dans la page.

:::

Je vous laisse mettre en place ce code dans votre projet. Si vous avez des difficultés, n'hésitez pas à me demander de l'aide. Une fois intégré, vous devriez avoir dans votre console le message « Démarrage du système de like en Vue.js ».

![Console avec le message de démarrage](./res/larablog_like_console.jpg)

##### Point étape

Vous l'avez remarqué, pour l'instant notre code ne fait rien. Nous avons juste mis en place l'architecture de notre code. Nous allons maintenant commencer à coder notre consommateur. 

::: tip Beaucoup de code

Vous l'avez remarqué, pour l'instant je vous donne énormément de code. En effet, vous débutez en VueJS, et je ne veux pas vous perdre avec des détails techniques. Mais, sachez que vous pouvez très bien faire ce TP sans mon aide. Pour cela, je vous invite à lire la documentation de VueJS : [https://v3.vuejs.org/guide/introduction.html]

Continuons notre TP, nous allons maintenant coder notre consommateur.

:::

##### Coder le consommateur

Nous allons maintenant coder notre consommateur. Je vais vous donner le code, puis nous allons le détailler ensemble, remplacer le code de votre fichier « like.js » par celui-ci :

```js
import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

// On récupère l'élément HTML qui contient notre composant
// Nous en avons besoin pour récupérer les données de l'élément (data-id)
// et les passer au composant. (voir plus bas)
const mountEl = document.querySelector("#like");

createApp({
    /**
     * Une propriété props est une propriété qui est passée à un composant
     * depuis le composant parent. Ici, on récupère l'id de l'article
     */
    props: {
        id: {
            required: true
        }
    },
    setup(props) {
        // Compteur de like
        const count = ref("-");

        // Récupération du nombre de like
        fetch(`/api/article/${props.id}/like`)
            .then(response => response.json())
            .then(data => count.value = data.like)

        // Méthode pour ajouter un like, cette méthode est appelée au clic sur le bouton
        function addLike() {
            fetch(`/api/article/${props.id}/like`, { method: 'POST' })
                .then(response => response.json())
                .then(data => count.value = data.like)
        }

        // On retourne les données et les méthodes pour le template
        return {
            count,
            addLike
        }
    }
}, { ...mountEl.dataset }).mount(mountEl)
```

Un peu de détail sur ce code :

- Nous utilisons la méthode `defineProps` afin de définir les propriétés qui seront passées au composant. Dans notre cas, nous avons une propriété « id » qui est obligatoire.
- Nous utilisons la méthode `setup` afin de créer une fonction qui sera exécutée au démarrage de l'application.
- Nous utilisons la méthode `ref` afin de créer une variable réactive. C'est-à-dire que si la variable change, alors le DOM sera mis à jour automatiquement.
- Nous utilisons la méthode `fetch` afin de faire une requête Ajax. Nous utilisons la méthode `then` afin de récupérer le résultat de la requête. Nous utilisons la méthode `json` afin de convertir le résultat de la requête en JSON. Nous utilisons la méthode `then` afin de récupérer le JSON. Nous utilisons la méthode `value` afin de modifier la valeur de la variable réactive.
- Nous utilisons la méthode `return` afin de retourner les données et les méthodes qui seront utilisées dans le template.
- Nous utilisons la méthode `mount` afin de lier notre application à un élément HTML. Dans notre cas, nous allons lier notre application à l'élément HTML qui a pour id « like » (c'est-à-dire `<div id="like"></div>`).
- `mountEl.dataset` permet de récupérer les attributs HTML de l'élément HTML. Dans notre cas, nous récupérons l'attribut « data-id » qui contient l'id de l'article qui est passé dans le code HTML.

Le code peut vous paraître compliqué, mais en réalité il est très simple. Nous avons juste :

- Créer une variable réactive qui contient le nombre de like.
- Fait une requête Ajax pour récupérer le nombre de like.
- Fait une requête Ajax pour ajouter un like.
- L'ensemble de ces actions sont automatiquement liées au DOM.

##### Modifier le code HTML

Pour que notre code fonctionne, nous allons évidemment devoir modifier la page de l'article. Nous allons donc modifier le code de la page de l'article afin d'ajouter un élément HTML qui aura pour id « like », celle-ci englobera le bouton « like » et le compteur de like.

![Schéma de la page de l'article](./res/larablog_code_du_composant.jpg)

- En orange : Le code qui spécifie l'id de l'article, celui-ci est récupéré par le composant pour faire les requêtes Ajax.
- En vert : L'action qui est appelée au clic sur le bouton « like ». `@click` permet d'ajouter un événement au clic sur l'élément HTML. `addLike` est la méthode qui est appelée au clic sur le bouton « like ».
- En bleu : Le code qui affiche le nombre de like. `@{{ count }}` permet d'afficher la valeur de la variable réactive `count`. La variable réactive `count` est mise à jour automatiquement par le composant. C'est-à-dire que si la valeur de la variable `count` change, alors le DOM sera mis à jour automatiquement.
  - Le `@` permet d'indiquer à Blade que le code entre accolades doit être interprété par VueJS et non par Blade.

::: details Dans **mon cas**, Le code final ressemble à :

```html
@auth
<div id="like" data-id="{{ $article->id }}">
    <span @click="addLike" class="cursor-pointer block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61" clip-rule="evenodd" />
        </svg>
        <span> @{{ count }}</span>
    </span>
</div>
<script type="module" src="{{ asset('like.js') }}"></script>
@endauth
```

:::

C'est à vous, je vous laisse mettre en place ce code dans votre projet. Si vous avez des difficultés, n'hésitez pas à me demander de l'aide. Une fois intégré, vous devriez obtenir :

<center>
<iframe width="560" height="315" src="https://www.youtube.com/embed/_hzgjiQxNSA?si=HOXMZp4_zNjaICiI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</center>

Vous noterez que le compteur de like est mis à jour automatiquement et que la page ne se recharge pas entièrement. Vous pouvez observer les appels Ajax dans l'onglet « Network » de votre navigateur.

Vous noterez également que le ressenti utilisateur est bien meilleur. En effet, l'utilisateur n'a plus besoin d'attendre le rechargement de la page pour voir le compteur de like mis à jour. Le fonctionnement semble plus fluide, plus réactif.

::: tip Complexité

La complexité du code peut vous paraître importante. Mais, sachez que nous avons fait le choix de faire un code « propre » et « maintenable ». En effet, nous avons séparé les parties « récupération des données » et « affichage des données ». Cela nous permet de pouvoir réutiliser le code de récupération des données dans d'autres parties de notre site Web.

Si demain vous souhaitez porter votre site internet sur une application mobile, alors vous pourrez réutiliser le code de récupération des données. Vous n'aurez pas besoin de modifier le code de récupération des données, car celui-ci est indépendant de l'affichage.

De plus, VueJS permet de créer des sortes de composants, ce que vous avez réalisé avec le « like », est en quelque sorte un composant. Il est indépendant du reste de votre code, si je vous disais de l'ajouter dans la partie administration, vous n'auriez rien à modifier. Vous pourriez juste copier / coller le code du composant.

D'ailleurs… c'est une bonne idée ! Je vous laisse ajouter le composant « like » dans la partie administration.

:::

### Étape 4 : Interdire l'auto-like

Actuellement il est possible de s'auto-liker. C'est-à-dire que vous pouvez liker votre propre article. Je vous laisse trouver comment interdire cela dans votre API.

::: danger L'art du placement

Bien placer son code c'est un peu comme le travail d'un artiste… Un peu à la manière d'un peintre, vous devez placer votre code au bon endroit. 

Ici nous parlons d'un problème de « sécurité », le code doit être placé au plus proche de la source. C'est-à-dire que le code doit être placé au plus proche de la base de données. Dans notre cas, le code doit être placé dans le contrôleur et plus précisément dans la méthode « addLike ».

:::

## Les commentaires

Nous avons vu ensemble comment mettre en place un système de like. Nous allons maintenant mettre en place un système de commentaire. Nous allons commencer par lister les commentaires d'un article.

### Étape 1 : Les données

Nous allons commencer par créer deux nouvelles routes dans le fichier « routes/api.php » :

```php
Route::get('/article/{article}/comments', [ApiController::class, 'getComments']);

Route::middleware('web')->group(function () {
    // Le middleware web permet d'avoir accès à la session
    Route::post('/article/{article}/comment', [ApiController::class, 'addComment']);
});
```

Nous allons maintenant ajouter les méthodes dans notre contrôleur, contrairement au code que vous aviez écrit dans le projet Larablog, ici nous allons passer par le modèle `Comment` afin de récupérer les commentaires AINSI que les informations de l'utilisateur qui a écrit le commentaire.

En effet, ici nous nous concentrons sur la données, il est donc plus logique de passer par le modèle `Comment` afin de récupérer les commentaires plutôt que de passer par le modèle `Article` qui récupèrera des données d'article non utiles dans notre API.

```php
// Récupération des commentaires d'un article
public function getComments($id)
{
    $comments = Comment::where('article_id', $id)->with("user")->get();
    return response()->json(['comments' => $comments]);
}

// Ajout d'un commentaire à un article
public function addComment(Article $article, Request $request)
{
    $comment = new Comment();
    $comment->content = $request->input('content');
    $comment->user_id = auth('api')->user()->id;
    $comment->article_id = $article->id;
    $comment->save();

    $comments = Comment::where('article_id', $article->id)->with("user")->get();

    return response()->json(['comments' => $comments]);
}
```

Un peu de détail sur ce code :

- Nous utilisons la méthode `input` afin de récupérer les données envoyées par le client. Dans notre cas, nous récupérons la valeur de l'input « content ».
- Nous utilisons la méthode `Auth::id()` afin de récupérer l'id de l'utilisateur connecté.
- Nous utilisons la méthode `save` afin de sauvegarder le commentaire dans la base de données.
- Nous utilisons la méthode `with` afin de récupérer les informations de l'utilisateur qui a écrit le commentaire. C'est-à-dire que nous récupérons l'utilisateur qui a écrit le commentaire. Nous utilisons la méthode `get` afin de récupérer les commentaires.

#### Tester vos API

Avant de continuer, je vous laisse tester vos API avec PostMan. Vous devriez obtenir quelque chose comme ça :

Pour la liste :

```json
{
    "comments": [
        {
            "id": 5,
            "user_id": 4,
            "article_id": 11,
            "content": "Commentaire",
            "created_at": "2023-11-02T10:40:09.000000Z",
            "updated_at": "2023-11-02T10:40:09.000000Z"
        },
        {
            "id": 6,
            "user_id": 4,
            "article_id": 11,
            "content": "HOHO",
            "created_at": "2023-11-02T10:40:16.000000Z",
            "updated_at": "2023-11-02T10:40:16.000000Z"
        }
    ]
}
```

Pour l'ajout :

```json
{
    "comments": [
        {
            "id": 5,
            "user_id": 4,
            "article_id": 11,
            "content": "Commentaire",
            "created_at": "2023-11-02T10:40:09.000000Z",
            "updated_at": "2023-11-02T10:40:09.000000Z"
        },
        {
            "id": 6,
            "user_id": 4,
            "article_id": 11,
            "content": "HOHO",
            "created_at": "2023-11-02T10:40:16.000000Z",
            "updated_at": "2023-11-02T10:40:16.000000Z"
        },
        {
            "id": 7,
            "user_id": 4,
            "article_id": 11,
            "content": "Test",
            "created_at": "2023-11-02T10:40:23.000000Z",
            "updated_at": "2023-11-02T10:40:23.000000Z"
        }
    ]
}
```

Un peu de détail sur le résultat :

- Nous avons un tableau « comments » qui contient les commentaires.
- Chaque commentaire est un tableau associatif qui contient les informations du commentaire.
- Les deux méthodes retournent le même résultat, c'est-à-dire que la méthode « addComment » retourne le même résultat que la méthode « getComments ».

### Étape 1b : Nettoyage du code

Le code que nous avons écrit est normalement déjà présent dans votre projet, mais dans la partie non API. Nous allons donc supprimer le code de la partie non API. Nous allons donc supprimer les méthodes « getComments » et « addComment » du contrôleur « ArticleController ».

### Étape 2 : Créer le « composant »

Nous allons maintenant créer le composant qui va afficher les commentaires. Nous allons créer un fichier « comments.js » dans le dossier « public/ ».

Cette fois-ci je ne vais pas vous donner l'ensemble du code, mais juste la structure :

```js
import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

// On récupère l'élément HTML qui contient notre composant
// Nous en avons besoin pour récupérer les données de l'élément (data-id)
// et les passer au composant. (voir plus bas)
const mountEl = document.querySelector("#comments");

createApp({
    /**
     * Une propriété props est une propriété qui est passée à un composant
     * depuis le composant parent. Ici, on récupère l'id de l'article
     */
    props: {
        id: {
            required: true
        }
    },
    setup(props) {
        // Ensemble des commentaires
        const comments = ref([]);

        // Récupération du commentaire saisie
        const comment = ref("");

        // TODO : Récupération des commentaires via l'API et un appel AJAX avec fetch
        // fetch(…).then(…).then(…)
        // Vous pouvez vous inspirer du code du composant « like ». Mais en mettant à jour la variable « comments ».

        // Méthode pour ajouter un commentaire, cette méthode est appelée au submit du formulaire
        // Pour l'appeler, il faudra ajouter dans votre formulaire @submit="addComments"
        // le @ permet de déclencher l'événement dans VueJS et non dans HTML
        function addComments() {
            const data = new FormData();
            data.append('content', comment.value);

            /**
             * Le X-CSRF-TOKEN est un token qui permet d'autoriser l'envoi de données depuis notre appel AJAX.
             * C'est une sécurité qui permet d'éviter les attaques CSRF.
             * 
             * Nous devons donc ajouter ce token dans notre requête AJAX.
             * 
             * Si nous faisions un appel d'api depuis une application mobile, nous devrions mettre en place 
             * Sanctum afin de gérer l'authentification.
             */

            fetch(`/api/article/${props.id}/comment`, { method: 'POST', body: data, headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content } })
                .then(response => response.json())
                .then(data => {
                    comments.value = data.comments;
                    comment.value = "";
                });
        }

        // On retourne les données et les méthodes pour le template
        return {
            comments,
            comment,
            addComments
        }
    }
}, { ...mountEl.dataset }).mount(mountEl)
```

Qu'avons-nous dans ce code ?

- Nous avons une variable réactive qui contient l'ensemble des commentaires.
- Nous avons une variable réactive qui contient le commentaire saisi par l'utilisateur.
- Nous avons une méthode qui permet d'ajouter un commentaire via l'API.

Les TODO sont à compléter par vos soins. Je vous laisse mettre en place ce code dans votre projet.

### Étape 3 : Modifier le code HTML

#### Lister les commentaires

Vous n'avez pas fait beaucoup de VueJS, mais la syntaxe est très simple. Nous allons maintenant modifier le code HTML de la page de l'article afin d'ajouter le composant « comments ».

Première étape, englobez le code des commentaires dans un élément HTML qui a pour id « comments » :

```html
<div id="like" data-id="{{ $article->id }}">
    <!-- Ici le code des commentaires -->
</div>
<script type="module" src="{{ asset('comments.js') }}"></script>
```

Quelques éléments, en VueJS, nous utilisons la directive `v-for` afin de faire une boucle. Dans notre cas, nous allons faire une boucle sur les commentaires. Nous allons donc remplacer le code des commentaires par :

```html
<div v-for="comment in comments">
    <!-- ici comment est une variable qui représente UN commentaire, vous pouvez afficher les valeurs en faisant -->
    @{{ comment.id }}
    @{{ comment.content }}

    <!-- Évidement, vous reprendrez votre style et l'affichage que vous avez fait avant -->
</div>
```

::: warning Attention

La notation JavaScript est légèrement différente pour naviguer dans un objet :

- En JavaScript `comment.id` permet de récupérer la valeur de la clé « id » dans l'objet « comment ».
- En PHP `$comment->id` permet de récupérer la valeur de la clé « id » dans l'objet « $comment ».

:::

Je vous laisse mettre en place ce code dans votre projet. Si vous avez des difficultés, n'hésitez pas à me demander de l'aide. Une fois intégré, vous devriez obtenir un fonctionnement similaire à avant, mais en utilisant votre API.

Normalement il vous suffit de remplacer le `@foreach` par un `v-for` et de remplacer les <span v-pre>`{{ }}`</span> par des <span v-pre>`@{{ }}`</span> et évidement de passer de la notation `->` à la notation `.`.

#### Ajouter un commentaire

Nous allons maintenant modifier le code HTML de la page de l'article afin d'ajouter le formulaire d'ajout de commentaire. Nous allons donc modifier le code de la page de l'article afin d'ajouter un formulaire qui aura pour action « /api/article/{id}/comment » et qui aura pour méthode « POST ».

```html
@auth
<form @submit="addComments">
    <div class="mb-4">
        <label for="content" class="sr-only">Commentaire</label>
        <textarea v-model="comment" name="content" id="content" cols="30" rows="4" class="bg-gray-100 border-2 w-full p-4 rounded-lg @error('content') border-red-500 @enderror" placeholder="Votre commentaire"></textarea>
    </div>

    <div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded font-medium">Publier</button>
    </div>
</form>
@endauth
```

Qu'avons-nous modifié ?

- Nous avons ajouté la directive `@submit` qui permet d'ajouter un événement au submit du formulaire. Dans notre cas, nous appelons la méthode `addComments` qui permet d'ajouter un commentaire.
- Nous avons ajouté la directive `v-model` qui permet de lier une variable réactive à un élément HTML. Dans notre cas, nous lierons la variable réactive `comment` à l'élément HTML qui a pour id « content ». Cela permet de récupérer la valeur de l'input « content » dans la variable réactive `comment`. Cette variable réactive est utilisée dans la méthode `addComments` afin d'ajouter le commentaire.

Je vous laisse mettre en place ce code dans votre projet. Si vous avez des difficultés, n'hésitez pas à me demander de l'aide. Une fois intégré, vous devriez obtenir un fonctionnement similaire à avant, mais en utilisant votre API.

La liste des commentaires sera mise à jour automatiquement, pourquoi ? Car nous avons utilisé une variable réactive. C'est-à-dire que si la variable change, alors le DOM sera mis à jour automatiquement.

::: tip Les limites de notre code

Ici nous avons implémenté un système très simple qui repose sur l'authentification déjà en place sur notre site Web. Bien que fonctionnel, ce système n'est pas parfait. Dans le cadre d'une vraie API nous devrions mettre en place Sanctum afin de gérer l'authentification de nos API.

Sanctum repose sur un système de token. C'est-à-dire que l'utilisateur devra s'authentifier une première fois afin de récupérer un token. Ce token sera ensuite utilisé pour s'authentifier sur les API. Cela permet de ne pas utiliser les cookies de session pour s'authentifier sur les API.

En savoir plus sur Sanctum : [https://laravel.com/docs/10.x/sanctum]

:::

#### Ajouter un système de chargement

Pour l'instant, notre page n'affiche rien tant que les commentaires ne sont pas chargés. Nous allons donc ajouter un système de chargement. Nous allons donc modifier le code de la page de l'article afin d'ajouter un système de chargement.

```html
<div v-if="comments == null" class="text-center">
    ...Chargement...
</div>
```

Je vous laisse mettre en place ce code dans votre projet, vous allez également devoir modifier le code du composant afin de modifier la variable réactive `comments` afin de mettre `null` au lieu de `[]`. Cela permettra d'afficher le message de chargement.

### Créer l'API permettant d'avoir les articles

Maintenant que vous avez vu comment mettre en place une API, je vous laisse mettre en place une API permettant de récupérer les articles. Vous devrez donc :

- Créer une route dans le fichier « routes/api.php ».
- Créer une méthode dans le contrôleur « ApiController ».
- Tester votre API avec PostMan.
- Créer une version de votre home page qui utilise votre API.

### Bonus: Sauvegarde du commentaire

Actuellement le commentaire saisi par l'utilisateur est perdu lors du rechargement de la page. Nous allons donc mettre en place un système de sauvegarde du commentaire. Nous allons donc modifier le code du composant afin de sauvegarder le commentaire dans le local storage.

Je ne vais pas vous donner le code, mais juste les éléments qui vont vous permettre de le faire :

```js

// Récupération du commentaire saisie
const comment = ref(localStorage.getItem("comment") ?? "");

// Evenement qui permet de sauvegarder le commentaire quand l'utilisateur saisie du texte
@input="saveComment"

// Sauvegarde du commentaire dans le local storage
localStorage.setItem("comment", comment.value);
```

Je vous laisse mettre en place ce code dans votre projet. Si vous avez des difficultés, n'hésitez pas à me demander de l'aide.

## Conclusion

Dans ce TP (très guidé) vous avez vu comment mettre en place une API REST dans un projet existant. Même si je vous ai guidé, vous avez vu que mettre en place un système réactif est relativement simple. 

Notre code est découpé en plusieurs parties :

- Le code de l'API.
- Le code de l'interface utilisateur.

L'assemblage est réalisé grâce à l'AJAX. C'est-à-dire que nous utilisons des appels AJAX pour récupérer les données de l'API. Nous utilisons ensuite VueJS pour mettre à jour le DOM.

C'est une autre façon de travailler, qui permet d'avoir un site Web plus réactif, plus fluide. C'est le fonctionnement des sites web moderne.

## Toujours plus haut, toujours plus loin

Pour aller plus loin dans la partie API, vous pouvez :

- Utiliser `sanctum` pour créer des tokens d'authentification. <<https://laravel.com/docs/10.x/sanctum>
- Utiliser les `abilities` pour gérer les droits d'accès. <https://laravel.com/docs/10.x/sanctum#token-abilities>

Sanctum, c'est un package (un peu comme Breeze), mais ici pas d'interface, nous avons « juste » la logique pour :

- Créer des tokens d'authentification (`$token = $request->user()->createToken($request->token_name);`)
- Gérer les droits d'accès pour chaque route (`->middleware('auth:sanctum')`)
- Authentifier les utilisateurs via un token (appelé bearer token).

::: tip C'est du bonus

Cette partie n'interessera pas tout le monde. Si vous êtes intéressé, vous pouvez regarder la documentation de Sanctum. Et me demander si vous avez des questions.

:::
