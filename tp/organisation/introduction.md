# (Ré)organiser mon code

## Introduction

Dans ce TP nous allons voir comment « ré-organiser » du code pour le rendre plus facilement maintenable.

⚠️ Le code fourni est clairement de mauvaise qualitée. Il ne dois pas être pris comme référence. ⚠️

## Code

Le code est [disponible ici](./shitty-app.zip). Les premières étapes sont :

- Installer Wamp (si pas déjà fait).
- Télécharger et « installer » le sources dans votre WAMP.
- Prendre en main l'application (naviguer dans les écrans).
- Regarder le code source.

L'application dois ressembler à :

![preview](./img/capture.png)

## Première analyse du code

Maintenant que vous avez pris en main le code source, quels sont les remarques sur le code pouvez-vous émettre :

```text
Vos remarques


```

PS: Cette première analyse est importante !

{% reveal text='Cliquer pour voir ma « solution »' %}

```text
- Non utilisation de template.
- Le code est répeté (sans utilisation de fonction).
- Le code HTML est dupliqué entre les deux pages.
- L'accès à la données n'est pas centralisé (les fichiers JSON sont ouvert directement depuis la page).
- Il n'y a pas de DAO.
- Il n'y a aucun modèle de données.
```

{% endreveal %}

## Détail des fonctionnalités

Avant de commencer à modifier le code il faut « lister » / « détailler » les différentes fonctionnalité de l'application. Pour moi voilà les points clefs

- Deux pages (une complète, l'autre de détail).
- Utilisation de bootstrap.
- Les données sont stockés dans des fichiers JSON.
- L'interface est responsive.
- Il est possible d'ajouter des éléments via l'interface web.

