---
description: "Point étape évalué du parcours JavaScript. Un mini projet rapide pour valider la manipulation du DOM, les événements et l'Ajax avec fetch."
---

# Évaluation : Mon catalogue de films

::: details Sommaire
[[toc]]
:::

## Introduction

Dans les précédents TP, nous avons vu les bases du JavaScript ([TP 1](./tp1.md), [TP 1.1](./tp1.1.md), [TP 1.2](./tp1.2.md)), la manipulation du DOM ([TP 2](./tp2.md)), les événements et le contrôle de saisie ([TP 3](./tp3.md)) et l'Ajax avec `fetch` ([TP 4](./tp4.md)).

Vous avez atteint le point étape du parcours JavaScript. Ce mini projet est une **synthèse évaluée** de ces apprentissages. Il n'y aura pas de procédure pas à pas, à vous de mobiliser vos connaissances.

Le sujet est calibré pour une séance de **2 heures**, README et rendu compris. Conseil : ne partez pas de zéro, réutilisez la structure et le code de vos TP précédents et gardez 20 minutes en fin de séance pour le README et le rendu.

::: tip TP évalué - Barème indicatif (Total 20 points + Bonus)

La réalisation de ce TP sera évaluée de la manière suivante :

- **Structure du projet (2 points)**
  - Projet organisé (`index.html`, JavaScript externalisé dans `js/main.js`, CSS externalisée) : **2 points**.
- **Les données (4 points)**
  - Le fichier `data.json` fourni est chargé via `fetch` (aucune donnée de film en dur dans le HTML ou le JS) : **4 points**.
- **L'affichage (5 points)**
  - Les films sont affichés sous forme de cartes générées en JavaScript (boucle) : **3 points**.
  - Un compteur indique le nombre de films affichés et se met à jour : **2 points**.
- **La recherche (4 points)**
  - Un champ de saisie filtre la liste en direct (pendant la frappe) : **3 points**.
  - Un message « Aucun résultat » s'affiche quand la recherche ne trouve rien : **1 point**.
- **Qualité (2 points)**
  - Code indenté, variables nommées en anglais, pas de copier / coller inutile, aucune erreur dans la console : **2 points**.
- **Le README.md (3 points)**
  - Présent à la racine et complet (voir la section dédiée) : **3 points**.
- **Bonus challenge (2 points)**
  - Le tri par note (voir la fin du sujet).

:::

Vous avez à votre disposition l'ensemble des documents nécessaires :

