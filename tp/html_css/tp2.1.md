---
description: "Dans ce TP nous allons donner une vraie personnalité à nos pages : typographie, couleurs, fonds, et un concept fondamental, l'héritage."
---

# Texte, couleurs et fonds

::: details Sommaire
[[toc]]
:::

Dans le [TP précédent](./tp2.md) vous avez écrit vos premières règles CSS. Dans ce TP nous allons enrichir votre palette : mettre en forme le texte, jouer avec les couleurs et les fonds, et surtout comprendre **l'héritage**, le concept qui donne son « C » à la CSS.

## Les slides

Avant de commencer, un tour rapide des compétences du jour : la typographie, les notations de couleurs, les fonds et la cascade.

<ClientOnly>
<SlidesDeck src="css_texte_couleurs_fonds" />
</ClientOnly>

## Prérequis

- Avoir réalisé le [TP 2 : Découverte de la CSS](./tp2.md) (votre blog a donc déjà sa feuille de style).

## Objectifs

À la fin de ce TP vous saurez :

- Mettre en forme du texte (taille, police, gras, alignement).
- Utiliser les trois notations de couleurs.
- Définir des fonds (couleurs et images).
- Expliquer l'héritage et la cascade.

## La typographie

### La taille du texte

Deux familles d'unités s'offrent à vous :

- **Absolue** : le pixel (`font-size: 16px`). Précis, mais rigide.
- **Relative** : le `em` / `rem` (`font-size: 1.2em`). La taille s'adapte au contexte et aux préférences de l'utilisateur.

```css
h1 {
  font-size: 2em; /* 2 fois la taille de base */
}

p {
  font-size: 1em; /* La taille de base */
}
```

