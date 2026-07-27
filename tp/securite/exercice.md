---
description: "Révisions examen sécurité (OWASP) : une banque d'extraits de code à analyser et de questions de cours pour s'entraîner après les quatre TP."
---

# Révisions : entraînement examen

::: details Sommaire
[[toc]]
:::

Cette page rassemble des exercices courts pour vous entraîner **après** avoir fait les [quatre TP de la série](./). L'esprit est celui de l'examen : on vous donne un extrait de code ou une situation, vous devez **identifier la faille**, expliquer le risque, puis proposer une correction.

Jouez le jeu : cherchez la réponse avant d'ouvrir les solutions. Chaque exercice renvoie au TP qui traite la notion en détail.

## Repérage express

Pour chacun des extraits suivants, identifiez la ou les failles et proposez une correction.

### Extrait A

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

::: details Voir la correction
**Injection SQL** : `$name` et `$email` sont concaténés dans la requête (voir [TP 1](./tp1_injection_sql.md)).

```php
$request = "INSERT INTO users (name, email) VALUES (?, ?)";
$pdo->prepare($request)->execute([$name, $email]);
```
:::

### Extrait B

```php
<?php
echo "<h2>Bonjour " . $_GET['name'] . "</h2>";
?>
```

::: details Voir la correction
**XSS réfléchie** : la saisie est réaffichée sans échappement (voir [TP 2](./tp2_xss.md)).

```php
echo "<h2>Bonjour " . htmlspecialchars($_GET['name'] ?? '', ENT_QUOTES, 'UTF-8') . "</h2>";
```
:::

### Extrait C

```php
<?php
$id = $_GET['id'];
$request = "SELECT * FROM users WHERE id = $id";
$pdo->prepare($request)->execute();
$user = $pdo->fetch(PDO::FETCH_ASSOC);
?>
```

::: details Voir la correction
Le **faux ami** : la donnée est concaténée **avant** le `prepare`, donc la requête reste vulnérable. En prime, `fetch` est appelé sur `$pdo` au lieu du statement (voir [TP 1](./tp1_injection_sql.md)).

```php
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$id]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
```
:::

### Extrait D

```php
<?php
// Routeur
Route::get('/', 'HomeController@index');
Route::get('/admin', 'AdminController@index');
Route::get('/admin/users', 'UserController@index');
?>
```

::: details Voir la correction
**Manque de contrôle d'accès** : les routes d'administration ne sont protégées par aucun middleware (voir [TP 3](./tp3_controle_acces.md)).

```php
Route::middleware(['admin'])->group(function () {
    Route::get('/admin', 'AdminController@index');
    Route::get('/admin/users', 'UserController@index');
});
```
:::

## Une faille à part : l'inclusion de fichier

Celle-ci n'est pas traitée dans les TP, à vous de la découvrir. L'auditeur a réussi à afficher le contenu du fichier `config.php` (mots de passe de la base compris) grâce à ce code :

```php
<?php
include $_GET['page'] . '.php';
// Exemple d'usage prévu : index.php?page=accueil
?>
```

::: details Question : comment l'attaque fonctionne-t-elle ?
L'utilisateur contrôle entièrement le nom du fichier inclus. Avec `?page=config`, il inclut `config.php`. Pire, avec des séquences comme `?page=../../../etc/passwd%00`, il peut remonter l'arborescence et lire des fichiers du serveur. C'est une faille d'**inclusion de fichier** (LFI), une forme d'injection appliquée aux chemins.
:::

::: details Voir l'une des solutions possibles
On n'inclut **jamais** un chemin construit à partir d'une saisie. On limite à une liste blanche de pages autorisées :

```php
<?php
$pagesAutorisees = ['accueil', 'contact', 'mentions'];
$page = $_GET['page'] ?? 'accueil';

if (! in_array($page, $pagesAutorisees, true)) {
    $page = 'accueil';
}
include $page . '.php';
?>
```

L'utilisateur ne peut plus inclure que les pages que **vous** avez prévues.
:::

## Questions de cours

Ces questions reviennent souvent à l'examen. Rédigez une réponse courte avant d'ouvrir la correction.

### L'authentification unique (SSO)

L'entreprise veut mettre en place un système d'authentification centralisé (SSO) pour toutes ses applications. Expliquez en quoi ce choix peut **réduire** la sécurité de l'ensemble, et proposez une parade.

::: details Voir la correction
Avec un SSO, un **seul** compte donne accès à **toutes** les applications. La commodité pour l'utilisateur devient un risque : si ce compte unique est compromis, l'attaquant accède d'un coup à l'ensemble des services. La surface d'attaque se concentre sur un point unique.

La parade principale est la **double authentification (2FA / MFA)** sur le compte SSO : même avec le mot de passe, l'attaquant ne peut rien sans le second facteur. On y ajoute une politique de mots de passe forts et une surveillance des connexions (voir [TP 4](./tp4_authentification.md)).
:::

### L'utilité des logs

En quoi les journaux d'accès aident-ils à identifier un problème de sécurité ? Donnez un cas concret et indiquez si le traitement doit être manuel ou automatisé.

::: details Voir la correction
Les logs assurent la **traçabilité** : qui a fait quoi, quand, depuis où. Ils permettent de détecter une attaque même quand le code « fonctionne » normalement.

Cas concret : une même adresse IP qui demande des factures par numéros consécutifs (`?id=8986`, `8987`, `8988`…) trahit une **énumération**. Sur un petit volume, une lecture manuelle suffit ; en production, le volume impose un traitement **automatisé** (détection d'un pic de 404, d'un même IP qui enchaîne les identifiants…) avec alerte. C'est la catégorie A09 de l'OWASP (voir [TP 3](./tp3_controle_acces.md)).
:::

### Hacher ou chiffrer ?

Un site vous renvoie par email votre mot de passe oublié. Est-ce bon signe ? Quelle est la différence entre hacher et chiffrer un mot de passe ?

::: details Voir la correction
**Très mauvais signe.** S'il peut vous renvoyer votre mot de passe, c'est qu'il le stocke en clair (ou de façon réversible). En cas de fuite, tous les mots de passe sont exposés.

- **Chiffrer** : transformation **réversible** (avec une clé). On peut retrouver la valeur d'origine.
- **Hacher** : transformation **à sens unique**. On ne peut pas revenir en arrière.

Pour un mot de passe, c'est un **hachage** qu'il faut (`password_hash` / `password_verify`), jamais un chiffrement (voir [TP 4](./tp4_authentification.md)).
:::

## Pour finir

Si tous ces exercices vous paraissent clairs, vous êtes prêt pour l'épreuve. Sinon, retournez sur le TP concerné : le raisonnement compte plus que la mémorisation. 👋 Si vous avez des questions, n'hésitez pas.
