# Introduction HTML

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

- Partie 0 - Un peu d'histoire
- Partie 1 - Le HTML
- Partie 2 - La sémantique
- Partie 3 - L'Hébergement

---

## HTML signifie

- **`H`** => Hyper
- **`T`** => Text
- **`M`** => Markup
- **`L`** => Language

---

- Décrit la structure d'une page Internet.
- Une série d'éléments
- Indique à votre navigateur comment afficher le contenu
- Structure chaque élément (Titre, paragraphe, …)

---

## Partie 0 - Un peu d'histoire

---

- 1989-1990 : Création du « concept »
- 1993 : HTML 1.0
- 1995 : HTML 2.0

---

- 1997 : HTML 4.0 (Création du W3C)
- 2000 : XHTML

---

- 2007 : Le renouveau

---

## HTML 5

Plus de nouvelles versions, mais une évolution continue.

(Proposal, Draft, …)

---

## L'état des lieux des navigateurs

WebKit, Firefox, Chrome…

Que se passe-t-il ? Ce qu'il faut savoir !

---

## Comment fonctionne votre navigateur ?

---

### 🤓

### Regardons ensemble

---

## Et les robots de Google ?

```sh
curl https://www.google.com
```

---

## Quel est l'objectif donc ?

Avoir un code « compréhensible » par une machine. Le plus simplement possible

### À votre avis pourquoi ?

---

## Petit aparté sur le référencement

très rapide, ce n'est pas l'objectif du cours.

---

- Mot clef.
- Structure du site.
- Liens.
- Vitesse et qualité du code.
- Rendre l'invisible visible / compréhensible

---

## Partie 1 - Le HTML

La structure

---

## Le HTML c'est un langage de balises

### Avec au minimum 4 éléments

---

```html
<!DOCTYPE html>
<html>
  <head></head>
  <body></body>
</html>
```

---

- Le doctype
- `<html>` En tout début et en toute fin de document.
- `<head>` Informations servant au navigateur, mais non affichées (Méta, CSS, JS, etc.).
- `<body>` Corps de votre page (ce que vous allez afficher)

---

## Le principe

### Une balise « ouvrante » une balise « fermante »

```html
<html>
  …
</html>
```

---

## Le principe

### Ou… une balise auto-fermante

```html
<img />
```

---

![stop](./res/stop.gif)

---

## Toute balise ouverte

## _doit être fermée_

---

## Un exemple

```html
<p>Ceci est un exemple de texte</p>
```

Nous avons donc, un texte entouré d'une balise :

**ouvrante `<p>`** et d'une balise **fermante `</p>`**

---

![Structure](./res/structure.png)

---

## Chaque élément peut avoir des « attributs »

![Structure attribut](./res/structure_attribut.png)

---

## Chaque balise peut être imbriquée

```html
<p>Le HTML c'est <strong>très</strong> simple !</p>
```

### Ce qui donnera :

<p>Le HTML c'est <strong>très</strong> simple !</p>

---

## Ça forme ce que nous appellerons « un arbre »

### Le DOM

![arbre - dom](./res/arbre.png)

---

## Les balises

### Il y en a beaucoup ? À votre avis ?

[Mémo HTML](/cheatsheets/html/)

---

## Les commentaires

En informatique _ils sont importants_, et peuvent prendre plusieurs formes.

### En HTML c'est :

```html
<!-- Mon commentaire -->
```

---

## Quelques exemples

---

### Une image

```html
<img src="images/coucou.png" alt="Coucou 👋" />
```

- Combien j'ai d'attributs ?
- À votre avis à quoi sert le `alt` ?

---

### Un autre attribut très important

[Lazy Loading](https://web.dev/browser-level-image-lazy-loading/)

---

### Les titres

```html
<h1>Titre principal</h1>
<h2>Titre de section</h2>
<h3>Sous-titre</h3>
<h4>Sous-sous-titre</h4>
```

---

### Les listes

Le web est construit avec des données _structurées_ nous avons donc un ensemble d'éléments pour les afficher.

```html
<ul>
  <li>Élément 1</li>
  <li>Élément 2</li>
  <li>Élément 3</li>
</ul>
```

---

### Les liens

La toile, Le Web…

```html
<a href="https://cours.brosseau.ovh">Consulter le cours</a>
```

---

## Mise en pratique

### Mais avant …

---

## Comment / où « coder » en HTML ?

### À votre avis ?

---

- VScode
- WebStorm 
- … 

---

## C'est parti

### Je vous laisse tenter de réaliser la page suivante :

[Exemple](/demo/html/)

---

## Comment analyser le code source ?

### À votre avis ?

(Code source de la page, Inspecteur d'éléments) 

---

## Créer une seconde page

- Ajouter un titre (`<h1>` + `<title>`)
- Ajouter une balise audio `<audio>`
- Ajouter une balise video `<video>`

---

## Comment allez-vous procéder

### Les ressources en ligne

- Google
- Stackoverflow
- [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)

---

## Ajouter dans votre première page un « menu »

Comment faire ?

---

## Partie 2 - La sémantique

L'Organisation de la structure de mon HTML

---

## Nous avons vu la base

### Maintenant quelques détails

---

| Balise      | Utilité                            |
| ----------- | ---------------------------------- |
| `<header>`  | Entête d'un contenu                |
| `<nav>`     | Lien de navigation                 |
| `<section>` | Partie du contenu                  |
| `<footer>`  | Pied du contenu                    |
| `<article>` | Un article (comme dans un journal) |
| `<aside>`   | Contenu complémentaire             |

---

## Partie 3 - « L'Hébergement » en local

Tester mon site… Le faire tester « en local »

---

## Local ?

C'est-à-dire « sur votre ordinateur »

---

- Tester pendant le développement
- Faire tester à vos proches

---

## Des outils

- Wamp (Windows)
- Xampp (Windows)
- Mamp (Mac OS)
- Lamp (Linux)

---

## Partie 3 - L'Hébergement

Rendre mon site visible au public

---

## Plusieurs options

- Un serveur dédié (💰)
- Chez vous (bonne idée à votre avis ?)
- Le cloud
  - Netlify (JamStack)
  - Firebase
  - OVH
  - …

---

## Comment choisir ?

### À votre avis ?

---

## Récapitulatif

- Le HTML structure le contenu (balises, attributs, arbre DOM).
- La sémantique donne du sens (header, nav, section, footer…).
- Un site se teste en local, puis s'héberge en ligne.

---

## Des questions ?

Place au TP 🚀

---

## Votre CV.

### C'est à vous.
