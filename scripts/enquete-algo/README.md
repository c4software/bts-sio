# Enquête PHP : moteur et histoires

Déclinaison « algorithmes » de l'Enquête SQL (`scripts/enquete-sql/`) : l'étudiant résout les mêmes
enquêtes avec du code PHP (boucles, conditions, tableaux, puis objets), sans SQL. Contenu du dossier :

- `generate.py` : le moteur (monde aléatoire réduit, injection des personnages, leurres, vérification,
  fichiers PHP de données, index, solutions).
- `histoires/*.toml` : une histoire par fichier, champ `mode = "procedural"` ou `"poo"`.
- `corriges.json` : blocs PHP de solution, généré.

Une histoire = un fichier `.toml` dans `histoires/`. Génération :

```bash
python3 scripts/enquete-algo/generate.py                       # génère les fichiers manquants, reconstruit l'index
python3 scripts/enquete-algo/generate.py --force histoires/x.toml   # régénère une histoire précise
```

**Génération « one shot »** : un fichier déjà présent dans `public/enquete-algo/` n'est jamais régénéré sans
`--force`, pour que les histoires publiées (et les indices des TP) restent stables. Le script n'est pas appelé
par le build du site : les `.php` sont versionnés.

Sorties : `public/enquete-algo/<id>.php` (données + fonction `verifier()`, lu par le composant `AlgoEnquete.vue`
et téléchargeable pour travailler en local), `public/enquete-algo/index.json` (titres, briefs, empreintes SHA-256
des réponses), `scripts/enquete-algo/corriges.json` (blocs PHP de vérification) et
`public/enquete-algo/solutions/<id>.md` (indices dégressifs + solutions, générés à chaque exécution et inclus
dans les TP par `<!--@include: ../../public/enquete-algo/solutions/<id>.md-->`).

Le moteur garantit que chaque personnage est identifiable de façon **unique** avec les indices révélés, et
ajoute pour chaque indice un leurre qui coche tout sauf cet indice (un indice ignoré = plusieurs suspects).
La vérification rejoue en Python les mêmes filtres que ceux attendus en PHP ; si elle échoue, la génération
s'arrête avec le prédicat fautif (le plus souvent, un indice non discriminant : changez sa valeur ou la seed).

## Les deux modes

Le monde et le format TOML sont identiques ; seul le fichier PHP émis change.

- `mode = "procedural"` (TP `tp/php/enquete-algo.md`) : quatre tableaux `$habitants`, `$vehicules`,
  `$temoignages`, `$passages` + `$rapport` + `verifier()`.
- `mode = "poo"` (TP `tp/php/enquete-poo.md`) : les mêmes données exposées en objets : classes `Habitant`,
  `Vehicule`, `Passage`, une classe `Ville` (accès encapsulé : `habitants()`, `vehiculeDe()`, `temoignageDe()`,
  `passagesDe()`, `rapport()`), l'interface `Critere` et la fonction `filtrer()`, plus `$ville` et `verifier()`.
  `niveau_poo` (1, 2 ou 3) ne change que le style des solutions générées : 1 = boucles sur les objets et
  méthodes de `Ville`, 2 = une classe par étape (`EnqueteCoupable`…), 3 = des classes `Critere` combinées
  par `filtrer()`.

La validation d'une réponse passe par `verifier("Prénom Nom")` : la fonction hache le nom (SHA-256) et
compare aux empreintes embarquées, il n'y a donc aucun nom de coupable en clair hors des données. Elle
imprime un marqueur `[[ENQUETE:<empreinte>]]` (ou `[[ENQUETE:KO]]`) que le composant intercepte pour tenir
le journal de bord ; les fausses pistes ont un message mais leur empreinte n'est pas dans `index.json`.

## Le monde

500 habitants « à plat » (id, nom, genre, age, taille, cheveux, rue, numero, revenu), ~300 véhicules et
~200 témoignages reliés par `habitant_id`, ~1500 passages (registre des badges d'entrée des équipements
municipaux : lieu, date `AAAAMMJJ`, heure `HHMM`). Les ids sont renumérotés au hasard à l'écriture,
les personnages injectés ne sont donc pas repérables à leur id. La `seed` du TOML rend tout reproductible :
même TOML + même seed = fichier identique à l'octet près. Ne jamais changer la seed d'une histoire publiée
sans `--force` assumé (voir le README de l'enquête SQL, la règle est la même).

## Procédure : créer une nouvelle histoire

Identique à l'enquête SQL (voir `scripts/enquete-sql/README.md`), avec ces différences :

1. Choisissez le `mode` (et `niveau_poo` pour une histoire POO).
2. Groupes de traits disponibles : `physique` (genre, cheveux, age, taille), `vehicule` (marque, modele,
   plaque_debut, plaque_fin, plaque_contient), `passage` (lieu parmi `LIEUX` de `generate.py`, date ou mois,
   fois, entre/et), `adresse` (rue, numero), `revenu` (min ou max). Toute valeur accepte `"?"`.
3. Repérages des témoins : `position = "dernier"/"premier"`, `prenom = true` (+ `numero = [a, b]`),
   `revenu = "max"/"min"` — comme en SQL.
4. Pas de `rapports_leurres` : le rapport est un simple texte (`$rapport`), pas une table.
5. Après génération, ajoutez dans le TP concerné (`enquete-algo.md` ou `enquete-poo.md`) un titre `###`
   puis la ligne `@include` affichée en fin d'exécution.

Relisez les textes générés (le rapport et les témoignages sont dans le `.php`), et exécutez les corrigés
si un binaire `php` est disponible : chaque bloc de `corriges.json`, précédé du fichier de données, doit
afficher exactement le nom attendu.
