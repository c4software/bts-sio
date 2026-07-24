# Exercices PHP à la maison : correction

Document réservé à l'enseignant. Non référencé dans les menus du site. La correction des exercices en classe est dans [exercices-correction.md](./exercices-correction.md).

---

## Révision 1 : La page cassée

Les 5 erreurs :

1. **Ligne 2** : point-virgule manquant après `array(...)`.
2. **Dans la boucle** : `$film` au lieu de `$films` (variable inexistante).
3. **Dans la boucle** : `$compteur` n'est jamais incrémenté → boucle infinie. Ajouter `$compteur++;`.
4. **Le if** : `$compteur = 3` est une **assignation**, pas une comparaison. Il fallait `==`. (Au passage : l'assignation vaut 3, donc la condition est toujours vraie, le message s'affiche quoi qu'il arrive. Bon point pour qui le remarque.)
5. **Dernière ligne** : `compteur` sans `$`.

Questions complémentaires :

1.

```php
foreach ($films as $film) {
    echo "- " . $film . "<br>";
}
```

Le `foreach` est préférable ici : pas de compteur à gérer, donc trois des cinq bugs (incrément oublié, mauvais nom de variable indexée, `$` manquant sur le compteur) ne peuvent tout simplement plus exister.

2.

```php
if (isset($_GET['favori'])) {
    if (in_array($_GET['favori'], $films)) {
        echo "Bon choix !";
    } else {
        echo "Inconnu au bataillon";
    }
}
```

Accepter une boucle + comparaison à la place d'`in_array` (mais montrer `in_array`, ils l'ont vu avec la whitelist).

---

## Révision 2 : Le livre d'or mystère

1. Uniquement le formulaire. Ni message ni warning : les deux `isset()` protègent les deux blocs.
2. Le formulaire, puis **les deux messages** : « Bonjour » et « Super site ». Ils s'accumulent dans le tableau en session.
3. **Non.** La session est propre à chaque visiteur : son tableau `messages` à lui est vide. Pour un livre d'or c'est raté : un livre d'or doit être **commun** à tous les visiteurs. C'est l'argument qui prépare la base de données (la session n'est pas un stockage partagé ni durable).
4. Les deux problèmes :
   - **XSS** : `echo "<p>" . $message . "</p>"` affiche la saisie brute. Un `<script>` saisi serait exécuté chez tous… enfin ici chez le visiteur lui-même (session), mais le réflexe `htmlspecialchars($message)` doit être là.
   - **La page admin n'est pas protégée** : `admin` est dans la whitelist, donc `index.php?page=admin` est accessible à **tout le monde**. La whitelist autorise l'inclusion, elle ne gère pas les **droits**.
5.

```php
<?php
if (!isset($_SESSION['user'])) {
    header('location: index.php?page=home');
    die();
}
```

Exiger le `die()` : sans lui, le reste de la page s'exécute malgré l'en-tête de redirection.

---

## Révision 3 : L'audit de sécurité

1. Les problèmes attendus :
   - **Injection SQL dans `produit.php`** : `$id` concaténé dans la requête (`?id=1 OR 1=1`, voire pire).
   - **Injection SQL dans `connexion.php`** : `$_POST['login']` concaténé (`admin' --`).
   - **Mots de passe stockés en clair** (`azerty123` visible dans la table). Il faut `password_hash()` au stockage et `password_verify()` à la connexion, et la comparaison `==` du mot de passe en clair disparait.
   - **Aucun `isset()`** sur `$_GET['id']`, `$_POST['login']`, `$_POST['password']` : warnings et comportements imprévus si les paramètres manquent.
   - (Bonus accepté : mot de passe faible, absence de limitation de tentatives, `SELECT *`…)

2.

```php
if (isset($_GET['id'])) {
    $stmt = $pdo->prepare("SELECT * FROM produits WHERE id = ?");
    $stmt->execute([$_GET['id']]);
    $produit = $stmt->fetch(\PDO::FETCH_ASSOC);

    if ($produit) {
        // Affichage du produit
    } else {
        echo "Produit introuvable";
    }
} else {
    echo "Produit introuvable";
}
```

3. Question ouverte. Pistes valables :
   - **Migration au fil de l'eau** : à la prochaine connexion réussie de chaque utilisateur (on a alors le mot de passe en clair en mémoire), le re-stocker haché ; un flag ou le format du champ distingue les comptes migrés.
   - **Réinitialisation forcée** : hacher immédiatement tout ce qui existe (même en clair, on peut le hacher : `password_hash($clair)`), c'est d'ailleurs la meilleure réponse : on peut hacher **tout de suite** tous les mots de passe existants puisqu'on les connait. Un étudiant qui propose « forcer tout le monde à changer de mot de passe » n'a pas tort non plus, mais c'est moins fin.
   - Toute réponse montrant qu'on ne peut PAS « déhacher » et qu'il faut donc agir au moment où le clair est disponible est correcte.

4. Une adresse par ligne dans une **table `adresses`** séparée (`#id`, `rue`, `ville`, `id_utilisateur` en clé étrangère). C'est la règle de la série 12 : une information qui se multiplie sort dans sa propre table. Les colonnes `rue` / `ville` disparaissent de `users`.
