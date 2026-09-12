---
description: "Complément de cours : accéder à une base de données depuis PHP avec PDO (connexion, lecture, requêtes préparées, INSERT, UPDATE, DELETE)."
---

# PHP et la base de données : en plus du cours

Ce document est un complément du cours. Il vous permettra de revenir, à votre rythme, sur la façon dont **PHP** discute avec une base de données.

::: details Sommaire
[[toc]]
:::

Soyons clairs dès le début sur ce que vous trouverez ici, et sur ce que vous n'y trouverez pas :

- **Ce que couvre ce document** : l'accès à la base **depuis PHP**. La connexion avec PDO, la lecture des données, les requêtes préparées, l'ajout, la modification et la suppression de lignes, et l'endroit où ranger ce code dans votre projet.
- **Ce qu'il ne couvre pas** : la modélisation (MCD, MLD, cardinalités, clés) et le langage SQL lui-même. Ça, c'est **votre cours de base de données**, avec votre enseignant de base de données.

Autrement dit : ici, on suppose que la requête SQL vous est connue (ou fournie), et on apprend à la **jouer depuis PHP**.

::: tip Le mémo des 6 requêtes, pour mémoire et pas pour apprendre
Vous les avez vues en cours de base de données. Elles sont là uniquement pour que vous ne bloquiez pas pendant un TP PHP.

```sql
-- 1. Tout lire
SELECT * FROM phrases;

-- 2. Filtrer
SELECT * FROM phrases WHERE nombre > 10;

-- 3. Trier
SELECT * FROM phrases ORDER BY date_creation DESC;

-- 4. Limiter (les 5 dernières)
SELECT * FROM phrases ORDER BY id DESC LIMIT 5;

-- 5. Ajouter
INSERT INTO phrases (phrase, nombre) VALUES ('Je ne ferai plus de bêtises', 10);

-- 6. Modifier, puis supprimer
UPDATE phrases SET nombre = 20 WHERE id = 1;
DELETE FROM phrases WHERE id = 1;
```

:::

## Ce que vous avez vu en cours de base de données

Dans la suite de ce document, je considère comme acquis (et je ne les réexpliquerai pas) :

- Ce qu'est une **base**, une **table**, une **ligne**, une **colonne** et un **type** de colonne.
- Ce qu'est une **clé primaire** et une **clé étrangère**, et à quoi elles servent.
- Les requêtes `SELECT`, `INSERT`, `UPDATE`, `DELETE` et leur `WHERE`.
- Le principe d'une **jointure** entre deux tables.

👋 En cas de doute sur l'un de ces points, demandez à votre enseignant de base de données ou relisez votre cours : c'est là que ça s'apprend, et vous y gagnerez du temps.

## PHP et les base de données

PHP sait parler aux bases de données depuis toujours, et il sait le faire avec presque tous les moteurs du marché (MySQL, MariaDB, PostgreSQL, SQLite, Oracle…).

Pour cela, il embarque une API nommée **PDO** (PHP Data Objects). Elle est livrée avec PHP, il n'y a rien à installer, il suffit de l'utiliser.

Pourquoi PDO et pas autre chose ? Parce que vous rencontrerez trois façons de faire en cherchant sur Internet :

- `mysql_*` : **supprimé** de PHP depuis des années. Si un exemple en ligne commence par `mysql_connect`, fermez l'onglet.
- `mysqli` : son remplaçant, correct, mais spécifique à MySQL.
- **PDO** : le même code quel que soit le moteur, et une gestion des requêtes préparées très propre. C'est notre choix par défaut, et le seul que nous utiliserons.

