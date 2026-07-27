---
description: "Dans ce TP nous allons découvrir Flexbox puis mettre en pratique le Responsive. Cette notion est primordiale, le trafic provenant d'un mobile n'est pas/plus à négliger."
---

# Flexbox et Responsive

::: details Sommaire
[[toc]]
:::

Dans ce TP nous allons « mettre en pratique » ce que nous avons vu de manière théorique dans le cours sur le Responsive. Cette notion est primordiale, le trafic provenant d'un mobile n'est pas/plus à négliger. Et pour y arriver, nous allons d'abord nous équiper de l'outil de mise en page moderne par excellence : **Flexbox**.

## Les slides

Avant de commencer, un tour rapide des compétences du jour : Flexbox (conteneur, direction, alignements) et les media queries.

<ClientOnly>
<SlidesDeck src="css_flexbox_responsive" />
</ClientOnly>

## Prérequis

- Avoir réalisé le [TP 3 : Mise en pratique CSS](./tp3.md).

## Objectifs

À la fin de ce TP vous saurez :

- Mettre en page des éléments avec Flexbox.
- Activer le responsive avec la meta viewport.
- Adapter l'affichage à la taille d'écran avec les media queries.

## Flexbox, la mise en page moderne

Historiquement, les développeurs ont tout essayé pour mettre des éléments côte à côte : des tableaux HTML (berk), des `float` (bof)… Aujourd'hui nous avons **Flexbox** : vous déclarez un **conteneur**, et le navigateur place ses **enfants directs** intelligemment.

```css
.conteneur {
  display: flex;
}
```

C'est tout : les enfants du conteneur se placent côte à côte. Ensuite, cinq propriétés couvrent l'essentiel des besoins :

