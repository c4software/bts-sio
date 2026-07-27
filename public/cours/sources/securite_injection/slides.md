# Les injections SQL

## Quand la donnée devient du code

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Une requête, deux mondes

Une requête SQL mélange deux choses :

- Le **code** : `SELECT * FROM users WHERE id =`
- La **donnée** : `42`

Que se passe-t-il si l'utilisateur choisit lui-même la donnée ?

---

## Le code fautif

```php
$id = $_GET['id'];
$sql = "SELECT * FROM users WHERE id = $id";
```

La donnée de l'utilisateur est **collée** directement dans la requête.

---

## Question

Et si je visite la page avec :

```
?id=1 OR 1=1
```

À votre avis, que renvoie la requête ?

---

## Toute la table 🚨

```sql
SELECT * FROM users WHERE id = 1 OR 1=1
```

`1=1` est toujours vrai : la base renvoie **tous** les utilisateurs.

---

## La vraie cause

On a laissé l'utilisateur **écrire du SQL**.

Sa donnée a été interprétée comme du code.

---

## La solution : la requête préparée

```php
$sql = "SELECT * FROM users WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id]);
```

Le `?` est un **emplacement** : la donnée n'est jamais mélangée au code.

---

## Un faux ami

```php
$sql = "SELECT * FROM users WHERE id = $id";
$pdo->prepare($sql)->execute();
```

Est-ce protégé ? La requête est bien « préparée »…

---

## Non !

La donnée a **déjà** été collée dans la chaîne avant le `prepare`.

Préparer une requête déjà concaténée ne protège de rien.

---

## La règle

Un placeholder `?` :

- n'est **jamais** entre guillemets (`'?'` ne marche pas) ;
- n'est **jamais** collé à la main dans la chaîne.

C'est `execute([...])` qui apporte la donnée.

---

## Récapitulatif

- Une injection SQL, c'est une donnée interprétée comme du **code**.
- Ne **jamais** concaténer une saisie dans une requête.
- Toujours une **requête préparée** : `?` + `execute([...])`.
- Préparer une chaîne déjà concaténée ne protège pas.

---

## Des questions ?

Place au TP 🚀
