# Les formulaires et la base de données

## Les compétences du TP

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## GET ou POST ?

Deux façons d'envoyer des données au serveur.

Question : votre mot de passe dans l'URL, visible dans l'historique, bonne idée ?

---

## Pour un formulaire : POST

- `GET` : les données sont dans l'URL (`?nom=valentin`).
- `POST` : les données sont dans le corps de la requête.

Pour un formulaire, prenez l'habitude du **POST**.

---

## L'anatomie d'un formulaire

```html
<form method="post" action="bart.php">
  <input type="text" name="phrase" />
  <input type="submit" value="Envoyer" />
</form>
```

- `action` : la page qui **reçoit**.
- `method` : GET ou POST.
- `name` : le nom de la donnée (le plus important !).

---

## Côté serveur

```php
$_POST['phrase']
```

La clé du tableau `$_POST` = l'attribut `name` de l'input.

Et si la page est appelée sans formulaire ? `isset()` et une valeur par défaut.

---

## Et après le rechargement ?

L'utilisateur génère sa punition, il recharge la page…

Question : où sont passées ses données ?

---

## Nulle part !

Chaque chargement repart de zéro : les variables PHP meurent à la fin du script.

Pour garder les données, il faut les **ranger** quelque part.

C'est le rôle de la **base de données**.

---

## Le script SQL

```sql
CREATE TABLE phrases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phrase VARCHAR(255) NOT NULL,
    nombre INT NOT NULL,
    date_creation DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

Fourni, à jouer dans phpMyAdmin. La modélisation, c'est votre cours de base de données.

---

## Se connecter : utils/db.php

```php
$dsn = "mysql:host=$server;dbname=$db;charset=utf8mb4";
$pdo = new PDO($dsn, $user, $passwd);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
```

Écrit **une fois**, inclus dans vos pages. La variable `$pdo` est votre tuyau vers la base.

---

## Lire des données

```php
$punitions = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
```

- `query()` envoie la requête.
- `fetchAll()` récupère toutes les lignes.

On reçoit un **tableau de tableaux associatifs** : une case par ligne, le nom des colonnes comme clés.

Vous savez déjà l'afficher : un `foreach`.

---

## Écrire des données

```php
$stmt = $pdo->prepare("INSERT INTO phrases (phrase, nombre) VALUES (?, ?)");
$stmt->execute([$phrase, $nombre]);
```

Le modèle d'abord, les valeurs ensuite.

---

## Une apostrophe dans la phrase…

« Je n'oublierai pas l'apostrophe »

Question : que devient cette requête ?

```php
"INSERT INTO phrases (phrase) VALUES ('" . $_POST['phrase'] . "')"
```

---

## Jamais de concaténation

Avec la concaténation : la requête casse, ou pire, elle obéit à l'utilisateur (injection SQL).

Avec `prepare` + `execute` : la valeur ne passe **jamais** par l'analyseur SQL.

Valeur variable = requête préparée. Toujours.

---

## Ce que vous allez coder

- `index.php` : le formulaire et les 5 dernières punitions.
- `bart.php` : l'enregistrement puis le tableau.
- `utils/db.php` : la connexion.

---

## Récapitulatif

- Formulaire = POST, `action` + `method` + `name`.
- `$_POST` côté PHP, avec `isset()` pour les cas vides.
- `utils/db.php` inclus une fois, `$pdo` partout.
- `query` + `fetchAll` pour lire, `prepare` + `execute` pour écrire.
- Donnée affichée qui vient de l'utilisateur : `htmlspecialchars`.

---

## Des questions ?

Place au TP 🚀
