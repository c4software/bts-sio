---
description: Aide mémoire sur le SQL. Vous retrouverez dans cet aide mémoire les éléments que nous avons vus ensemble.
---

# Aide mémoire SQL

Aide mémoire sur le SQL. Vous retrouverez dans cet aide mémoire les éléments que nous avons vus ensemble.

::: warning
Cet aide mémoire n'est pas exhaustif, il ne contient que le minimum à connaitre pour débuter sereinement.  
:::

| Catégorie                | Mot-clé                                         | Usage                                      |
| ------------------------ | ----------------------------------------------- | ------------------------------------------ |
| Définition d'une base    | `CREATE`, `ALTER`, `TRUNCATE`, `DROP`, `RENAME` | Structure de la base                       |
| Manipulation des données | `INSERT`, `UPDATE`, `DELETE`, `MERGE`           | Gestion des données en base                |
| Transaction              | `COMMIT`, `ROLLBACK`                            | Groupement d'opérations                    |
| Contrôle d'accès         | `GRANT`, `REVOKE`                               | Droit d'accès aux données                  |
| Accès aux données        | `SELECT`                                        | Récupération d'enregistrements de table(s) |

## Obtenir des données depuis _une table_

```sql
SELECT quoi FROM votreTable WHERE condition(s);
```

- `quoi` : Ce que vous souhaitez obtenir, `*` pour l'ensemble, sinon `nom_colonne` séparé par des virgules.
- `votreTable` : La table que vous souhaitez requêter.
- `condition(s)` : La ou les condition(s) que vous souhaitez appliquer à votre récupération de données.

```sql
-- Toutes les données de la table « t »
SELECT * FROM t;

-- Colonne « nom » et « age » pour l'ensemble des données de la table « t »
SELECT nom, age FROM t;

-- Toutes les données de la table « t » respectant la condition
SELECT * FROM t WHERE CONDITION;

-- Dans la table « t » récupération de l'ensemble des enregistrements dont la colonne « age » est plus grande que 18.
SELECT * FROM t WHERE age > 18;

-- Dans la table « t » récupération de l'ensemble des enregistrements dont la colonne « age » est plus grande que 18 et ayant comme « country » FRA.
SELECT * FROM t WHERE age > 18 AND country = 'FRA';

-- Calcul de l'âge moyen.
SELECT avg(age) FROM t;

-- Récupération des données triées
SELECT * FROM t ORDER BY age ASC;
-- Ou
SELECT * FROM t ORDER BY age DESC;

-- Pagination des résultats
SELECT * FROM t ORDER BY c1 LIMIT 10 OFFSET 0; -- 10 premiers résultats
SELECT * FROM t ORDER BY c1 LIMIT 10 OFFSET 10; -- 10 suivants etc
SELECT * FROM t ORDER BY c1 LIMIT 10 OFFSET 20; -- etc

-- Retourne la liste dédoublonnée des pays présents dans t.
SELECT DISTINCT pays FROM t;

-- Compter et Grouper, Affiche la répartition des utilisateurs par age.
SELECT COUNT(id), age FROM t GROUP BY age;

-- Compter et Grouper, Affiche uniquement les âges regroupant plus de 5 utilisateurs.
SELECT COUNT(id), age FROM utilisateurs GROUP BY age HAVING COUNT(id) > 5;
```

::: tip WHERE ou HAVING ?
`WHERE` filtre les lignes **avant** le regroupement, `HAVING` filtre les groupes **après** l'agrégation. Pour filtrer sur une colonne simple (comme `age > 18`), utilisez `WHERE`. Réservez `HAVING` aux conditions portant sur un agrégat (`COUNT`, `AVG`, `SUM`, etc.).
:::

## Obtenir des données depuis _plusieurs tables_

![SQL Join](./sql_join.png)

```sql
-- Inner join t1 and t2
SELECT c1, c2
FROM t1
INNER JOIN t2
ON t1.id = t2.id;

-- Left join t1 and t2
SELECT c1, c2
FROM t1
LEFT JOIN t2
ON t1.id = t2.id;

-- Right join t1 and t2
SELECT c1, c2
FROM t1
RIGHT JOIN t2
ON t1.id = t2.id;

-- full outer join
SELECT c1, c2
FROM t1
FULL OUTER JOIN t2
ON t1.id = t2.id;
```

::: tip LEFT, RIGHT, INNER ?

Dans 90% du temps vous cherchez à faire un LEFT JOIN.

_Exemple :_

```sql
SELECT *
FROM videos
LEFT JOIN users
ON videos.userId = users.id; -- Join la clé étrangère userId avec la clé primaire id de la table users.
```

**Vous obtiendrez avec cette requête les données de la table vidéos avec en plus les informations de l'utilisateur associé.**

:::

## Gestion des données

### Ajout

```sql
-- Ajout de certains champs
INSERT INTO utilisateurs (nom, prenom, age) VALUES ('Test', 'Insert', 22);

 -- En spécifiant l'ensemble des champs
INSERT INTO utilisateurs VALUES (99,'Test','Insert',12, 'IT');
```

### Mise à jour

```sql
-- Met à jour l'ensemble des enregistrements en base pour la table utilisateurs pour ceux ayant comme nom « Valentin »
UPDATE utilisateurs SET nom = 'valentin-update' WHERE nom = 'Valentin';

-- Idem mais uniquement pour l'utilisateur ayant comme « id » 1
UPDATE utilisateurs SET nom = 'Valentine' WHERE id = 1;
```

::: danger ATTENTION
Attention !!! Si vous oubliez le **WHERE** vous allez modifier l'ensemble des données présentes dans la table (Et aucun retour en arrière possible)
:::

## Suppression

```sql
DELETE FROM utilisateurs WHERE id = 1;
```

::: danger ATTENTION
Attention !!! Si vous oubliez le **WHERE** vous allez vider l'ensemble de la table. (Et aucun retour en arrière possible)
:::

## Mot de passe & Sécurité

::: danger LES MOTS DE PASSE NE DOIVENT PAS ÊTRE EN CLAIR
Vous ne devez **JAMAIS** avoir un mot de passe en clair en base de données.

Vous pouvez par exemple utiliser la fonction SQL `SHA2('VotreMotDePasse-SALT-SECRET', 512)`. Cela génèrera un mot de passe « hashé » équivalent au mot de passe.

Exemple d'insertion :

```sql
INSERT INTO table (user, password) VALUES ('valentin', SHA2('VotreMotDePasse-SALT-SECRET', 512));
```

Exemple de vérification si l'utilisateur existe :

```sql
SELECT * FROM table WHERE user = 'valentin' AND password = SHA2('VotreMotDePasse-SALT-SECRET', 512);
```

S’il y a un résultat, c'est que votre utilisateur existe et a fourni le bon mot de passe.

:::

::: warning POUR COMPRENDRE LE PRINCIPE, PAS POUR LA PRODUCTION
L'exemple `SHA2` avec un sel global est montré ici pour comprendre le principe du hachage. En production, vous devez utiliser un algorithme dédié aux mots de passe (bcrypt ou Argon2, via `password_hash()` en PHP) avec un sel unique par utilisateur. Plus de détails dans [l'aide mémoire OWASP](/cheatsheets/owasp/).
:::

## SQL et PHP ?

PHP intègre nativement le connecteur permettant d'attaquer les bases de données les plus connues, vous avez des exemples [d'utilisations disponibles ici](/cheatsheets/php/#le-php-et-la-base-de-donnees).
