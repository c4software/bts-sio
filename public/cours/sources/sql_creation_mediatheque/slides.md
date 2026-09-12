# La médiathèque

## Les compétences du TP

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Aujourd'hui, vous héritez

Jusqu'ici, vous conceviez vos bases. Aujourd'hui, je vous en fournis une.

C'est la situation la plus courante en entreprise : le projet existe déjà.

---

## Lire un schéma : par où commencer ?

Quatre tables, aucune documentation. Question : que regarde-t-on en premier ?

Les **clés étrangères**. `emprunts.livre_id` et `emprunts.adherent_id` vous disent qu'un emprunt relie **un livre** et **un adhérent**. Le reste, ce sont des détails.

---

## Un livre est-il disponible ?

Il n'y a aucune colonne `disponible` dans la table `livres`.

Question : comment répond-on, alors ?

---

## La réponse est dans les emprunts

```sql
SELECT * FROM emprunts
WHERE livre_id = ? AND date_retour IS NULL;
```

Aucun résultat, le livre est disponible.

L'information n'est pas stockée, elle se **déduit**.

---

## Jointure ou deux requêtes ?

Afficher le titre **et** le nom de l'emprunteur : une requête avec `JOIN`, ou deux requêtes simples ?

Les deux sont valables. Élégance d'un côté, lisibilité de l'autre.

Sachez justifier votre choix.

---

## Compter par groupe

```sql
SELECT categories.nom, COUNT(livres.id) AS nb
FROM categories
LEFT JOIN livres ON livres.categorie_id = categories.id
GROUP BY categories.id;
```

`GROUP BY` fait les paquets, `COUNT()` compte dedans.

---

## Pourquoi LEFT ?

Question : avec un `JOIN` classique, qui disparait de la liste ?

---

## Ceux qui n'ont rien

Une catégorie sans livre, un adhérent sans emprunt : ils sortent du résultat.

`LEFT JOIN` garde toute la table de gauche, et `COUNT()` renvoie 0.

Dans 90% des cas, c'est un `LEFT JOIN` que vous cherchez.

---

## Requête préparée, toujours

Une valeur qui vient de l'utilisateur (`$_GET`, `$_POST`) ne se concatène **jamais**.

```php
$stmt = $pdo->prepare("SELECT * FROM livres WHERE id = ?");
$stmt->execute([$_GET['id']]);
```

C'est le critère bloquant du TP.

---

## INSERT, UPDATE, DELETE

Emprunter : `INSERT`. Rendre : `UPDATE` de `date_retour`. Retirer un livre : `DELETE`. Et le `WHERE` n'est jamais optionnel.

Supprimer un livre déjà emprunté ? MySQL refuse : la clé étrangère **protège** vos données.

Question : interdire, supprimer en cascade, ou ne pas proposer le bouton ?

---

## Le programme

En séance : explorer la base, les catégories, les livres, la fiche, la recherche.

À la maison : les adhérents, l'emprunt, le retour, l'ajout, la suppression.

En autonomie : protéger les pages qui modifient la base.

---

## Récapitulatif

- On hérite d'une base : on lit d'abord les clés étrangères.
- La disponibilité se déduit, elle ne se stocke pas.
- `LEFT JOIN` + `GROUP BY` + `COUNT()` pour les compteurs.
- Valeur utilisateur = requête préparée, sans exception.

---

## Des questions ?

Place au TP 🚀