::: tip La bonne pratique
Privilégiez les unités relatives (`em`, `rem`). `1.3em` signifie « 30 % plus grand que le texte du parent ». Attention à la notation : le séparateur décimal est un **point** (`1.3em`), pas une virgule. Pour la différence entre `em` et `rem`, [le support détaille tout ça](/tp/html_css/support.md#taille-du-texte-absolue-ou-relative).
:::

### La police

La propriété `font-family` définit la police. Subtilité : la police doit exister **sur l'ordinateur du visiteur**. On indique donc toujours une liste de polices de secours, de la préférée à la plus générique :

```css
body {
  font-family: Verdana, Arial, sans-serif;
}
```

Si le nom contient des espaces, il faut des guillemets : `"Arial Black"`.

::: tip Envie d'une police originale ?
[Google Fonts](https://fonts.google.com/) permet de charger la police de votre choix (nous l'avons croisé, et [le support vous montre comment](/tp/html_css/support.md#choisir-la-police)).
:::

### Gras, italique, décorations, alignements

| Propriété         | Usage                    | Valeurs principales                    |
| ----------------- | ------------------------ | -------------------------------------- |
| `font-weight`     | Le « niveau de gras »    | `normal`, `bold`, ou de 100 à 900      |
| `font-style`      | L'italique               | `normal`, `italic`                     |
| `text-decoration` | Souligné, barré          | `underline`, `line-through`, `none`    |
| `text-align`      | L'alignement             | `left`, `center`, `right`, `justify`   |

::: details Question : quelle différence entre strong et font-weight: bold ?
`<strong>` donne du **sens** (« ce mot est important »), `font-weight: bold` donne une **apparence** (« ce texte est épais »). D'ailleurs, rien ne vous empêche d'afficher un `<strong>` en rouge non gras : le sens reste, l'apparence change. HTML pour le fond, CSS pour la forme, toujours.
:::

::: warning text-align et les balises inline
`text-align` s'applique aux balises « bloc » (`p`, `h1`, `div`…), pas aux balises « en ligne » (`span`, `a`…). Nous détaillerons cette histoire de bloc / en ligne dans le [TP sur le modèle des boîtes](./tp2.2.md).
:::

### Habiller une image de texte

Petit bonus typographique : la propriété `float` permet de faire « flotter » une image pour que le texte l'entoure, comme dans un journal :

```css
img {
  float: left; /* ou right */
}
```

Et pour arrêter l'habillage, la propriété `clear: both` sur l'élément suivant. [Des exemples illustrés dans le support](/tp/html_css/support.md#le-float).

### À faire

Reprenez la page de test du TP précédent et :

- Passer le corps de texte dans une police avec police de secours.
- Mettre les titres dans une taille en `em`.
- Centrer le `h1`.
- Souligner un élément de votre choix… sans utiliser de balise HTML.

## Les couleurs

Trois notations pour définir une couleur :

- **En anglais** : `red`, `blue`, `teal`… simple mais limité ([140 couleurs](https://www.w3schools.com/cssref/css_colors.asp)).
- **En hexadécimal** : `#FF5A28`. Deux caractères par composante Rouge / Vert / Bleu (`#000000` = noir, `#FFFFFF` = blanc). C'est **la** notation universelle du design.
- **En RGB** : `rgb(255, 90, 40)`. Identique à l'hexadécimal, en notation décimale.

```css
h1 {
  color: #1d2d3a;
}

p {
  color: rgb(60, 60, 60);
}
```

::: tip Le colorimètre
Personne ne connait les codes hexadécimaux par cœur. Utilisez un « Color Picker » : celui de votre IDE, [un site en ligne](https://www.webfx.com/web-design/color-picker/), ou [directement Google](https://www.google.com/search?q=colorpicker).
:::

## Les fonds

### La couleur de fond

```css
body {
  background-color: black;
  color: white;
}
```

::: details Question : avec le code ci-dessus, de quelle couleur est le texte d'un paragraphe ?
Blanc ! Pourtant, aucune règle ne cible `p`… C'est **l'héritage** : le paragraphe est à l'intérieur du `body`, il hérite de sa couleur de texte. On y vient juste après, c'est le concept le plus important de ce TP.
:::

### Les images de fond

La propriété `background-image` permet de mettre une image en fond de n'importe quel élément :

```css
body {
  background-image: url("../img/motif.png");
}
```

::: warning Le chemin est relatif à la CSS
Piège classique : dans un fichier CSS, le chemin de `url(…)` est relatif **au fichier CSS**, pas au fichier HTML. Si votre CSS est dans `css/` et l'image dans `img/`, il faut donc remonter : `../img/motif.png`.
:::

Par défaut le fond se répète à l'infini. Vous pouvez contrôler ce comportement avec `background-repeat`, `background-position` et `background-attachment`, combinables en une seule « super-propriété » :

```css
body {
  background: url("../img/logo.png") no-repeat fixed center;
}
```

Le détail complet de ces propriétés est [dans le support](/tp/html_css/support.md#les-images-de-fonds).

### La transparence

La propriété `opacity` (de 0 à 1) rend un élément plus ou moins transparent :

```css
img {
  opacity: 0.6; /* 60 % opaque */
}
```

Attention, elle s'applique à l'élément **entier** (ses enfants compris).

## L'héritage et la cascade

Le moment le plus important du TP. CSS signifie **Cascading** Style Sheets : les styles « ruissellent » de parent en enfant.

```css
body {
  font-family: Verdana, sans-serif;
  color: #333333;
}
```

Avec ces 3 lignes, **tout** votre site (paragraphes, listes, titres…) utilise Verdana en gris foncé : chaque balise **hérite** des propriétés de son parent.

Et si une règle plus précise existe, elle gagne :

```css
body {
  color: #333333;
}

h1 {
  color: #1d2d3a; /* Les h1 échappent à l'héritage : la règle est plus précise */
}
```

::: tip La bonne stratégie
Définissez le style « général » sur `body` (police, couleur de texte, fond), puis affinez uniquement ce qui doit être différent. C'est moins de code, et un site cohérent.
:::

::: details Question : et si deux règles de même précision se contredisent ?
C'est la dernière déclarée qui gagne (d'où l'importance de l'ordre dans votre fichier). Et pour la culture, l'ordre général d'application est : style du navigateur, puis CSS externe, puis balise `<style>`, puis attribut `style=""`. Il existe aussi un `!important` qui court-circuite tout… à réserver aux cas désespérés.
:::

### À faire

- Sur votre page de test, définir la police et la couleur de texte **uniquement** sur `body`.
- Vérifier que tout le contenu en hérite.
- Faire « échapper » les `h1` à l'héritage avec une couleur dédiée.

## Le fil rouge : votre blog

Votre blog a une charte pour ses titres, il est temps de la compléter :

- Définir le style général sur `body` : police (avec secours), couleur de texte, couleur de fond.
- Compléter la charte : couleurs des titres en hexadécimal, tailles en `em`.
- Ajouter un fond (couleur douce ou image discrète) à l'en-tête de vos pages.
- Vérifier que la charte s'applique bien sur **toutes** les pages.

::: tip Point de contrôle
Votre blog a maintenant une vraie identité visuelle : une palette de couleurs cohérente, une police assumée, et le tout défini en un minimum de règles grâce à l'héritage. Faites-moi valider avant de partir.
:::

## Conclusion

Dans ce TP vous avez :

- Mis en forme du texte (tailles en `em`, polices avec secours, alignements).
- Manipulé les trois notations de couleurs.
- Défini des fonds (couleurs, images, transparence).
- Compris l'héritage et la cascade, le cœur de la CSS.

Pensez à sauvegarder votre travail. Prochaine étape : le premier [point étape évalué](./eval1.md), une synthèse de tout ce que vous avez appris depuis le début. Pas de panique, vous êtes prêt !

👋 Si vous avez des questions, n'hésitez pas.
