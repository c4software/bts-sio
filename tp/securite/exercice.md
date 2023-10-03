# Exercices OWASP

Vous êtes en charge de la sécurité d'une application Web. Pour améliorer la sécurité, votre responsable a commandé un audit de sécurité. L'auditeur a trouvé plusieurs failles de sécurité. Vous devez corriger ces failles.

Votre application est composée de HTML, CSS, Javascript et PHP.

La suite de l'exercice vous demandera d'identifier les failles de sécurité et de les corriger.

## Faille 1

L'auditeur a trouvé une faille de type XSS (Cross Site Scripting). Il a réussi à afficher une boîte de dialogue sur le navigateur de l'utilisateur.

Le code source ou la faille se trouve est le suivant :

```php
<?php
if (isset($_POST['name']) && isset($_POST['email'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    echo "<h2>Bonjour $name</h2>";
    echo "<p>Votre email est $email</p>";
}
?>
<div class="container">
    <h1>Exercice 1</h1>
    <p>Vous devez corriger la faille XSS</p>
    <form action="index.php" method="post">
        <div class="form-group">
            <label for="name">Nom</label>
            <input type="text" class="form-control" id="name" name="name" placeholder="Nom">
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" name="email" placeholder="Email">
        </div>
        <button type="submit" class="btn btn-primary">Envoyer</button>
    </form>
</div>
```

::: tip Rappel

Filtrer les entrées utilisateur avec la fonction `htmlspecialchars()`. Cette fonction permet de convertir les caractères spéciaux en entités HTML.

Exemple :

```php
// Échappe les caractères spéciaux. C'est à dire que les caractères spéciaux seront convertis en entités HTML.
$name = htmlspecialchars($_POST['name']);
```

Autre solution, utiliser la fonction `strip_tags()`. Cette fonction permet de supprimer les balises HTML.

Exemple :

```php
// Supprime les balises HTML
$name = strip_tags($_POST['name']);
```

:::

Proposez une solution pour corriger cette faille.

## Faille 2

L'auditeur a trouvé une faille de type Injection SQL. Il a réussi à afficher les données de la base de données.

Le code source ou la faille se trouve est le suivant :

```php
<?php

$request = "SELECT * FROM users WHERE id = " . $_GET['id'];
$result = $pdo->query($request);
$user = $result->fetch(PDO::FETCH_ASSOC);
?>

<div class="container">
    <h1>Exercice 2</h1>
    <p>Vous devez corriger la faille d'injection SQL</p>
    <p>Voici les informations de l'utilisateur</p>
    <ul>
        <li>Nom : <?= $user['name'] ?></li>
        <li>Email : <?= $user['email'] ?></li>
    </ul>
</div>

<p>
    Voici la liste des utilisateurs :
</p>

-  <a href="index.php?id=1">Utilisateur 1</a>
-  <a href="index.php?id=2">Utilisateur 2</a>

```

Proposez une solution pour corriger cette faille.

## Faille 3

L'auditeur a trouvé une faille de type CSRF (Cross Site Request Forgery). Il a réussi à modifier les données de l'utilisateur.

Le code source ou la faille se trouve est le suivant :

```php

<?php
if(isset($_GET['id'])) {
    $request = "DELETE FROM user WHERE id = ?";
    $pdo->prepare($request)->execute([$_GET['id']]);
}
?>

<div class="container">
    <h1>Exercice 3</h1>
    <p>Vous devez corriger la faille CSRF</p>
    <p>Voici la liste des utilisateurs :</p>
    <ul>
        <li>Utilisateur 1 <a href="index.php?id=1">Supprimer</a></li>
        <li>Utilisateur 2 <a href="index.php?id=2">Supprimer</a></li>
    </ul>
</div>
```

::: tip Rappel

Le principe de la faille CSRF est de faire une requête à l'insu de l'utilisateur. Pour cela, il faut que l'utilisateur soit connecté à votre application. Ensuite, vous devez faire une requête à l'insu de l'utilisateur.

Pour corriger cette faille, vous devez ajouter un token dans le formulaire (ou en SESSION). Ce token doit être généré aléatoirement et doit être vérifié lors de l'accès à la page.