- `flex-direction` : le sens (`row` en ligne, `column` en colonne).
- `flex-wrap` : le comportement quand la place manque (`wrap` autorise le passage à la ligne).
- `justify-content` : la répartition sur l'axe principal (`center`, `space-between`, …).
- `align-items` : l'alignement sur l'axe secondaire (`center`, `stretch`, …).
- `flex` (sur un enfant) : sa capacité à grandir (`flex: 1` = « prends l'espace disponible »).

Le fameux centrage parfait, horizontal **et** vertical, tient en trois lignes :

```css
.conteneur {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

::: details Question : justify-content ou align-items, comment s'en souvenir ?
`justify-content` travaille sur l'axe **principal** (celui de `flex-direction`), `align-items` sur l'axe **secondaire** (perpendiculaire). En `row` (le défaut) : justify = horizontal, align = vertical. Si vous passez en `column`, les deux s'inversent ! C'est le piège classique.
:::

::: tip S'entrainer en s'amusant
Le meilleur moyen d'ancrer Flexbox : [Flexbox Froggy](https://flexboxfroggy.com/#fr), un petit jeu où vous placez des grenouilles en écrivant de la CSS. Je vous laisse faire quelques niveaux, c'est redoutablement efficace. Le détail complet des propriétés est [dans le support](/tp/html_css/support.md#le-placement-simplifie).
:::

### À faire

Sur une page de test, réaliser une barre de navigation avec Flexbox : un logo à gauche, trois liens à droite.

::: details Voir l'une des solutions possibles

```css
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav ul {
  display: flex;
  gap: 20px;
  list-style: none;
}
```

:::

## Introduction

Comme nous l'avons vu dans le cours, la problématique du responsive ne doit pas être prise à la légère. C'est une vraie compétence que vous devez maitriser. Nous allons donc mettre en pratique cette compétence en partant d'un modèle très proche de celui précédemment fait.

Voilà le rendu de ce que nous allons devoir obtenir :

<iframe width="560" height="315" src="https://www.youtube.com/embed/wg-wYpSs-f8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Avant d'aller plus loin, je vous laisse regarder la vidéo, l'analyser, afin de voir les modifications qui interviennent en fonction de la taille de l'écran.

- Première étape [télécharger les sources](/demo/css/tp4/init_projet.zip).
- Puis valider le fonctionnement sur votre ordinateur.

## Activation du responsive

En cours je vous ai parlé de « deux étapes » pour activer le responsive. La première est la mise en place de la `meta` indiquant à votre navigateur que le contenu doit prendre la largeur de l'écran. Pour ça, ajoutez la `meta` suivante dans votre projet.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

- Ajouter la meta dans votre code
- Regarder si le comportement de votre page a changé lors du redimensionnement de votre navigateur.

## Des colonnes ? En veux-tu, en voilà !

Nous avons activé le responsive, mais pour l'instant nous n'avons pas indiqué les règles « à appliquer en fonction de la taille de l'écran ». Pour ça nous allons utiliser les `media-query`. Pour gérer le responsive, nous avons plusieurs façons de faire : écrire des règles « pour l'ensemble des éléments », ou alors écrire quelque chose de très générique en utilisant par exemple le `display: flex`.

C'est la solution `display: flex` que je vous propose de mettre en place ([rappel sur le Flex](/tp/html_css/support.md#la-revolution-des-flex)). Ajouter la CSS suivante **à la fin**

```css
@media only screen and (min-width: 960px) {
  /* Changement de ligne à colonnes */
  main {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  /* Seulement 2 éléments par ligne */
  main > section {
    flex: 1 0 44%;
  }
}

@media only screen and (max-width: 959px) {
  header > h1 {
    padding: 30px;
  }

  nav {
    padding: 10px;
  }
}
```

### Quelques explications

Je vous laisse analyser la CSS, mais côté responsive nous avons seulement :

```css
/*
 * Règle appliquée pour les grands écrans
 */
@media only screen and (min-width: 960px) {
}

/*
 * Règle appliquée pour les petits écrans
 */
@media only screen and (max-width: 959px) {
}
```

### Modification

Essayez de modifier la CSS, retirez par exemple :

```css
main > section {
  flex: 1 0 44%;
}
```

### Changer le fond

Écrire la CSS et la Media Query, afin que le fond soit « différent » si la taille de l'écran est supérieure à `1500px`.

### Taille du texte

Écrire la Media-Query et la CSS qui permet de réduire la taille du texte pour une taille inférieure à `500px`.

### Sortir les règles de « Responsive »

Dans le cours nous avons parlé de deux façons d'écrire les règles de responsive. Je vous laisse modifier votre code source, afin de « sortir » les règles de CSS relatives à la partie responsive.

::: tip Astuce du chef
N'oubliez pas de retirer les « media-queries » de la CSS, elles ne sont pas nécessaires du fait que vous avez conditionné le chargement entier de la feuille de style.
:::

### Et l'impression ?

Nous l'avons vu en cours il est possible de personnaliser l'affichage lors de l'impression. Dans notre cas, j'aimerais que pour le `@media print` vous retiriez :

- Le header
- Les liens de navigation
- Le pied de page

Au final j'aimerais qu'il ne reste que « les articles », simplement entourés d'une petite bordure de type `dashed`.

## Le fil rouge : votre blog

Le grand final du fil rouge : rendre votre blog **adaptable à toute taille d'écran** !

- Ajouter la meta viewport dans toutes les pages.
- Sur grand écran : les cartes d'articles s'affichent en grille (Flexbox + `flex-wrap`).
- Sur mobile : les cartes passent les unes sous les autres, les espacements se resserrent.
- Tester avec le mode mobile de l'inspecteur d'éléments.

::: details Coup de pouce : par où commencer ?
C'est exactement ce que vous venez de faire dans ce TP, appliqué à votre projet : un `display: flex; flex-wrap: wrap;` sur le conteneur des cartes, et une media query pour ajuster ce qui doit l'être. Repartez de votre code du TP, adaptez les sélecteurs.
:::

::: tip Point de contrôle
Votre blog est agréable à lire du téléphone au grand écran, sans défilement horizontal. Faites-moi valider avant de partir : c'est la dernière étape du fil rouge, votre blog est terminé, bravo !
:::

## Conclusion

Dans ce TP vous avez :

- Mis en page des éléments avec Flexbox (conteneur, axes, alignements).
- Activé le responsive avec la meta viewport.
- Écrit des media queries pour adapter l'affichage (écran et impression).
- Rendu votre blog responsive, dernière étape du fil rouge.

Pensez à sauvegarder votre travail. La suite : le [deuxième point étape évalué](./eval2.md), puis [le maquettage](./maquette.md) et [les frameworks CSS](./framework_css/introduction.md).

👋 Si vous avez des questions, n'hésitez pas.
