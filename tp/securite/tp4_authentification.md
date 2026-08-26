---
description: "Quatrième TP de la série sécurité : mots de passe, bruteforce, CSRF, double authentification et sessions. Le plus complet, avec les solutions détaillées."
---

# TP 4 : Authentification, mots de passe et sessions

::: details Sommaire
[[toc]]
:::

Dernier TP de la série, et le plus complet. On regroupe ici tout ce qui touche à l'**identité** de l'utilisateur : comment on stocke un mot de passe, comment on empêche de le deviner par la force, comment on évite qu'une action soit déclenchée à l'insu de l'utilisateur, et comment on renforce le tout avec une double authentification.

C'est le TP le plus dense, alors les **solutions sont détaillées** à chaque étape. Prenez quand même le temps d'observer et de proposer avant de les ouvrir : c'est ce qui compte pour l'examen.

## Les slides

<ClientOnly>
<SlidesDeck src="securite_authentification" />
</ClientOnly>

## Prérequis

- Avoir suivi les [TP 1](./tp1_injection_sql.md) à [TP 3](./tp3_controle_acces.md).
- Le principe des sessions PHP (`$_SESSION`) et des requêtes préparées.

## Objectifs

À la fin de ce TP vous saurez :

- Stocker et vérifier un mot de passe correctement (`password_hash` / `password_verify`).
- Ralentir une attaque par force brute.
- Protéger un formulaire contre le rejeu et le CSRF avec un jeton.
- Comprendre le rôle de la double authentification (2FA).
- Sécuriser une session : cookies, régénération d'identifiant, secrets.

## Le principe en une phrase

L'authentification, c'est **prouver** son identité. Chaque maillon compte : un mot de passe mal stocké, un formulaire rejouable ou une session mal protégée suffit à tout compromettre.

## Exercice 1 : les mots de passe en clair (corriger)

L'auditeur ouvre la base de données et découvre ceci :

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

::: details Question : quelle est la faille ?
Les mots de passe sont stockés **en clair**. Si la base fuite (injection SQL, sauvegarde volée, employé indélicat), tous les comptes sont exposés d'un coup. Pire : les utilisateurs réutilisant souvent le même mot de passe partout, la fuite compromet aussi leurs comptes sur d'autres sites.
:::

Voici le code d'inscription et de connexion à corriger :

```php
<?php
// Inscription
$username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_SPECIAL_CHARS);
$password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_SPECIAL_CHARS);

$request = "INSERT INTO users (username, password) VALUES (?, ?)";
$pdo->prepare($request)->execute([$username, $password]);
```

```php
<?php
// Connexion
$request = "SELECT * FROM users WHERE username = ?";
$stmt = $pdo->prepare($request);
$stmt->execute([$username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && $password === $user['password']) {
    // Connexion réussie
}
```

::: tip Rappel : hacher, ne pas chiffrer
Un mot de passe se **hache** (transformation à sens unique), il ne se **chiffre** pas (réversible). PHP fournit deux fonctions :

```php
$hash = password_hash($password, PASSWORD_DEFAULT); // à l'inscription
password_verify($password, $hash);                   // à la connexion (true / false)
```

`password_hash` ajoute automatiquement un **sel** aléatoire : deux utilisateurs avec le même mot de passe auront un hash différent.
:::

Avant de corriger, comparez les trois stratégies de stockage et voyez ce qu'un attaquant récupère quand la base fuite :

<ClientOnly>
<AuthLab type="hash" />
</ClientOnly>

À vous de corriger les deux extraits.

::: tip Point de contrôle
Après correction, la colonne `password` ne doit plus contenir de mot de passe lisible mais un hash du type `$2y$10$...`. La connexion ne compare plus deux chaînes, elle appelle `password_verify`.
:::

::: details Voir l'une des solutions possibles
```php
<?php
// Inscription
$username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_SPECIAL_CHARS);
$password = $_POST['password']; // on ne « nettoie » pas un mot de passe, on le hache

$hash = password_hash($password, PASSWORD_DEFAULT);

$request = "INSERT INTO users (username, password) VALUES (?, ?)";
$pdo->prepare($request)->execute([$username, $hash]);
```

```php
<?php
// Connexion
$request = "SELECT * FROM users WHERE username = ?";
$stmt = $pdo->prepare($request);
$stmt->execute([$username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($_POST['password'], $user['password'])) {
    // Connexion réussie
}
```

Détail utile : on n'applique pas `filter_input` sur le **mot de passe**. Le filtrer altérerait des caractères parfaitement légitimes (`<`, `&`, `"`…) et affaiblirait le mot de passe. On le hache tel quel.
:::

