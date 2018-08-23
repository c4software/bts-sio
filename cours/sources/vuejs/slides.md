# VueJS

### Progressive JavaScript framework

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

### Progressive

Qui se passe ou se développe progressivement ou par étapes.

### PWA

Progressive Web Apps

---

### Le monde de demain sera Web

#### Exemple de PWA

* https://pwa.rocks/ (Liste d’exemples)
* https://mobile.twitter.com
* https://m.facebook.com (volontairement bridé)

---

![Twitter PWA](./img/twitter.png)

Bluffant n’est-ce pas ? (psst c’est du ReactJS) <!-- .element: class="fragment" -->

---

### Concretement une PWA c’est quoi ?

![](./img/question.gif)

* Pour tous, quelques soit le navigateur
* Responsive
* Indépendant du réseau (via des services Workers, fonctionne hors-ligne ou en ligne)
* App-like
* Toujours à jour
* Sûre (HTTPS)
* Découvrable et identifié comme application grâce au fichier manifest
* Notifications, envoyer de l’informations
* Installable
* Partageable (oui, c’est « juste » un lien)

---

### Les points clefs

* Le manifest ([Lien](https://developer.mozilla.org/fr/docs/Web/Manifest))
* Les services Workers ([Lien](https://developer.mozilla.org/fr/docs/Web/API/Service_Worker_API/Using_Service_Workers))

---

### Les acteurs

* Google
* Firefox
* Microsoft
* …

---

### Repose sur le HTML5

Attention au support des Navigateurs

* [Can I Use : Connaitre le support d’une fonctionnalitée](https://caniuse.com)
* [MDM Webdoc](https://developer.mozilla.org/)

---

### VueJS

Faire des PWA simplement (il y en a d'autres bien évidement, en connaissez-vous ?)

---

### Le créateur

* Evan You
* Ancien de chez Google
* Depuis 2016 à temps plein pour Vue.JS

---

### Historique

* Création : **2013**
* Première version « stable » **Fevrier 2014**
* **V1.0** Octobre 2015
* Actuellement version **2**

---

### Pourquoi VueJS ?

Et pas ReactJS ou Angular…

* VueJS est « plus simple »
* Le site de VueJS est plus clair ?
* La fondation Apache ne veut pas des projets ReactJS ([C’est un signe…](https://www.theregister.co.uk/2017/07/17/apache_says_no_to_facebook_code_libraries/))
* Mais… Facebook à annoncer un changement dans les licences (très récemment)

---

### VueJS en quelques mots

* Flexible
* Performant
* Apprentissage très simple
* Orienté composants

---

### Quelques stats

[Nous sommes à un click de la réponse](https://hasvuepassedreactyet.surge.sh/)

---

### Qui utilise VueJS ?

* GitLab
* Weex (Alibaba)
* Baidu
* …

---

## Comment VueJS fonctionne ?

* Virtual DOM (ne « re-dessine » que les zones modifiées)
* Fonctionnement en composant
* Des « .Vue » / Monofichier important tout le composant
* Un cycle de vie complet pour chaque composant

![](./img/flow.png)

![](./img/fonctionnement.png)

---

### L’objet VueJS

```js
var vm = new Vue({
// Options
});
```

* Constructeur de l’objet
* Propriétés et méthodes
* Cycle de vie

---

[![](./img/component-lifecycle.png)](./img/component-lifecycle.png)

```js
var vm = new Vue({
    el: "#demo",
    data: { demo: 1 },
    created: function () {
         console.log('demo est: ' + this.a);
    }
});
```

---

## Un « vrai » exemple

[Démo](https://rawgit.com/c4software/bts/master/demo/vuejs/demo1/index.html)

---

### Les directives

Les directives sont des attributs html propre à VueJS

* v-on
* v-bind
* v-html
* v-show (masque un élément avec la propriété display: css)
* v-if
* v-else
* v-else-if
* v-for

---

### Gestion des évènements

```js
    var vm = new Vue({
        el: "#demo"
        data: { compteur: 0 },
        methods: {
            message: function(message){
                alert(message)
            }
        }
    });
```

```html
<div id="demo">
    <button @click="message('yolo')">Yolo</button>
    <button v-on:click="compteur += 1"></button>
    <p>Vous avez cliqué : {{compteur}}</p>
</div>
```

---

### Les conditions d’affichage

---

```html
<div v-if="chaine === 'TEST'">1</div>
<div v-else-if="chaine === 'TEST1'">2</div>
<div v-else>Non 1 non 2</div>
```

---

### Les listes / Boucles

```html
<ul>
    <li v-for="(items, index) in items">items.message</li>
</ul>
```

---

### À votre avis comment doit-être la structure da la données

---

```js
items = [
    {message: "Message 1"},
    {message: "Message 2"},
    {message: "Message 3"}
]
```

---

### Les évènements HTML / Les touches de modifications

```html
    <!-- Arrêt de la propagation de l’évènements -->
    <a @click.stop="clickEvent"></a>

    <!-- Le « submit » est intercepté, et le navigateur ne rechargera plus la page -->
    <form @submit.prevent="onSubmit"></form>

    <!-- Il est possible de les chainer -->
    <a @click.stop.prevent="clickMessage"></a>

    <!-- Également disponnible tab, delete, esc, space, ...-->
    <input @keyup.enter="submit">
```

---

## Etc…

VueJS c'est simple et très complet. La suite en TP et sur [le site de VueJS](https://vuejs.org/v2/guide/)

---

### VueJS « Deux modes » de fonctionnement

* J’ajoute VueJS dans un développement (classique) existant (**sans** Webpack)
* Je crée une « application » Javascript (**avec** Webpack)

---

### Premier usage, dans une « page web »

* Librairie externe à ajouter au projet (« vuejs.js »).
* S'utilise un peu comme jquery.
* Le but rendre « réactif » un développement basique
* C'est puissant, et très simple. Un exemple.

---

### Créer une page Web comme… une application

* Pour vous, qu'est-ce que cela veux dire ?

---

On est vraiment loin d’une page Web dans la conception

* Gestion avec des imports
* Gestion des dépendances
* Similaire à une gestion classique (Comme Java, .Net…)

---

### Les dépendances

---

#### Le package.json

* Des dépendances pour la phase de développement.
* Des dépendances utile pendant le fonctionnement de l’application.
* Gestion fine des versions (très important, pourquoi ?)
* Les dépendances ont également des dépendances, etc!

## Un composant

---

### La force des VueJS

---

### Mais c’est quoi ?

* Un élément réutilisable
* Code générique

![](./img/barcharts_composants.png)

---

### Puissant car …

Un composant ce n'est pas que du javascript.

```html
<template>
[…]
</template>

<script>
    export default{
        name: "exemple"
    }
</script>

<style scopped>
    […]
</style>
```

---

C'est possible grace à la puissance de **webpack**

---

## Webpack ?

![](./img/questions.gif)

---

## Webpack

C'est deux éléments important

---

## Webpack-dev-server

* Utilisé pendant la phase de développement.
* Serveur integré
* Surveille les changements (et recharge automatiquement)
* Hot reload

---

### Le « Module Bundler »

* Assemble les « modules Javascript ».
* Concatenation « intelligente »
* Découpe les JS pour la distribution
* Assemble aussi des modules « css » (jusqu’aux images incluses)

---

### Et pour VueJS?

![](./img/confused.gif)

---

### Le composant c’est

---

## Un fichier

![](./img/composants_composition.png)

* Le template
* Une CSS « scopée » / qui ne s’applique que pour le module
* Gestion des pré-processeur (Babel, Stylus, Sass, …)

---

### C’est possible grâce à Webpack

* Rechargement automatique
* Sans perdre le contexte grâce au « Hot Reload »

![](./img/composant.png)

---

### Quelques différences avec les précédents exemples…

```js
var vm = new Vue({
    el: "#demo",
    data: {demo: 1}
});
```

```js
export default {
    data: () => {
        return {demo: 1}
    }
};
```

---

### Sauf que …

#### Webpack c’est « compliqué » à mettre en place

---

### Chez VueJS ils ont créé vue-cli

* Template de projet
* Rapide
* Étendable

---

### Sorcellerie !

![](./img/way_you_think.gif)

---

### Comment fait-on ?

---

```sh
$ npm install -g @vue/cli
```

---

```sh
vue create demonstration
```

---

![](./img/init_vuejs.png)

---

### Le projet est « initialisé »

Psss: Chez VueJS ils sont sympa ils ont init le projet git pour vous.

---

### Et c'est tout !

---

### Vue UI. Une GUI de gestion

![](https://cli.vuejs.org/ui-new-project.png)

---

### Démo

C’est toujours mieux en vrai…

---

### Lancement du code en Dev

```sh
$ npm run dev
```

![](./img/demo_vuejs.png)

![](./img/demo_app_vuejs.png)

---

### La force de VueCLI c'est une gestion des plugins :

```sh
$ vue add router
$ vue add vuex
```

---

### Le router

* Gestion des « routes »
* Gestion des paramètres
* Assemblage

[Documentation](https://router.vuejs.org/fr/)

---

### Les devs tools

* Intégration dans le processus de developpement
* Permet de voir les « vue »
* L’état de vue
* Le « store »

---

### Démo Dev Tools

![](./img/devtools.png) [Démo](https://rawgit.com/c4software/bts/master/demo/vuejs/demo1/index.html)

---

### Communication entre les .Vue

* Événements natif
* Store
* Des composants Fils

---

### Le « store » ?

![](./img/confused.gif)

---

### Le store : Vuex

* Gestionnaire d'état
* Bibliothèque (optionel) à VueJS
* Zone de stockage de données centralisée pour tous les composants dans une application
* S'assurer que l'état reste « cohérent »
* Visualisation de l’état grace au dev-tools

---

### Fonctionnement

![](./img/vuex.png)

---

### Quand utiliser un « store » ?

* Application multi-vues
* Besoin de synchronisation entre les vues
* Évènement globaux entre les vues

---

### Démo store

[Exemple simple](https://vuex.vuejs.org/fr/getting-started.html)

---

### L’affichage

### Mais je ne suis pas un graphiste !

![](./img/sad.gif)

---

### La solution Vuetify

* Ensemble de composants pour l’interface
* Respect Material Design
* Responsive
* Générique

![](./img/vuetify.png)

---

### Mais c’est génial !

![](./img/yeah.gif)

[La documentation](https://vuetifyjs.com/)  
  
[Démo](https://github.com/c4software/Cliff-Height-Timer-VueJS)

---

### Des questions ?

(Il doit y en avoir beaucoup)