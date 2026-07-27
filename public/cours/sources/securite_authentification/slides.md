# Authentification et sessions

## Le dernier rempart

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Un audit de la base

```
| id | username | password             |
|  1 | admin    | adminSuperMotDePasse |
|  2 | user     | user                 |
```

Bon signe ?

---

## Très mauvais signe 🚨

Les mots de passe sont **en clair**.

Une fuite de la base = tous les comptes exposés d'un coup.

---

## La solution : le hash

```php
// À l'inscription
$hash = password_hash($mdp, PASSWORD_DEFAULT);

// À la connexion
password_verify($saisi, $hash); // true / false
```

Une fonction à **sens unique** : impossible de retrouver le mot de passe.

---

## Crypter ≠ hasher

- **Crypter** : réversible (comme Canal+).
- **Hasher** : irréversible (comme le steak haché).

Pour un mot de passe, c'est un **hash**. Toujours.

---

## Deuxième problème : le bruteforce

Un formulaire de connexion qu'on peut **rejouer à l'infini**…

À votre avis, comment ralentir l'attaquant ?

---

## Limiter et ralentir

- Limiter le **nombre de tentatives** (rate limiting).
- Ajouter un **délai** entre deux essais.
- Un mot de passe **fort** au départ.

L'objectif n'est pas de rendre l'attaque impossible, mais **trop coûteuse**.

---

## Troisième problème : le CSRF

```html
<a href="/supprimer?id=1">Supprimer</a>
```

Un lien piégé dans un email, cliqué par un admin connecté…

et l'action s'exécute **à son insu**.

---

## Deux protections

- Une action qui **modifie** ne se fait jamais en `GET`.
- Un **jeton** unique et non rejouable dans le formulaire.

```html
<input type="hidden" name="token" value="...">
```

---

## Et si le mot de passe est volé ?

Phishing, fuite ailleurs, réutilisation…

Le mot de passe seul ne suffit plus.

---

## La double authentification (2FA)

Deux preuves au lieu d'une :

- ce que je **sais** (le mot de passe) ;
- ce que je **possède** (téléphone, application OTP).

---

## Ne pas oublier la session

- Cookie `HttpOnly` + `Secure` + `SameSite`.
- `session_regenerate_id()` après connexion (fixation de session).
- Les secrets dans un `.env`, **jamais** dans le code.

---

## Récapitulatif

- Mot de passe **haché** (`password_hash` / `password_verify`), jamais en clair.
- **Rate limiting** contre le bruteforce.
- **Jeton CSRF** et jamais d'action sensible en `GET`.
- **2FA** quand le mot de passe ne suffit plus.

---

## Des questions ?

Place au TP 🚀