## Exercice 2 : le bruteforce (corriger)

L'auditeur signale qu'on peut **rejouer** ce formulaire de connexion autant de fois qu'on veut, sans aucune limite : de quoi tester des milliers de mots de passe.

```html
<form action="/login" method="post">
    <input type="text" name="username" placeholder="Username">
    <input type="password" name="password" placeholder="Password">
    <input type="submit" value="Login">
</form>
```

```php
<?php
$username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_SPECIAL_CHARS);

$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($_POST['password'], $user['password'])) {
    // Connexion réussie
}
```

::: details Question : quelles pistes pour ralentir l'attaque ?
Plusieurs se combinent :

- **Limiter le nombre de tentatives** par utilisateur ou par IP (par exemple 5, puis blocage temporaire).
- **Ajouter un délai** croissant entre les essais.
- Exiger un **mot de passe fort** au départ (allonge le temps d'une attaque).

L'objectif n'est pas de rendre l'attaque impossible, mais **trop lente pour être rentable**.
:::

Lancez l'attaque par dictionnaire ci-dessous, puis activez les protections et relancez : vous verrez l'attaque ralentir, puis échouer.

<ClientOnly>
<AuthLab type="bruteforce" />
</ClientOnly>

À vous de mettre en place une limite simple de tentatives (par exemple en session).

::: details Voir l'une des solutions possibles
```php
<?php
session_start();

$_SESSION['tentatives'] = $_SESSION['tentatives'] ?? 0;

if ($_SESSION['tentatives'] >= 5) {
    die("Trop de tentatives. Réessayez dans quelques minutes.");
}

$username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_SPECIAL_CHARS);

$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($_POST['password'], $user['password'])) {
    $_SESSION['tentatives'] = 0; // succès : on remet le compteur à zéro
    // Connexion réussie
} else {
    $_SESSION['tentatives']++;
    sleep(1); // petit délai pour ralentir
}
```

En production, on préfère limiter aussi **par adresse IP** (un attaquant peut vider ses cookies), avec un vrai mécanisme de rate limiting comme celui fourni par Laravel (`RateLimiter`).
:::

## Exercice 3 : la faille CSRF (corriger)

L'auditeur a réussi, via un simple email, à faire supprimer des utilisateurs par l'administrateur connecté. Voici la page fautive :

```php
<?php
if (isset($_GET['id'])) {
    $request = "DELETE FROM users WHERE id = ?";
    $pdo->prepare($request)->execute([$_GET['id']]);
}
?>

<ul>
    <li>Utilisateur 1 <a href="admin.php?id=1">Supprimer</a></li>
    <li>Utilisateur 2 <a href="admin.php?id=2">Supprimer</a></li>
</ul>
```

::: details Question : comment l'attaque par email fonctionne-t-elle ?
La suppression se déclenche par une simple requête **GET** (`admin.php?id=1`). L'attaquant envoie à l'administrateur un email contenant une image piégée :

```html
<img src="http://votre-site/admin.php?id=1">
```

Quand l'admin (déjà connecté) ouvre l'email, son navigateur charge l'image, donc **exécute la suppression à son insu**. C'est une faille **CSRF** (Cross-Site Request Forgery) : une requête légitime, déclenchée par un tiers.
:::

::: details Question : première règle à corriger ?
Une action qui **modifie** des données ne doit **jamais** se faire en `GET`. Un `GET` doit pouvoir être rejoué sans effet de bord (par un navigateur, un antivirus, un préchargement…). Les suppressions passent en `POST`.
:::

::: tip Rappel : le jeton anti-CSRF
On ajoute dans le formulaire un jeton secret, aléatoire, propre à la session, et on le vérifie côté serveur :

```php
// Génération (à l'affichage du formulaire)
$_SESSION['token'] = bin2hex(random_bytes(32));
```

```html
<input type="hidden" name="token" value="<?= $_SESSION['token'] ?>">
```

Un site tiers ne connaît pas ce jeton : il ne peut donc pas forger la requête.
:::

À vous de corriger : passer en `POST` et vérifier un jeton.

::: details Voir l'une des solutions possibles
```php
<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['token']) || $_POST['token'] !== $_SESSION['token']) {
        die("Requête invalide.");
    }
    $request = "DELETE FROM users WHERE id = ?";
    $pdo->prepare($request)->execute([$_POST['id']]);
}

$_SESSION['token'] = bin2hex(random_bytes(32));
?>

<ul>
    <li>
        Utilisateur 1
        <form method="post" action="admin.php" style="display:inline">
            <input type="hidden" name="token" value="<?= $_SESSION['token'] ?>">
            <input type="hidden" name="id" value="1">
            <button type="submit">Supprimer</button>
        </form>
    </li>
</ul>
```

Deux protections cumulées : l'action est en **POST** (une image ne peut pas la déclencher) **et** protégée par un **jeton** qu'un site tiers ne connaît pas.
:::

## Exercice 4 : la double authentification (observer et intégrer)

Le mot de passe, même haché et protégé du bruteforce, peut être **volé** ailleurs (phishing, réutilisation, fuite d'un autre site). On ajoute donc un **second facteur** : un code à usage unique généré par une application mobile.

On vous fournit une petite librairie `TwoFactorAuth` qui s'utilise ainsi :

```php
$doubleAuth = new TwoFactorAuth("Nom de l'application");
$doubleAuth->setUser($user);
$code = $_POST['code'] ?? null;

if ($doubleAuth->isCodeValid($code)) {
    // Second facteur validé
} else {
    // Demander (ou redemander) le code 2FA
}
```

Voici le code de connexion actuel, qui ne gère **que** le mot de passe :

```php
<?php
$username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_SPECIAL_CHARS);
$user = User::findByLogin($username, $_POST['password']);

if ($user) {
    header('Location: /dashboard');
} else {
    header('Location: /login');
}
die();
```

::: details Question : où intercaler le second facteur ?
Le premier facteur (mot de passe) validé ne doit **pas** ouvrir la session directement. Il faut une étape intermédiaire : si le mot de passe est bon, on demande le code 2FA, et on n'ouvre l'accès au dashboard **qu'après** validation du code.
:::

À vous d'intégrer la 2FA dans ce flux.

::: details Voir l'une des solutions possibles
```php
<?php
$username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_SPECIAL_CHARS);
$user = User::findByLogin($username, $_POST['password']);

if (! $user) {
    header('Location: /login');
    die();
}

// Premier facteur OK : on passe au second
$doubleAuth = new TwoFactorAuth("Mon application");
$doubleAuth->setUser($user);
$code = $_POST['code'] ?? null;

if ($code !== null && $doubleAuth->isCodeValid($code)) {
    session_regenerate_id(true); // nouvelle session après connexion
    $_SESSION['user'] = $user->id;
    header('Location: /dashboard');
} else {
    header('Location: /login?step=2fa'); // on redemande le code
}
die();
```

Le dashboard n'est atteint qu'après **les deux** facteurs. Un bon code 2FA a une **durée de vie courte** et un **usage unique** (invalidé après saisie).
:::

## Pour finir : durcir la session

Trois réflexes qui ne coûtent presque rien et ferment beaucoup de portes.

**Des cookies de session sécurisés :**

```php
setcookie('session', $id, [
    'httponly' => true,   // inaccessible au JavaScript (anti-XSS)
    'secure'   => true,   // envoyé uniquement en HTTPS
    'samesite' => 'Strict' // non envoyé depuis un autre site (anti-CSRF)
]);
```

**Régénérer l'identifiant de session après connexion :**

```php
session_regenerate_id(true);
```

::: details Question : contre quelle attaque protège `session_regenerate_id` ?
La **fixation de session** : un attaquant vous fait utiliser un identifiant de session qu'il connaît déjà, puis attend que vous vous connectiez pour réutiliser cet identifiant. En changeant l'identifiant **après** la connexion, la session qu'il avait préparée ne vaut plus rien.
:::

**Ne jamais écrire un secret en dur :**

```php
// À proscrire
$apiKey = "sk-1234567890abcdef";

// À privilégier : variable d'environnement (fichier .env hors du dépôt Git)
$apiKey = getenv('API_KEY');
```

## À retenir

- Un mot de passe se **hache** (`password_hash` / `password_verify`), jamais en clair, jamais chiffré.
- On **limite et ralentit** les tentatives de connexion (anti-bruteforce).
- Une action sensible se fait en **POST** et se protège par un **jeton CSRF**.
- La **2FA** protège même quand le mot de passe est volé.
- Une session se durcit : cookies `HttpOnly`/`Secure`/`SameSite`, régénération d'identifiant, secrets hors du code.

## Conclusion

Vous avez fait le tour des grandes failles à connaître pour l'examen. Dans ce TP vous avez appris à :

- Corriger un stockage de mots de passe en clair.
- Ralentir une attaque par force brute et protéger un formulaire contre le CSRF.
- Intégrer une double authentification et durcir la session.

Pour vous entraîner d'ici l'examen, la page de [révisions](./exercice.md) rassemble des extraits de code à analyser dans le même esprit. Et si vous voulez pousser plus loin, le TP [Analyser une application](./reverse.md) vous fait manipuler le reverse engineering sur une vraie application Android.
