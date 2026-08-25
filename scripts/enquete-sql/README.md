# Enquête SQL : moteur et histoires

Contenu du dossier :

- `generate.py` : le moteur (monde aléatoire, injection des personnages, leurres, vérification, bases SQLite, index, solutions).
- `histoires/*.toml` : une histoire par fichier.
- `mcd.py` : génère le MCD `tp/php/sql/res/enquete_schema.svg`.
- `corriges.json` : requêtes de vérification, généré.

Une histoire = un fichier `.toml` dans `histoires/`. Génération :

```bash
python3 scripts/enquete-sql/generate.py                       # génère les bases manquantes, reconstruit l'index
python3 scripts/enquete-sql/generate.py --force histoires/x.toml   # régénère une histoire précise
```

**Génération « one shot »** : une base déjà présente dans `public/sqlite/enquete/` n'est jamais régénérée sans
`--force`, pour que les histoires publiées (et les indices du TP) restent stables. Le script n'est pas appelé
par le build du site : les `.sqlite` sont versionnés.

Sorties : `public/sqlite/enquete/<id>.sqlite`, `public/sqlite/enquete/index.json` (lu par le composant `SqlEnquete.vue`),
`scripts/enquete-sql/corriges.json` (requêtes de vérification) et `public/sqlite/enquete/solutions/<id>.md`
(indices dégressifs + solutions, générés à chaque exécution et inclus dans le TP par
`<!--@include: ../../../public/sqlite/enquete/solutions/<id>.md-->`).

Le moteur garantit que chaque personnage est identifiable de façon **unique** avec les indices révélés, et
ajoute pour chaque indice un leurre qui coche tout sauf cet indice (un indice ignoré = plusieurs suspects).
Si la vérification échoue, la génération s'arrête avec la requête fautive.

## Procédure : créer une nouvelle histoire

1. **Écrire le scénario sur papier** : quel crime, quelle date, qui sont les témoins, qui est à identifier,
   qui révèle quoi. Choisissez une structure différente des histoires existantes (voir « Varier la structure »).
2. **Créer `histoires/<id>.toml`** en copiant l'histoire existante la plus proche. `id` devient le nom de la base ;
   choisissez un `ordre` (position dans le sélecteur) et une `seed` (voir ci-dessous).
3. **Décrire les personnages** : un `reperage` pour chaque témoin, des `traits` pour chaque personne à identifier,
   `reponse = n` et `message` pour ceux qu'il faut accuser. Mettez `"?"` partout où la valeur importe peu,
   le moteur la tirera au sort.
