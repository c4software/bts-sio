# VueJS

## Progressive JavaScript framework

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

VueJS 2.0 ou VueJS 3.0 ?

Nous sommes à une phase de transition. Ici nous allons nous intéresser à la force de VueJS dans son ensemble.

---

### Progressive

Qui se passe ou se développe progressivement ou par étapes.

### PWA

Progressive Web Apps

---

### Le monde de demain sera Web

#### Exemple de PWA

- <https://appsco.pe/> (Liste d'exemples)
- <https://pwa.rocks/> (Liste d’exemples)
- <https://mobile.twitter.com>
- <https://m.facebook.com> (volontairement bridé)

---

![Twitter PWA](./img/twitter.png)

---

Bluffant n’est-ce pas ? (psst c’est du ReactJS)

---

### Concrètement une PWA c’est quoi

![Question](./img/question.gif)

---

- Pour tous, quelques soit le navigateur
- Responsive
- Indépendant du réseau (via des services Workers, fonctionne hors-ligne ou en ligne)
- App-like
- Toujours à jour
- Sûre (HTTPS)
- Découvrable et identifié comme application grâce au fichier manifest
- Notifications, envoyer de l’information
- Installable
- Partageable (oui, c’est « juste » un lien)

---

### Les points clefs

- Le manifest ([Lien](https://developer.mozilla.org/fr/docs/Web/Manifest))
- Les services Workers ([Lien](https://developer.mozilla.org/fr/docs/Web/API/Service_Worker_API/Using_Service_Workers))

---

### Les acteurs

- Google
- Firefox
- Microsoft
- …

---

### Repose sur le HTML5

Attention au support des navigateurs

- [Can I Use : Connaitre le support d’une fonctionnalité](https://caniuse.com)
- [MDM Webdoc](https://developer.mozilla.org/)

---

### VueJS, pour quoi faire…

Faire des PWA simplement (il y en a d'autres bien évidemment, en connaissez-vous ?)

---

### Le créateur

- Evan You
- Ancien de chez Google
- Depuis 2016 à temps plein pour Vue.JS

---

### Historique

- Création : **2013**
- Première version « stable » **février 2014**
- **V1.0** Octobre 2015
- La version **2** toujours distribuée sur les CDN.
- La version **3** arrive. Elle est en stable, mais l'écosystème est jeune.

---

### Pourquoi VueJS

Et pas ReactJS ou Angular…

- VueJS est « plus simple »
- Le site de VueJS est plus clair ?
- VueJS est plus léger.
- VueJS peut être utilisé pour faire évoluer une application existante.

---

### VueJS en quelques mots

- Flexible
- Performant
- Apprentissage très simple
- Orienté composants

---

### Qui utilise VueJS

- GitLab
- Weex (Alibaba)
- Baidu
- Laravel
- Moi à Playmoweb
- …

---

## Comment VueJS fonctionne

- Virtual DOM (ne « re-dessine » que les zones modifiées)
- Fonctionnement en composant
- Des « .Vue » / Monofichier
- Un cycle de vie complet pour chaque composant

---

![Flow](./img/flow.png)

---

![Fonctionnement](./img/fonctionnement.png)

---

### L’objet VueJS

```js
var vm = new Vue({
  // Options
});
```

---

- Constructeur de l’objet
- Propriétés et méthodes (mounted, et _VOS_ méthodes)
- Cycle de vie

---

[![Cycle de vie](./img/component-lifecycle.png)](./img/component-lifecycle.png)

---

```js
var vm = new Vue({
  el: "#demo",
  data() {
    return { compteur: 1 };
  },
  mounted() {
    console.log("Le compteur est : " + this.compteur);
  },
});
```

---

## Un « vrai » exemple

[Démo](https://cours.brosseau.ovh/cours/demo/vuejs/demo1.html)

---

### Les directives (dans le template)

Les directives sont des attributs HTML propres à VueJS

- v-on (ou plus simplement `@`)
- v-bind
- v-model
- v-html
- v-show (masque un élément avec la propriété display: css)
- v-if
- v-else
- v-else-if
- v-for

---

### Les méthodes

Code utilisable dans votre objet. « Votre code », accessible via le `this` :

```js
var vm = new Vue({
  el: "#demo",
  data() {
    return { compteur: 1 };
  },
  methods: {
    message() {
      alert(`La valeur du compteur est ${this.compteur}`);
    },
  },
});
```

---

```js
this.message();
```

---

### Gestion des évènements

Exemple d'objet :

```js
    var vm = new Vue({
        el: "#demo"
        data(){
          return { compteur: 0 }
        },
        methods: {
            message(message){
                alert(message)
            }
        }
    });
```

---

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
  <li v-for="(item, index) in items">{{item.message}}</li>
</ul>
```

---

### À votre avis, comment doit-être la structure de la donnée ?

---

```js
data: {
  items: [
    { message: "Message 1" },
    { message: "Message 2" },
    { message: "Message 3" },
  ];
}
```

---

### Les évènements HTML / les touches de modifications

```html
<!-- Arrêt de la propagation de l’évènement -->
<a @click.stop="clickEvent"></a>

<!--
  Le « submit » est intercepté, et le navigateur ne rechargera plus la page
-->
<form @submit.prevent="onSubmit"></form>

<!-- Il est possible de les chainer -->
<a @click.stop.prevent="clickMessage"></a>

<!-- Également disponible tab, delete, esc, space, ... -->
<input @keyup.enter="submit" />
```

---

### Les « Watchers »

Observation des « Data », pour réagir en code aux modifications de l'état de votre objet.

```js
var vm = new Vue({
  el: "#demo",
  data() {
    return { compteur: 1 };
  },
  watch: {
    compteur() {
      console.log(`La valeur est maintenant de ${this.compteur}`);
    },
  },
});
```

---

## Etc.

VueJS c'est simple et très complet. La suite en pratique et sur [le site de VueJS](https://vuejs.org/v2/guide/)

---

### VueJS « Deux modes » de fonctionnement

- J’ajoute VueJS dans un développement (classique) existant (**sans** Webpack)
- Je crée une « application » JavaScript (**avec** Webpack)

---

### Premier usage, dans une « page web »

- Librairie externe à ajouter au projet (« vuejs.js »).
- S'utilise un peu comme jquery.
- Le but rendre « réactif » un développement basique
- C'est puissant, et très simple. Un exemple.

---

### Cas pratique

---

### Créer une page Web comme… une application

- Pour vous, qu'est-ce que cela veut dire ?

---

On est vraiment loin d’une page Web dans la conception

- Gestion avec des imports
- Gestion des dépendances
- Similaire à une gestion classique (comme Java, .net…)

---

### Les dépendances

---

#### Le package.json

- Des dépendances pour la phase de développement.
- Des dépendances utiles pendant le fonctionnement de l’application.
- Gestion fine des versions (très important, pourquoi ?)
- Les dépendances ont également des dépendances, etc.

---

## Un composant

---

### La force des VueJS

---

### Mais c’est quoi

- Un élément réutilisable
- Code générique

![Composant](./img/barcharts_composants.png)

---

### Puissant car …

Un composant ce n'est pas que du JavaScript.

```html
<template> […] </template>

<script>
  export default {
    name: "exemple",
  };
</script>

<style scoped>
  […]
</style>
```

---

C'est possible grâce à la puissance de **webpack** ou **rollup**.

---

## Webpack…

C'est deux éléments importants

---

## Webpack-dev-server

- Utilisé pendant la phase de développement.
- Serveur intégré
- Surveille les changements (et recharge automatiquement)
- Hot reload

---

### Le « Module Bundler »

- Assemble les « modules JavaScript ».
- Concaténation « intelligente »
- Découpe les JS pour la distribution
- Assemble aussi des modules « css » (jusqu’aux images incluses)

---

## Rollup

- Assemble les « modules JavaScript ».
- Concaténation « intelligente »
- Découpe les JS pour la distribution
- Assemble aussi des modules « css » (jusqu’aux images incluses)

---

- Rollup est plus « simple » que Webpack, mais moins « complet ». 
- C'est le coeur de ViteJS.

---

### Et pour VueJS

![Confused](./img/confused.gif)

---

Le Bundleur est l'outil qui va assembler les modules JavaScript. Qui nous permet de créer des composants en n'indiquant que le fichier « .vue ».

---

### Le composant c’est

---

## Un fichier

![Composition](./img/composants_composition.png)

- Le template
- Une CSS « scopée » / qui ne s’applique que pour le module
- Gestion des préprocesseurs (Babel, Stylus, Sass, …)

---

## Rollup et Webpack

- Rechargement automatique
- Sans perdre le contexte grâce au « Hot Reload »

![Composant](./img/composant.png)

---

## Quelques différences avec les précédents exemples…

```js
var vm = new Vue({
  el: "#demo",
});
```

```js
export default {
  data: () => {
    return { demo: 1 };
  },
};
```

---

### Sauf que …

#### Webpack et Rollup c’est « compliqué » à mettre en place

---

## Zoom sur VueJS 2 

---

### Chez VueJS ils ont créé ViteJS

- Un outil de développement rapide.
- Un outil de développement « simple ».
- Gère les composants VueJS.
- Gère le hot reload (HMR).

---

### Sorcellerie

![Sorcellerie](./img/way_you_think.gif)

---

### Comment fait-on ?

---

```sh
$ npm install -g @vue/cli
… Installation …
```

---

```sh
$ vue create demo
```

---

Ou via `create-vue`

```sh
npm create vue@2
```

---

### Et on répond aux questions

---

### Le projet est « initialisé »

---

### Et c'est tout

---

### Vue UI. Une GUI de gestion

![Vue UI](https://cli.vuejs.org/ui-new-project.png)

---

### Démo

C’est toujours mieux en vrai…

---

### Lancement du code en Dev

```sh
$ npm run dev
… Lancement du serveur intégré …
```

![Démo 1](./img/demo_vuejs.jpg)

---

![Démo 2](./img/demo_app_vuejs.png)

---

### La force de VueCLI c'est une gestion des plugins

```sh
$ vue add router
… Modification AUTOMATIQUE du projet …
$ vue add vuex
… Modification AUTOMATIQUE du projet …
```

---

### Le router

- Gestion des « routes »
- Gestion des paramètres
- Assemblage

[Documentation](https://router.vuejs.org/fr/)

---

### Les devs tools

- Intégration dans le processus de développement
- Permets de voir les « vue »
- L’état de vue
- Le « store »

---

### Démo Dev Tools

![Dev tools](./img/devtools.png)

[Démo](https://cours.brosseau.ovh/cours/demo/vuejs/demo1.html)

---

### Communication entre les .Vue

- Événements natifs
- Store
- Des composants Fils

---

### Le « store »

![Confused](./img/confused.gif)

---

### Le store : Vuex

- Gestionnaire d'état
- Bibliothèque (optionel) à VueJS
- Zone de stockage de données centralisée pour tous les composants dans une application
- S'assurer que l'état reste « cohérent »
- Visualisation de l’état grâce au dev-tools

---

### Fonctionnement

![VueX](./img/vuex.png)

---

### Quand utiliser un « store »

- Application multivue
- Besoin de synchronisation entre les vues
- Évènement global entre les vues

---

### Démo store

[Exemple simple](https://vuex.vuejs.org/guide/#the-simplest-store)

---

### L’affichage

### Mais je ne suis pas un graphiste

![Triste](./img/sad.gif)

---

### La solution Vuetify

- Ensemble de composants pour l’interface
- Respect Material Design
- Responsive
- Générique

![VueTify](./img/vuetify.png)

---

### Mais c’est génial

![WOW MAIS C'EST GENIAL](./img/yeah.gif)

[La documentation](https://vuetifyjs.com/)

[Démo](https://github.com/c4software/Cliff-Height-Timer-VueJS)

---

## Zoom sur VueJS 3

---

## Un aperçu du futur

- Pourquoi utiliser un bundler (Webpack) ?
- Et pourquoi ne plus utiliser de bundler ?
- La solution PikaPKG / Snowpack
- [Une autre solution par le créateur de vue : « Vite »](https://github.com/vitejs/vite)

---

## VueJS 3.X

- Réécriture.
- Fonctionnement très similaire.
- TypeScript intégré.
- Simplifier l'écriture de « gros composants ».

---

## Gros changement l'observation des données

- La méthode `data()` (à l'ancienne)
- La méthode `setup()` (nouveau) (ou via `<script setup>`)

---

## L'API de composition

- Définition des données à observer.
- Partager du code « d'initialisation » / « d'observation ».
- Partager des méthodes « à ajouter à votre objet Vue ».

---

### Deux exemples

---

```typescript
setup: () => {
  // Déclaration d'une variable « observé » de type Int
  const count = ref(0);

  // Déclaration d'une seconde variable « observé » de type String
  const title = ref("Ceci est un titre");

  // Ne pas oublier de retourner les observations afin que VueJS réagisse au changement des variables en question.
  return { count, title };
};
```

---

_En utilisant [vueuse](https://github.com/vueuse/vueuse)_

```typescript
import { useMouse, usePreferredDark, useLocalStorage } from '@vueuse/core'

export default {
  setup() {
    // tracks mouse position
    const { x, y } = useMouse()

    // is user prefers dark theme
    const isDark = usePreferredDark()

    // persist state in localStorage
    const store = useLocalStorage(
      'my-storage',
      {
        name: 'Apple',
        color: 'red',
      },
    )

    return { x, y, isDark, store }
  }
})
```

---

## Une démo

```sh
npm init vite@latest
```

---

## TypeScript ?

- Permets de typer nos variables.
- Complètement optionnel (mais je vous le conseille).

---

Le Store, avec l'arrivée de VueJS 3.0, le store à utiliser est [Pinia](https://pinia.esm.dev/)

---

## ViteJS

- Permets la création de projets
- Rapide
- Simple
- Ne fonctionnera que sur les navigateurs « récents »

---

## VueJS 2 ou 3 ?

- VueJS 2 est plus mature.
- VueJS 3 est plus rapide.
- VueJS 2 supporte IE11.
- VueJS 2 intègre certaines fonctionnalités de VueJS 3.

---

C'est à vous de choisir, moi j'utilise de préférence VueJS 3. Et VueJS 2 pour les projets « plus anciens ».

---

## Mettre en pratique

[VueJS 3.0 + Vite](/tp/vuejs3/vite.md)

---

### Des questions

(Il doit y en avoir énormément)
