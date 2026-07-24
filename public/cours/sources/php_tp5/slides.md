# Protéger des pages

## Les compétences du TP

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

## Rediriger

```php
header('location: index.php?page=connexion');
die();
```

Question : pourquoi le `die()` est-il **indispensable** juste après ?

Indice : `header()` n'arrête pas l'exécution du script…

---

## Et la déconnexion ?

Se déconnecter = faire oublier la session.

Question : `unset($_SESSION['user'])` ou `session_destroy()` ? Quelle différence ?

---

## Récapitulatif

- Page protégée = test `isset($_SESSION[...])` en haut de page.
- Connexion réussie = une valeur écrite en session + une redirection.
- `header()` + `die()`, les deux, toujours.
- Mot de passe en dur pour apprendre… en base et haché très bientôt.

---

## Des questions ?

Place au TP 🚀
