# Liens, images et tableaux

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Le « HT » de HTML

### HyperText

Des documents **reliés entre eux**

---

## La balise `<a>`

```html
<a href="https://cours.brosseau.ovh">Consulter le cours</a>
```

`href` = **h**ypertext **ref**erence

---

## Deux types de liens

- **Absolu** : `https://google.com` (adresse complète)
- **Relatif** : `contact.html` (chemin depuis la page courante)

---

## Lequel choisir pour naviguer dans votre site ?

### À votre avis ?

---

## Le relatif !

Il fonctionne partout : sur votre machine, sur le serveur, en ligne…

```html
<a href="contact.html">Même dossier</a>
<a href="article/page.html">Sous-dossier</a>
<a href="../index.html">Dossier parent</a>
```

---

## Le `../`

### « Remonter d'un dossier »

À maitriser absolument (liens, images, CSS…)

---

## Les liens ont plus d'un tour

- Une ancre : `href="#contact"` (vers un `id`)
- Une infobulle : `title="…"`
- Un e-mail : `href="mailto:moi@exemple.fr"`

---

## Et `target="_blank"` ?

Ouvre dans un nouvel onglet…

### C'est l'utilisateur qui devrait choisir 🤔

---

## Les images

---

## Sur le web, une image est compressée

| Format | Usage                          |
| ------ | ------------------------------ |
| JPEG   | Les photos                     |
| PNG    | Graphiques, logos, transparence |
| GIF    | Uniquement les animations      |

---

## La balise `<img />`

```html
<img src="img/photo.jpg" alt="Un chaton qui dort" />
```

- `src` : le chemin (relatif !)
- `alt` : la description

---

## À quoi sert le `alt` ?

### À votre avis ?

---

## Le `alt` c'est

- L'accessibilité (lecteurs d'écran)
- Le secours (image non chargée)
- Le référencement (Google « lit » vos images)

---

## La miniature cliquable

```html
<a href="img/photo.jpg">
  <img src="img/mini.jpg" alt="Ma photo" />
</a>
```

Un lien + une image = 🖼️

---

## Les tableaux

---

## Ligne par ligne

```html
<table>
  <tr>
    <th>Langage</th>
    <th>Usage</th>
  </tr>
  <tr>
    <td>HTML</td>
    <td>Le contenu</td>
  </tr>
</table>
```

---

## Les balises du tableau

- `<tr>` : une ligne (table **r**ow)
- `<td>` : une cellule (table **d**ata)
- `<th>` : une cellule d'en-tête (table **h**eader)

---

## Structurer un vrai tableau

- `<caption>` : le titre
- `<thead>` : l'en-tête
- `<tbody>` : le corps
- `<tfoot>` : le pied

---

## Fusionner des cellules

- `colspan="2"` : fusion horizontale
- `rowspan="2"` : fusion verticale

---

## Astuce IDE

```text
table>tr*20>td*3
```

Puis la touche tabulation… ✨ (emmet)

---

## Récapitulatif

- Des liens relatifs pour naviguer dans le site.
- Des images compressées, avec un `alt` pertinent.
- Des tableaux structurés (`thead`, `th`, `colspan`).

---

## Des questions ?

Place au TP 🚀
