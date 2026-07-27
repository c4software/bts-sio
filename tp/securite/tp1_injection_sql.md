---
description: "Premier TP de la série sécurité : comprendre, repérer et corriger les injections SQL en observant et en réparant du code PHP vulnérable."
---

# TP 1 : Les injections SQL

::: details Sommaire
[[toc]]
:::

Bienvenue dans la série de TP consacrée à la sécurité des applications Web. Nous allons suivre les grandes catégories de failles de l'[OWASP](/cours/securite_applications), celles que vous devez savoir reconnaître et corriger pour l'examen.

Le principe de ces TP est toujours le même : **observer** du code, **le tester**, comprendre **pourquoi** il est vulnérable, puis **le corriger**. Vous n'allez pas attaquer de vrais sites, vous allez jouer le rôle du développeur qui reçoit un rapport d'audit et doit réparer.

On commence par la faille la plus emblématique : l'**injection SQL**.

## Les slides

Avant de mettre les mains dans le code, un tour rapide de la notion : comment une simple donnée peut devenir du code exécuté par la base.

<ClientOnly>
<SlidesDeck src="securite_injection" />
</ClientOnly>

## Prérequis

- Avoir suivi les TP PHP et SQL (requêtes, `PDO`).
- De quoi tester du PHP : votre environnement habituel, ou mentalement en lisant le code (l'essentiel est le raisonnement).

::: details Un rappel sur PDO ?
`PDO` est l'objet PHP qui dialogue avec la base de données. Deux façons d'exécuter une requête :

```php
// Directement (dangereux si on y colle une saisie)
$pdo->query("SELECT * FROM users");

// Préparée (une requête + des données séparées)
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$id]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
```
:::

## Objectifs

À la fin de ce TP vous saurez :

- Expliquer ce qu'est une injection SQL et pourquoi elle est dangereuse.
- Repérer une requête vulnérable dans du code PHP.
- Corriger la faille avec une requête préparée.
- Démasquer les « fausses protections » qui n'en sont pas.

## Le principe en une phrase

Une injection SQL survient quand une **donnée** fournie par l'utilisateur est **interprétée comme du code** SQL. La cause est presque toujours la même : on a **collé** (concaténé) une saisie directement dans une requête.

## Exercice 1 : la faille de base (observer et corriger)

L'auditeur a trouvé une faille d'injection SQL. Voici le code de la page qui affiche un utilisateur :

```php
<?php
$id = $_GET['id'];
$request = "SELECT * FROM users WHERE id = $id";
$result = $pdo->query($request);
$user = $result->fetch(PDO::FETCH_ASSOC);
?>

<div class="container">
    <h1>Fiche utilisateur</h1>
    <ul>
        <li>Nom : <?= $user['name'] ?></li>
        <li>Email : <?= $user['email'] ?></li>
    </ul>
</div>
```

La page est appelée avec `fiche.php?id=1`.

Commençons par **observer**. Répondez d'abord dans votre tête (ou sur papier) avant d'ouvrir les aides.

::: details Question : quelle est la donnée que l'utilisateur contrôle ?
Le paramètre `id` de l'URL. Rien n'empêche l'utilisateur d'y mettre autre chose qu'un nombre : c'est **lui** qui décide de son contenu.
:::

::: details Question : que renvoie la page avec `fiche.php?id=1 OR 1=1` ?
La requête devient :

```sql
SELECT * FROM users WHERE id = 1 OR 1=1
```

`1=1` est toujours vrai, la condition `WHERE` ne filtre plus rien : la base renvoie **tous** les utilisateurs. Un attaquant plus avancé irait plus loin (`UNION SELECT` pour lire d'autres tables, mots de passe compris).
:::

Vous avez identifié le problème : la donnée `$id` est **collée** dans la requête. À vous de la corriger avec une requête préparée.

::: tip Point de contrôle
Avec votre correction, `?id=1 OR 1=1` ne doit plus renvoyer qu'un seul utilisateur (ou aucun), car `1 OR 1=1` n'est plus une donnée valide pour une comparaison sur `id`.
:::

::: details Voir l'une des solutions possibles
```php
<?php
$id = $_GET['id'];
$request = "SELECT * FROM users WHERE id = ?";
$stmt = $pdo->prepare($request);
$stmt->execute([$id]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
?>
```

Le `?` est un **emplacement** : la valeur de `$id` est transmise séparément à `execute()`. La base ne l'interprète jamais comme du SQL, quoi que l'utilisateur ait tapé.
:::

## Exercice 2 : le faux ami (observer et expliquer)

Un développeur a « corrigé » la faille précédente. Il est fier de lui : il a utilisé `prepare()`. Observez son code :

```php
<?php
$id = $_GET['id'];
$request = "SELECT * FROM users WHERE id = $id";
$pdo->prepare($request)->execute();
$user = $pdo->fetch(PDO::FETCH_ASSOC);
?>
```

La requête est bel et bien « préparée ». Pourtant l'auditeur maintient que la faille est toujours là.

::: details Question : pourquoi ce code reste-t-il vulnérable ?
Parce que la donnée a été **collée dans la chaîne avant** le `prepare()`. Au moment où la requête est préparée, `$id` fait déjà partie du texte SQL : `id = 1 OR 1=1` est déjà écrit. Préparer une requête déjà concaténée ne protège de rien.

La règle : le `?` (ou un paramètre nommé) doit **remplacer** la donnée dans la requête, la donnée n'arrivant qu'au moment de `execute([...])`.
:::

::: details Question : y a-t-il une autre erreur dans ce code ?
Oui, un bug qui n'a rien à voir avec la sécurité mais qui empêche le code de fonctionner : `$pdo->fetch(...)`. La méthode `fetch()` s'appelle sur le **statement** (le résultat de `prepare`), pas sur l'objet `$pdo`. Il faut récupérer le statement dans une variable.
:::

À vous de proposer une version réellement corrigée, qui fonctionne **et** qui protège.

::: details Voir l'une des solutions possibles
```php
<?php
$id = $_GET['id'];
$request = "SELECT * FROM users WHERE id = ?";
$stmt = $pdo->prepare($request);
$stmt->execute([$id]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
?>
```
:::

## Exercice 3 : la recherche multi-bugs (tester et corriger)

Cette fois, l'attaque a été repérée dans les logs. Observez cette ligne :

```
192.168.1.4 - - [10/Oct/2024:13:55:36] "GET /search.php?q=demo' OR '1'='1 HTTP/1.0" 200 512
```

Le paramètre `q` contient une apostrophe et un morceau de condition SQL : le signe d'une tentative d'injection. Voici le code de `search.php` :

```php
<?php
$query = $_GET['query'];
echo "Résultat de la recherche pour $query";
$pdo->prepare("SELECT * FROM articles WHERE title LIKE '%?%'");
$pdo->execute([$query]);
$result = $pdo->fetchAll(PDO::FETCH_ASSOC);

foreach ($result as $article) {
    echo "<h2>$article['title']</h2>";
    echo "<p>$article['content']</p>";
}
?>
```

Ce code cumule **plusieurs** problèmes. Prenez le temps de les lister avant de corriger.

::: details Question : combien de problèmes voyez-vous ?
Au moins trois, dont deux qui empêchent carrément le code de fonctionner :

1. **Le placeholder est entre guillemets** : `'%?%'`. Un `?` entre quotes n'est pas un emplacement, c'est le caractère point d'interrogation. La liaison de paramètre échoue.
2. **`execute` et `fetchAll` sont appelés sur `$pdo`** au lieu du statement retourné par `prepare()`. Comme dans l'exercice 2.
3. **`"<h2>$article['title']</h2>"`** provoque une erreur de syntaxe PHP : on ne peut pas écrire `$article['title']` avec des quotes simples à l'intérieur d'une chaîne entre guillemets sans accolades.

Et un quatrième, côté affichage : le contenu de l'article est réaffiché sans échappement (on en reparle au [TP 2 sur les XSS](./tp2_xss.md)).
:::

::: tip Point de contrôle
Pour un `LIKE`, le placeholder ne prend **pas** de `%` autour de lui dans la requête : on met le `?` seul, et on ajoute les `%` **dans la donnée** passée à `execute()`.
:::

::: details Voir l'une des solutions possibles
```php
<?php
$query = $_GET['query'];
echo "Résultat de la recherche pour " . htmlspecialchars($query);

$stmt = $pdo->prepare("SELECT * FROM articles WHERE title LIKE ?");
$stmt->execute(['%' . $query . '%']);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($result as $article) {
    echo "<h2>" . htmlspecialchars($article['title']) . "</h2>";
    echo "<p>" . htmlspecialchars($article['content']) . "</p>";
}
?>
```

Les `%` sont ajoutés à la **donnée** (`'%' . $query . '%'`), pas à la requête. Le `?` reste seul et non quoté. Au passage, on échappe l'affichage avec `htmlspecialchars` : nous verrons pourquoi au TP suivant.
:::

## Exercice 4 : les pièges de l'insertion (observer)

Deux versions d'un même enregistrement d'utilisateur. À vous de dire, pour chacune, si elle est vulnérable, buggée, ou correcte.

**Version A :**

```php
<?php
if (isset($_POST['name']) && isset($_POST['email'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $request = "INSERT INTO users (name, email) VALUES ('$name', '$email')";
    $pdo->exec($request);
}
?>
```

**Version B :**

```php
<?php
if (isset($_POST['name']) && isset($_POST['email'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $request = "INSERT INTO users (name, email) VALUES ('?', '?')";
    $pdo->prepare($request)->execute([$name, $email]);
}
?>
```

::: details Question : que dire de la version A ?
Elle est **vulnérable**. `$name` et `$email` sont concaténés dans la requête. Un `name` valant `', ''); DROP TABLE users; --` illustre le danger. C'est exactement l'erreur des exercices précédents, appliquée à une insertion.
:::

::: details Question : et la version B ?
Le développeur a voulu utiliser des placeholders, mais il les a mis **entre guillemets** : `'?'`. Résultat, la base insère littéralement le caractère `?` dans les colonnes `name` et `email`, et ignore les vraies valeurs. Ce n'est pas une faille de sécurité, mais un **bug** : tous les utilisateurs s'appellent « ? ». C'est le même piège que le `LIKE '%?%'` de l'exercice 3.
:::

À vous d'écrire la version correcte.

::: details Voir l'une des solutions possibles
```php
<?php
if (isset($_POST['name']) && isset($_POST['email'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $request = "INSERT INTO users (name, email) VALUES (?, ?)";
    $pdo->prepare($request)->execute([$name, $email]);
}
?>
```

Les `?` sont **seuls**, sans guillemets. Les valeurs arrivent par `execute([...])`.
:::

## À retenir

- Une injection SQL, c'est une **donnée interprétée comme du code**.
- La cause est toujours la **concaténation** d'une saisie dans une requête.
- La correction est toujours la même : une **requête préparée**, `?` + `execute([...])`.
- Un placeholder n'est **jamais** entre guillemets (`'?'`) ni collé à la main dans la chaîne.
- Préparer une requête **déjà concaténée** ne protège de rien (le faux ami).

## Conclusion

Vous savez maintenant repérer et corriger la première grande faille de l'OWASP. Dans ce TP vous avez appris à :

- Observer une requête et repérer une concaténation dangereuse.
- Corriger avec une requête préparée.
- Distinguer une vraie protection d'un faux ami.

On enchaîne avec une faille tout aussi courante, cette fois côté navigateur : les [failles XSS (TP 2)](./tp2_xss.md).
