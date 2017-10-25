# VueJS et Cordova

Maintenant que nous avons vu les bases de Cordova (Création, Plateforme, plugin). Intéréssons nous à la création d’une vrai application. Dans le monde de cordova il existe plusieurs façon de faire :

- Sans Framework.
- Avec un framework web classique (type VueJS, ReactJS…)
- Avec un framework dédié type ionic
- Avec des solutions comme Phonegap

Pour ce TP nous allons faire une application en utilisant Cordova + VueJS.

<!-- TOC -->

- [VueJS et Cordova](#vuejs-et-cordova)
    - [Le projet](#le-projet)
    - [Le code](#le-code)
    - [Utilser le code fourni](#utilser-le-code-fourni)
        - [1. Compliler une première fois le code](#1-compliler-une-première-fois-le-code)
        - [2. Ajouter la plateforme](#2-ajouter-la-plateforme)
        - [3. Lancer sur votre mobile](#3-lancer-sur-votre-mobile)
    - [Ajouter la vue Localisation](#ajouter-la-vue-localisation)
    - [Ajouter la vue Vibration](#ajouter-la-vue-vibration)
        - [1. Le code](#1-le-code)
        - [2. La route](#2-la-route)
    - [Ajouter la vue Flash](#ajouter-la-vue-flash)
        - [1. Le code](#1-le-code-1)
        - [2. La route](#2-la-route-1)
    - [Ajouter la vue Camera](#ajouter-la-vue-camera)
        - [1. Le code](#1-le-code-2)
        - [2. La route](#2-la-route-2)
    - [Fonction avancée le NFC](#fonction-avancée-le-nfc)

<!-- /TOC -->

## Le projet

Nous allons réaliser une application qui tests plusieurs plugin Cordova. Cette application utilisera VueJS et VuetifyJS

![Exemple](https://github.com/c4software/vuejs-cordova-sample/raw/master/demo.png)

Cette application sera très simple. Mais va permettre de tester la puissance de Cordova, nous allons utiliser les plugins suivants 

- cordova-plugin-dialogs
- cordova-plugin-vibration
- cordova-plugin-geolocation
- cordova-plugin-flashlight
- cordova-plugin-camera
- phonegap-nfc
- cordova-plugin-statusbar
- cordova-plugin-headercolor

## Le code

Le projet étant assez conséquent je vous propose de partir d’une base déjà faite de l’application. Celle-ci contient :

- L’accueil
- Les scripts pour compiler la partie Cordova
- Les plugins « pré-configurés » / déclaré dans le fichier ```config.xml```.

Le code est [téléchargeable ici](sources/vuejs-cordova-sample.zip)

## Utilser le code fourni

Maintenant que vous avez récupéré le code. Nous allons le rendre fonctionnel pour votre ordinateur.

### 1. Compliler une première fois le code

Le projet étant « non compilé » / « non installé », nous allons devoir dans un premier temps installer les dépendances nécéssaires à notre projet. Pour se faire nous allons utiliser ```npm``` avec la commande ```install```. Dans le dossier du projet :

```shell
npm install .
``` 

Les dépendances « VueJS » s’installe, l’installation peut prendre quelques minutes. Une fois installé tester le fonctionnement avec la commande :

```shell
npm run dev
```

Ouvrez un navigateur et accéder à l’url suivante [http://localhost:8080/](http://localhost:8080/) vous devez voir :

![run1](./ressources/run1.png)

- Passer en mode « simulation de mobile » pour être proche de la compilation final.

### 2. Ajouter la plateforme

Ajouter la plateforme Android au projet :

```shell
cd cordova_app/
cordova platform add android
```

### 3. Lancer sur votre mobile

Maintenant que la plateforme est prête et que notre code est disponible, nous allons compiler l’application pour la lancer sur votre téléphone. La première étape est de « builder » l’application VueJS en version distribuable :

```shell
npm run build
```

✋ La configuration de base d’un projet VueJS créé par VueCLI n’est pas forcément le plus adapté pour Cordova. J’ai donc édité les fichiers :

- ```build/build.js```
- ```config/index.js```

Vous pouvez jeter un coup d’oeil pour voir les différences avec la version normal. Notamment le la partie concernant le file://, cordova utilise l’URI ```file://``` pour servir les ressources dans l’APK, par défaut les développeur de VueCLI on mis des liens avec ```/``` en dur ce qui pose des soucis. J’ai donc remplacé le ```/``` par ```./``` ce qui corrige le soucis. 

Maintenant que le « build » est terminé nous pouvons réaliser le lancement sur le mobile via les commandes suivantes :

```shell
cd cordova_app/
cordova run android
```

✋ Votre mobile doit-être connecté à cet étape, l’application va se lancer directement sur votre mobile. Si ce n’est pas le cas il vous faut un émulateur Android sur votre machine.

## Ajouter la vue Localisation

Pour commencer nous allons ajouter la vue « Localisation ». C’est certainement la plus compliqué de toutes. Par contre c’est celle qui est la plus intéréssante en terme de fonctionnement 

![Localisation](./ressources/localisation.png)

- Créer un fichier ```Localisation.vue``` dans le dossier ```views/```
- Ajouter le contenu suivant :

```js
// Require Cordova Plugin : cordova-plugin-geolocation

<template>
  <div>
    <div id="map"></div>
    <div v-if="isLoading" class="loading elevation-2">
      <div>
        <v-progress-circular indeterminate class="primary--text"></v-progress-circular>
        <br><br>
        <div>{{$t("getPosition")}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  import {nativeAlert} from "../libs/";

  // Fix for icon problem with webpack
  // See https://github.com/PaulLeCam/react-leaflet/issues/255#issuecomment-261904061
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });

  export default {
    name: 'localisation',
    data() {
      return {
        isLoading: true
      }
    },
    mounted() {
      // Init the leaflet map
      this.map = L.map('map').setView([47.47121, -0.55198], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
      this.getUserLocation();
    },
    beforeDestroy(){
      // Destroy the map object on leave
      if(!(this.map === undefined)){
        this.map.remove();
      }
    },
    methods: {
      stopLoading(){
        this.isLoading = false;
      },
      getUserLocation() {
        // Retrieve the current user location
        if (navigator.geolocation) {
          // If the geolocation is available
          navigator.geolocation.getCurrentPosition((position) => {
            // Get the current user position, and create a marker on the map.
            // Pssst, look at the position object there is a lot of more information
            let user_position = [position.coords.latitude, position.coords.longitude];
            L.marker(user_position).addTo(this.map);

            // Set the view on the user position at a correct zoom level
            this.map.setView(user_position, 18);
            this.stopLoading();
          }, () => {
            // If the geolocation plugin not answer or if we reach the timeout
            this.stopLoading();
            nativeAlert(this.$t("positionNotAvailable", this.$t("localisation")));
          });
        }else{
          // If the browser is not compatible
          nativeAlert(this.$t("positionNotAvailable", this.$t("localisation")));
          this.stopLoading();
        }
      }
    }
  }
</script>

<style scoped>
  #map{
    height: calc(100vh - 64px);
    z-index: 1;
  }

  .loading {
    position: absolute;
    width: 150px;
    height: 150px;
    bottom: 50vh;
    top: 50vh;
    z-index: 200;
    margin: auto;
    background-color: white;
    border-radius: 5px;
    left: calc(50% - 50px);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 10px;
  }
</style>
```
- Ajouter l’import dans ```router/index.js``` :

```js
import Localisation from '@/views/Localisation'
```

- Ajouter l’élément ***au bon endroit*** suivant dans ```router/index.js``` :

```js
{
      path: '/localisation',
      name: 'Localisation',
      component: Localisation
}
```

- Lancer le serveur des developpement :

```shell
npm run dev
```

- Tester l’ajout.
- Recompiler l’application et lancer la sur votre téléphone :

```shell
$ npm run build
$ cd cordova_app
$ cordova run android
```

## Ajouter la vue Vibration

Cette vue est très simple, elle a pour but d’utiliser le plugin vibration. Avant de faire le code, je vous propose de regarder la documentation du plugin [cordova-vibrate](https://github.com/apache/cordova-plugin-vibration#vibrate-recommended). Une fois la documentation lu. Passons à l’écriture de la vue.

L’écriture de la fonctionnalitée va se dérouler en 3 étapes :

- Création de ```Vibration.vue``` dans ```views```.
- Écriture de code de la vue.
- Déclaration de la route.

### 1. Le code

Le projet étant déjà réalisé le plugin est déjà installé, il nous suffit donc d’écrire le de la vue. Je vous laisse la base du code, je vous laisse écrire le code permettant la vibration :

```js
// Require Cordova plugin : cordova-plugin-vibration

<template>
  <div class="middle-centered">
    <v-btn v-on:click="doVibrate">{{$t("startVibration")}}</v-btn>
  </div>
</template>

<script>
  export default {
    name: 'vibration',
    methods: {
      doVibrate () {
        // Test si la vibration est disponible
        if (navigator.vibrate){
            // Code 
        }else{
          console.error("[cordova-plugin-vibration] Is required to use this function");
        }
      }
    }
  }
</script>
```


### 2. La route

- Ajouter l’import dans ```router/index.js``` :

```js
import Vibration from '@/views/Vibration'
```

- Ajouter l’élément ***au bon endroit*** suivant dans ```router/index.js``` :

```js
{
    path: '/vibration',
    name: 'Vibration',
    component: Vibration
}
```

## Ajouter la vue Flash

Une lampe torche c’est fun non ? Et bien nous allons réaliser une nouvelle page qui aura pour simple but d’allumer (ou éteindre) le flash de votre téléphone. Pour ça nous allons utiliser le plugin ```cordova-plugin-flashlight```, avant d’écrire de code nous allons lire la documentation à [l’adresse suivante](https://github.com/EddyVerbruggen/Flashlight-PhoneGap-Plugin). C’est fait ? Bien passons au code.

L’écriture va se dérouler en 3 étapes :

- Création de ```Flash.vue``` dans ```views```.
- Écriture de code de la vue.
- Déclaration de la route.

✋ Petite subtilité! N’oubliez pas VueJS propose une gestion du cycle de vie. Dans cette vue ça vas nous servir. Nous allons utiliser le ```beforeDestroy``` pour éteindre la lampe si celle si est allumée. 

### 1. Le code

Voici la structure de code. Je vous laisse la compléter

✋ N’oublier pas de gérer le ```beforeDestroy``` pour stoper le flash en changeant de « page »

```js
<template>
  <div class="middle-centered">
    <v-btn v-on:click="toggle">{{ btnTitle }}</v-btn>
  </div>
</template>

<script>
  export default {
    name: 'flash',
    mounted(){
      // Set the ButtonTitle according the plugin state
      this.setBtnTitle();
    },
    beforeDestroy(){
      // When the view is destroyed turnoff the flashlight
      // TODO
    },
    data: () => {
      return {
        btnTitle: ""
      }
    },
    methods: {
      pluginInstalled() {
        // Check if the cordova Flashlight is available
        return (typeof(plugins) !== "undefined" && typeof(window.plugins.flashlight) !== "undefined");
      },
      toggle() {
        if (this.pluginInstalled()){
          // Toggle the flashlight state
          // TODO Call The plugin
        }
      },
      switchOff() {
        if (this.pluginInstalled()){
          // Turn off the flashlight led
          // TODO Call The plugin
        }
      },
      setBtnTitle() {
        // Manage the button title state
        if (this.pluginInstalled()){
          // Test if flashlight is On ?
          if (window.plugins.flashlight.isSwitchedOn()){
            this.btnTitle = this.$t("flashlight.stop");
          }else{
            this.btnTitle = this.$t("flashlight.start");
          }
        }else{
          this.btnTitle = this.$t("flashlight.notAvailable");
        }
      }
    }
  }
</script>
```

### 2. La route

- Ajouter l’import dans ```router/index.js``` :

```js
import Flash from '@/views/Flash'
```

- Ajouter l’élément ***au bon endroit*** suivant dans ```router/index.js``` :

```js
{
    path: '/flash',
    name: 'Flash',
    component: Flash
}
```

## Ajouter la vue Camera

Après le flash, pourquoi ne pas prendre une photo? Et bien avec Cordova c’est très simple. En quelques bout de code Javascript vous allez pouvoir utiliser l’appareil photo du téléphone. Nous allons utiliser le plugin ```cordova-plugin-camera```, avant d’attaquer le code regarder la documentation [disponible ici](https://github.com/apache/cordova-plugin-camera#api-reference-)

L’écriture va se dérouler en 3 étapes :

- Création de ```Camera.vue``` dans ```views```.
- Écriture de code de la vue.
- Déclaration de la route.

### 1. Le code

Pour la caméra, nous allons « juste » faire une simple vue qui permet de lancer l’appareil photo et on affichera l’image prise dans l’application (Tester différentes options pour regarder le fonctionnement du plugin). Voici la structure de code :

```js
<template>
  <div class="middle-centered">
    <div class="text-center">
      <img v-if='imagePath !== ""' v-bind:src="imagePath">
      <v-btn v-on:click="takePicture">{{$t("takePhoto")}}</v-btn>
    </div>
  </div>
</template>
<script>
  import {nativeAlert} from "../libs/index";

  export default {
    name: 'camera',
    data() {
      return {
        imagePath: ""
      }
    },
    methods: {
      // Use the camera plugin to capture image
      takePicture() {
        if (navigator.camera) {
          navigator.camera.getPicture(this.setPicture, {}, {});
        }else{
          // If the navigator.camera is not available display generic error to the user.
          this.error();
        }
      },
      // Set the picture path in the data of the vue
      // this action will automatically update the view.
      setPicture(imagePath){
        this.imagePath = imagePath;
      },
      error(){
        nativeAlert(this.$t("error"));
      }
    }
  }
</script>

<style scoped>
  img{
    width: 50%;
    display: block;
    margin: auto;
  }
</style>
```

### 2. La route

- Ajouter l’import dans ```router/index.js``` :

```js
import Vibration from '@/views/Camera'
```

- Ajouter l’élément ***au bon endroit*** suivant dans ```router/index.js``` :

```js
{
    path: '/camera',
    name: 'Camera',
    component: Camera
}
```


## Fonction avancée le NFC

Il est également possible d’intéragir avec la « puce » NFC de votre mobile (si équipé bien sur). Comme toujours ça passe par un plugin ```phonegap-nfc``` le plugin est plus complet, mais par contre la lecture du serial number est plutôt simple. C’est ce que l’on va voir dans cette partie.

L’écriture va se dérouler en 3 étapes :

- Création de ```Nfc.vue``` dans ```views```.
- Écriture de code de la vue.
- Déclaration de la route.
