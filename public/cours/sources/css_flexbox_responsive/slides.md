# Flexbox et Responsive

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Mettre des éléments côte à côte

### Toute une histoire…

- Les tableaux HTML (berk)
- Les `float` (bof)
- Les `inline-block` (mouais)
- **Flexbox** 🎉

---

## Au passage : `position`

- `absolute` : par rapport à la fenêtre (ou au premier parent positionné)
- `relative` : par rapport à sa position normale

Utile pour des cas précis, pas pour la mise en page globale.

---

## Le principe de Flexbox

Un **conteneur**…

```css
.conteneur {
  display: flex;
}
```

…et ses **enfants directs** se placent intelligemment.

---

## La direction

```css
flex-direction: row;    /* En ligne (défaut) */
flex-direction: column; /* En colonne */
```

---

## Le retour à la ligne

```css
flex-wrap: wrap;
```

Quand la place manque, on passe à la ligne.

---

## Les alignements

- `justify-content` : sur l'axe **principal**
- `align-items` : sur l'axe **secondaire**

---

## En `column`, que devient `justify-content` ?

### À votre avis ?

---

## Il devient vertical !

Les axes suivent `flex-direction`.

C'est LE piège classique de Flexbox.

---

## Bonus des enfants

```css
.enfant {
  flex: 1;   /* Prend l'espace disponible */
  order: 2;  /* Change l'ordre d'affichage */
}
```

---

## Le centrage parfait

```css
.conteneur {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

Horizontal **et** vertical 🎉

---

## S'entrainer en s'amusant

[Flexbox Froggy 🐸](https://flexboxfroggy.com/#fr)

---

## Le responsive

### Votre site sur un téléphone ?

---

## Que manque-t-il pour commencer ?

### Un indice : c'est dans le `head`

---

## La meta viewport

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Sans elle, rien ne fonctionne.

---

## Les media queries

```css
@media (max-width: 960px) {
  main {
    flex-direction: column;
  }
}
```

Des règles CSS **conditionnées** à la taille de l'écran.

---

## Les breakpoints classiques

- `576px` : téléphone paysage
- `768px` : tablette
- `992px` : ordinateur
- `1200px` : grand écran

---

## Pas que la largeur

```css
@media print { /* L'impression */ }
@media (prefers-color-scheme: dark) { /* Le thème sombre */ }
```

---

## Récapitulatif

- Flexbox : un conteneur, des enfants, deux axes.
- La meta viewport active le responsive.
- Les media queries adaptent la CSS à l'écran.

---

## Des questions ?

Place au TP 🚀
