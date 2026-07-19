# L'authentification

## « Qui êtes-vous ? »

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Deux mots à ne pas confondre

**Identifier** et **authentifier**.

À votre avis, quelle est la différence ?

---

- **Identifier** : dire qui on est (un email, un login).
- **Authentifier** : le **prouver** (un mot de passe, un badge, une empreinte).

Donner un email, tout le monde peut le faire. Le prouver, non.

---

## Le scénario

Un site vous envoie par email…

**votre mot de passe** que vous aviez oublié.

Bon signe ?

---

## Très mauvais signe 🚨

S'il peut vous le renvoyer, c'est qu'il le stocke **en clair**.

---

## Que se passe-t-il si sa base fuite ?

(injection SQL, sauvegarde volée, employé indélicat…)

---

- Tous les mots de passe sont exposés, d'un coup.
- Vos utilisateurs réutilisent leurs mots de passe **partout**.
- Une fuite chez vous = leurs comptes compromis ailleurs.

---

## La solution : le hash

Une fonction à **sens unique** :

```
"monSuperMotDePasse"  →  password_hash()  →  "$2y$12$k7aP…"   ✅
"$2y$12$k7aP…"        →  ???              →  ?                ❌
```

Personne (même pas vous) ne peut retrouver le mot de passe d'origine.

---

## En PHP, deux fonctions suffisent

```php
// À l'inscription : on stocke le hash
$hash = password_hash($motDePasse, PASSWORD_DEFAULT);

// À la connexion : on compare (sans jamais « déchiffrer »)
$estValide = password_verify($saisi, $hash); // true / false
```

---

## Question

Deux utilisateurs choisissent le **même** mot de passe.

Ont-ils le même hash en base ?

---

## Non !

`password_hash` ajoute automatiquement un **sel** (salt) : une valeur aléatoire mélangée au mot de passe avant le hash.

Résultat : impossible de repérer les mots de passe identiques, et les tables de hashs précalculés ne servent à rien.

---

## Hash ≠ chiffrement

- **Chiffrement** : réversible (avec la clé).
- **Hash** : irréversible, par conception.

Pour les mots de passe, c'est un **hash** qu'il faut. Toujours.

---

## Bon, l'utilisateur a prouvé qui il est…

Problème : HTTP n'a **pas de mémoire**.

À la requête suivante, le serveur a tout oublié.

---

## La session

- Le serveur mémorise « l'utilisateur X est connecté ».
- Le navigateur reçoit un **cookie** avec un identifiant de session.
- À chaque requête, le cookie permet de retrouver la mémoire.

Vous l'avez déjà utilisée en PHP : `$_SESSION`.

---

## Et dans Laravel ?

```php
Auth::login($utilisateur);  // Ouvre la session
Auth::check();              // Connecté ?
Auth::user();               // Qui est connecté ?
Auth::logout();             // Ferme la session
```

---

## Derrière, rien de magique

`Auth::login()` fait ce que vous feriez à la main :

```php
$_SESSION['user'] = $id;                          // PHP pur
$request->session()->put('user', $id);            // Laravel « manuel »
```

Laravel stocke **l'id** en session et recharge l'utilisateur à chaque requête.

---

## Un détail qui compte

```php
$request->session()->regenerate();
```

Après la connexion, on change l'identifiant de session.

À votre avis, contre quelle attaque ?

---

## La fixation de session

Un attaquant vous fait utiliser un identifiant de session **qu'il connaît déjà**, puis attend que vous vous connectiez.

En régénérant l'identifiant après le login, sa session préparée ne vaut plus rien.

---

## Protéger des pages

Comment interdire `/todo` aux non-connectés ?

---

## Le middleware

Un « filtre » exécuté **avant** le contrôleur :

```php
if (!Auth::check()) {
    return redirect('/login');
}
return $next($request);
```

Le `if` que vous auriez copié en haut de chaque page… écrit **une seule fois**.

---

## Dernière question

Le mot de passe de votre utilisateur a été **volé** (phishing, fuite ailleurs…).

Votre système tient-il encore ?

---

## Non. D'où la 2FA

**Double authentification** : deux preuves au lieu d'une.

- Quelque chose que vous **savez** : le mot de passe.
- Quelque chose que vous **possédez** : la boîte mail, le téléphone.

---

## En pratique

Un code à 6 chiffres, avec trois garde-fous :

- **Expiration** courte (quelques minutes).
- **Usage unique** (invalidé après saisie).
- Connexion ouverte **seulement après** la saisie du code.

Un TP dédié vous attend pour la coder (pour les plus rapides 😉).

---

## Récapitulatif

- Identifier ≠ authentifier.
- Un mot de passe se stocke **hashé** (`password_hash` / `password_verify`), jamais en clair.
- La **session** donne une mémoire à HTTP ; `Auth::` l'utilise pour vous.
- Le **middleware** protège les routes.
- La **2FA** ajoute un second facteur.

---

## Des questions ?

Place au TP 🚀
