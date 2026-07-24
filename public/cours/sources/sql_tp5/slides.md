# Bart et MySQL

## Les compétences du TP

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## La session s'efface, la base persiste

Vos phrases en `$_SESSION` disparaissent avec la navigation.

Question : où un vrai site stocke-t-il ses données pour toujours ?

---

## Modéliser AVANT de coder

Que sauvegarder ? Dans quelle table ? Avec quelles colonnes et quels types ?

Le MLD se dessine **avant** d'ouvrir phpMyAdmin. Papier + crayon suffisent.

⚠️ Toujours une clé primaire.

---

## PDO, le connecteur

```php
$dsn = "mysql:host=$server;dbname=$db";
$pdo = new PDO($dsn, $user, $passwd);
```

Écrit **une fois** dans `utils/db.php`, inclus partout. C'est votre librairie.

---

## Préparée ou classique ?

Une valeur **variable** dans la requête (saisie, paramètre) ?

```php
$stmt = $pdo->prepare("INSERT INTO phrases (texte) VALUES (?)");
$stmt->execute([$phrase]);
```

Question : que risque-t-on en concaténant la saisie dans la requête ?

---

## Récapitulatif

- La base de données = la vraie persistance.
- MLD d'abord, phpMyAdmin ensuite.
- PDO dans `utils/db.php`, inclus partout.
- Valeur variable = requête **préparée**, sans exception.

---

## Des questions ?

Place au TP 🚀
