# Mise en pratique Responsive

Dans ce TP nous allons « mettre en pratique » ce que nous avons vu de manière théorique dans le cours sur le Responsive. Cette notion est primordiale, le trafic provenant d'un mobile n'est pas/plus à négliger.

## Introduction

Comme nous l'avons vu dans le cours, la problématique du responsive ne dois pas être prise à la légère. C'est une vraie compétence que vous devez maitriser. Nous allons donc mettre en pratique cette compétence en partant d'un modèle très proche de celui précédemment fait.

Voilà le rendu de ce que nous allons devoir obtenir :

<iframe width="560" height="315" src="https://www.youtube.com/embed/wg-wYpSs-f8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Avant d'aller plus loin, je vous laisse regarder la vidéo, l'analyser, afin de voir les modifications qui interviennent en fonction de la taille de l'écran.

- Première étape [télécharger les sources](/demo/css/tp4/init_projet.zip).
- Puis valider le fonctionnement sur votre ordinateur.

## Activation du responsive

En cours je vous ai parlé de « deux d'étapes » pour activer le responsive. La première est la mise en place de la `meta` indiquant à votre navigateur le contenu doit prendre la largeur de l'écran. Pour ça ajouter la `meta` suivante dans votre projet.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

- Ajouter la meta dans votre code
- Regarder si le comportement de votre page a changé lors du redimensionnement de votre navigateur.

## Des colonnes ? Et veux-tu, en voilà !

Nous avons activé le responsive, mais pour l'instant nous n'avons pas indiqué les règles « à appliquer en fonction de la taille de l'écran ». Pour ça nous allons utiliser les `media-query`. Pour gérer le responsive, nous avons plusieurs façons de faire écrire des règles « pour l'ensemble des éléments », ou alors écrire quelque chose de très générique en utilisant par exemple le `display: flex`.

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

Tester de modifier la CSS, retirer par exemple :

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

Dans le cours nous avons parlé de deux façons d'écrire les règles de responsive. Je vous laisse modifier votre code source, afin de « sortir » les règles de CSS relatif à la partie responsive.

::: tip Astuce du chef
N'oubliez pas de retirer les « media-queries » de la CSS, elles ne sont pas nécessaires du fait que vous avez conditionné le chargement entier de la feuille de style.
:::

### Et l'impression ?

Nous l'avons vu en cours il est possible de personnaliser l'affichage lors de l'impression. Dans notre cas, j'aimerais que pour le `@media print` vous retiriez :

- Le header
- Les liens de navigation
- Le pied de page

Au final j'aimerais qu'il ne reste que « les articles », simplement entouré d'une petite bordure de type `dashed`.
