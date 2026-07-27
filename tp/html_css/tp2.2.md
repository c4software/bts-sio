---
description: "Dans ce TP nous allons découvrir le modèle des boîtes : dimensions, marges, bordures, ombres, et les premières interactions avec les pseudo-classes."
---

# Le modèle des boîtes

::: details Sommaire
[[toc]]
:::

Vous avez validé votre [premier point étape](./eval1.md), bravo ! Dans ce TP nous passons à la mise en page : en CSS, chaque élément est une **boîte**. Comprendre ce modèle, c'est comprendre 80 % de la mise en page web. Au programme : dimensions, marges, bordures, ombres, et un peu d'interactivité.

## Les slides

Avant de commencer, un tour rapide des compétences du jour : block vs inline, le box model, les bordures et les pseudo-classes.

<ClientOnly>
<SlidesDeck src="css_boites" />
</ClientOnly>

## Prérequis

- Avoir réalisé les TP précédents (jusqu'au [TP 2.1](./tp2.1.md)).

## Objectifs

À la fin de ce TP vous saurez :

- Distinguer les balises « block » des balises « inline ».
- Dimensionner et espacer des éléments (`width`, `padding`, `margin`).
- Décorer un bloc (bordures, coins arrondis, ombres).
- Réagir au survol avec les pseudo-classes.

## Block ou inline ?

Toutes les balises HTML appartiennent à l'une de ces deux familles :

- **Block** : l'élément occupe toute la largeur disponible et provoque un retour à la ligne (`h1`, `p`, `div`, `ul`, `section`…).
- **Inline** : l'élément reste « dans la ligne », sans retour à la ligne (`a`, `span`, `strong`, `em`, `img`…).

::: details Question : peut-on mettre un h1 dans un span ?
Non ! Un élément inline ne peut pas contenir d'élément block. L'inverse est bien sûr possible (un `<p>` contient des `<strong>`). C'est aussi pour ça que `text-align` ne fonctionne que sur les blocks : on aligne le contenu **dans** la boîte.
:::

## Le modèle des boîtes

Chaque élément block est une boîte composée, de l'intérieur vers l'extérieur :

1. **Le contenu** (dimensionné par `width` / `height`).
2. **Le padding** : l'espace entre le contenu et la bordure.
3. **La bordure** (`border`).
4. **La margin** : l'espace entre la bordure et les éléments voisins.

![margin & padding](./res/margin_padding.png)

```css
.carte {
  width: 350px;
  padding: 20px; /* Espace intérieur */
  margin: 10px;  /* Espace extérieur */
}
```

::: tip Padding ou margin ?
Le moyen mnémotechnique : le padding c'est le **rembourrage** (à l'intérieur de la boîte), la margin c'est la **marge** (autour de la boîte). Si vous voulez écarter le texte de la bordure : padding. Si vous voulez écarter deux boîtes entre elles : margin.
:::

### Cibler chaque côté

`padding` et `margin` acceptent des variantes par côté (`margin-top`, `padding-left`…), ou une notation à 4 valeurs, dans le sens des aiguilles d'une montre :

```css
.carte {
  margin: 10px 20px 10px 20px; /* haut, droite, bas, gauche */
}
```

### Centrer un bloc

Le grand classique : donner une largeur au bloc, et laisser le navigateur répartir les marges :

```css
.contenu {
  width: 600px;
  margin: auto; /* Centré horizontalement 🎉 */
}
```

### min et max

Une largeur fixe, c'est rigide ; un pourcentage, c'est parfois trop petit. Les propriétés `min-width`, `max-width` (et leurs équivalents `height`) combinent le meilleur des deux :

```css
.contenu {
  width: 60%;
  min-width: 400px; /* Jamais plus étroit que 400px */
  max-width: 900px; /* Jamais plus large que 900px */
}
```

Retenez bien ces propriétés, elles seront précieuses quand nous parlerons de responsive.

### Quand ça déborde

