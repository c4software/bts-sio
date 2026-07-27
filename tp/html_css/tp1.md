---
description: "Dans ce TP nous allons découvrir les bases du HTML : le fonctionnement d'un site web, la structure d'une page et l'organisation du contenu."
---

# Découverte du HTML

::: details Sommaire
[[toc]]
:::

Dans ce TP nous allons découvrir les bases du HTML à travers la création d'une première page Web. C'est le point de départ de tout le parcours web : PHP, JavaScript, Laravel… tout repose sur ce que vous allez apprendre ici.

## Les slides

Avant de commencer, un tour rapide des compétences du jour : le fonctionnement d'un navigateur, la structure d'une page et les balises de base.

<ClientOnly>
<SlidesDeck src="introduction_html" />
</ClientOnly>

## Prérequis

- Un éditeur de code (VS Code, WebStorm, …).
- Un navigateur (idéalement deux : Firefox **et** Chrome).

## Objectifs

À la fin de ce TP vous saurez :

- Expliquer les rôles respectifs du HTML et de la CSS.
- Écrire la structure minimale d'une page HTML 5.
- Organiser un contenu avec des titres, des paragraphes et des listes.
- Donner du sens à votre texte avec les bonnes balises.

## Comment fonctionne un site web ?

Un site web, c'est au minimum deux langages qui travaillent ensemble :

- **Le HTML** : le contenu et son organisation (les titres, les paragraphes, les images…).
- **La CSS** : l'apparence et la mise en page (les couleurs, les polices, le positionnement…).

Votre navigateur (Firefox, Chrome, Safari…) est **l'interprète** : il lit votre code et le transforme en page visible. C'est lui qui fait tout le travail d'affichage.

