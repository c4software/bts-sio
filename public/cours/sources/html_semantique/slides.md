# La structure sémantique

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Jusqu'ici

Des titres, des paragraphes, quelques `div`…

### Mais comment découper une page entière ?

---

## Pourquoi ne pas tout faire en `div` ?

### À votre avis ?

---

## Parce que le sens compte

- L'accessibilité (les lecteurs d'écran naviguent par zones)
- Le référencement (Google comprend la page)
- La lisibilité (pour le prochain développeur : vous 😉)

---

## Les balises structurantes

| Balise      | Utilité                       |
| ----------- | ----------------------------- |
| `<header>`  | L'en-tête                     |
| `<nav>`     | La navigation                 |
| `<main>`    | Le contenu principal          |
| `<footer>`  | Le pied de page               |

---

## Et dans le contenu

| Balise      | Utilité                                |
| ----------- | -------------------------------------- |
| `<section>` | Une partie thématique                  |
| `<article>` | Un contenu autonome (article de blog…) |
| `<aside>`   | Un contenu complémentaire (encart)     |

---

## Une page type

```text
┌─────────── header ───────────┐
├──────────── nav ─────────────┤
│ ┌─ main ─────────┬─ aside ─┐ │
│ │  article       │         │ │
│ │  article       │         │ │
│ └────────────────┴─────────┘ │
├─────────── footer ───────────┤
```

---

## Bon à savoir

- Chaque zone peut avoir ses propres titres.
- L'ordre est libre (le menu peut être à droite).
- L'apparence ? Toujours l'affaire de la CSS.

---

## Récapitulatif

- Des balises qui donnent du **sens** aux zones de la page.
- Même rendu qu'une `div`, mais accessibilité, SEO et lisibilité en plus.

---

## Des questions ?

Place au TP 🚀