Si le contenu est plus grand que la boîte, la propriété `overflow` décide du comportement : `visible` (défaut, ça dépasse), `hidden` (coupé), `scroll` ou `auto` (barres de défilement). [Détails dans le support](/tp/html_css/support.md).

### À faire

Sur une page de test :

- Créer une `div` avec la class `carte` contenant un titre et un paragraphe.
- Lui donner une largeur de 50 %, un `min-width`, un fond clair et du padding.
- La centrer horizontalement.

## Bordures et ombres

Fini le temps où il fallait des images pour faire des bordures et des ombres, la CSS sait tout faire :

```css
.carte {
  border: 1px solid #0000004a; /* épaisseur, style, couleur */
  border-radius: 10px;         /* coins arrondis */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); /* décalage x, y, flou, couleur */
}
```

- `border` accepte plusieurs styles : `solid`, `dashed`, `dotted`, `double`… et se décline par côté (`border-bottom: …`).
- `border-radius` arrondit les coins (une valeur pour tous, ou quatre valeurs).
- `box-shadow` est vaste, le plus simple est de [la tester dans un générateur](https://cssgenerator.org/box-shadow-css-generator.html).

:tada: À vous les interfaces type « Material Design » :tada:

## Les apparences dynamiques

Dernier ingrédient du jour : réagir aux actions de l'utilisateur, **sans une ligne de JavaScript**, grâce aux pseudo-classes :

```css
.carte:hover {
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.4); /* Au survol, l'ombre s'intensifie */
}

a:hover {
  color: red; /* Lien survolé */
}

a:visited {
  color: grey; /* Lien déjà visité */
}
```

Les principales : `:hover` (survol), `:active` (pendant le clic), `:visited` (lien visité), `:focus` (élément sélectionné au clavier).

::: tip La cerise : la transition
Un changement brutal, c'est dommage. Ajoutez `transition: all 0.3s;` sur l'élément (pas sur le `:hover`) et le changement devient une animation douce. Effet « pro » immédiat.
:::

::: details Question : et sur mobile, que devient le :hover ?
Bonne question ! Sur un écran tactile, il n'y a pas de survol : le doigt n'est détecté qu'au contact. Le `:hover` ne doit donc jamais être le seul moyen d'accéder à une information importante. L'inspecteur d'éléments permet de simuler un mobile pour tester, je vous montrerai.
:::

### À faire

- Sur votre `carte` : une bordure fine, des coins arrondis, une ombre.
- Au survol : l'ombre s'intensifie, avec une transition douce.
- Sur vos liens : retirer le soulignement par défaut, et le faire réapparaitre uniquement au survol.

::: details Voir l'une des solutions possibles

```css
.carte {
  border: 1px solid #dddddd;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
}

.carte:hover {
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.35);
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
```

:::

## Le fil rouge : votre blog

Votre blog va faire un bond en avant visuel :

- Faire évoluer votre charte graphique avec les nouveaux apports (dispositions, espacements, bordures).
- Transformer chaque aperçu d'article de la page d'accueil en « carte » : fond, padding, bordure arrondie, ombre. Créez les classes nécessaires et affectez-les dans vos fichiers HTML.
- Centrer le contenu principal du blog (largeur maitrisée + `margin: auto`).
- Ajouter un effet au survol des cartes et des liens.
- Et normalement tout fonctionne 😊 ou non, donc au boulot !

::: tip Point de contrôle
Votre blog est centré, aéré (padding généreux), les articles sont présentés en cartes qui réagissent au survol. Faites-moi valider avant de partir.
:::

## Conclusion

Dans ce TP vous avez :

- Distingué balises block et inline.
- Maitrisé le modèle des boîtes (`width`, `padding`, `margin`, centrage).
- Décoré vos blocs (bordures, arrondis, ombres) et ajouté des interactions (`:hover`, transitions).
- Transformé votre blog en vrai site moderne.

Pensez à sauvegarder votre travail. La suite : [une mise en pratique complète](./tp3.md), où vous reproduirez une page à partir d'une maquette, comme en entreprise.

👋 Si vous avez des questions, n'hésitez pas.