::: tip Attention aux exemples trouvés en ligne
PHP a beaucoup évolué ces dernières années, en particulier sur l'accès aux bases de données. Beaucoup d'exemples que vous croiserez sont obsolètes, voire dangereux. Préférez toujours la [documentation officielle de PDO](https://www.php.net/manual/fr/book.pdo.php).
:::

## PHPMyAdmin

Avant d'écrire la moindre ligne de PHP, vous avez besoin d'un outil pour **regarder** votre base : créer la table, vérifier que votre `INSERT` est bien arrivé, relire le contenu d'une colonne.

Cet outil est livré avec XAMPP, c'est PHPMyAdmin. C'est lui-même un site écrit en PHP, il est donc accessible depuis votre navigateur : [http://localhost/phpmyadmin/](http://localhost/phpmyadmin/)

![PhpMyAdmin](./res/phpmyadmin.png)

Trois choses à savoir repérer, ça suffira pour tous vos TP.

_La liste de vos bases de données, sur la gauche_ :

![Les bases de données](./res/les_bdd.png)

_Le contenu d'une table, au centre, une fois que vous avez cliqué sur son nom_ :

![Le contenu d'une table](./res/le_contenu.png)

_Et deux onglets, en haut_ :

- **Importer** : pour charger un fichier `.sql` que je vous fournis (il crée la base, la table et les données de départ).
- **SQL** : pour coller une requête et l'exécuter immédiatement.

::: tip Votre réflexe de débogage
Votre page PHP n'affiche pas ce que vous attendez ? Ouvrez PHPMyAdmin, onglet **SQL**, et jouez votre requête **à la main**. Vous saurez tout de suite si le problème vient de la requête ou de votre code PHP. C'est le premier réflexe à prendre, il vous fera gagner des heures.
:::

## SQL et PHP

Nous allons maintenant écrire le code qui connecte votre projet à la base. Pour cela, il nous faut quatre informations, et toujours les mêmes :

- L'adresse du serveur de base de données (sur XAMPP : `localhost`).
- Le nom de la base de données.
- L'identifiant de connexion (sur XAMPP : `root`).
- Le mot de passe (sur XAMPP : vide).

Plutôt que de recopier la connexion dans chaque page (et de tout casser le jour où le mot de passe change), nous allons l'écrire **une seule fois**, dans un fichier à part, et l'inclure.

🔥 Cette étape de découpage peut sembler superflue, mais c'est là que se joue votre réussite sur les projets un peu longs.

### utils/db.php

Voilà le fichier complet. Il est générique : dans vos autres projets, seules les quatre premières lignes changeront.

```php
<?php
// Cette partie est à personnaliser
$server = "localhost";
$db = "bart";
$user = "root";
$passwd = "";
// Fin de la partie personnalisable

$dsn = "mysql:host=$server;dbname=$db;charset=utf8mb4";
$pdo = new PDO($dsn, $user, $passwd);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
```

Deux détails qui ont leur importance :

- `charset=utf8mb4` : sans lui, vos accents et vos emojis ressortent en `?` ou en `Ã©`.
- `ERRMODE_EXCEPTION` : sans lui, une requête fautive **échoue en silence** et vous cherchez pendant une heure. Avec lui, PHP vous affiche un message d'erreur clair.

Où l'inclure ? **Une seule fois**, dans votre point d'entrée `index.php`, avant l'include du header :

```php
<?php
ob_start();
include('utils/db.php');
include('common/header.php');
// … le routeur et l'include de la page
```

À partir de là, la variable `$pdo` est disponible dans toutes vos pages, et vous n'avez plus jamais à reparler de connexion.

::: tip Vous venez d'écrire une librairie
Ce fichier est réutilisable tel quel. Copiez-le dans chacun de vos projets qui utilise une base de données, changez les quatre variables du haut, et c'est réglé.
:::

## Obtenir des données

C'est l'opération que vous ferez le plus souvent : demander des lignes, puis les afficher.

```php
$phrases = $pdo->query("SELECT * FROM phrases")->fetchAll(PDO::FETCH_ASSOC);
```

Deux méthodes enchaînées :

- `query()` envoie la requête (à réserver aux requêtes **sans aucune valeur variable**, voir plus bas).
- `fetchAll(PDO::FETCH_ASSOC)` récupère **toutes** les lignes, sous forme de tableaux associatifs.

Et concrètement, `$phrases` contient quoi ? Regardons avec un `print_r($phrases);` :

```text
Array
(
    [0] => Array
        (
            [id] => 1
            [phrase] => Je ne ferai plus de bêtises
            [nombre] => 10
            [date_creation] => 2026-09-12 10:43:28
        )

    [1] => Array
        (
            [id] => 2
            [phrase] => Je rendrai mes devoirs à l'heure
            [nombre] => 5
            [date_creation] => 2026-09-12 10:43:28
        )

)
```

Bonne nouvelle : c'est exactement la structure que vous avez manipulée dans le TP sur les tableaux. Un **tableau de tableaux associatifs**, une ligne de la table par case, le nom de la colonne comme clé. Vous savez donc déjà l'afficher :

```php
<ul>
    <?php foreach ($phrases as $phrase) { ?>
        <li>
            <?php echo htmlspecialchars($phrase['phrase']); ?>
            (<?php echo $phrase['nombre']; ?> fois)
        </li>
    <?php } ?>
</ul>
```

::: tip Pourquoi htmlspecialchars ?
Le contenu de la base a été saisi par un visiteur. S'il a tapé `<script>`, votre page l'exécutera. `htmlspecialchars` transforme ces caractères en texte inoffensif. C'est systématique dès qu'on affiche une donnée qui vient de la base.
:::

**Et si je ne veux qu'une seule ligne ?** Utilisez `fetch()` au lieu de `fetchAll()` :

```php
$stmt = $pdo->prepare("SELECT * FROM phrases WHERE id = ?");
$stmt->execute([$_GET['id']]);
$phrase = $stmt->fetch(PDO::FETCH_ASSOC);
```

Cette fois, `$phrase` est **un seul** tableau associatif : `$phrase['phrase']`, `$phrase['nombre']`, directement.

**Attention au cas « la ligne n'existe pas ».** Si aucune ligne ne correspond, `fetch()` ne renvoie pas un tableau vide mais `false`. Il faut le tester **avant** d'afficher :

```php
if ($phrase === false) {
    echo "<p>Cette phrase n'existe pas.</p>";
} else {
    echo "<h2>" . htmlspecialchars($phrase['phrase']) . "</h2>";
}
```

Sans ce test, vous récolterez un `Warning: Undefined array key` (et une page à moitié cassée) dès qu'un visiteur bricolera l'identifiant dans l'URL.

::: tip Et fetchAll quand il n'y a rien ?
`fetchAll()` est plus gentil : il renvoie un **tableau vide**. Votre `foreach` ne tourne simplement pas. Pour afficher un message, testez `if (count($phrases) === 0)`.
:::

### Gérer de la pagination

Quand la table grossit, vous n'affichez plus tout : vous affichez page par page. Côté SQL, c'est `LIMIT` et `OFFSET`. Côté PHP, le numéro de page arrive par l'URL (`index.php?page=liste&p=2`), c'est donc une valeur variable.

```php
$parPage = 10;
$page = isset($_GET['p']) ? (int) $_GET['p'] : 1;
$offset = ($page - 1) * $parPage;

$stmt = $pdo->prepare("SELECT * FROM phrases ORDER BY id DESC LIMIT :limite OFFSET :debut");
$stmt->bindValue(':limite', $parPage, PDO::PARAM_INT);
$stmt->bindValue(':debut', $offset, PDO::PARAM_INT);
$stmt->execute();
$phrases = $stmt->fetchAll(PDO::FETCH_ASSOC);
```

::: warning Le piège du LIMIT
C'est le seul endroit où l'on n'écrit pas `execute([...])`. Avec `execute()`, PDO envoie les valeurs comme du **texte**, et MySQL refuse `LIMIT '10'` (vous obtenez une jolie « syntax error »). `bindValue(..., PDO::PARAM_INT)` force le type entier et règle le problème.

Notez aussi le `(int)` sur `$_GET['p']` : le numéro de page est un nombre, on s'en assure tout de suite.
:::

Pour afficher les liens « page suivante », il vous faut le nombre total de lignes :

```php
$total = $pdo->query("SELECT COUNT(*) FROM phrases")->fetchColumn();
$nbPages = ceil($total / $parPage);
```

`fetchColumn()` est pratique : il renvoie directement **la valeur** de la première colonne de la première ligne, sans passer par un tableau.

### Obtenir de données de plusieurs tables

Votre enseignant de base de données vous a montré comment écrire une jointure. La bonne nouvelle, c'est qu'il n'y a **rien de nouveau** côté PHP : une jointure est un `SELECT` comme un autre.

```php
$livres = $pdo->query("SELECT livres.titre, auteurs.nom
                       FROM livres
                       LEFT JOIN auteurs ON livres.id_auteur = auteurs.id")
              ->fetchAll(PDO::FETCH_ASSOC);
```

Vous récupérez toujours un tableau de tableaux associatifs, avec une case par colonne demandée :

```php
foreach ($livres as $livre) {
    echo htmlspecialchars($livre['titre']) . " par " . htmlspecialchars($livre['nom']);
}
```

::: tip Deux colonnes du même nom
Si vos deux tables ont chacune une colonne `nom`, PHP n'en gardera qu'une (la dernière écrase la première). La solution est côté SQL : renommez dans le `SELECT` avec `AS`, par exemple `auteurs.nom AS nom_auteur`. Un bon réflexe, même en dehors de ce cas : listez les colonnes voulues plutôt que `SELECT *`.
:::

## Requête préparé ou requête normal ?

Nous avons deux façons d'exécuter une requête avec PDO : la requête « classique » (`query`) et la requête **préparée** (`prepare` puis `execute`). Laquelle choisir ?

La question à vous poser est toujours la même : **est-ce que ma requête contient une valeur variable** (`$_GET`, `$_POST`, `$_SESSION`, une variable calculée) ?

- **OUI** : requête préparée. Toujours. Sans exception.
- **NON** (requête entièrement écrite en dur) : `query()` suffit.

```php
// Requête classique : aucune valeur variable
$phrases = $pdo->query("SELECT * FROM phrases")->fetchAll(PDO::FETCH_ASSOC);

// Requête préparée : l'identifiant vient de l'utilisateur
$stmt = $pdo->prepare("SELECT * FROM phrases WHERE id = ?");
$stmt->execute([$_GET['id']]);
$phrases = $stmt->fetchAll(PDO::FETCH_ASSOC);
```

Le `?` est un **trou** dans la requête. La requête part d'un côté, la valeur de l'autre : le moteur ne confondra jamais les deux.

Vous pouvez aussi nommer les trous, c'est plus lisible dès qu'il y en a plusieurs :

```php
$stmt = $pdo->prepare("SELECT * FROM phrases WHERE nombre >= :nombre");
$stmt->execute([':nombre' => 5]);
$phrases = $stmt->fetchAll(PDO::FETCH_ASSOC);
```

::: danger Pourquoi c'est non négociable
Voilà le code fautif, celui qui concatène :

```php
$id = $_GET['id'];
$phrases = $pdo->query("SELECT * FROM phrases WHERE id = $id")->fetchAll(PDO::FETCH_ASSOC);
```

Un visiteur appelle votre page avec `?id=1 OR 1=1`. Votre serveur exécute alors :

```sql
SELECT * FROM phrases WHERE id = 1 OR 1=1
```

Toute la table ressort. Avec un peu plus d'imagination, c'est la table des utilisateurs et des mots de passe qui ressort. Ça s'appelle une **injection SQL**, et c'est l'une des failles les plus exploitées du web.

Le sujet est traité en détail dans [le complément de sécurité](../securite/support.md#les-requetes-preparees).
:::

## Ajouter des données

Un `INSERT` vient presque toujours d'un formulaire : ses valeurs sont donc variables, et la requête est **préparée**.

```php
$stmt = $pdo->prepare("INSERT INTO phrases (phrase, nombre) VALUES (?, ?)");
$stmt->execute([$_POST['phrase'], $_POST['nombre']]);
```

L'ordre des valeurs dans `execute([...])` suit l'ordre des `?` dans la requête. Une erreur classique est d'inverser deux paramètres : le code fonctionne, mais les données arrivent dans les mauvaises colonnes.

Besoin de l'identifiant de la ligne qui vient d'être créée (pour rediriger vers sa fiche, par exemple) ?

```php
$id = $pdo->lastInsertId();
header("location: index.php?page=phrase&id=$id");
die();
```

## Modifier des données

Même principe, avec `UPDATE`. La ligne à modifier est désignée par son identifiant, dans le `WHERE`, qui est **lui aussi** un `?`.

```php
$stmt = $pdo->prepare("UPDATE phrases SET phrase = ?, nombre = ? WHERE id = ?");
$stmt->execute([$_POST['phrase'], $_POST['nombre'], $_POST['id']]);
```

::: danger Le WHERE n'est pas optionnel
Oubliez le `WHERE` et vous modifiez **toutes** les lignes de la table, d'un coup, sans confirmation et sans retour en arrière.
:::

## Supprimer une donnée

```php
$stmt = $pdo->prepare("DELETE FROM phrases WHERE id = ?");
$stmt->execute([$_GET['id']]);
```

Comment savoir si la suppression a réellement eu lieu ? `rowCount()` vous donne le nombre de lignes touchées par la dernière requête :

```php
if ($stmt->rowCount() === 0) {
    echo "<p>Aucune phrase ne correspond à cet identifiant.</p>";
} else {
    echo "<p>Phrase supprimée.</p>";
}
```

`rowCount()` fonctionne aussi après un `UPDATE` ou un `DELETE` multiple. En revanche, ne comptez pas dessus après un `SELECT` : pour compter des résultats, utilisez `count($phrases)` sur le tableau, ou un `SELECT COUNT(*)`.

::: tip Toujours rediriger après une écriture
Après un `INSERT`, un `UPDATE` ou un `DELETE`, faites un `header("location: ...")` suivi d'un `die()`. Sinon, le visiteur qui rafraichit la page rejoue la requête, et vous vous retrouvez avec des doublons.
:::

## Les erreurs les plus fréquentes

Vous allez les rencontrer, toutes, et probablement dès le premier TP. Pas de panique : chacune a une cause précise.

**`SQLSTATE[42S22]: Column not found: Unknown column 'xxx'`**

Le nom de colonne écrit dans la requête n'existe pas dans la table. Allez vérifier l'orthographe **exacte** dans PHPMyAdmin (`date_creation` et non `dateCreation`, `phrase` et non `phrases`).

**`Warning: Undefined array key "xxx"`**

Vous lisez une clé qui n'est pas dans le tableau. Deux causes possibles : la colonne n'était pas dans votre `SELECT` (méfiance si vous avez listé les colonnes au lieu de `*`), ou bien `fetch()` a renvoyé `false` parce qu'aucune ligne ne correspondait. Un `print_r()` sur le résultat vous donne la réponse en trois secondes.

**Ma requête préparée ne renvoie rien, et pourtant elle marche dans PHPMyAdmin**

Vous avez sans doute oublié le `execute()`, ou vous avez écrit `$pdo->prepare(...)->fetchAll()` directement. `prepare()` ne fait que **préparer** : sans `execute()`, aucune requête n'est envoyée.

**`SQLSTATE[HY000] [1045] Access denied for user 'root'@'localhost'`**

Ce sont les identifiants de `utils/db.php` qui ne conviennent pas. Sur XAMPP, c'est `root` avec un mot de passe **vide**. Si le message parle d'`Unknown database`, c'est le nom de la base qui est faux (ou la base n'a pas été importée).

**Mes accents s'affichent en `Ã©` ou en `?`**

Le `charset=utf8mb4` manque dans votre DSN. Vérifiez aussi que votre page HTML déclare bien `<meta charset="utf-8">`.

**`Call to a member function execute() on bool` ou `$pdo` est `null`**

La variable `$pdo` n'existe pas dans le contexte où vous l'utilisez : l'`include('utils/db.php')` manque, ou bien votre requête est dans une **fonction** (une fonction ne voit pas les variables de l'extérieur, il faut lui passer `$pdo` en paramètre).

## Pratiquer

La base de données vous accompagnera maintenant sur l'ensemble des TP du parcours PHP :

- [TP 2 : Les formulaires](/tp/php/tp2.md), votre première table et votre premier `INSERT`.
- [TP 3 : La structure](/tp/php/tp3.md), avec `utils/db.php` inclus dans le point d'entrée.
- [TP Tableaux](/tp/php/tp-tableaux.md), pour manipuler ce que PDO vous renvoie.
- [TP 4 : La session](/tp/php/tp4.md) et [TP 5 : Protéger des pages](/tp/php/tp5.md), puis sa suite directe [TP Authentification](/tp/php/sql/tp-authentification.md) avec une vraie table d'utilisateurs.
- [TP Création : la TODO List](/tp/php/creation-todo.md).
- [BTS TV administrable](/tp/php/sql/tp6.md) et [TP Création : la médiathèque](/tp/php/sql/creation-mediatheque.md).

::: warning Point étape 3 (TP évalué)
Le parcours est terminé ? Place à la synthèse évaluée : [Évaluation 3 : Le mini catalogue](/tp/php/eval3.md).
:::

👋 Si vous avez des questions, n'hésitez pas.
