---
description: "Jeu : menez l'enquête à SQL Ville uniquement avec des requêtes SQL (SELECT, WHERE, LIKE, JOIN, GROUP BY). Plusieurs histoires au choix, directement dans le navigateur."
---

# Jeu : Enquête SQL

![Enquête SQL : 10 000 habitants, un seul coupable](./res/enquete_intro.svg)

::: details Sommaire
[[toc]]
:::

Vous savez écrire des requêtes SQL ? Il est temps de vérifier que vous savez aussi **lire des données** pour en tirer une conclusion. Un crime a été commis à SQL Ville, la police a une base de données… et rien d'autre. C'est à vous de jouer !

Ce jeu est une adaptation en français du [SQL Murder Mystery](https://github.com/NUKnightLab/sql-mysteries) de NUKnightLab, avec plusieurs histoires différentes pour ne pas refaire toujours la même enquête.

::: tip Pour les étudiants en avance
Ce jeu est un **bonus** : il n'est pas noté et ne demande aucun rendu. Vous pouvez y jouer en autonomie, seul ou à deux, dès que vous avez terminé le TP en cours. Comptez environ une heure par histoire. Il vous faut le [TP 5 SQL](/tp/php/sql/tp5.md) (SELECT, WHERE, jointures) et [l'aide-mémoire SQL](/cheatsheets/sql/) sous la main.
:::

## À vous de jouer : choisissez votre enquête

