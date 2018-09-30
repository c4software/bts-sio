# Ajouter VueJS dans un site existant

Dans le cadre du TP, vous allez devoir « moderniser » une application simple. L’application à migrer était réalisée dans le cadre de la démonstration.

L’application existante est une « TodoList » codée avec le Framework Laravel.

## Les API

Dans ce TP nous allons transformer « entièrement » votre ancien site codé en Laravel par « un équivalent » qui va fonctionner avec des API.

🤓 Nous n'allons donc plus utiliser la puissance de Blade, mais celle de VueJS 🚀.

### Création des API

La « nouvelle version » de notre page, va utiliser des API (et de l'ajax), ça va fondamentalement changer le fonctionnement de votre application. Il faut donc dans un premier temps créer les API qui seront nécessaire au bon fonctionnement (asynchrone) de votre page Web.

- Lister les éléments dans la TodoList.
- Ajouter un nouvel élément dans la TodoList.
- Marquer un élément comme terminé.
- Supprimer un élément.

✋ En tant que développeur vous devez être malin (et fénéant…). Pour écrire les autres API ne tenter pas de réinventer la poudre, nous allons utiliser le même code que le controlleur actuel…

Les seules différence seront :

- ```view([…], […]Todo::all()[…])``` remplacé par ```return response()->json(Todo::all());```
- Et pour une simple réponse de réussite (exemple remove ou done) ```return response()->json("success")```

#### Création du contrôleur pour les API

… Ajout fichier, Route, retour json …

#### Création d'un nouveau controleur

TODO

##### La liste

##### L'ajout

##### Marquer comme terminé

##### Suppression

##### Validation des API

Valider que vos API fonctionne correctement grâce à l'outil [Postman](https://www.getpostman.com/).

## Ajout de VueJS

VueJS étant une librairie (comme jquery par exemple), il faut l'importer pour l'utiliser dans votre projet.

Laravel intègre un gestionnaire de dépendances « client » nommé ```npm``` (normalement celui-ci est déjà installé sur votre poste, si ce n'est pas le cas [rendez-vous ici](https://nodejs.org/en/download/current/)).

La première étape est donc d'indiquer que nous souhaitons avoir ```VueJS``` dans notre projet. Ça se fait via la ligne de commande (ou via l'édition manuel du fichier ```package.json```).

```sh
npm install --save vue
```

Patientez quelques instant la dépendance est maintenant ajoutée.

✋ Votre dépendance est installée oui ! Mais celle-ci n'est pas inclus pour votre client.

Ajouter VueJS dans le fichier ```resources/js/app.js``` ajouter à la fin de celui-ci :

```js
require("vue/dist/vue");
```

Maintenant que votre Librairie est ajouté, il faut indiquer à ```Laravel-mix``` que votre fichier à changé pour ça :

```sh
$ npm run production
DONE  Compiled successfully in 17210ms
…
```

Voilà ! VueJS est maintenant disponible dans votre projet.

### Ajouter VueJS (version alternative)

NPM n'est pas la seul solution d'installer VueJS, si votre projet n'avais pas eu ```npm``` de configuré vous auriez pu simplement ajouter dans le header de votre site via une balise script :

Via un CDN

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
```

En téléchargant la librairie :

[Disponible ici](https://vuejs.org/v2/guide/installation.html#Direct-lt-script-gt-Include)

### Questions

- À votre avis, qu'elle solution est la meilleur ?
- Pourquoi dans notre cas, j'ai privilégié ```npm``` ?
- Quel sont les dangers du CDN ?

### Création d'un nouveau template

… Sans blade …

### Remplacer la route de base

… Édition …

### Asynchrone?

L’ensemble de l’application va devenir « asynchrone », vous allez vite vous rendre compte que la migration va nécessiter quelques appels en Ajax. Pour faire nos appels nous utiliserons l’API « Fetch » des navigateurs, celle-ci est intégrée dans l’ensemble des navigateurs récents, le bon réflexe est quand même d’allez voir le support de Fetch sur  ([Can i use](https://caniuse.com/#search=fetch)).

### Découverte de Fetch

L'API Fetch fournit une interface JavaScript pour l'accès et la manipulation des parties de la pipeline HTTP, comme les requêtes et les réponses. Cela fournit aussi une méthode globale fetch() qui procure un moyen facile et logique de récupérer des ressources à travers le réseau de manière asynchrone.

Ce genre de fonctionnalité était auparavant réalisé avec XMLHttpRequest. Fetch fournit une meilleure alternative qui peut être utilisée facilement par d’autres technologies comme Service Workers. Fetch fournit aussi un endroit unique et logique pour la définition d'autres concepts liés à HTTP comme CORS et les extensions d'HTTP.

(Source: MDM)

Le support de l'API Fetch peut être détecté en vérifiant l'existance de Headers, Request, Response ou fetch() sur la portée de Window ou de Worker.
Par exemple, vous pouvez faire cela dans votre script:

```javascript
if(self.fetch) {
  // Le support de Fetch est présent
}else{
  // Gérer le cas du non support de fetch.
  // Pour réduire le nombre de cas possible vous pouvez ajouter : https://github.github.io/fetch/ à votre projet
}
```

### Tester Fetch

Avant d'intégrer Fetch dans notre code client (le site web Javascript), nous allons le **TESTER** dans notre navigateur, voici un exemple de code :

```javascript
fetch('api/liste', {method: "GET", credentials: 'same-origin'})
.then(function(response){
  // On décode le JSON, et on continue
  return response.json();
})
.then(function(response) {
  // Votre retour est ICI
  console.log(response);
})
.catch(function(error) {
  console.log('Récupération impossible: ' + error.message);
});
```

⚠️ Que veux dire ```credentials: 'same-origin'```?

Par défaut, Fetch n’utilise pas les Cookies, vous pouvez forcer l’utilisation des cookies en indiquant ```credentials: 'same-origin'```. Si vous ne le faites pas vos ```$_SESSION``` ne seront pas sauvegardées ⚠️

#### Comment tester ?

Pour valider le bon fonctionnement nous allons utiliser la « Console développeur » de votre navigateur.

Fetch est une librairie très complète, pour aller plus loin dans l’utilisation de Fetch, je vous recommande la lecture de [la documentation complète (gestion des headers, paramètres, mode, etc)](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch)

## Le code javascript

Maintenant que nos API sont terminés et que notre appels via Fetch fonctionne nous allons écrire le code Javascript (VueJS) qui va gèrer notre application.

Nous allons utiliser massivement la gestion d'évènement de VueJS, Pour rappel n’hésitez pas à consulter le [cycle de vie des composants](https://vuejs.org/images/lifecycle.png))

### La liste

La liste des tâches va être la première chose que nous allons charger. Cette « liste » sera chargé lors de l'événement ```beforeMount```.

### Les actions

Les actions (markAsDone, delete, …) seront appelés lors de la vie de notre application, elle vont être déclaré dans la partie ```methods``` de l'objet VueJS et seront appelé via des ```v-on:…``` de votre code HTML.

Complexe ? Pas tant que ça… Vous allez voir que c'est beaucoup plus simple que du code Javascript classique.

## Structure de base

Créer un nouveau fichier nommé ```main.js```