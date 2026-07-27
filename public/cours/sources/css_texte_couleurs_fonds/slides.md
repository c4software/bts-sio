# Texte, couleurs et fonds

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Au programme

- La typographie
- Les couleurs
- Les fonds
- L'héritage (le « C » de CSS)

---

## Formater du texte

---

## La taille : `font-size`

- Absolue : `16px` (précis mais rigide)
- Relative : `1.2em` (s'adapte au contexte) 👍

---

## La notation `em`

`1.3em` = « 30 % plus grand que le parent »

⚠️ Le séparateur est un **point** : `1.3em`

---

## La police : `font-family`

```css
body {
  font-family: Verdana, Arial, sans-serif;
}
```

### Pourquoi une liste ?

---

## La police doit exister chez le visiteur

On donne donc des polices de **secours**, de la préférée à la plus générique.

(Et Google Fonts pour aller plus loin)

---

## Gras, italique, décorations

| Propriété         | Valeurs                             |
| ----------------- | ----------------------------------- |
| `font-weight`     | `normal`, `bold`, 100 à 900         |
| `font-style`      | `normal`, `italic`                  |
| `text-decoration` | `underline`, `line-through`, `none` |

---

## `strong` ou `font-weight: bold` ?

### Quelle différence ?

---

## Le sens vs l'apparence

- `<strong>` : « ce mot est important » (HTML)
- `font-weight: bold` : « ce texte est épais » (CSS)

---

## L'alignement : `text-align`

`left`, `center`, `right`, `justify`

⚠️ Uniquement sur les balises « block »

---

## Le float

### Habiller une image de texte

![Float left](/cours/sources/introduction_css/res/float-left.png)

---

```css
img {
  float: left;
}
```

Et `clear: both` pour arrêter l'habillage.

---

## Les couleurs

### 3 notations

---

## En anglais

- `red`, `blue`, `teal`…

Rapidement limité. [Seulement 140 couleurs](https://www.w3schools.com/cssref/css_colors.asp)

---

## En hexadécimal

![Hex Reading](/cours/sources/introduction_css/res/hex-reading.png)

**La** notation universelle du design.

---

## En RGB

```css
color: rgb(246, 243, 242);
```

Identique à l'hexadécimal, en décimal.

---

## Comment choisir sa couleur ?

![Color Picker](/cours/sources/introduction_css/res/picker.png)

Un « Color Picker » (IDE, en ligne, Google)

---

```css
body {
  background: black;
  color: white;
}
```

### Que va-t-il s'afficher ?

---

## Tout le texte est blanc !

Même les `p`, sans aucune règle sur `p`…

### 🤔

---

## L'héritage

Les enfants **héritent** des propriétés de leurs parents.

C'est le « C » de CSS : **Cascading**.

---

## La stratégie gagnante

- Le style général sur `body`.
- On affine seulement ce qui doit changer.

```css
body { color: #333; }
h1 { color: #1d2d3a; } /* Plus précis : gagne */
```

---

## Les fonds

### Pas seulement des couleurs

```css
body {
  background-image: url("../img/motif.png");
}
```

---

![Logo Repeat](/cours/sources/introduction_css/res/logo_repeat.png)

---

## C'est moche hein ?

---

## Vous pouvez compléter avec :

| Propriété             | Valeurs                                       |
| --------------------- | --------------------------------------------- |
| background-repeat     | no-repeat, repeat-x, repeat-y, repeat         |
| background-attachment | fixed, scroll                                 |
| background-position   | en pixel, ou top, bottom, left, right, center |

---

```css
body {
  background-image: url("logo.png");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center;
}
```

---

![Center](/cours/sources/introduction_css/res/logo_center.png)

---

## La version « combinée »

```css
background: url("logo.png") fixed no-repeat center;
```

---

## ⚠️ Le piège du chemin

Dans un fichier CSS, `url(…)` est relatif…

### au fichier CSS, pas au HTML !

---

## La transparence

```css
img {
  opacity: 0.6; /* 60 % opaque */
}
```

S'applique à l'élément **entier** (enfants compris).

---

## Récapitulatif

- Typographie : `em`, polices avec secours.
- Couleurs : l'hexadécimal partout.
- Fonds : `background`, chemin relatif à la CSS.
- Héritage : le général sur `body`, on affine ensuite.

---

## Des questions ?

Place au TP 🚀