- [Le complément de cours JavaScript](./support.md)
- [L'aide-mémoire JavaScript / Ajax](/cheatsheets/javascript/)
- Les TP précédents ([TP 2](./tp2.md), [TP 3](./tp3.md), [TP 4](./tp4.md))

## Le projet

Vous allez réaliser un **catalogue de films** : une page qui charge une liste de films depuis un fichier JSON, l'affiche, et permet de la filtrer.

1. **La structure :**
   - Créer un nouveau projet avec un fichier `index.html`, un dossier `js/` (avec `main.js`) et votre CSS externalisée.
   - Créer un fichier `data.json` à la racine avec le contenu fourni ci-dessous.

::: details Le fichier data.json (fourni, à copier tel quel)

```json
[
  { "title": "Inception", "year": 2010, "genre": "Science-fiction", "rating": 8.8 },
  { "title": "Le Voyage de Chihiro", "year": 2001, "genre": "Animation", "rating": 8.6 },
  { "title": "Interstellar", "year": 2014, "genre": "Science-fiction", "rating": 8.7 },
  { "title": "Intouchables", "year": 2011, "genre": "Comédie", "rating": 8.5 },
  { "title": "Le Fabuleux Destin d'Amélie Poulain", "year": 2001, "genre": "Comédie", "rating": 8.3 },
  { "title": "The Dark Knight", "year": 2008, "genre": "Action", "rating": 9.0 },
  { "title": "La La Land", "year": 2016, "genre": "Comédie musicale", "rating": 8.0 },
  { "title": "Parasite", "year": 2019, "genre": "Thriller", "rating": 8.5 },
  { "title": "Oppenheimer", "year": 2023, "genre": "Biopic", "rating": 8.3 },
  { "title": "Le Seigneur des Anneaux", "year": 2001, "genre": "Fantasy", "rating": 8.9 }
]
```

:::

::: details Coup de pouce : la structure
C'est la même organisation que le [TP Bart en JavaScript](./tp2.md). N'oubliez pas d'inclure votre script et d'attendre que la page soit chargée (`DOMContentLoaded`) avant de manipuler le DOM.

⚠️ Pour que le `fetch` du fichier `data.json` fonctionne, votre projet doit être servi par un serveur web (Wamp, ou l'extension Live Server de VSCode). Ouvrir le fichier HTML directement (`file://`) ne fonctionnera pas.
:::

2. **Les données :**
   - Charger le fichier `data.json` avec `fetch` au chargement de la page.
   - Aucune donnée de film ne doit être écrite en dur dans votre HTML ou votre JavaScript.

::: details Coup de pouce : le fetch
Le squelette est le même que dans le [TP 4](./tp4.md) :

```js
fetch("./data.json")
  .then((response) => response.json())
  .then((movies) => {
    // À vous de jouer avec le tableau movies…
  });
```

:::

3. **L'affichage :**
   - Afficher chaque film sous forme de « carte » (titre, année, genre, note) générée en JavaScript.
   - Afficher un compteur du type « 10 films affichés », qui se met à jour quand la liste change.
   - Le style est libre (Bootstrap ou Tailwind autorisés), mais la page doit être présentable.

::: details Coup de pouce : l'affichage
Une boucle (`forEach`) et de la création d'éléments, comme dans le [TP 2](./tp2.md). Le support détaille [la création d'éléments dans la page](./support.md#creer-des-elements-dans-la-page). Pensez à vider la zone d'affichage avant de la remplir à nouveau (utile pour la recherche).
:::

4. **La recherche :**
   - Ajouter un champ de saisie au-dessus de la liste.
   - Pendant la frappe, la liste doit se filtrer pour n'afficher que les films dont le titre contient le texte saisi (sans tenir compte des majuscules / minuscules).
   - Si aucun film ne correspond, afficher un message « Aucun résultat ».

::: details Coup de pouce : la recherche
L'événement `input` se déclenche à chaque frappe ([les événements dans le support](./support.md#les-evenements)). Côté données, les méthodes `filter`, `includes` et `toLowerCase` feront le travail :

```js
const results = movies.filter((movie) =>
  movie.title.toLowerCase().includes(search.toLowerCase())
);
```

À vous d'assembler les morceaux.
:::

## Le README.md

Votre projet doit contenir un fichier `README.md` **à la racine**, comme pour les évaluations précédentes. Le contenu attendu est [défini dans l'évaluation 1 de PHP](/tp/php/eval1.md#le-readme-md) : présentation, lancement, fonctionnalités, captures d'écran (dans un dossier `docs/`), challenge fait ou non.

Pour cette évaluation, les captures attendues sont : la liste complète, une recherche avec résultats, et une recherche sans résultat.

## Le challenge

Vous avez terminé ? Voici le défi bonus :

- Ajouter un bouton « Trier par note ».
- Au clic, la liste s'affiche de la meilleure note à la moins bonne.
- Un second clic revient à l'ordre d'origine.

## Restitution

Le rendu se fait en deux temps :

1. **Poussez votre projet sur un dépôt Git** sur le GitLab du lycée : [https://gitlab.dombtsig.local](https://gitlab.dombtsig.local). Le `README.md` doit être à la racine du dépôt (GitLab l'affichera automatiquement sur la page du projet).
2. **Déposez le lien du dépôt dans Moodle**.

::: tip Besoin d'un rappel sur Git ?
Vous l'avez déjà pratiqué, mais en cas de trou de mémoire :

- [Initiation à Git](/tp/git_initiation/)
- [Utiliser GitLab](/tp/gitlab/)
- [L'aide mémoire Git](/cheatsheets/git/)

:::

::: danger Vérifiez l'accès
Un lien vers un dépôt auquel je n'ai pas accès = un rendu vide. Vérifiez la visibilité de votre projet (ou ajoutez-moi en membre) **avant** de déposer le lien.
:::

Bravo, vous avez terminé le point étape du parcours JavaScript !
