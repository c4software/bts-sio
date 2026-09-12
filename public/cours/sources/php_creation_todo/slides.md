# La TODO List

## Les compétences du TP

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Une application, c'est quoi ?

Deux choses seulement :

- Des **données** : ce que l'application connait.
- Des **actions** : ce que l'utilisateur peut faire.

Tout le reste, c'est de l'affichage.

---

## Nos données

Une liste de tâches et une liste de catégories.

Question : où les ranger pour qu'elles survivent à la fermeture du navigateur ?

---

## Dans la base de données

```php
include('utils/db.php');
$tasks = $pdo->query("SELECT * FROM taches")->fetchAll(PDO::FETCH_ASSOC);
```

- Sur le serveur, dans une table.
- Ça survit à la session, au redémarrage, à tout.

---

## Et la session, alors ?

Elle garde l'**état du visiteur** :

- Un message à afficher une fois.
- Connecté ou non.

Jamais les données métier.

---

## Une tâche, c'est une ligne

| id | titre | categorie_id | terminee |
| --- | --- | --- | --- |
| 1 | Réviser | 1 | 0 |
| 2 | Ranger | 2 | 1 |

Une ligne, un `id` donné par la base.

---

## La catégorie est à côté

```sql
FOREIGN KEY (categorie_id) REFERENCES categories(id)
```

La tâche ne connait pas le mot « Cours », elle connait le **numéro** de sa catégorie.

---

## Aller chercher le nom : la jointure

```sql
SELECT taches.*, categories.nom AS categorie
FROM taches
JOIN categories ON categories.id = taches.categorie_id
```

Une ligne de résultat = une tâche **et** le nom de sa catégorie.

---

## Afficher : un foreach

```php
foreach ($tasks as $task) {
    echo $task['titre'];
}
```

`fetchAll()` rend un tableau de tableaux : le TP Tableaux, en vrai.

---

## Une action, c'est quoi ?

- Quelque chose à saisir : un **formulaire**.
- Juste quelque chose à désigner : un **lien**.

```html
<a href="index.php?page=terminer&id=2">Terminer</a>
```

---

## Un lien, une action, une requête

1. Le lien transporte l'`id`.
2. Le serveur vérifie ce qu'il reçoit.
3. Une requête : `UPDATE`, `INSERT` ou `DELETE`.
4. Le serveur **redirige**.

---

## Pourquoi rediriger ?

Sans redirection, un F5 rejoue l'action et insère une deuxième fois.

```php
header('location: index.php?page=home');
die();
```

Les deux lignes, toujours.

---

## Et si id = 42 ?

L'utilisateur écrit ce qu'il veut dans l'URL.

```
index.php?page=terminer&id=42
```

Question : que fait votre requête avec ça ?

---

## Rien du tout

```sql
UPDATE taches SET terminee = 1 WHERE id = 42
```

- Aucune ligne ne correspond, rien n'est modifié.
- On vérifie quand même : `isset()` puis `ctype_digit()`.

---

## Mais si id = 1 OR 1=1 ?

```php
// Jamais, au grand jamais
$pdo->query("... WHERE id = " . $_GET['id']);
```

Question : que devient la requête ?

---

## La requête préparée

```php
$stmt = $pdo->prepare("UPDATE taches SET terminee = 1 WHERE id = ?");
$stmt->execute([$_GET['id']]);
```

Une valeur qui vient de l'utilisateur ne se **concatène** jamais.

---

## Le WHERE, ce détail

```sql
DELETE FROM taches WHERE id = ?
DELETE FROM taches
```

La deuxième vide la table. Sans confirmation.

---

## Le programme

- En séance : la base, l'affichage, ajouter, terminer, supprimer.
- À la maison : les catégories, le filtre, les compteurs.
- En autonomie : modifier une tâche.

---

## Récapitulatif

- Une application = des données + des actions.
- Les données vivent en base, la session ne garde que l'état du visiteur.
- Une tâche est une ligne, avec un `id` qui ne change jamais.
- Une action = un lien ou un formulaire, une requête, puis une redirection.
- Une valeur utilisateur passe toujours par une requête préparée.

---

## Des questions ?

Place au TP 🚀
