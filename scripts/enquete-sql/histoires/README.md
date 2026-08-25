# Écrire une histoire d'enquête SQL

Une histoire = un fichier `.toml` dans ce dossier. Génération :

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

## Squelette

```toml
[histoire]
id = "mon_histoire"          # nom du fichier .sqlite
titre = "Titre affiché"
ordre = 5                    # position dans le sélecteur
seed = 1234                  # change la seed = change toutes les valeurs « ? »
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

Après toute modification (`--force`), relancer la génération : les indices et solutions du TP sont régénérés
automatiquement. Pour une nouvelle histoire, ajouter un titre `###` et la ligne `@include` dans `tp/php/sql/enquete.md`.
