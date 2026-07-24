---
description: Sujets de révision PHP à faire à la maison, avant chaque évaluation. Des exercices plus longs qui combinent les notions.
---

# Exercices PHP à la maison

Trois sujets de révision, à faire **à la maison, sur papier**, avant chaque évaluation. Comptez 30 à 45 minutes par sujet. Ils combinent les notions vues en cours : c'est exactement le type de raisonnement attendu le jour de l'évaluation.

Les [exercices en classe](./exercices.md) restent votre référence pour l'entrainement notion par notion.

Légende :

- **(analyse)** : lire, prédire, expliquer.
- **(collectif)** : comparez vos réponses avec un camarade.
- **(pratique)** : écrire du code sur la feuille.

---

## Révision 1 : La page cassée (avant l'évaluation 1)

Le code suivant est censé afficher une liste de films, avec un compteur. Il contient **5 erreurs** (syntaxe ou logique). Entourez-les et proposez la correction pour chacune.

```php
<?php
$films = array("Alien", "Le Roi Lion", "Inception")

$compteur = 0;
while ($compteur < count($films)) {
    echo "- " . $film[$compteur] . "<br>";
}

if ($compteur = 3) {
    echo "Il y a exactement 3 films";
}

echo "Nombre de films : " . compteur;
```

Questions complémentaires :

1. (analyse) Une fois corrigé, réécrivez la boucle en `foreach`. Laquelle des deux versions préférez-vous, et pourquoi ?
2. (pratique) Ajoutez la gestion d'un paramètre `?favori=` : si le film passé en paramètre est dans le tableau, afficher « Bon choix ! », sinon « Inconnu au bataillon », et gérer l'absence du paramètre.

---

## Révision 2 : Le livre d'or mystère (avant l'évaluation 2)

Voici l'entry-point et une page d'un livre d'or :

`index.php` :

```php
<?php
session_start();
$whitelist = array('home', 'admin');

if(isset($_GET['page']) && in_array($_GET['page'], $whitelist)) {
    include("pages/" . $_GET['page'] . '.php');
} else {
    include('pages/home.php');
}
```

`pages/home.php` :

```php
<form method="post" action="index.php?page=home">
    <input type="text" name="message" />
    <input type="submit" value="Envoyer" />
</form>

<?php
if (isset($_POST['message'])) {
    $_SESSION['messages'][] = $_POST['message'];
}

if (isset($_SESSION['messages'])) {
    foreach ($_SESSION['messages'] as $message) {
        echo "<p>" . $message . "</p>";
    }
}
```

Scénarios à dérouler (répondez précisément) :

1. (analyse) Premier visiteur, première visite, aucun formulaire soumis : qu'affiche la page ?
2. (analyse) Il envoie « Bonjour » puis « Super site » : qu'affiche la page après le deuxième envoi ?
3. (analyse) Un **autre** visiteur ouvre le site sur son propre ordinateur : voit-il ces messages ? Pourquoi ? Est-ce le comportement souhaitable pour un livre d'or ?
4. (collectif) Il y a **deux** problèmes de sécurité dans ce code : trouvez-les (l'un concerne l'affichage, l'autre la page `admin`).
5. (pratique) Écrivez le code à ajouter en haut de `pages/admin.php` pour la protéger.

---

## Révision 3 : L'audit de sécurité (avant l'évaluation 3)

Vous auditez le code d'un petit site marchand. Extraits :

`pages/produit.php` :

```php
$id = $_GET['id'];
$resultats = $pdo->query("SELECT * FROM produits WHERE id = " . $id);
```

`pages/connexion.php` :

```php
$sql = "SELECT * FROM users WHERE login = '" . $_POST['login'] . "'";
$user = $pdo->query($sql)->fetch();

if ($user && $user['password'] == $_POST['password']) {
    $_SESSION['user'] = $user['login'];
}
```

Extrait de la table `users` :

| id | login | password |
| --- | --- | --- |
| 1 | admin | azerty123 |

1. (collectif) Listez **tous** les problèmes de sécurité que vous repérez (il y en a au moins 4 : deux dans les requêtes, un dans le stockage, un dans les accès aux superglobales).
2. (pratique) Réécrivez `pages/produit.php` correctement (requête préparée + gestion de l'id absent ou inexistant).
3. (analyse) Décrivez la marche à suivre pour corriger le stockage des mots de passe d'un site **déjà en production**, sans connaitre les mots de passe des utilisateurs existants (question ouverte, plusieurs réponses possibles).
4. (analyse) Question MLD : ce site stocke l'adresse de livraison dans la table `users` (colonnes `rue`, `ville`). Un client veut pouvoir enregistrer **plusieurs** adresses. Que faut-il changer dans le modèle ?