::: details Question : pourquoi tester votre site dans plusieurs navigateurs ?
Chaque navigateur a son propre moteur de rendu. La très grande majorité du temps le résultat est identique, mais certaines fonctionnalités récentes peuvent être interprétées différemment (ou pas du tout). Un professionnel teste toujours son site dans plusieurs navigateurs, et sur plusieurs tailles d'écran (le mobile n'est pas une option). Le site [Can I Use](https://caniuse.com/) vous permettra de vérifier la compatibilité d'une fonctionnalité, gardez-le dans un coin de votre tête, nous en reparlerons.
:::

## Quelques liens

Pour vous aider dans la création vous pouvez utiliser le [Mémo HTML](/cheatsheets/html/)

## La structure minimale

Toute page HTML repose sur le même squelette :

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Le titre de ma page</title>
  </head>
  <body>
    <!-- Le contenu visible de votre page -->
  </body>
</html>
```

Quelques explications :

- `<!DOCTYPE html>` indique au navigateur qu'il s'agit d'une page HTML 5.
- `<html>` englobe toute la page, du tout début à la toute fin.
- `<head>` contient les informations **non affichées** destinées au navigateur (encodage, titre, futurs liens CSS…).
- `<meta charset="utf-8" />` définit l'encodage : sans elle, vos accents s'afficheront mal.
- `<title>` est le titre affiché dans l'onglet du navigateur (et dans les résultats Google).
- `<body>` contient tout ce qui sera **affiché** à l'écran.
- `<!-- … -->` est un commentaire : invisible sur la page, mais visible dans le code source.

::: warning Le code source est public
Clic droit sur n'importe quelle page, « Afficher le code source »… Tout votre HTML (commentaires compris) est visible par n'importe qui. Ne mettez donc **jamais** d'information sensible dans votre code HTML.
:::

::: tip Bien nommer ses fichiers
Une règle à appliquer dès maintenant et pour toute votre carrière : des noms de fichiers **en minuscules, sans espaces et sans accents** (`index.html`, `ma-page.html`). Vous éviterez ainsi de nombreux problèmes de liens cassés, notamment une fois le site en ligne sur un serveur Linux.
:::

## Organiser votre texte

### Les paragraphes

Le texte s'écrit dans des balises `<p></p>`. Attention, en HTML la touche <kbd>Entrée</kbd> ne crée **pas** de saut de ligne à l'affichage : c'est le navigateur qui gère la mise en page.

```html
<p>Ceci est mon premier paragraphe.</p>
<p>Et ceci est le second.</p>
```

::: warning À propos de la balise br
Il existe une balise `<br />` pour forcer un retour à la ligne **dans** un paragraphe. À utiliser avec parcimonie : enchainer les `<br />` pour espacer des éléments est une mauvaise pratique, c'est le rôle de la CSS (nous le verrons très vite).
:::

### Les titres

Vous avez 6 niveaux de titres à votre disposition, de `<h1>` (le plus important) à `<h6>` :

```html
<h1>Le titre principal de ma page</h1>
<h2>Un titre de section</h2>
<h3>Un sous-titre</h3>
```

::: tip Le sens avant l'apparence
On ne choisit **pas** un niveau de titre pour sa taille (« le h3 est plus joli »), mais pour sa place dans la hiérarchie du contenu : un seul `<h1>` par page, puis des `<h2>` pour les sections, etc. La taille ? C'est la CSS qui s'en chargera. Cette hiérarchie est également lue par les moteurs de recherche pour comprendre votre page.
:::

### Les listes

Le web adore les données structurées, vous avez donc des balises dédiées aux listes :

```html
<!-- Liste à puces (non ordonnée) -->
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>PHP</li>
</ul>

<!-- Liste numérotée (ordonnée) -->
<ol>
  <li>Ouvrir l'éditeur</li>
  <li>Écrire le code</li>
  <li>Tester dans le navigateur</li>
</ol>
```

### Donner du sens au texte

Certaines balises permettent de mettre en valeur une portion de texte :

- `<em>` : une emphase « légère » (affichée en italique par défaut).
- `<strong>` : une emphase « forte » (affichée en gras par défaut).
- `<mark>` : un texte surligné.

```html
<p>Le HTML c'est <strong>très</strong> simple, vous allez <em>rapidement</em> progresser.</p>
```

::: details Question : pourquoi ne pas dire simplement « italique » et « gras » ?
Parce que ces balises indiquent **le sens** (ce mot est important), pas l'apparence. C'est la CSS qui décidera du rendu visuel : vous pourriez très bien afficher un `<strong>` en rouge plutôt qu'en gras. Ce sens est aussi exploité par les moteurs de recherche et les lecteurs d'écran : un `<strong>` dit à Google « ce mot compte ».
:::

## Votre première page

Assez de théorie, place à la pratique ! En vous inspirant de ce que nous venons de voir, je vous laisse créer une page équivalente à celle-ci :

<ExternalIframe bordered src="/demo/html/index.html" />

::: tip Comment procéder ?
Votre carrière sera faite de balises / problèmes inconnus, le bon réflexe c'est une boite à outils de documentation, par exemple :

- [Google](https://www.google.com)
- [Stackoverflow](https://stackoverflow.com/)
- [MDN](https://developer.mozilla.org/fr/docs/Web/HTML/Element)

:hand: _Petite astuce_, votre IDE propose un mode « emmet », nous allons découvrir son fonctionnement ensemble. :hand:
:::

## Créer une seconde page

- Ajouter un titre (`<h1>` + `<title>`)
- Ajouter une balise audio `<audio>`
- Ajouter une balise video `<video>`

::: tip Besoin d'aide ?
La documentation MDN est votre amie : [la balise video](https://developer.mozilla.org/fr/docs/Web/HTML/Element/video) par exemple.
:::

## Ajouter un menu

Nous avons maintenant 2 pages, nous allons donc devoir ajouter un menu, en utilisant les balises que nous avons vues ensemble (ou d'autres).

Je vous laisse écrire et mettre en place le menu dans l'ensemble des pages de votre site.

::: tip Comment s'organiser ?

- Comment procédez-vous ?
- À votre avis, pouvons-nous faire autrement, afin d'éviter de mettre plusieurs fois la même chose dans plusieurs fichiers ?

:::

## Le fil rouge : votre blog

Tout au long de cette séquence HTML + CSS, vous allez construire **votre blog** : un vrai site, qui grandira à chaque TP. Première étape aujourd'hui :

- Créer un dossier `blog` (c'est votre projet, il vous suivra pendant toute la séquence).
- Y créer une page `index.html` avec la structure de base vue dans ce TP.
- Dans la balise `<title>` : « Blog Informatique BTS SIO ».
- Ajouter un titre de niveau 1.
- Ajouter un titre de niveau 2, suivi d'un paragraphe expliquant ce que le lecteur va trouver dans votre blog.
- Ajouter un second titre de niveau 2, suivi de la liste des sujets qui y seront traités.

::: tip Point de contrôle
Votre page s'affiche correctement dans le navigateur, les accents passent bien, et la hiérarchie des titres est logique (un seul `<h1>`). Faites-moi valider votre page avant de partir.
:::

## Conclusion

Dans ce TP vous avez :

- Compris les rôles du HTML (le contenu) et de la CSS (l'apparence).
- Écrit la structure minimale d'une page HTML 5.
- Organisé un contenu avec des titres, des paragraphes et des listes.
- Démarré votre blog, le fil rouge de la séquence.

Gardez précieusement votre dossier de travail, il va grandir à chaque TP. La suite ? [Les liens, les images et les tableaux](./tp1.1.md), pour transformer vos pages isolées en vrai site.

👋 Si vous avez des questions, n'hésitez pas.
