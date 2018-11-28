# Firebase + Vuejs

Dans ce TP nous allons découvrir Firebase RealtimeDB (base de données temps réel). Nous allons coupler cette base de données temps réel à la puissance de VueJS pour obtenir en un rien de temps une WebApplication surpuissante.

## La mise en place

Nous allons utiliser VueCLI pour initialiser le projet, première étape l'installation

### Installer NodeJS + VueCLI

TODO

### Initialiser le projet

La création d'un nouveau projet est très simple. Il suffit de rentrer la commande suivante :

```js
vue-cli create firebase-vuejs
```

Choisir l'option « Default ».

⚠️ Le projet est créé dans le dossier courant. Veuillez à saisir la commande dans un dossier vide.

🤓 git est déjà initialisé, vous pouvez en profiter pour pusher votre code sur Github.

#### Questions

- Pourquoi git est déjà analysé ?
- Allez jeter un coup d'oeil au fichier `.gitignore`

### Tester

Le projet initialisé par `vue-cli` est imédiatement fonctionnel. Tester le en saisissant :

```js
npm run serve
```

![VueJS init](./ressources/vuejs-init.png)

## Les dépendances

Maintenant que notre projet est « initialisé », nous allons avoir besoin de quelques dépendances NPM pour faire fonctionner notre projet. Notre projet va utiliser les technologies suivantes :

- firebase
- leaflet

Firebase comme vous le savez va nous servir de système de base de données. [Leaflet](http://leafletjs.com/) quand à lui est une librairie qui vas nous permettre d'afficher très rapidement une carte sur notre site internet.

### Ajouter les dépendances

Les deux outils / librairie que nous allons utiliser sont disponible via NPM, nous allons donc les installer / ajouter au projet via les commandes suivantes :

```bash
npm install firebase vue2-leaflet --save
```

#### Questions

- Pourquoi vue2-leaflet et pas juste leaflet ?
- Quel est l'avantage ?

### Dépendance supplémentaire

Le gros avantage de NPM (et NodeJS) c'est la quantitié de librairie disponible pour répondre à un besoin, nous allons donc profiter de celle-ci pour gagner du temps dans notre réalisation.

Firebase est plutôt simple à utiliser, mais nativement celle-ci ne s'intégre pas directement avec le « state » d'un composant VueJS! Mais grace à d'excellent développeur c'est maintenant possible et très simplement. Pour ça nous allons utiliser :

- [Vuefire](https://github.com/vuejs/vuefire/tree/v1)

```bash
npm install vuefire --save
```

⚠️ Dans une prochaine étape nous allons configurer vuefire. Pour l'instant le package est disponible mais non actif.

🤓 Je vous invite quand même à aller voir [la documentation](https://github.com/vuejs/vuefire/tree/v1) de VueFire pour voir de quoi il en retourne !

### Configuration des dépendances

Voilà ! Notre projet est maintenant prêt, il faut maintenant adapter la structure de base fourni par Vue-Cli pour y inclure les librairie que nous avons précédement installé.

TODO