Sélectionnez une histoire, lisez le brief, puis écrivez vos requêtes dans l'éditeur. Tout s'exécute dans votre navigateur (rien n'est envoyé sur un serveur), le bouton « Réinitialiser » remet la base dans son état d'origine et le schéma des tables est dépliable sous l'éditeur.

<ClientOnly>
<SqlEnquete />
</ClientOnly>

## Les règles du jeu

- Toutes les histoires se passent dans la même base : mêmes tables, mêmes colonnes. Seules les données changent.
- Chaque enquête commence par la table `rapport_police` : le rapport vous dit comment trouver les témoins, les témoins décrivent le coupable, et parfois le coupable vous mène plus loin encore.
- Les dates sont des entiers `AAAAMMJJ` (`20180115` pour le 15 janvier 2018), les heures `HHMM` (`1830` pour 18h30).
- Quand vous pensez avoir trouvé, vous **accusez** quelqu'un en insérant son nom dans la table `solution`. La base vous répond si c'est la bonne personne et si l'enquête continue. Le journal de bord au-dessus de l'éditeur coche les étapes réussies.

```sql
INSERT INTO solution VALUES (1, 'Prénom Nom');
SELECT valeur FROM solution;
```

::: warning Interdit
Pas de `SELECT * FROM personne` en espérant repérer le coupable à l'œil : il y a 10 000 habitants. L'objectif est justement d'écrire des requêtes qui **réduisent** le nombre de résultats jusqu'à n'en avoir qu'un.
:::

::: details Rattrapage express : les mots-clés dont vous aurez besoin
- `SELECT … FROM … WHERE …` : filtrer des lignes.
- `LIKE 'abc%'`, `LIKE '%abc'`, `LIKE '%abc%'` : commence par, se termine par, contient.
- `BETWEEN a AND b` : un intervalle (dates et nombres).
- `ORDER BY … DESC LIMIT 1` : la plus grande valeur.
- `JOIN table t ON t.colonne = autre.colonne` : relier deux tables.
- `GROUP BY … HAVING COUNT(*) = n` : compter par personne.

Vous préférez un vrai client SQL ? Le lien « Télécharger la base » vous donne le fichier `.sqlite`, à ouvrir avec [DB Browser for SQLite](https://sqlitebrowser.org/), PhpStorm ou `sqlite3`.
:::

## Le plan de la ville

![Schéma relationnel de la base Enquête SQL](./res/enquete_schema.svg)

Chaque association du MCD devient une clé étrangère : `personne.permis_id`, `personne.nir`, `salle_sport_membre.personne_id`, `salle_sport_passage.membre_id`, `interrogatoire.personne_id`, et la table `evenement_participation` (`personne_id`, `evenement_id`, `nom_evenement`, `date`). Ce sont exactement les `ON` de vos jointures.

## Enquête n° 1 : on la fait ensemble

Pour prendre en main l'outil, nous allons résoudre **Le meurtre de SQL Ville** ensemble, requête par requête. Sélectionnez cette histoire dans l'éditeur, copiez chaque requête et comparez votre résultat au mien. Les autres histoires seront à faire seul, avec la même méthode.

### 1. Le rapport de police

Le brief vous donne trois informations : un meurtre, le 15 janvier 2018, à SQL Ville. Le lien « Insérer la requête de départ » écrit cette requête pour vous :

```sql
SELECT * FROM rapport_police
WHERE ville = 'SQL Ville' AND type = 'meurtre' AND date = 20180115;
```

Vous devez obtenir **une ligne**. Lisez sa description : deux témoins, le premier habite la dernière maison de « Rue du Nord-Ouest », le second se prénomme Annabel et habite « Avenue Franklin ». Le rapport ne donne jamais un nom, seulement une manière de le retrouver.

::: tip Que se passe-t-il si j'enlève le `type` ?
Essayez ! Vous obtenez trois rapports ce jour-là. C'est le principe de toute l'enquête : chaque condition retire des lignes.
:::

### 2. Retrouver les deux témoins

« La dernière maison » = le plus grand numéro de la rue. On trie les habitants de cette rue par numéro décroissant et on garde le premier :

```sql
SELECT * FROM personne
WHERE nom_rue = 'Rue du Nord-Ouest'
ORDER BY numero_rue DESC
LIMIT 1;
```

Résultat attendu : **Martin Chapuis**.

Pour Annabel, on filtre sur le début du nom (le prénom est suivi d'une espace) :

```sql
SELECT * FROM personne
WHERE nom_rue = 'Avenue Franklin' AND nom LIKE 'Annabel %';
```

Résultat attendu : **Annabel Meunier**.

::: details Les autres formulations que vous rencontrerez
| Le rapport dit… | Vous cherchez… |
| --- | --- |
| « le plus petit numéro de la rue X » | `ORDER BY numero_rue ASC LIMIT 1` |
| « la personne au revenu le plus élevé de la rue X » | une jointure avec `revenu` puis `ORDER BY revenu_annuel DESC LIMIT 1` |
:::

### 3. Lire leurs dépositions

Les dépositions sont dans `interrogatoire`, reliée à `personne` par `personne_id`. Plutôt que de recopier les `id`, faisons une jointure et filtrons sur les noms :

```sql
SELECT p.nom, i.transcription
FROM interrogatoire i
JOIN personne p ON p.id = i.personne_id
WHERE p.nom IN ('Martin Chapuis', 'Annabel Meunier');
```

Martin donne : un sac de la salle « Forme Express » dont le numéro de membre commence par « 48Z », un abonnement « or », un passage à la salle le 9 janvier 2018 et une plaque contenant « H42W ». Annabel confirme le passage à la salle le 9 janvier.

### 4. Traduire chaque indice en condition SQL

| Indice | Table | Condition |
| --- | --- | --- |
| numéro de membre commence par 48Z | `salle_sport_membre` | `m.id LIKE '48Z%'` |
| abonnement or | `salle_sport_membre` | `m.statut_abonnement = 'or'` |
| passage le 9 janvier 2018 | `salle_sport_passage` | `s.date_passage = 20180109` |
| plaque contient H42W | `permis_conduire` | `pc.immatriculation LIKE '%H42W%'` |

On part de `personne` et on ajoute les jointures **une par une**, en exécutant à chaque fois pour voir le nombre de lignes diminuer :

```sql
-- Étape a : seulement la salle de sport (plusieurs résultats)
SELECT p.nom, m.id, m.statut_abonnement
FROM personne p
JOIN salle_sport_membre m ON m.personne_id = p.id
WHERE m.id LIKE '48Z%' AND m.statut_abonnement = 'or';

-- Étape b : on ajoute le passage du 9 janvier (moins de résultats)
SELECT p.nom, m.id, s.date_passage
FROM personne p
JOIN salle_sport_membre m ON m.personne_id = p.id
JOIN salle_sport_passage s ON s.membre_id = m.id
WHERE m.id LIKE '48Z%' AND m.statut_abonnement = 'or'
  AND s.date_passage = 20180109;

-- Étape c : on ajoute la plaque (un seul résultat)
SELECT p.nom, pc.immatriculation
FROM personne p
JOIN salle_sport_membre m ON m.personne_id = p.id
JOIN salle_sport_passage s ON s.membre_id = m.id
JOIN permis_conduire pc ON pc.id = p.permis_id
WHERE m.id LIKE '48Z%' AND m.statut_abonnement = 'or'
  AND s.date_passage = 20180109
  AND pc.immatriculation LIKE '%H42W%';
```

Résultat attendu à l'étape c : **Jeremy Boivin**. **Tous** les indices sont nécessaires : la base contient volontairement des personnes qui correspondent à presque tout.

### 5. Valider

```sql
INSERT INTO solution VALUES (1, 'Jeremy Boivin');
SELECT valeur FROM solution;
```

La base vous félicite… et vous dit que l'enquête continue : lisez l'interrogatoire de Jeremy Boivin (même requête qu'à l'étape 3 avec son nom). Il décrit la femme qui l'a payé. À vous de traduire ces nouveaux indices en conditions. Le seul piège : « trois fois au concert » demande de **compter** les participations par personne :

```sql
SELECT p.nom, COUNT(*) AS participations
FROM personne p
JOIN evenement_participation e ON e.personne_id = p.id
WHERE e.nom_evenement = 'Concert Symphonique SQL'
  AND e.date BETWEEN 20171201 AND 20171231
GROUP BY p.id
HAVING COUNT(*) = 3;
```

Il reste à combiner avec la description physique et la voiture (dans `permis_conduire`). Si vous bloquez, la solution complète est dans la section suivante.

::: tip Point de contrôle
Vous avez validé les deux noms de la première histoire et vous savez expliquer chaque `JOIN`. Vous êtes prêt pour les autres enquêtes, sans pas-à-pas cette fois.
:::

## Enquêtes suivantes : indices et solutions

Les autres enquêtes sont à faire seul. Essayez d'abord sans rien ouvrir ; si vous bloquez, dépliez les indices dans l'ordre, la solution complète vient en dernier.

### Le meurtre de SQL Ville

<!--@include: ../public/sqlite/enquete/solutions/meurtre.md-->

### Le braquage du SQL Express

<!--@include: ../public/sqlite/enquete/solutions/sql_express.md-->

### La formule du professeur Noside

<!--@include: ../public/sqlite/enquete/solutions/formule.md-->

### Panique à la septième séance

<!--@include: ../public/sqlite/enquete/solutions/septieme_seance.md-->

### Menace sur Nova City

<!--@include: ../public/sqlite/enquete/solutions/nova_city.md-->

### L'Infiltré de Little Italy

<!--@include: ../public/sqlite/enquete/solutions/little_italy.md-->

## Pour aller plus loin

- Résolvez la dernière étape d'une histoire en **une seule requête** (toutes les jointures d'un coup).
- Listez **tous** les habitants qui correspondent à un indice mais pas aux autres : ce sont les fausses pistes que la base a glissées exprès.
- Réécrivez l'une de vos requêtes finales en PHP avec PDO et une requête préparée, en passant la date et le type de crime en paramètres.

## Conclusion

En jouant, vous avez :

- exploré une base inconnue en partant de son schéma ;
- enchaîné filtres, jointures et agrégats pour passer de 10 000 habitants à un seul nom ;
- vu que chaque indice correspond à une condition SQL, et qu'une condition manquante laisse toujours plusieurs suspects.

👋 Si vous avez des questions, n'hésitez pas. Et si vous avez résolu toutes les histoires, venez me voir : j'en ai peut-être une autre pour vous.
