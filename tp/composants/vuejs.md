# Les composants avec VueJS 3

::: details Sommaire
[[toc]]
:::

## Introduction

Dans ce TP nous allons mettre en pratique l'écriture de composants en VueJS. De la logique à la réalisation, nous allons parcourir les bases de la réalisation de composants et de la réactivité.

Dans ce projet nous allons utiliser ViteJS qui permettra de créer rapidement un projet VueJS 3.

## Technologies utilisées

Nous allons avoir besoin de différentes technologies pour faire fonctionner le projet :

- [NodeJS](https://nodejs.org/en/)
- [ViteJS](https://vitejs.dev/)
- [VueJS](https://vuejs.org/)
- [Tailwind](https://tailwindcss.com/)

::: tip Pourquoi Tailwind ?
J'ai envie de dire… Pourquoi pas ? Tailwind est une vraie alternative à Bootstrap, l'approche modulaire est intéressante et ce mini projet est un bon moyen de la découvrir.
:::

## Avant-propos

Dans ce TP, je vais partir que votre environnement de travail est déjà fonctionnel. C'est-à-dire que vous avez sur votre machine :

- [NodeJS](https://nodejs.org/en/) (en version LTS)

::: danger Un détail important

Comme pour les PHP avec Laravel, je vous déconseille vivement la création d'un projet dans un lecteur réseau. La multitude de « petits fichiers » est une source de ralentissement non négligeable surtout quand vous êtes plusieurs sur le même lecteur réseau.

:::

## Créer le projet

ViteJS ne nécessite rien d'autre que d'avoir sur votre ordinateur `NodeJS` (minimum 12) et `NPM`. Si c'est le cas pour vous, il vous suffit de saisir dans votre terminal :

```sh
npm init vite
```

::: tip C'est interactif !
L'ensemble du processus est interactif ; il vous suffit donc de suivre les étapes pour créer un projet.

**Attention quand même**, le projet que vous allez créer sera situé dans le dossier courant.
:::

![ViteJS création d'un projet](./res/vitejs.jpg)

::: warning plusieurs choix !
Vous avez le choix du type de projet ; nous allons choisir **Vue** puis **Typescript**. Cette sélection du type de projet est la vraie force de ViteJS, grâce à son système de plug-in ViteJS est complètement agnostique il est donc complètement possible de faire autre chose que du VueJS (et ça, c'est cool).
:::

## Premier lancement

La création du projet ne devrait prendre que quelques instants, une fois réalisé, je vous laisse suivre les instructions fournies par l'outil créé par l'équipe de Vite. À savoir dans mon cas :

```bash
cd vite-project
npm install
npm run dev
```

Si tout se passe bien, vous devriez être capable d'afficher la page de démo d'un projet Vite « Vide » :

![Vite Init project](./res/vite-init.jpg)

::: tip Qu'avons-nous ici ?

Nous avons ici un projet « vide » fourni par Vite + Vue (le tout en TypeScript).

Quelques éléments importants :

- Le serveur Web est intégré (comme Laravel, ou Mini MVC Sample).
- Le serveur « surveille » les fichiers sources et autorafraîchit la page en cas de modifications.
- Vous avez dans l'exemple un composant interactif de démo.

:::

**Avant d'aller plus loin**, je vous laisse tester :

- Le site que vous venez de lancer.
- La modification du code source, je vous propose de changer **Vite + Vue** par **Vite + Vue + Votre Prénom**

Votre modification de code doit être immédiatement disponible.