```php
// Génère un token aléatoire
$_SESSION['token'] = bin2hex(random_bytes(32));

// Vérifier le token
if (isset($_POST['token']) && $_POST['token'] === $_SESSION['token']) {
    // Le token est valide, nous pouvons traiter la requête
    // ...
}
```
:::

Proposez une solution pour corriger cette faille.

## Faille 4

L'auditeur a trouvé une faille de type Inclusion de fichier. Il a réussi à afficher le contenu du fichier `config.php`.

Le code source ou la faille se trouve est le suivant :

```php

<?php
include $_GET['page'] . '.php';

// Exemple : index.php?page=config
?>
```

::: tip Rappel

Pour corriger cette faille, vous devez limiter les fichiers qui peuvent être inclus. Par exemple, vous pouvez créer un tableau avec les fichiers autorisés.

:::

Proposez une solution pour corriger cette faille.

## Faille 5

L'auditeur a trouvé une faille de type bruteforce. 

Le code source ou la faille se trouve est le suivant :

```php
<?php

if (isset($_POST['password'])) {
    $password = $_POST['password'];
    if ($password === '123456') {
        echo "<p>Vous êtes connecté</p>";
    } else {
        echo "<p>Mot de passe incorrect</p>";
    }
}

?>

<form method="post">
    <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" class="form-control" id="password" name="password" placeholder="Mot de passe">
    </div>
    <button type="submit" class="btn btn-primary">Envoyer</button>
</form>
```

::: tip Rappel

Pour corriger cette faille, plusieurs solutions sont possibles :

- Limiter le nombre de tentatives de connexion (par exemple 3 tentatives).
- Ajouter un token CSRF dans le formulaire. (voir faille 3)
- Ajouter un délai entre chaque tentative de connexion. (exemple : 1 seconde)

L'objectif est de limiter le nombre de tentatives de connexion. L'objectif est de ralentir l'attaque brute force.

:::

Proposez une solution pour corriger cette faille.

## Faille 6

L'attaquant a trouvé une faille de type manque de contrôle d'accès. Il a réussi à accéder à une page qui n'est pas accessible aux utilisateurs.

Le code source ou la faille se trouve est le suivant :

```php

// Routeur de l'application

<?php

Route::get('/', 'HomeController@index');
Route::get('/admin', 'AdminController@index');
// …
Route::get('/admin/users', 'UserController@index');

```

Proposez une solution pour corriger cette faille.

## Faille 7

Identifiez les failles de sécurité dans le code source suivant :

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

Proposez une solution pour corriger cette faille.

## Faille 8

Identifiez les failles de sécurité dans le code source suivant :

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

Proposez une solution pour corriger cette faille.

## Faille 9

Identifiez les failles de sécurité dans le code source suivant :

```php

<?php

echo "<h2>Bonjour $_GET['name']</h2>";

?>
```

L'utilisateur accède à la page avec l'URL suivante : `http://localhost:8000/index.php?name=John`

Proposez une solution pour corriger cette faille. Expliquez en quoi cette faille est dangereuse.


## Faille 10

L'auditeur a trouvé une faille de type XSS Stockée. Il a réussi à afficher une boîte de dialogue sur le navigateur des personnes visitant le site.

Le code source ou la faille se trouve est le suivant :

Page affichant les commentaires :

```php
<?php
// Récupère les commentaires
$request = "SELECT * FROM comments";
$comments = $pdo->query($request)->fetchAll(PDO::FETCH_ASSOC);

// Ajout d'un commentaire
if (isset($_POST['content'])) {
    $content = $_POST['content'];
    $request = "INSERT INTO comments (content) VALUES (?)";
    $pdo->prepare($request)->execute([$content]);
}
?>

<div class="container">
    <h1>Exercice 10</h1>
    <p>Vous devez corriger la faille XSS Stockée</p>
    <p>Voici les commentaires :</p>
    <ul>
        <?php foreach ($comments as $comment): ?>
            <li><?= $comment['content'] ?></li>
        <?php endforeach; ?>
    </ul>
</div>

<!-- Ajout d'un commentaire -->
<form>
    <div class="form-group">
        <label for="content">Commentaire</label>
        <textarea class="form-control" id="content" name="content" rows="3"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Envoyer</button>
</form>
```

Proposez une solution pour corriger cette faille. Deux solutions sont possibles.