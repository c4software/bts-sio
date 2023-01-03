---
description: Dans ce TP nous allons voir comment VueJS 3.0 peut être utilisé pour créer une application web. 
---

# Créer une application web avec VueJS 3

Nous avons vu dans les TP précédent comment utiliser VueJS 3 pour :

- Moderniser une application web existante.
- Créer un site web (avec un routeur).
- Appeler des API Rest en Ajax (en utilisant Fetch).

Dans ce TP nous allons aller plus loin en créant une application web complète.

Dans ce TP nous allons voir une autre façon d’utiliser VueJS, une façon plus moderne, celle qui utilise à 100% le modèle MVVM (Modèle Vue, Vue-Modèle) ainsi que la puissance de VueJS (.vue, TypeScript, Composition API).

![MMVM Pattern](./res/MVVMPattern.png)

::: details Table des matières
[[toc]]
:::

::: danger TP en cours de rédaction

Ce TP est en cours de rédaction, il est possible qu'il y ait des erreurs ou des incohérences.

Vous pouvez consulter la version VueJS 2 du TP [ici](../vuejs/tp2.md).

:::

## Une application web ?

Une application Web ou un site Web ? Quelle est la différence ? C'est une bonne question, la nuance est faible. Mais, une application Web, c'est en quelques sorte comme une application classique (celle que vous avez sur votre ordinateur) mais qui est accessible depuis un navigateur Web.

Cette application aura donc le comportement d'une application classique à savoir :

- Une interface graphique (avec des boutons, des menus, des listes, des formulaires, etc.).
- Une logique métier (qui permet de faire des calculs, de gérer des données, etc.).
- Un fonctionnement hors ligne (si l'utilisateur n'a pas de connexion Internet).
- Sera installable sur un appareil (smartphone, tablette, etc.).

C'est ce que l'on nomme une Progressive Web App (PWA). Cette application Web, reprendra les codes d'une application classique (Navbar, Sidebar, etc.).

::: tip Un exemple ?

Le bon exemple est le site de Twitter qui est une application Web. Vous pouvez l'installer sur votre smartphone et l'utiliser comme une application classique. Vous pouvez même l'utiliser sans connexion Internet. ([Voir le site](https://twitter.com/))

Et pourtant ça reste un site Web, codé en HTML, CSS et JavaScript (qui utilise ReactJS).

:::

## MVVM en quelques mots

Non, mais moi je connais que MVC, c’est quoi MVVM ?

MVVM est un design pattern, souvent utilisé par les bibliothèques JavaScript modernes (Ionic, VueJS, ReactJS). À l’origine, MVVM a été introduit par Microsoft.

Ce pattern a spécialement été conçu pour améliorer la séparation entre les données et la vue qui les affichent. Le lien entre la vue et le modèle de données est fait par des mécanismes de binding. Le binding est un mécanisme qui permet de faire des liaisons entre des données de manière dynamiques. Ce qui veut dire que si A et B sont liés, le fait de modifier A va être répercuté sur B et inversement.

- Model : le modèle contient les données.
- View : la vue correspond à ce qui est affiché. C’est notre site Web.
- ViewModel : ce composant fait le lien entre le modèle et la vue. Il s’occupe de gérer les liaisons de données et les éventuelles conversions. C’est ici qu’intervient le binding.

L’important avec MVVM c’est que **_la vue ne doit jamais traiter de données_**. Elle s’occupe uniquement de les afficher. Le View-Model aura en charge les conversions et les accès au modèle de données.

## Introduction

Maintenant que vous savez ce que c’est le MVVM, nous allons attaquer le TP pour de vrai. Nous allons réaliser « une application » à l’aide de VueJS. Cette application est purement démonstrative. Cette application calculera la hauteur d’une falaise (ou de n’importe quoi de suffisamment haut) en fonction du temps chute d’un objet jeter du haut de celle-ci.

![Cliff-Height-Timer-VueJS](https://github.com/c4software/Cliff-Height-Timer-VueJS/raw/master/demo.png)

## Créer le projet

Pour commencer, nous allons créer un nouveau projet avec VueJS 3. Nous allons utiliser la ligne de commande pour créer notre nouveau projet :

```bash
npm create vite@latest
```

Paramètres à choisir :

- nom du projet : cliff-height-timer-vuejs
- framework : vue
- Langage : TypeScript

### Lancer le projet

Avant d'aller plus loin, je vous invite à lancer le projet pour voir ce que ça donne :

```bash
cd cliff-height-timer-vuejs
npm install
npm run dev
```

Le site de démonstration devrait s'ouvrir dans votre navigateur par défaut.

## Le code source

Les sources de l’application sont dans le dossier `src/` il contient l’ensemble du code source de votre application. Pour l’instant nous avons le code fourni par VueJS, au fur et à mesure des futures étapes, nous allons le modifier pour le transformer dans l’application « Cliff Height Timer ».

## L’IDE

Pour faire du VueJS le mieux, c’est d’avoir un bon IDE. Au revoir, Notepad++, bonjour WebStorm? Malheureusement WebStorm est payant, si vous avez une licence tant mieux (pour les étudiants c’est gratuit 💰).

Pour ceux qui n’ont pas de licence, je vous propose d’utiliser [Visual Studio Code](https://code.visualstudio.com) et d’ajouter le plug-in `Volar` pour pouvoir éditer les `.vue` dans de bonnes conditions.

::: tip Le choix de l’IDE est important

En effet, même si vous n'en avez pas l'impression. Votre IDE est une partie importante de votre développement. Il vous permet de gagner du temps et de vous concentrer sur le code. 

:::

## Les plugins

Nous l'avons vu dans les autres TP, mais l'écosystème VueJS est très riche, et propose de nombreux plugins. Faire un choix de plugins est donc important, dans ce TP nous allons utiliser des plugins qui vont nous permettre de gagner du temps, et surtout de réaliser une application qui respecte les bonnes pratiques. Les plugins que nous allons utiliser sont :

- [Vue Router](https://router.vuejs.org) : pour gérer les routes de notre application.
- [Element Plus](https://element-plus.org) : pour avoir des composants UI.

