---
description: "Dans ce TP nous allons découvrir le framework CSS Tailwind, et son approche « utility-first » très différente de Bootstrap."
---

# Découverte de Tailwind

::: details Sommaire
[[toc]]
:::

Vous avez découvert Bootstrap dans le TP précédent, je vous propose maintenant de découvrir [Tailwind CSS](https://tailwindcss.com/). L'approche est très différente : ici pas de composants tout prêts, mais des centaines de petites classes utilitaires que vous allez assembler pour construire votre design. C'est le framework le plus utilisé actuellement dans les projets modernes (Vue, React, Laravel, etc.), autant dire que vous allez le recroiser.

## Prérequis

- Avoir suivi les TP précédents (HTML, CSS, responsive).
- Avoir lu [l'introduction aux frameworks CSS](./framework_css/introduction.md).

::: details Besoin d'un rattrapage sur les frameworks CSS ?
Un framework CSS est une bibliothèque de styles prêts à l'emploi. Il vous fait gagner du temps et vous fait partager des standards avec les autres développeurs. Je vous laisse (re)lire [la page dédiée](./framework_css/introduction.md) avant de continuer.
:::

## Objectifs

À la fin de ce TP vous saurez :

- Ajouter Tailwind dans une page HTML.
- Mettre en forme un élément avec les classes utilitaires.
- Gérer le responsive avec les préfixes (`md:`, `lg:`).
- Gérer les états (`hover:`) et le thème sombre (`dark:`).

## Création de la page

Comme toujours, la première étape est de créer un nouveau fichier HTML avec une structure basique (comprendre HTML 5, avec la `meta` viewport). Puis d'y ajouter Tailwind, pour ce TP nous allons utiliser la version CDN :

```html
<script src="https://cdn.tailwindcss.com"></script>
```

Je vous laisse valider que tout fonctionne avec le code suivant dans votre `body` :

```html
<h1 class="text-3xl font-bold underline">Hello Tailwind !</h1>
```

::: tip Point de contrôle
Votre titre doit s'afficher en grand, en gras et souligné. Si ce n'est pas le cas, vérifiez l'onglet réseau de votre inspecteur d'éléments : le script Tailwind est-il bien chargé ?
:::

::: details Question : pourquoi un `<script>` et pas un `<link rel="stylesheet">` ?
Contrairement à Bootstrap, Tailwind ne fournit pas « une grosse feuille de style ». La version CDN génère à la volée (en JavaScript) uniquement les classes que vous utilisez dans votre page. En production, on utilise plutôt un outil de build qui génère un fichier CSS minimal (nous le verrons plus tard).
:::

## Les classes utilitaires

Chaque classe Tailwind correspond à « une propriété CSS » : `text-center` pour centrer, `p-4` pour un padding, `bg-blue-500` pour un fond bleu… La [documentation](https://tailwindcss.com/docs/) est votre meilleure amie, elle dispose d'un moteur de recherche très efficace (tapez la propriété CSS que vous connaissez déjà, Tailwind vous donnera la classe correspondante).

### À faire

Réaliser un paragraphe de présentation avec :

- Un texte gris foncé.
- Un padding autour du texte.
- Un fond gris clair et des bords arrondis.

::: details Voir l'une des solutions possibles

```html
<p class="text-gray-700 p-4 bg-gray-100 rounded-lg">
  Je découvre Tailwind CSS, un framework utilitaire.
</p>
```

:::

## Une card

Pas de composant « card » tout prêt dans Tailwind, nous allons donc la construire nous-mêmes. C'est à vous de jouer !

### À faire

Réaliser une card contenant :

- Une image ([picsum.photos](https://picsum.photos/) fera l'affaire).
- Un titre et un court texte.
- Une ombre, des bords arrondis et un fond blanc.

::: details Voir l'une des solutions possibles

```html
<div class="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
  <img class="w-full h-48 object-cover" src="https://picsum.photos/400/300" alt="Illustration" />
  <div class="p-4">
    <h2 class="text-xl font-semibold mb-2">Ma première card</h2>
    <p class="text-gray-600">Construite uniquement avec des classes utilitaires.</p>
  </div>
</div>
```

:::

## Le responsive

C'est l'un des gros points forts de Tailwind : n'importe quelle classe peut être conditionnée à une taille d'écran avec un préfixe (`sm:`, `md:`, `lg:`, `xl:`). Sans préfixe, la classe s'applique à toutes les tailles ; avec un préfixe, elle s'applique à partir de cette taille (approche « mobile first »).

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Vos cards ici -->
</div>
```

### À faire

- Dupliquer votre card pour en avoir 6.
- Les afficher dans une grille : 1 colonne sur mobile, 2 sur tablette, 3 sur ordinateur.
- Tester le rendu en redimensionnant votre navigateur (ou avec le mode mobile de l'inspecteur d'éléments).

::: tip Point de contrôle
En réduisant la fenêtre, vos cards doivent passer de 3 colonnes à 2, puis à 1. Pas de panique si ce n'est pas le cas, vérifiez que la `meta` viewport est bien présente dans votre `head`.
:::

## Les états et le thème sombre

Le même système de préfixes fonctionne pour les états : `hover:` au survol, `focus:` au focus, `dark:` quand le système de la personne est en thème sombre.

```html
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Cliquez-moi
</button>
```

### À faire

- Ajouter un bouton « Contact » sous vos cards, avec un changement de couleur au survol.
- Faire en sorte que vos cards aient une ombre plus marquée au survol (`hover:shadow-xl`).
- Bonus pour les plus rapides : rendre votre page compatible avec le thème sombre (`dark:`).

## Conclusion

Dans ce TP vous avez :

- Ajouté Tailwind dans une page via le CDN.
- Construit une card uniquement avec des classes utilitaires.
- Rendu votre page responsive avec les préfixes `md:` et `lg:`.
- Géré les états avec `hover:` et `dark:`.

Pensez à sauvegarder votre travail. Bootstrap ou Tailwind ? Il n'y a pas de bonne réponse, ce sont deux philosophies différentes, l'important est d'avoir compris que dans les deux cas la documentation est au centre de votre travail.

👋 Si vous avez des questions, n'hésitez pas.
