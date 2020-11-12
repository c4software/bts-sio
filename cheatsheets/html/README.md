# Aide mémoire HTML

Aide mémoire sur les balises HTML. Vous retrouverez dans cet aide mémoire les éléments que nous avons vus ensembles, mais également les balises qui me semble importantes de connaitre.

::: tip À savoir
Cet aide mémoire ne contient pas l'ensemble des balises, par contre vous retrouverez (en Français) une liste complète de l'ensemble des balises sur le site de la MDM Web Docs [à consulter ici](https://developer.mozilla.org/fr/docs/Web/HTML/Element)
:::

## La structure d'une page

Les balises formant la structure de base sont restées identiques depuis la création des pages Internet. Celle-ci est obligatoire et est le minimum à mettre dans toutes vos pages.

| Balise   | Utilité           |
| -------- | ----------------- |
| `<html>` | Élément Racine    |
| `<head>` | Entête de la page |
| `<body>` | Corps de la page  |

### Exemple

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Titre</title>
  </head>
  <body>
    <!-- Mon Contenu -->
  </body>
</html>
```

### L'entête : head

| Balise     | Utilité                                                       |
| ---------- | ------------------------------------------------------------- |
| `<title>`  | Titre à la page                                               |
| `<style>`  | CSS (Style) de la page                                        |
| `<script>` | JavaScript (Code dynamique)                                   |
| `<link>`   | CSS Externe (Lien)                                            |
| `<meta>`   | Métadonnées de la page (mot-clé, description, encodage, etc.) |

### Le corps : body

Dans la balise `<body>` nous allons retrouver l'ensemble des éléments qui seront affichés dans la page. Nous parlons donc du corps de la page Internet. Les éléments peuvent être rangés dans plusieurs grandes catégories.

#### Structures

| Balise     | Utilité                                    |
| ---------- | ------------------------------------------ |
| `<div>`    | Balise de type block (sans signification)  |
| `<span>`   | Balise de type Inline (sans signification) |
| `<em>`     | Élément notable                            |
| `<small>`  | Petit texte                                |
| `<i>`      | Élément différent                          |
| `<img />`  | Une image                                  |
| `<audio>`  | Un son                                     |
| `<br>`     | Un saut de ligne                           |
| `<video>`  | Une video                                  |
| `<hr />`   | Séparateur horizontal                      |
| `<iframe>` | Affiche une autre page dans la page        |

Les balises `<div></div>` ou `<span></span>` ne sont utile que d'un point de vue organisation de votre code. Elles n'ont aucun autre but que de grouper, organiser, permettre la personnalisation CSS de votre page. Il convient donc de leur adjoindre des attributs de type `class`, `id` ou `style`.

#### Les listes

| Balise | Utilité                             |
| ------ | ----------------------------------- |
| `<ul>` | Liste simple                        |
| `<ol>` | Liste ordonnée (numéro)             |
| `<li>` | Un élément de la liste (le contenu) |

```html
<ul>
  <li>Élément 1</li>
  <li>Élément 2</li>
  <li>Élément 3</li>
</ul>
```

#### Le texte

| Balise     | Utilité                    |
| ---------- | -------------------------- |
| `<p>`      | Un paragraphe              |
| `<i>`      | Élément italic / différent |
| `<br>`     | Une nouvelle ligne         |
| `<h1>`     | Titre de niveau 1          |
| `<h2>`     | Titre de niveau 2          |
| `<h3>`     | Titre de niveau 3          |
| `<h4>`     | Titre de niveau 4          |
| `<h5>`     | Titre de niveau 5          |
| `<h6>`     | Titre de niveau 6          |
| `<a>`      | Un lien                    |
| `<strong>` | Texte « important »        |

#### Les formulaires

| Balise       | Utilité                       |
| ------------ | ----------------------------- |
| `<form>`     | Un formulaire                 |
| `<input>`    | Champs du formulaire          |
| `<select>`   | Énumération d'élément (liste) |
| `<option>`   | Élément de la liste           |
| `<label>`    | Libellé d'un champ            |
| `<optgroup>` | Groupe d'élément              |
| `<fieldset>` | Groupe de champs              |

#### Les tableaux

| Balise    | Utilité                  |
| --------- | ------------------------ |
| `<table>` | Racine du tableau        |
| `<thead>` | Section de l'entête      |
| `<tbody>` | Section du corps         |
| `<tfoot>` | Section pied             |
| `<tr>`    | Ligne du tableau         |
| `<th>`    | Cellule de type d'entête |
| `<td>`    | Cellule de contenu       |

```html
<table>
  <thead>
    <tr>
      <th>Mois</th>
      <th>Étudiant</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Janvier</td>
      <td>10</td>
    </tr>
    <tr>
      <td>Février</td>
      <td>20</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Total</td>
      <td>30</td>
    </tr>
  </tfoot>
</table>
```

ou plus simplement :

```html
<table>
  <tr>
    <th>Mois</th>
    <th>Étudiant</th>
  </tr>
  <tr>
    <td>Janvier</td>
    <td>10</td>
  </tr>
  <tr>
    <td>Février</td>
    <td>20</td>
  </tr>
  <tr>
    <td>Total</td>
    <td>30</td>
  </tr>
</table>
```

### Les Attributs

L'ensemble des balises HTML peuvent être personnalisées via des attributs.

```html
<div class="blue" id="uneDiv">Texte en bleu</div>
<img src="/mon/image.png" />
<a href="/">Mon lien</a>
```

> Les attributs contiennent des informations supplémentaires qui portent sur l'élément et qu'on ne souhaite pas afficher avec le contenu. Dans cet exemple, l'attribut class permet d'utiliser un nom pour identifier l'élément et ce nom pourra être utilisé plus tard pour la mise en forme ou autre chose.

Source: MDM

### Allons plus loin : La sémantique

Sémantiquement il est possible d'organiser encore plus votre HTML. Pour ça nous utiliserons :

| Balise      | Utilité                            |
| ----------- | ---------------------------------- |
| `<header>`  | Entête d'un contenu                |
| `<nav>`     | Lien de navigation                 |
| `<section>` | Partie du contenu                  |
| `<footer>`  | Pied du contenu                    |
| `<article>` | Un article (comme dans un journal) |
| `<aside>`   | Contenu complémentaire             |

### Activer le responsive

De base votre navigateur « n'est pas responsive ». Si vous souhaitez que celui-ci ajuste sont contenu à la taille de l'écran il faut ajouter la méta suivante :

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```
