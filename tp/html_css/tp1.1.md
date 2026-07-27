---
description: "Dans ce TP nous allons relier nos pages entre elles avec des liens, les illustrer avec des images et structurer des données avec des tableaux."
---

# Liens, images et tableaux

::: details Sommaire
[[toc]]
:::

Dans le [TP précédent](./tp1.md) vous avez créé vos premières pages… mais elles vivent chacune de leur côté. Le « HT » de HTML signifie **HyperText** : des documents reliés entre eux. Dans ce TP nous allons donc créer des liens, insérer des images et structurer des données avec des tableaux.

## Les slides

Avant de commencer, un tour rapide des compétences du jour : la balise `<a>`, les chemins relatifs, la balise `<img>` et l'anatomie d'un tableau.

<ClientOnly>
<SlidesDeck src="html_liens_images_tableaux" />
</ClientOnly>

## Prérequis

- Avoir réalisé le [TP 1 : Découverte du HTML](./tp1.md) (et donc avoir votre dossier `blog`).

## Objectifs

À la fin de ce TP vous saurez :

- Créer des liens entre vos pages (et vers l'extérieur).
- Insérer des images en choisissant le bon format.
- Construire un tableau structuré.

## Les liens

Un lien s'écrit avec la balise `<a>` et son attribut `href` (**h**ypertext **ref**erence) :

```html
<a href="https://cours.brosseau.ovh">Consulter le cours</a>
```

### Lien absolu ou lien relatif ?

- **Absolu** : l'adresse complète, avec le protocole (`https://…`). À utiliser pour pointer vers un **autre site**.
- **Relatif** : le chemin depuis la page courante. À utiliser pour naviguer **dans votre site**.

```html
<!-- Page dans le même dossier -->
<a href="contact.html">Contact</a>

<!-- Page dans un sous-dossier -->
<a href="article/mon-article.html">Mon article</a>

<!-- Remonter d'un dossier -->
<a href="../index.html">Retour à l'accueil</a>
```

::: details Question : pourquoi préférer les liens relatifs dans votre site ?
Parce qu'ils fonctionnent partout : sur votre ordinateur, sur le serveur du lycée, une fois en ligne… Avec des liens absolus vers `http://localhost/…`, votre site casserait dès sa mise en ligne. Un chemin relatif décrit la position d'un fichier **par rapport à un autre**, peu importe où le site est hébergé.
:::

### Aller plus loin avec les liens

- **Une ancre** : ajoutez un `id` sur un élément (`<h2 id="contact">`), puis pointez dessus avec `href="#contact"` (ou `href="page.html#contact"` depuis une autre page).
- **Une infobulle** : l'attribut `title="…"` affiche un texte au survol.
- **Un e-mail** : `href="mailto:prenom.nom@exemple.fr"` ouvre le logiciel de messagerie.
- **Un téléchargement** : un lien vers un fichier (`.zip`, `.pdf`…) proposera son téléchargement.

::: warning À propos de target="_blank"
Il est possible de forcer l'ouverture dans un nouvel onglet avec `target="_blank"`. À utiliser avec modération : c'est l'utilisateur qui devrait choisir comment il navigue, pas vous.
:::

## Les images

### Choisir le bon format

Sur le web, une image doit être **compressée** (une photo sortie d'un appareil pèse plusieurs Mo, c'est beaucoup trop). Trois formats historiques à connaitre :

| Format | Extension | Usage |
| ------ | --------- | ----------------------------------------------------- |
| JPEG   | `.jpg`    | Les photos (compression avec légère perte, invisible) |
| PNG    | `.png`    | Les graphiques, logos, captures (avec transparence)   |
| GIF    | `.gif`    | Uniquement pour les images animées                    |

::: tip Et les formats modernes ?
Vous croiserez aussi le format `WebP` (et `AVIF`), plus récents et plus efficaces. Retenez surtout la logique : photo = compression avec perte, graphique = compression sans perte.
:::

### La balise img

```html
<img src="img/photo.jpg" alt="Un chaton qui dort sur un clavier" />
```

Deux attributs **obligatoires** :

- `src` : le chemin de l'image (relatif, comme pour les liens).
- `alt` : la description textuelle de l'image.

::: details Question : à quoi sert vraiment le alt ?
À trois choses : il est lu par les lecteurs d'écran (accessibilité pour les personnes malvoyantes), il est affiché si l'image ne charge pas, et il est utilisé par les moteurs de recherche pour comprendre votre image. Un `alt` vide sur une image porteuse de sens, c'est une faute professionnelle.
:::

::: tip Un dossier dédié
Comme pour les noms de fichiers : rangez vos images dans un dossier `img/`, avec des noms en minuscules, sans espaces ni accents.
:::

### La miniature cliquable

Vous pouvez combiner un lien et une image : une petite image cliquable qui ouvre la version en grand.

```html
<a href="img/photo.jpg">
  <img src="img/photo-miniature.jpg" alt="Ma photo (cliquer pour agrandir)" />
</a>
```

## Les tableaux

Pour afficher des données en lignes et en colonnes, le HTML propose la balise `<table>`. Un tableau se construit **ligne par ligne** :

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
  <tr>
    <td>CSS</td>
    <td>L'apparence</td>
  </tr>
</table>
```

- `<tr>` : une ligne (**t**able **r**ow).
- `<td>` : une cellule (**t**able **d**ata).
- `<th>` : une cellule d'en-tête (**t**able **h**eader), affichée en gras et centrée par défaut.

### Structurer un vrai tableau

Pour les tableaux plus complets, vous pouvez ajouter :

- `<caption>` : le titre du tableau (juste après `<table>`).
- `<thead>`, `<tbody>`, `<tfoot>` : l'en-tête, le corps et le pied du tableau.

```html
<table>
  <caption>Les langages du web</caption>
  <thead>
    <tr><th>Langage</th><th>Usage</th></tr>
  </thead>
  <tbody>
    <tr><td>HTML</td><td>Le contenu</td></tr>
    <tr><td>CSS</td><td>L'apparence</td></tr>
  </tbody>
  <tfoot>
    <tr><td colspan="2">2 langages présentés</td></tr>
  </tfoot>
</table>
```

::: tip Fusionner des cellules
Vous l'avez peut-être remarqué dans le `tfoot` : `colspan="2"` fusionne 2 cellules côte à côte. Il existe aussi `rowspan` pour fusionner verticalement. Dans les deux cas, pensez à retirer les cellules « absorbées » de votre code.
:::

::: warning Sans CSS, pas de bordures
Votre tableau s'affiche « à plat », sans bordures ? C'est normal : les bordures sont une affaire d'apparence, donc de CSS. Patience, ça arrive dans le [prochain TP](./tp2.md).
:::

### À faire

Créer une troisième page dans votre site avec :

- Un titre (`<h1>` + `<title>`).
- Un tableau de 3 colonnes et une vingtaine de lignes, avec un en-tête (`thead`) et un pied de tableau (`tfoot`).
- Une cellule fusionnée quelque part (à vous de choisir où c'est pertinent).

::: tip Comment procéder ?
Vous avez un exemple de tableau dans le [Mémo HTML](/cheatsheets/html/). Et souvenez-vous du mode « emmet » de votre IDE : `table>tr*20>td*3` suivi de la touche tabulation… magique non ?
:::

## Le fil rouge : votre blog

Votre blog va prendre de l'ampleur, c'est à vous de jouer :

- Dans le dossier `blog`, créer un dossier `img` et un dossier `article`.
- Dans le dossier `article`, créer une page pour votre premier article (structure complète, titres, paragraphes).
- Dans la page `index.html`, faire un lien vers votre article.
- Dans la page article, faire un lien de retour vers la page d'accueil.
- Ajouter une image dans la page d'accueil et une dans la page article (avec des `alt` pertinents !).

::: details Coup de pouce : les chemins
Votre article est dans un sous-dossier, votre index à la racine. Le lien aller n'est donc pas symétrique du lien retour… Souvenez-vous du `../`.
:::

::: tip Point de contrôle
La navigation fonctionne dans les deux sens, les images s'affichent, et votre arborescence est propre (`img/`, `article/`). Faites-moi valider avant de partir.
:::

## Conclusion

Dans ce TP vous avez :

- Relié vos pages avec des liens relatifs (et compris pourquoi les préférer).
- Inséré des images optimisées avec des `alt` pertinents.
- Construit des tableaux structurés (`thead`, `tbody`, `colspan`).
- Fait grandir votre blog : plusieurs pages, une navigation, des images.

Pensez à sauvegarder votre travail. Votre site a maintenant du contenu… mais avouons-le, il est un peu austère. La suite : [la découverte de la CSS](./tp2.md) !

👋 Si vous avez des questions, n'hésitez pas.
