# L'authentification

## Les bonnes pratiques

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## La base fuite, et alors ?

Imaginez : votre base de données se retrouve dans la nature.

Question : que découvre la personne qui l'ouvre ?

---

## En clair, c'est la catastrophe

```text
| id | email               | mot_de_passe |
|  1 | alice@exemple.com   | azerty123    |
|  2 | bob@exemple.com     | jaimelechat  |
```

- Tous les comptes de votre site sont ouverts.
- Et ceux de vos utilisateurs ailleurs (même mot de passe partout).

---

## Hacher, ce n'est pas chiffrer

- **Chiffrer** : réversible, on retrouve la valeur d'origine.
- **Hacher** : sens unique, on ne revient jamais en arrière.

On ne compare pas des mots de passe, on compare des **empreintes**.

---

## md5, sha1 : c'est fini

```php
echo md5('mdp'); // 6f8db599de986fab7a21625b7916589c
```

Question : pourquoi ces fonctions ne suffisent-elles plus aujourd'hui ?

---

## Parce qu'elles sont trop rapides

- Des milliards d'empreintes calculées par seconde.
- Les résultats sont déjà stockés dans des **tables arc-en-ciel**.
- Deux fois le même mot de passe donne deux fois la même empreinte.

---

## Le sel (salt)

Une valeur aléatoire ajoutée au mot de passe avant le hachage.

```php
password_hash('mdp', PASSWORD_DEFAULT); // $2y$10$Rk1s...
password_hash('mdp', PASSWORD_DEFAULT); // $2y$10$9dZv...
```

Même mot de passe, deux résultats différents.

---

## bcrypt, lent exprès

- Un algorithme volontairement **coûteux** à calculer.
- Quelques dizaines de millisecondes pour vous.
- Des siècles pour tester un dictionnaire entier.

La lenteur est ici une fonctionnalité.

---

## Enregistrer : password_hash

```php
$hash = password_hash($password, PASSWORD_DEFAULT);
```

- Génère le sel tout seul.
- Choisit l'algorithme tout seul.
- Renvoie une chaîne à stocker telle quelle.

---

## Vérifier : password_verify

```php
if (password_verify($password, $user['mot_de_passe'])) {
    // C'est la bonne personne
}
```

Le sel est **dans** le hash : rien d'autre à stocker.

---

## Toujours une requête préparée

```php
$stmt = $pdo->prepare("SELECT * FROM utilisateurs WHERE email = ?");
$stmt->execute([$email]);
```

Un formulaire de connexion, c'est la cible numéro 1 de l'injection SQL.

---

## Le message d'erreur

« Cet email n'existe pas » ou « Mot de passe incorrect » ?

Question : pourquoi ces deux messages sont-ils une mauvaise idée ?

---

## Un seul message, toujours le même

« Email ou mot de passe incorrect. »

Sinon votre formulaire devient un outil pour **découvrir les comptes** existants.

---

## Et la session ?

```php
session_regenerate_id(true);
```

À la connexion, on change l'identifiant de session : l'ancien ne sert plus à rien.

---

## Ce que nous allons coder

- Une inscription : validation, hachage, `INSERT`.
- Une connexion : `SELECT` préparé, `password_verify`.
- Un espace réservé et une déconnexion propre.

---

## Récapitulatif

- Jamais de mot de passe en clair, nulle part.
- `password_hash()` pour enregistrer, `password_verify()` pour vérifier.
- Requête préparée sur le formulaire de connexion, sans exception.
- Message générique, et `session_regenerate_id()` à la connexion.

---

## Des questions ?

Place au TP 🚀
