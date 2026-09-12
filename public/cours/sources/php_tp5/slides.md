# Protéger des pages

## Les compétences du TP (première partie)

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Un espace « protégé », c'est quoi ?

Rien de magique : une page normale…

précédée d'un **test sur la session**.

```php
if (!isset($_SESSION['user'])) {
    // Pas connecté !
}
```

---

## Le flux de connexion

1. L'utilisateur soumet le formulaire de login.
2. Le serveur vérifie les identifiants.
3. Si OK : on écrit dans la session, et on redirige.

Toute la « connexion » tient dans une clé de `$_SESSION`.

---

## La whitelist conditionnelle

```php
$whitelist = ['home', 'about'];

if (isset($_SESSION['user'])) {
    $whitelist[] = 'bart';
}
```

Question : que voit un visiteur non connecté qui demande `?page=bart` ?

---

## Rien. Et c'est parfait.

La page n'est pas dans sa liste : il retombe sur l'accueil.

Pas d'erreur, pas de message, pas de fuite d'information.

La meilleure protection, c'est **l'absence**.

---

## Et la déconnexion ?

Se déconnecter = faire oublier l'utilisateur.

Question : `unset($_SESSION['user'])` ou `session_destroy()` ? Quelle différence ?

---

## Le mot de passe en dur

```php
if ($_POST['email'] === "admin@exemple.com") { ... }
```

Pour comprendre le mécanisme : oui.

Pour un vrai site : jamais. Rendez-vous en seconde partie.

---

## Récapitulatif

- Page protégée = test `isset($_SESSION[...])`.
- Connexion réussie = une valeur en session + une redirection.
- Whitelist conditionnelle = le garde-barrière du site.
- `header()` + `die()`, les deux, toujours.
- Mot de passe en dur pour apprendre… en base et haché juste après.

---

## Des questions ?

Place au TP 🚀
