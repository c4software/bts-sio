# Le modèle des boîtes

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## En CSS

### Chaque élément est une boîte 📦

Comprendre les boîtes = comprendre la mise en page.

---

## Deux familles de balises

- **Block** : toute la largeur, retour à la ligne (`h1`, `p`, `div`…)
- **Inline** : dans la ligne (`a`, `span`, `strong`…)

---

## Peut-on mettre un `h1` dans un `span` ?

### À votre avis ?

---

## Non !

Un inline ne peut pas contenir un block.

(Et `text-align` ne fonctionne que sur les blocks)

---

## L'anatomie d'une boîte

![margin & padding](/cours/sources/introduction_css/res/margin_padding.png)

---

## Padding vs Margin

- `padding` : le **rembourrage** (intérieur)
- `margin` : la **marge** (extérieur)

---

## Les dimensions

```css
.carte {
  width: 350px;   /* ou 50% */
  height: 200px;  /* rarement nécessaire */
}
```

---

## La notation à 4 valeurs

```css
margin: 10px 20px 10px 20px;
```

### Dans quel ordre ?

---

## Le sens des aiguilles d'une montre 🕐

haut, droite, bas, gauche

---

## Centrer un bloc

```css
.contenu {
  width: 600px;
  margin: auto; /* 🎉 */
}
```

Une largeur + des marges automatiques.

---

## `min-width` / `max-width`

```css
.contenu {
  width: 60%;
  min-width: 400px;
  max-width: 900px;
}
```

Le meilleur des deux mondes (retenez-les pour le responsive !)

---

## Quand ça déborde : `overflow`

- `visible` (défaut, ça dépasse)
- `hidden` (coupé)
- `scroll` / `auto` (barres de défilement)

---

## Décorer la boîte

![Border et Shadow](/cours/sources/introduction_css/res/border_shadow.png)

---

```css
.carte {
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}
```

[Générateur en ligne](https://cssgenerator.org/box-shadow-css-generator.html)

---

## Et l'interactivité ?

### Sans JavaScript ?

---

## Les pseudo-classes

- `:hover` : au survol
- `:active` : pendant le clic
- `:visited` : lien déjà visité
- `:focus` : sélectionné au clavier

---

```css
.carte:hover {
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.4);
}
```

---

## La cerise : `transition`

```css
.carte {
  transition: all 0.3s;
}
```

Le changement devient une animation douce.

---

## Et sur mobile, le `:hover` ?

### À votre avis ?

---

## Pas de survol sans souris !

Le doigt n'est détecté qu'au contact.

Le `:hover` = un bonus, jamais une information essentielle.

---

## Récapitulatif

- Block vs inline.
- La boîte : contenu, padding, border, margin.
- `margin: auto` pour centrer, min/max pour encadrer.
- Bordures, ombres, pseudo-classes et transitions.

---

## Des questions ?

Place au TP 🚀
