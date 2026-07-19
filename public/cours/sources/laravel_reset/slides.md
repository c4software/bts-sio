# Le reset de mot de passe

## « J'ai oublié mon mot de passe »

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Le scénario

Un utilisateur vous écrit :

« Vous pouvez me renvoyer mon mot de passe par email ? »

---

## À votre avis, est-ce possible ?

---

## Non !

Vous ne stockez pas son mot de passe.

Vous stockez un **hash** :

```
$2y$12$FSq31Je4IJjlMUhmPOt7...
```

---

## Rappel

Un hash est à **sens unique**.

```
"monSuperMotDePasse"  →  password_hash()  →  "$2y$12$k7aP…"   ✅
"$2y$12$k7aP…"        →  ???              →  ?                ❌
```

---

## Et si un site vous renvoie votre mot de passe ?

---

C'est qu'il le stocke **en clair**. 🚨

- Fuyez ce site.
- Changez ce mot de passe partout où vous l'utilisez.

---

## La solution

On ne renvoie pas le mot de passe.

On permet d'en **choisir un nouveau**, de façon sécurisée.

---

## Comment prouver son identité sans mot de passe ?

À votre avis ?

---

## La boîte email

Si vous avez accès à la boîte email du compte…

C'est (probablement) que le compte est à vous.

---

## Le mécanisme

1. L'utilisateur saisit son **email**.
2. Le serveur génère un **token** et l'envoie **par email** sous forme de lien.
3. L'utilisateur clique et choisit un **nouveau mot de passe**.
4. Le serveur vérifie le token, enregistre le nouveau hash, **invalide le token**.

---

## Le token

Une **preuve temporaire**, impossible à deviner.

Seule la personne qui a accès à la boîte email peut la connaître.

---

## Comment générer un token ?

Deux approches classiques.

---

## Approche 1 : la chaîne aléatoire

```php
use Illuminate\Support\Str;

$token = Str::random(64);
// "gT7fKq2Zp9XwB4nRj8..."
```

64 caractères alphanumériques aléatoires.

---

## Approche 2 : l'UUID

```php
use Illuminate\Support\Str;

$token = Str::uuid();
// "550e8400-e29b-41d4-a716-446655440000"
```

---

## UUID ?

**U**niversally **U**nique **ID**entifier

- Un format **standardisé** (RFC 9562) sur 128 bits.
- La version 4 est générée **aléatoirement**.
- Vous en croiserez partout : identifiants d'API, clés de base de données, tokens…

---

## Combien d'UUID v4 possibles ?

À votre avis ?

---

## 2^122

Soit environ 5,3 × 10^36 possibilités.

En générer deux identiques est **statistiquement impossible**.

---

## Chaîne aléatoire ou UUID ?

- `Str::random(64)` : plus long, non standardisé.
- `Str::uuid()` : standardisé, reconnaissable, largement suffisant.

Les deux sont **imprévisibles** : c'est ça qui compte.

Dans le TP nous utiliserons `Str::random(64)`, mais un UUID serait tout aussi valable.

---

## Et un code à 6 chiffres ?

```
845 203
```

À votre avis, bonne ou mauvaise idée pour un lien de reset ?

---

## Mauvaise idée

1 000 000 de possibilités seulement.

Un script peut toutes les tester en quelques minutes (force brute).

---

## En base de données

Deux colonnes suffisent :

```php
$table->string('reset_token', 64)->nullable();
$table->dateTime('reset_token_expires_at')->nullable();
```

---

## Pourquoi une expiration ?

---

Un email peut traîner des **mois** dans une boîte de réception.

Un token éternel = une porte d'entrée éternelle.

**30 minutes** suffisent largement.

---

## Pourquoi un usage unique ?

---

Une fois le mot de passe changé, le token est **effacé** :

```php
$utilisateur->reset_token = null;
$utilisateur->reset_token_expires_at = null;
$utilisateur->save();
```

Quelqu'un qui retrouve le lien plus tard ? Trop tard.

---

## Un piège classique

« Aucun compte n'existe avec cette adresse email. »

Quel est le problème avec ce message ?

---

## L'énumération de comptes

Ce message permet de **tester** si une adresse a un compte chez vous.

Imaginez sur un site de rencontre, ou un site médical…

---

## La bonne réponse

Toujours **la même**, que l'email existe ou non :

« Si cette adresse est associée à un compte, un email vous a été envoyé. »

---

## Récapitulatif sécurité

- Token **imprévisible** (chaîne aléatoire longue ou UUID).
- Token avec **expiration** (30 minutes).
- Token à **usage unique** (invalidé après usage).
- Réponse **identique** que l'email existe ou non.
- Le nouveau mot de passe est **hashé** avant d'être stocké.

---

## Ce que nous allons coder

- Une migration (2 colonnes).
- Un formulaire « Mot de passe oublié ».
- L'envoi d'un email avec le lien.
- Le formulaire de nouveau mot de passe.
- La vérification et l'invalidation du token.

---

## Des questions ?

Place au TP 🚀
