# BTS TV administrable

## Les compétences du TP

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Du statique à l'administrable

La liste des vidéos est dans le code. Pour en ajouter une… on modifie le code. 😕

Objectif : les vidéos **en base**, et une page d'admin pour les gérer.

---

## Deux tables reliées

Des vidéos, des utilisateurs pour l'administration.

La liaison entre tables ? Une **clé étrangère**.

Question : quelles cardinalités entre un utilisateur et « ses » vidéos ?

---

## Afficher des données de deux tables

C'est une **jointure** :

```sql
SELECT ... FROM videos
LEFT JOIN ...
```

Rappel : dans 90% des cas, ce que vous cherchez est un `LEFT JOIN`.

---

## Le mot de passe : JAMAIS en clair

Question : que se passe-t-il si votre base fuite avec les mots de passe en clair ?

Stocker : un **hash**. Vérifier : comparer le hash.

Le couple `password_hash()` / `password_verify()` fait tout le travail.

---

## Récapitulatif

- Les données en base, plus dans le code.
- Clé étrangère pour relier, `LEFT JOIN` pour afficher.
- Admin = pages protégées + requêtes préparées.
- Mot de passe : haché, toujours.

---

## Des questions ?

Place au TP 🚀