4. **Rédiger les textes** (`rapport`, `dit`) avec les placeholders : `{temoin}` pour dire comment retrouver un
   témoin, `{cible:groupe}` pour révéler un groupe de traits. Chaque trait doit être révélé quelque part,
   sinon le moteur avertit et l'indice ne sert à rien. Noms des personnages à accuser **sans accent**
   (les étudiants les tapent dans l'`INSERT`).
5. **Générer** : `python3 scripts/enquete-sql/generate.py`. Le moteur vérifie que chaque personnage est unique
   et que chaque indice est nécessaire ; s'il s'arrête sur une erreur, la requête fautive est affichée
   (le plus souvent, un indice non discriminant : changez sa valeur ou la seed).
6. **Relire les textes générés** : `sqlite3 public/sqlite/enquete/<id>.sqlite "SELECT transcription FROM
   interrogatoire WHERE personne_id IN (SELECT id FROM personne WHERE nom IN ('…'))"`. Si une phrase sonne
   faux, ajustez le `dit` (les gabarits de phrases sont dans `generate.py`, fonctions `text_*`).
7. **Brancher dans le TP** : dans `tp/php/sql/enquete.md`, section « Enquêtes suivantes », ajouter un titre
   `### Titre` puis `<!--@include: ../../../public/sqlite/enquete/solutions/<id>.md-->`.
8. **Vérifier et publier** : `npm run docs:build`, commit de tout (`histoires/<id>.toml`, la base `.sqlite`,
   `index.json`, `solutions/<id>.md`, `corriges.json`, le TP), push.

Pour retoucher une histoire déjà publiée : modifier le TOML puis `--force histoires/<id>.toml`. Les valeurs `"?"`
sont retirées si la seed ou l'ordre des tirages change ; les indices et solutions du TP suivent automatiquement.

## La seed

`seed` est l'entier qui initialise le générateur pseudo-aléatoire de l'histoire. Tout ce qui est « au hasard »
en découle, de façon **reproductible** : même TOML + même seed = base identique à l'octet près.

La seed détermine :

- le monde : les 10 000 habitants (noms, adresses, permis, revenus), les rapports de police de remplissage,
  les membres de la salle de sport et leurs passages, les participations aux événements ;
- toutes les valeurs `"?"` des traits (couleur de cheveux, fragment de plaque, statut, créneau horaire…) ;
- les leurres (les personnes qui cochent tout sauf un indice) ;
- la variante de phrase choisie pour chaque indice.

Elle ne détermine pas ce que vous écrivez en dur : noms des personnages, rues des repérages, dates, textes.

En pratique :

- une seed différente par histoire, sinon deux histoires partagent les mêmes habitants ;
- changer la seed régénère une variante de la même histoire (autres valeurs `"?"`, autres leurres) : utile si
  la vérification échoue ou si les valeurs tirées sont peu lisibles ;
- ne jamais changer la seed d'une histoire publiée sans `--force` et sans prévenir : les étudiants en cours
  de partie auraient des indices qui ne correspondent plus à leur base téléchargée.

## Squelette

```toml
[histoire]
id = "mon_histoire"          # nom du fichier .sqlite
titre = "Titre affiché"
ordre = 5                    # position dans le sélecteur
seed = 1234                  # initialise le hasard (monde, valeurs « ? », leurres), voir « La seed »
date = 20220101              # AAAAMMJJ
type = "vol"                 # type du rapport (vol, meurtre, cambriolage, incendie, sabotage, chantage…)
brief = "Texte d'accroche affiché sous le sélecteur."
rapport = "Texte du rapport de police. Le premier témoin {temoin}. …"
rapports_leurres = [         # autres rapports le même jour (par défaut même date, même type, SQL Ville)
  { type = "vol", description = "…" },
  { ville = "Lyon", description = "…" },
]

[personnage.temoin]
nom = "Prénom Nom"           # facultatif (tiré au sort sinon) ; sans accent pour les personnages à deviner
genre = "femme"              # sert aux accords dans les phrases (défaut : homme)
reperage = { rue = "Rue X", position = "dernier" }
dit = "Ce que la personne déclare. {coupable:physique} {coupable:vehicule}"

[personnage.coupable]
nom = "Jean Dupont"
reponse = 1                  # ordre dans la chaîne des réponses (1, 2, 3…)
message = "Message affiché par la table solution quand on valide ce nom."
traits.physique = { genre = "homme", cheveux = "?", age = "?" }
traits.vehicule = { marque = "?", plaque_debut = "?" }
dit = "Facultatif : pour mener plus loin. {cerveau:salle}"
```

## Placeholders dans les textes

- `{nom_du_personnage}` : la phrase de repérage (« habite la dernière maison de … »). À utiliser dans `rapport`.
- `{nom_du_personnage:groupe}` : les phrases décrivant un groupe de traits de ce personnage. Un même groupe
  peut être révélé par plusieurs personnes, et les groupes d'un personnage peuvent être répartis entre
  plusieurs témoins (chaque témoin ne connaît qu'un détail).

Un trait défini mais jamais révélé déclenche un avertissement (il ne sert alors à rien).

## Repérage d'un témoin (`reperage`)

| Clé | Effet |
| --- | --- |
| `rue = "…"`, `position = "dernier"` / `"premier"` | numéro le plus grand / le plus petit de la rue |
| `rue = "…"`, `prenom = true` | prénom unique dans la rue (le prénom vient de `nom`) |
| `rue = "…"`, `prenom = true`, `numero = [100, 200]` | idem, avec des homonymes hors intervalle |
| `rue = "…"`, `revenu = "max"` / `"min"` | revenu extrême de la rue |

## Groupes de traits (`traits.<groupe>`)

Toute valeur peut être `"?"` : elle est alors tirée au sort (de façon reproductible avec la `seed`).

| Groupe | Clés | Tables SQL impliquées |
| --- | --- | --- |
| `physique` | `genre`, `cheveux`, `yeux`, `taille = [min, max]`, `age = [min, max]` | `permis_conduire` |
| `vehicule` | `marque`, `modele`, `plaque_debut`, `plaque_fin`, `plaque_contient` | `permis_conduire` |
| `salle` | `statut` (or/argent/standard), `id_debut`, `id_contient`, `passage = AAAAMMJJ`, `entre = HHMM`, `et = HHMM` | `salle_sport_membre`, `salle_sport_passage` |
| `evenement` | `nom`, `fois`, `mois = AAAAMM` ou `date = AAAAMMJJ` | `evenement_participation` |
| `revenu` | `min` ou `max` | `revenu` |
| `adresse` | `rue`, `numero = [min, max]` | `personne` |

`rue`, `numero`, `fois`, `min`, `max`, `entre`, `id_debut`, `id_contient`, `statut`, `marque`, `modele`,
`plaque_*`, `genre`, `cheveux`, `yeux`, `taille`, `age`, `nom` (événement) acceptent tous `"?"`.

Valeurs possibles : cheveux `brun, châtain, blond, noir, roux, gris, blanc, chauve` ; yeux `marron, bleu, vert,
noisette, gris` ; marques et modèles dans `MARQUES` de `generate.py` ; événements dans `EVENEMENTS` (un nom inconnu
est ajouté automatiquement).

## Varier la structure

La chaîne n'est pas figée : c'est l'enchaînement des `dit` qui la dessine.

- Classique : rapport → 2 témoins → coupable → commanditaire (`meurtre.toml`).
- Un seul témoin, un complice qui parle, un cerveau (`sql_express.toml`).
- Trois témoins qui connaissent chacun un seul groupe de traits, pas de commanditaire (`formule.toml`).
- Fausse piste : un personnage avec `message` mais **sans** `reponse` ; valider son nom affiche son message et
  son interrogatoire relance l'enquête (`septieme_seance.toml`).
- Indices répartis : les traits d'un même personnage révélés par deux personnes différentes, il faut croiser
  deux dépositions (`nova_city.toml`).
- Repérage en cascade : un témoin explique dans son `dit` comment retrouver un autre témoin (`{autre_temoin}`
  fonctionne aussi dans un interrogatoire, pas seulement dans le rapport) (`little_italy.toml`).

Après toute modification (`--force`), relancer la génération : les indices et solutions du TP sont régénérés
automatiquement. Pour une nouvelle histoire, ajouter un titre `###` et la ligne `@include` dans `tp/php/sql/enquete.md`.
