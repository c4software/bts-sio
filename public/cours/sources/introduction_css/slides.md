# Introduction CSS

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Séparer le fond et la forme avec HTML et CSS

---

## La CSS

Décrit la présentation de vos pages Internet

---

## CSS signifie

- **`C`** => Cascading
- **`S`** => Style
- **`S`** => Sheet

---

_En français :_ Une feuille de style

---

- CSS1 1996
- CSS2 1998 (amélioration de CSS1)
- CSS3 la version courante (amélioration et fonction type bord arrondi, animation, etc.)

---

CSS a donc été développé par « niveaux ».

---

## Sur un principe de version

CSS1 est développé pour être un sous-ensemble de CSS2, qui est lui-même développé pour être un sous-ensemble de CSS3.

---

![CSS3 Taxonomy](./res/CSS3_taxonomy.svg)

---

## Oui… et concrètement ? 🤔

## Plus le navigateur est ancien…

# moins il connaît de propriétés CSS

---

## ✋

Nous devons donc vérifier le support.

[Can I Use](https://www.caniuse.com/)

![Border Radius sur Can I Use](./res/can_i_use.png)

---

## Le fonctionnement des « Rules CSS »

### 2 parties

- Le sélecteur : L'élément à viser « `table`, `div`, `#id`, `.class` ».
- La déclaration : Le style en lui-même. Écrit sous la forme de `propriété: valeur`.

---

![CSS Ruleset](./res/css-ruleset.png)

---

## Id ou Class ?

| Sélecteur | Usage                                         |
| --------- | --------------------------------------------- |
| #item     | Élément unique dans votre page                |
| .rouge    | Class réutilisable (multiple) dans votre code |
| p         | L'ensemble des balises de type `<p>`          |

- `class="rouge"` => `.rouge`
- `id="monId"` => `#monId`

---

## On résume

- `id=` => `#`
- `class=` => `.`

C'est une notation universelle qui sera également valable en JavaScript

---

## Un exemple

Comment le lire ?

<div class="colContainer">
    <div class="col">
        <iframe src='/demo/css/index.html'></iframe>
    </div>
    <div class="col">
        <img src='./res/css_basic.png' />
    </div>
</div>

---

## Les sélecteurs

![Les sélecteurs](./res/selector.png)

---

## Les sélecteurs

```html
<p>Exemple <i>suite…</i> !</p>

<style>
  p {
    font-weight: bold;
  }

  p > i {
    color: red;
  }
</style>
```

---

## Les sélecteurs

```html
<h1>Titre</h1>
<p>Exemple <i>suite…</i> !</p>

<style>
  p,
  h1 {
    color: red;
  }
</style>
```

---

## Les sélecteurs

```html
<p id="contenu">Exemple <span class="suite">suite…</span> !</p>

<style>
  #contenu {
    background: red;
  }

  .suite {
    background: white;
  }
</style>
```

---

## En résumé

| Sélecteur | Cible                               |
| --------- | ----------------------------------- |
| #item     | Élément avec id `item`              |
| .item     | Élément(s) avec class `item`        |
| p         | Élément(s) de type `p`              |
| div, p    | Élément(s) de type `div` ou `p`     |
| p > i     | Élément(s) de type `i` enfant direct de `p`     |
| .item > i | Élément(s) de type `i` enfant direct de `.item` |

Consulter [une liste plus complète ici](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_selectors)

---

## Les balises « neutres »

- `<span>` : une portion **dans** une ligne.
- `<div>` : un **bloc** entier.

Aucun sens, juste des crochets pour votre CSS.

---

## Les commentaires

```css
/* Ceci est un commentaire CSS,
   sur plusieurs lignes si besoin */
```

---

## Où déclarer la feuille de style ?

- Dans un fichier externe `monfichier.css`. (👍)
- Dans le document `<style>p {color: red}</style>`.
- Dans l'élément via l'attribut `style=''` `<p style='color: red'>Ceci est rouge</p>`. (🙅‍♂️)

---

## Pourquoi choisir la CSS Externe ?

### Permet de partager la CSS entre plusieurs pages.

---

## Cascading ? Vous vous souvenez ?

Il y a donc un ordre d'application de la CSS

- Style du navigateur.
- CSS externe.
- Balises styles dans le document.
- Attribut style.

---

## Mais

S’il le faut…

```css
color: red !important;
```

---

## Les ressources d'exemples

- CodePen
- S'inspirer c'est « progresser »

---

## Analyser / Copier

- Vous avez pour ça « l'inspecteur d'éléments ».
- Aide & Code source

---

![Inspecteur d'éléments](./res/inspecteur_elements.png)

---

## Récapitulatif

- Une règle CSS : un sélecteur + des déclarations.
- Les sélecteurs : balise, `.class`, `#id`.
- La feuille de style externe, partagée entre les pages.
- La cascade décide qui gagne.

---

## Des questions ?

Place au TP 🚀

---

## Mise en pratique

[Découverte de la CSS](/tp/html_css/tp2.html)
