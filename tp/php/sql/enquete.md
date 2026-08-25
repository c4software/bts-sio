---
description: "TP bonus : menez l'enquête à SQL Ville uniquement avec des requêtes SQL (SELECT, WHERE, LIKE, JOIN, GROUP BY). Plusieurs histoires au choix, directement dans le navigateur."
---

# TP Bonus : Enquête SQL

::: details Sommaire
[[toc]]
:::

Vous savez maintenant écrire des requêtes SQL et les exécuter depuis PHP avec PDO. Il est temps de vérifier que vous savez aussi **lire des données** pour en tirer une conclusion. Un crime a été commis à SQL Ville, la police a une base de données… et rien d'autre. C'est à vous de jouer !

Ce TP est une adaptation en français du [SQL Murder Mystery](https://github.com/NUKnightLab/sql-mysteries) de NUKnightLab, avec plusieurs histoires différentes pour ne pas refaire toujours la même enquête.

::: tip Pour les étudiants en avance
Ce TP est un **bonus** : il n'est pas noté et ne demande aucun rendu. Vous pouvez le faire en autonomie, seul ou à deux, dès que vous avez terminé le TP en cours. Comptez environ une heure par histoire.
:::

## Prérequis

- Avoir terminé le [TP 5 SQL](./tp5.md) (SELECT, WHERE, jointures).
- Avoir sous la main [l'aide-mémoire SQL](/cheatsheets/sql/).

::: details Rattrapage express : les mots-clés dont vous aurez besoin
- `SELECT … FROM … WHERE …` : filtrer des lignes.
- `LIKE 'abc%'`, `LIKE '%abc'`, `LIKE '%abc%'` : commence par, se termine par, contient.
- `BETWEEN a AND b` : un intervalle (dates et nombres).
- `ORDER BY … DESC LIMIT 1` : la plus grande valeur.
- `JOIN table t ON t.colonne = autre.colonne` : relier deux tables.
- `GROUP BY … HAVING COUNT(*) = n` : compter par personne.
:::

## Objectifs

À la fin de ce TP vous saurez :

- Explorer une base de données que vous n'avez pas conçue.
- Enchaîner des requêtes pour croiser des informations entre plusieurs tables.
- Utiliser `LIKE`, `BETWEEN`, `ORDER BY`, `JOIN` et `GROUP BY … HAVING` dans un cas concret.
- Formuler une hypothèse et la vérifier avec des données.

## Les règles du jeu

- Toutes les histoires se passent dans la même base : mêmes tables, mêmes colonnes. Seules les données changent.
- Chaque enquête commence par la table `rapport_police`. Le rapport vous dit comment trouver les témoins, les témoins vous décrivent le coupable, et parfois le coupable vous mène plus loin encore.
- Les dates sont stockées sous la forme d'un nombre entier `AAAAMMJJ` (le 15 janvier 2018 s'écrit `20180115`), les heures sous la forme `HHMM` (`1830` pour 18h30).
- Quand vous pensez avoir trouvé, vous validez avec la table `solution` :

```sql
INSERT INTO solution VALUES (1, 'Prénom Nom');
SELECT valeur FROM solution;
```

La base vous répond si c'est la bonne personne… et si l'enquête continue.

::: warning Interdit
Pas de `SELECT * FROM personne` en espérant repérer le coupable à l'œil : il y a 10 000 habitants. L'objectif est justement d'écrire des requêtes qui **réduisent** le nombre de résultats jusqu'à n'en avoir qu'un.
:::

## Choisissez votre histoire

Sélectionnez une histoire, lisez le brief, puis écrivez vos requêtes dans l'éditeur. Tout s'exécute dans votre navigateur (rien n'est envoyé sur un serveur) et le bouton « Réinitialiser » remet la base dans son état d'origine.

<ClientOnly>
<SqlEnquete />
</ClientOnly>

::: tip Vous préférez un vrai client SQL ?
Le lien « Télécharger la base » vous donne le fichier `.sqlite`. Ouvrez-le avec [DB Browser for SQLite](https://sqlitebrowser.org/), PhpStorm ou la ligne de commande `sqlite3`. Les requêtes sont exactement les mêmes.
:::

## Le schéma de la base

| Table | Ce qu'elle contient |
| --- | --- |
| `rapport_police` | `date`, `type`, `description`, `ville` |
| `personne` | `id`, `nom`, `permis_id`, `numero_rue`, `nom_rue`, `nir` |
| `permis_conduire` | `id`, `age`, `taille`, `couleur_yeux`, `couleur_cheveux`, `genre`, `immatriculation`, `marque_voiture`, `modele_voiture` |
| `revenu` | `nir`, `revenu_annuel` |
| `interrogatoire` | `personne_id`, `transcription` |
| `salle_sport_membre` | `id`, `personne_id`, `nom`, `date_debut_abonnement`, `statut_abonnement` |
| `salle_sport_passage` | `membre_id`, `date_passage`, `heure_entree`, `heure_sortie` |
| `evenement_participation` | `personne_id`, `evenement_id`, `nom_evenement`, `date` |
| `solution` | `utilisateur`, `valeur` (pour valider votre réponse) |

Question de réflexion : comment relie-t-on une personne à sa voiture ? Et à son revenu ?

::: details Réponse
- `personne.permis_id` → `permis_conduire.id` pour la voiture et la description physique.
- `personne.nir` → `revenu.nir` pour le revenu.
- `personne.id` → `salle_sport_membre.personne_id`, puis `salle_sport_membre.id` → `salle_sport_passage.membre_id` pour la salle de sport.
- `personne.id` → `evenement_participation.personne_id` et `interrogatoire.personne_id`.
:::

## La méthode

Quelle que soit l'histoire, la démarche est toujours la même. Je vous la détaille pour la première étape, ensuite c'est à vous.

### Étape 1 : lire le rapport de police

Vous connaissez la date, le type de crime et la ville : c'est un simple filtre.

```sql
SELECT * FROM rapport_police
WHERE ville = 'SQL Ville' AND type = 'meurtre' AND date = 20180115;
```

Attention, il peut y avoir plusieurs rapports le même jour dans la même ville. Lisez la `description` : elle vous dit comment **retrouver les témoins** (une rue, un prénom, un numéro, un revenu…).

### Étape 2 : identifier les témoins

Le rapport ne donne jamais un nom, seulement une manière de le retrouver. Quelques exemples de formulations et la requête qui va avec :

| Le rapport dit… | Vous cherchez… |
| --- | --- |
| « la dernière maison de la rue X » | `ORDER BY numero_rue DESC LIMIT 1` |
| « le plus petit numéro de la rue X » | `ORDER BY numero_rue ASC LIMIT 1` |
| « prénommé Lucas, rue X » | `nom LIKE 'Lucas %'` |
| « la personne au revenu le plus élevé de la rue X » | une jointure avec `revenu` puis `ORDER BY revenu_annuel DESC LIMIT 1` |

Une fois les témoins identifiés, lisez leur `interrogatoire` : c'est là que se trouvent les indices sur le coupable.

### Étape 3 : croiser les indices

Chaque témoin donne un ou plusieurs indices (une plaque, une salle de sport, un événement, une description physique…). **Tous** les indices sont nécessaires : la base contient volontairement des personnes qui correspondent à presque tout.

Construisez une requête qui part de `personne` et ajoute une jointure par indice. Testez au fur et à mesure : à chaque condition ajoutée, le nombre de lignes doit diminuer.

::: tip Que se passe-t-il derrière ?
Quand un indice parle de « trois fois à un événement », un simple `WHERE` ne suffit pas : il faut compter les participations par personne avec `GROUP BY personne_id HAVING COUNT(*) = 3`. C'est exactement ce que vous ferez plus tard pour compter les commandes d'un client ou les articles d'un panier.
:::

### Étape 4 : valider, puis continuer

Validez avec `INSERT INTO solution`. Si le message vous dit que l'histoire continue, lisez l'interrogatoire du coupable : il a peut-être été payé par quelqu'un.

::: tip Point de contrôle
Vous avez un nom, la table `solution` vous félicite et vous savez expliquer **chaque** jointure de votre requête finale. Sinon, reprenez les indices un par un.
:::

## Les indices, histoire par histoire

Essayez d'abord sans. Ouvrez les blocs seulement si vous bloquez, dans l'ordre : ils sont de plus en plus précis.

### Le meurtre de SQL Ville

<!--@include: ../../../public/sqlite/enquete/solutions/meurtre.md-->

### Le braquage du SQL Express

<!--@include: ../../../public/sqlite/enquete/solutions/sql_express.md-->

### La formule du professeur Noside

<!--@include: ../../../public/sqlite/enquete/solutions/formule.md-->

### Panique à la septième séance

<!--@include: ../../../public/sqlite/enquete/solutions/septieme_seance.md-->

## Pour aller plus loin

- Résolvez la dernière étape d'une histoire en **une seule requête** (toutes les jointures d'un coup).
- Pour chaque histoire, écrivez la requête qui liste **tous** les habitants qui correspondent à un indice mais pas aux autres : ce sont les fausses pistes que la base a glissées exprès.
- Réécrivez l'une de vos requêtes finales en PHP avec PDO et une requête préparée, en passant la date et le type de crime en paramètres.

## Conclusion

Dans ce TP vous avez :

- Exploré une base inconnue en partant de son schéma.
- Enchaîné filtres, jointures et agrégats pour passer de 10 000 habitants à un seul nom.
- Vu que chaque indice correspond à une condition SQL, et qu'une condition manquante laisse toujours plusieurs suspects.

👋 Si vous avez des questions, n'hésitez pas. Et si vous avez résolu les quatre histoires, venez me voir : j'ai peut-être une cinquième enquête pour vous.
